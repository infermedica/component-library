import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import process from 'process';
import fs from 'fs';
import glob from 'glob';
import fileSave from 'file-save';
import stringify from 'stringify-object';
import sass from 'sass';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathComponentsRoot = path.resolve(__dirname, '../src/components');
const pathsVueComponents = glob.sync('*/*/Ui*.vue', { cwd: pathComponentsRoot });

const getAsKebabCase = (string) => string.replace(
  /([A-Z])(?=\w)/g,
  (s1, s2, index) => (index > 0 ? `-${s2.toLowerCase()}` : s2.toLowerCase()),
);
const getStyle = ({ component }) => {
  const matches = component.match(/<style lang="scss">([\s\S]*)<\/style>/, '$1');
  if (!matches) return '';
  return matches[1];
};
const getCompiledStyle = (style) => sass.compileString(style, {
  importers: [{
    findFileUrl(url) {
      const index = url.indexOf('styles');
      return new URL(pathToFileURL(`./src/${url.slice(index, url.length)}`));
    },
  }],
}).css;
const getStoriesMetadata = ({ stories }) => {
  const regex = new RegExp('export default\\s*{([\\s\\S]+?)};');
  const matches = stories.match(regex);
  if (!matches) return '';
  return matches[1];
};
const getCssProperties = (style, componentName) => {
  const regex = new RegExp(`:\\n*[\\s]*var\\([\\s]*--${componentName}-[\\s\\S]*?\\);`, 'g');
  const matches = style.match(regex);
  if (!matches) return;
  return [...matches]
    .map((cssProp) => cssProp
      .replace(/\n(\s{2,})/g, '')
      .match(/:[\s]*var\([\s]*--([\s\S]+?)(,[\s]*([\s\S]+?))?\);/))
    .reduce((object, [wholeMatch, name, valueMatch, value]) => ({
      ...object,
      [name]: {
        value,
        control: 'text',
        description: '',
      },
    }), {});
};
const getImportedComponents = ({ metadata }) => [...new Set(metadata
  .match(/(Ui.+?)(,| )/g)
  .map((match) => match
    .replace(/(,|'| )/g, '')))];

const getNewParameters = (parameters, cssprops) => {
  const newParameters = {
    ...parameters,
  };
  if (newParameters.cssprops) {
    delete newParameters.cssprops;
  }
  if (cssprops && Object.keys(cssprops).length) {
    newParameters.cssprops = {
      ...cssprops,
    };
  }
  return newParameters;
};
const updateMeta = ({ stories, parameters, hasParameters }) => stories.replace(/export default\s*{([\s\S]*?)};/, (exportDefault, meta) => {
  if (hasParameters) {
    const metaWithParameters = !meta.includes('parameters:') ? `${meta} parameters: {},` : meta;
    return `export default { ${metaWithParameters} };`.replace(
      /parameters:\s*{([\s\S]*)},/,
      () => `parameters: ${parameters},`,
    );
  }
  return `export default { ${meta} };`.replace(
    /\n\s*parameters:\s*{([\s\S]*)},/,
    () => '',
  );
});
const updateCssProps = ({ component, stories, componentNameKebabCase: componentName }) => {
  const style = getStyle({ component });
  const compiled = getCompiledStyle(style);
  const cssprops = getCssProperties(compiled, componentName);
  const metadata = getStoriesMetadata({ stories });
  const imports = getImportedComponents({ metadata });
  const { parameters } = JSON.parse(new Function(`
    let ${imports.join(', ')}, content, modifiers=${() => {}}, placeholder, disabled, icons, steps = [{name: ''}];
    return JSON.stringify({${metadata}});`)());
  const newParameters = getNewParameters(parameters, cssprops);
  const updatedParameters = stringify(
    newParameters,
    {
      indent: '  ',
      singleQuotes: true,
    },
  );
  const storiesToSave = updateMeta({
    stories,
    parameters: updatedParameters,
    hasParameters: newParameters && Object.keys(newParameters).length,
  });

  return storiesToSave;
};
function updateComponentsDocs() {
  for (const pathComponentVue of pathsVueComponents) {
    const pathComponentStories = pathComponentVue.replace(/\.vue$/, '.stories.js');
    const componentName = pathComponentVue.replace(/.*\/(Ui(.+))\.vue/, '$2');
    const componentNameKebabCase = getAsKebabCase(componentName);

    const component = fs.readFileSync(path.resolve(pathComponentsRoot, pathComponentVue), 'utf8');
    const stories = fs.readFileSync(path.resolve(pathComponentsRoot, pathComponentStories), 'utf8');

    let storiesToSave = stories;
    storiesToSave = updateCssProps({
      component,
      stories,
      componentNameKebabCase,
    });
    fileSave(path.resolve(pathComponentsRoot, pathComponentStories))
      .write(storiesToSave, 'utf8');
  }
  console.log('📄 docs updated successfully');
}
export default {
  updateComponentsDocs,
};

if (process.argv[1] === __filename) {
  updateComponentsDocs();
}
