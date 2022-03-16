import { withTests } from '@storybook/addon-jest';
import { addDecorator } from '@storybook/vue3';
import results from '../.jest-test-results.json';

import './tailwindcss.css';
import '@/styles/styles.scss';
import './styles.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: [
        'Getting Started',
        'Releases',
        ['v0.2.x', 'v0.1.x', 'v0.0.x'],
        'Atoms',
        'Molecules',
        'Organisms',
        'Templates',
        'Utilities',
        ['Directives', ['Docs', '*']],
      ]
    }
  },
  previewTabs: {
    'storybook/docs/panel': {
      index: -1
    }
  },
  viewMode: 'docs',
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
