import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const figmaToken = process.env.FIGMA_TOKEN;
const figmaUrl = 'https://api.figma.com/v1';
const figmaServiceOptions = {
  method: 'GET',
  headers: { 'X-Figma-Token': figmaToken },
};
const getFile = async (key) => {
  const response = await fetch(`${figmaUrl}/files/${key}`, figmaServiceOptions);
  const data = await response.json();
  return data;
};

const saveFile = (content, fileName) => {
  fs.writeFile(fileName, content, (err) => {
    if (err) {
      throw err;
    }
    console.log(`${fileName} file has been saved!`);
  });
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
  frames, frameName, listName = 'Lists', nesting = 2, filter = ({ name }) => name?.match(/Name|Value/g), map = ({ characters }) => characters,
}) => {
  // Get Lists of Frames With Tokens
  let tokensFrames = frames
    ?.find(({ name }) => (name?.match(new RegExp(frameName, 'g'))))?.children
    ?.find(({ name }) => (name?.match(new RegExp(listName, 'g'))))?.children;

  // TODO: should be refactored
  let lvl = nesting;
  while (lvl > 0) {
    tokensFrames = tokensFrames?.reduce((acc, { children }) => acc.concat(children), []);
    lvl -= 1;
  }

  return tokensFrames
    ?.map(({ children }) => children
      ?.filter(filter)
      ?.map(map))
    ?.filter((arr) => arr?.length === 2);
};

(async () => {
  const { document } = await getFile('txuY6Y2evaphl43mSvHUQ8');
  console.log(document);
  const tokensFrames = document?.children
    ?.find(({ name }) => name?.match(/Tokens/g))?.children;

  const colorDecisionsTokens = getTokens({
    frames: tokensFrames,
    frameName: 'Color Decisions',
  });
  const colorDecisionsCSS = colorDecisionsTokens
    ?.map(([
      name,
      value,
    ]) => `--${name}: ${getValue(value, 'color')};`)
    .join('\n');

  const fontTokens = getTokens({
    frames: tokensFrames,
    frameName: 'Font',
  });
  const fontCSS = fontTokens
    ?.map(([
      name,
      value,
    ]) => `--${name}: ${value.replace(/\n.+/g, '')};`)
    .join('\n');

  const fontStyleTokens = getTokens({
    frames: tokensFrames,
    frameName: 'Font Style',
    listName: 'Font Style',
    nesting: 1,
    filter: ({ name }) => name?.match(/Name|Frame 1105/g),
    map: (frame) => {
      const getFontProperties = ({ characters }) => {
        const [
          fontFamily,
          fontSize,
          fontWeight,
          lineHeight,
          letterSpacing,
        ] = characters?.split('\n');
        return {
          fontFamily: getValue(fontFamily, 'font'),
          fontSize: getValue(fontSize, 'font'),
          fontWeight: getValue(fontWeight, 'font'),
          lineHeight: getValue(lineHeight, 'line'),
          letterSpacing: getValue(letterSpacing, 'letter'),
        };
      };
      // eslint-disable-next-line default-case
      switch (frame.name) {
        case 'Name':
          return frame.characters;
        case 'Frame 1105':
          if (frame?.children.length === 2) {
            return frame.children
              ?.reduce((acc, { children }) => acc.concat(children), [])
              ?.filter(({ characters }) => !characters?.match(/Desktop|Mobile/g))
              ?.map(getFontProperties);
          }
          return frame?.children
            ?.map(getFontProperties);
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
  const fontStyleCSS = ''
  + `${mobileDesktopFontStyleTokens.mobile.map(([
    name,
    {
      fontFamily, fontSize, fontWeight, lineHeight,
    },
  ]) => `--${name}: ${fontWeight} ${fontSize} / ${lineHeight} ${fontFamily};`).join('\n')}`
  + '\n@media (min-width: 768px) {\n'
      + `${mobileDesktopFontStyleTokens.desktop.map(([
        name,
        {
          fontFamily, fontSize, fontWeight, lineHeight,
        },
      ]) => `--${name}: ${fontWeight} ${fontSize} / ${lineHeight} ${fontFamily};`).join('\n')}`
  + '\n}';
  const letterSpacingCSS = ''
      + `${mobileDesktopFontStyleTokens.mobile.map(([
        name,
        { letterSpacing },
      ]) => `--letter-spacing-${name}: ${letterSpacing};`).join('\n')}`
      + '\n@media (min-width: 768px) {\n'
      + `${mobileDesktopFontStyleTokens.desktop.map(([
        name,
        { letterSpacing },
      ]) => `--letter-spacing-${name}: ${letterSpacing};`).join('\n')}`
      + '\n}';

  const spaceTokens = getTokens({
    frames: tokensFrames,
    frameName: 'Space',
    nesting: 1,
  });
  const spaceCSS = spaceTokens
    ?.map(([
      name,
      value,
    ]) => `--${name}: ${value.replace(/\n.+/g, '')};`)
    .join('\n');

  const borderRadiusTokens = getTokens({
    frames: tokensFrames,
    frameName: 'Border Radius',
    nesting: 1,
  });
  const borderRadiusCSS = borderRadiusTokens
    ?.map(([
      name,
      value,
    ]) => `--${name}: ${value.replace(/\n.+/g, '')};`)
    .join('\n');

  const getCSSBoxShadow = ({ characters }) => characters
    ?.split('+')
    ?.map((shadow) => {
      const [
        offsetX,
        offsetY,
        blurRadius,
        spreadRadius,
        color,
      ] = shadow.split('\n')
        ?.filter((property) => property?.match(/offset-x|offset-y|blur-radius|spread-radius|color/g))
        ?.map((property) => property.replace(/.+: /, '')); // e.g. offset-x: 0 => 0
      return `${getValueWithUnit(offsetX)} ${getValueWithUnit(offsetY)} ${getValueWithUnit(blurRadius)} ${getValueWithUnit(spreadRadius)} ${getValue(color, 'color')}`;
    }).join(', ');
  const boxShadowTokens = getTokens({
    frames: tokensFrames,
    frameName: 'Box Shadow',
    nesting: 1,
  });
  const boxShadowCSS = boxShadowTokens
    ?.map(([
      name,
      value,
    ]) => `--${name}: ${getCSSBoxShadow({ characters: value })};`)
    .join('\n');

  const focusTokens = getTokens({
    frames: tokensFrames,
    frameName: 'Focus',
    nesting: 1,
  });
  const focusCSS = focusTokens
    ?.map(([
      name,
      value,
    ]) => `--${name}: ${getCSSBoxShadow({ characters: value })};`)
    .join('\n');

  const opacityTokens = getTokens({
    frames: tokensFrames,
    frameName: 'Opacity',
    nesting: 1,
  });
  const opacityCSS = opacityTokens
    ?.map(([
      name,
      value,
    ]) => `--${name}: ${value.replace(/\n.+/g, '')};`)
    .join('\n');

  const scss = `:root {\n${
    [
      colorDecisionsCSS,
      fontCSS,
      fontStyleCSS,
      letterSpacingCSS,
      spaceCSS,
      borderRadiusCSS,
      boxShadowCSS,
      focusCSS,
      opacityCSS,
    ]
      ?.filter(Boolean)
      .join('\n')
  }\n}`;
  saveFile(scss, 'styles.scss');
})();
