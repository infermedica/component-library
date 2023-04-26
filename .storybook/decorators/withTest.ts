import testResults from '../../.unit-test-results.json'
import { addons } from '@storybook/addons';
import type { DecoratorFunction } from '@storybook/types';
import type { VueRenderer } from '@storybook/vue3';

const getName = (title: string) => title.includes('Directives')
  ? `${title.split('/').at(-1)?.toLowerCase().replaceAll(' ', '-')}.spec.js`
  : `Ui${title.split('/').at(-1)}.spec.js`;
const getResult = (title: string) => testResults.testResults.find(
  (r) => r.name.split('/').at(-1) === getName(title)
);

const withTest: DecoratorFunction<VueRenderer> = (
  story,
  { title }
) => {
  const result = getResult(title);
  if(result?.assertionResults.length){
    addons.getChannel().emit('storybookjs/test/add_tests', {
      title,
      storyName: story,
      tests: [{
        result,
        name: title
      }]
    });
  }
  return story()
}

export default withTest