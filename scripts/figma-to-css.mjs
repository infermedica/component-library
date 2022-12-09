import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();
const fileName = fileURLToPath(import.meta.url);
const figmaToken = process.env.FIGMA_TOKEN;
const figmaUrl = 'https://api.figma.com/v1';
const figmaFileId = 'txuY6Y2evaphl43mSvHUQ8';

const saveFile = (name, content) => {
  try {
    const comment = '// Auto-generated file by update:css-variables script. Do not edit manually\n\n:root {';
    writeFileSync(`./src/styles/variables/${name}.scss`, `${comment}${content.join('\n\n')}}`, 'utf-8');
    console.log(`🚀 ${name} file has been updated!`);
  } catch (err) {
    console.log(`⛔️ Something goes wrong and the ${name} file hasn't been updated!`, err);
  }
};
const fetchFile = async () => {
  try {
    const response = await fetch(`${figmaUrl}/files/${figmaFileId}`, {
      method: 'GET',
      headers: { 'X-Figma-Token': figmaToken },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(`⛔️ Something goes wrong, ${err}`);
    return {};
  }
};
const getValueWithUnit = (value, unit = 'px') => {
  if (value?.match(/^0/g)) {
    return '0';
  }
  return value?.match(new RegExp(unit, 'g'))
    ? value
    : `${value}${unit}`;
};
const getValue = (value, typeOfValue) => (value?.match(new RegExp(typeOfValue, 'g'))
  ? `var(--${value})`
  : value);
const getTokens = ({
  frames, frameName, listName = 'Lists', nesting = 1, filter = ({ name }) => name?.match(/Name|Value/g), map = ({ characters }) => characters,
}) => {
  let tokensFrames = frames
    ?.find(({ name }) => (name?.match(new RegExp(frameName, 'g'))))?.children
    ?.find(({ name }) => (name?.match(new RegExp(listName, 'g'))))?.children;
  let lvl = nesting;
  while (lvl > 0) {
    tokensFrames = tokensFrames?.reduce((acc, { children }) => acc.concat(children), []);
    lvl -= 1;
  }
  return tokensFrames
    ?.map(({ children }) => children
      ?.filter(filter)
      ?.map(map))
    ?.filter((arr) => arr?.length === 2)
    .sort(new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base',
    }).compare);
};

const figmaToCss = async () => {
  const { document } = await fetchFile();
  const tokensFrames = document?.children
    ?.find(({ name }) => name?.match(/Tokens/g))?.children;
  const fontStyleTokens = getTokens({
    frames: tokensFrames,
    frameName: 'Font Style',
    listName: 'Font Style',
    nesting: 1,
    filter: ({ name }) => name?.match(/Name|Frame 1105/g),
    map: (frame) => {
      const getFontProperties = ({ characters }) => {
        if (!characters) return {};
        const [
          fontFamily,
          fontSize,
          fontWeight,
          lineHeight,
          letterSpacing,
        ] = characters.split('\n');
        return {
          fontFamily: getValue(fontFamily, 'font'),
          fontSize: getValue(fontSize, 'font'),
          fontWeight: getValue(fontWeight, 'font'),
          lineHeight: getValue(lineHeight, 'line'),
          letterSpacing: getValue(letterSpacing, 'letter'),
        };
      };
      switch (frame.name) {
        case 'Name':
          return frame.characters;
        case 'Frame 1105':
          if (frame?.children.length > 1) {
            return frame.children
              ?.reduce((acc, { children }) => acc.concat(children), [])
              ?.filter(({ characters }) => !characters?.match(/Desktop|Mobile/g))
              ?.map(getFontProperties);
          }
          return frame?.children?.map(getFontProperties);
        default:
          return [];
      }
    },
  });
  const mobileDesktopFontStyleTokens = fontStyleTokens
    ?.reduce((acc, [
      name,
      [
        mobile,
        desktop,
      ],
    ]) => ({
      mobile: [
        ...acc.mobile,
        [
          name,
          mobile,
        ],
      ],
      desktop: desktop
        ? [
          ...acc.desktop,
          [
            name,
            desktop,
          ],
        ]
        : acc.desktop,
    }), {
      mobile: [],
      desktop: [],
    });
  const fontStyleCSS = `${mobileDesktopFontStyleTokens.mobile.map(([
    name,
    {
      fontFamily, fontSize, fontWeight, lineHeight,
    },
  ]) => `--${name}: ${fontWeight} ${fontSize} / ${lineHeight} ${fontFamily};`).join('\n')}
    \n@media screen and (min-width: 768px) {
    ${mobileDesktopFontStyleTokens.desktop.map(([
    name,
    {
      fontFamily, fontSize, fontWeight, lineHeight,
    },
  ]) => `--${name}: ${fontWeight} ${fontSize} / ${lineHeight} ${fontFamily};`).join('\n')}\n}`;
  const letterSpacingCSS = `${mobileDesktopFontStyleTokens.mobile.map(([
    name,
    { letterSpacing },
  ]) => `--letter-spacing-${name.replace('font-', '')}: ${letterSpacing};`).join('\n')}
    \n@media screen and (min-width: 768px) {
    ${mobileDesktopFontStyleTokens.desktop.map(([
    name,
    { letterSpacing },
  ]) => `--letter-spacing-${name.replace('font-', '')}: ${letterSpacing};`).join('\n')}\n}`;
  const getCSSBoxShadow = (characters) => {
    const isInset = characters.includes('(inset/inner shadow)') ? 'inset ' : '';
    return characters
      ?.split('+')
      ?.map((shadow) => {
        const [
          offsetX,
          offsetY,
          blurRadius,
          spreadRadius,
          color,
        ] = shadow.split('\n')
          .filter((property) => property?.match(/offset-x|offset-y|blur-radius|spread-radius|color/g))
          .map((property) => property.replace(/.+: /, '')); // e.g. offset-x: 0 => 0
        return `${isInset}${getValueWithUnit(offsetX)} ${getValueWithUnit(offsetY)} ${getValueWithUnit(blurRadius)} ${getValueWithUnit(spreadRadius)} ${getValue(color, 'color')}`;
      }).join(', ');
  };
  const getCSSVars = (frameName, setValue = (value) => value.replace(/\n.+/g, ''), nesting = 1) => getTokens({
    frames: tokensFrames,
    frameName,
    nesting,
  })?.map((
    [
      name,
      value,
    ],
    index,
    tokens,
  ) => {
    const getVariableHead = (varName) => varName.slice(2).split('-').slice(0, 2).join('');
    const isEmptyLine = index > 0
      && !(name.includes('space') || name.includes('focus'))
      && getVariableHead(name) !== getVariableHead(tokens[index - 1][0])
      ? '\n' : '';
    return `${isEmptyLine}--${name}: ${setValue(value)};`;
  }).join('\n');

  saveFile('colors', [
    getCSSVars('Color Decisions', (value) => getValue(value, 'color'), 2),
    `--color-switch-disabled: var(--color-gray-300);
    --color-switch-track: var(--color-gray-600);
    --color-switch-track-hover: var(--color-gray-700);
    --color-switch-track-active: var(--color-gray-800);
    --color-switch-track-checked: var(--color-blue-600);
    --color-switch-track-checked-hover: var(--color-blue-700);
    --color-switch-track-checked-active: var(--color-blue-800);
    --color-switch-thumb: var(--color-white);`,
  ]);
  saveFile('layouts', [
    getCSSVars('Space'),
    getCSSVars('Border Radius'),
    getCSSVars('Box Shadow', getCSSBoxShadow),
    getCSSVars('Focus', getCSSBoxShadow),
    getCSSVars('Opacity'),
  ]);
  saveFile('typography', [
    getCSSVars('Font', (value) => `"${value.slice(1, -1)}", sans-serif`, 1),
    `& [dir="rtl"] {
      --font-family-body: "IBM Plex Sans Arabic", sans-serif;
      --font-family-heading: "IBM Plex Sans Arabic", sans-serif;}`,
    getCSSVars('Font', (value) => value.replace(/\n.+/g, ''), 2),
    fontStyleCSS,
    letterSpacingCSS,
  ]);
};

export default figmaToCss;
if (process.argv[1] === fileName) {
  figmaToCss();
}
