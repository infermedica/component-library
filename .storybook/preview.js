import { withTests } from '@storybook/addon-jest';
import { addDecorator } from '@storybook/vue3';
import results from '../.jest-test-results.json';

import './tailwindcss.scss';
import '@/styles/styles.scss';
import './styles.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

addDecorator(
  withTests({
    results,
  })
);

document.body.onload = function() {
  // Set LTR as default directionality.
  document.body.setAttribute('dir', 'ltr')
}
