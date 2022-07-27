import testResults from '../../.unit-test-results.json'
import addons from '@storybook/addons';

const getName = (title) => title.includes('Directives')
  ? `${title.split('/').at(-1).toLowerCase().replaceAll(' ', '-')}.spec.js`
  : `Ui${title.split('/').at(-1)}.spec.js`

const getResult = (title) => testResults.testResults.find((r) => r.name.split('/').at(-1) === getName(title))

const withTest = (story, { kind }) => {
  const result = getResult(kind);
  if(result?.assertionResults.length){
    addons.getChannel().emit('storybookjs/test/add_tests', {
      kind,
      storyName: story,
      tests: [{
        result,
        name: kind
      }]
    });
  }
  return story()
}

export default withTest