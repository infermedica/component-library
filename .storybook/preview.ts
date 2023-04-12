import { withTest, withTheme  } from './decorators';
import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import './tailwindcss.css';
import '@/styles/styles.scss';
import './styles.scss';

document.body.onload = function() {
  // Set LTR as default directionality.
  document.body.setAttribute('dir', 'ltr')
}

setup((app) => {
  // Mock of router-link component
  app.component('router-link', {
    props: ['to'],
    setup(props) {
      const href = props.to.path;
      return { href }
    },
    template: `<a
      :href="href"
      data-component-name="router-link">
      <slot />
    </a>`,
  })
})

const preview: Preview = {
  parameters: {
    options: {
      storySort: (prevStory, nextStory) => {
        /*
          Sort function to sort stories based on a config file.
          {storiesOrder} is the order in which we want stories to appear.
          Any stories that aren't explicitly listed will appear at the end of list in alphabetical order.
          Modifiers:
            {'*'} - every nested element
            {'rest-reverse'} - rest of not listed elements appear in reverse alphabetical order
        */
        const storiesOrder = {
          // Keys must be in camelCase
          welcome: {},
          team: {},
          gettingStarted: {
            developmentGuide: {
              installation: {},
            },
            designSystem: {
              defaultColors: {}
            }
          },
          releases: {
            '*': {
              'rest-reverse': {},
            },
          },
          atoms: {
            '*': {
              common: {}
            },
          },
          molecules: {
            '*': {
              common: {}
            },
          },
          organisms: {
            '*': {
              common: {}
            },
          },
          templates: {
            '*': {
              common: {}
            },
          },
          utilities: {
            directives: {
              docs: {}
            },
          },
          contributingGuide: {
            '*': {
              'rest-reverse': {}
            }
          }
        };
        const hasKey = (obj, key) => obj.hasOwnProperty(key);
        const compareAlphabetical = (prev, next) => prev.localeCompare(next, 'en', { numeric: true });
        const toCamelCase = (str) => str.toLowerCase().replace(/[^a-zA-Z0-9.-]+(.)/g, (m, chr) => chr.toUpperCase());
        const getStoryPath = (title) => title.split('/').map(key => toCamelCase(key));
        const prevStoryPath = getStoryPath(prevStory.title);
        const nextStoryPath = getStoryPath(nextStory.title);
        const compareStoryPaths = (order, prevPath, nextPath) => {
          if (!prevPath.length || !nextPath.length) return prevPath.length - nextPath.length;
          const [prevPathHead, ...prevPathTail] = prevPath;
          const [nextPathHead, ...nextPathTail] = nextPath;
          if (!order || 'rest-reverse' in order && !hasKey(order, prevPathHead)) {
            const reverseOrder = order && order['rest-reverse'];
            const comp = compareAlphabetical(prevPathHead, nextPathHead);
            if (comp === 0) return compareStoryPaths(reverseOrder, prevPathTail, nextPathTail);
            return reverseOrder ? comp * -1 : comp
          }
          if (prevPathHead === nextPathHead) {
            return compareStoryPaths(order[prevPathHead] || order['*'], prevPathTail, nextPathTail);
          }
          if (hasKey(order, prevPathHead) && hasKey(order, nextPathHead)) {
            const orderKeys = Object.keys(order);
            return orderKeys.indexOf(prevPathHead) - orderKeys.indexOf(nextPathHead);
          } else if (hasKey(order, prevPathHead) && !hasKey(order, nextPathHead)) {
            return -1;
          } else if (!hasKey(order, prevPathHead) && hasKey(order, nextPathHead)) {
            return 1;
          } else {
            return compareStoryPaths(order['*'], prevPath, nextPath);
          }
        }
        return compareStoryPaths(storiesOrder, prevStoryPath, nextStoryPath)
      },
    },
    docs: {
      source: {
        language: 'md',
        format: true,
      },
    },
    backgrounds: {
      values: [
        {
          name: 'brand',
          value: 'var(--color-background-brand)'
        }
      ]
    },
    chromatic: { disableSnapshot: true },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'default',
      toolbar: {
        icon: 'browser',
        items: [
          {value: 'default', title: 'Default'},
          {value: 'secondary', title: 'Secondary'},
          {value: 'brand', title: 'Brand'},
        ],
        dynamicTitle: true,
      }
    }
  },
  decorators: [
    withTest,
    withTheme,
  ]
}

export default preview
