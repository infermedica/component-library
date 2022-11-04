import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import { app } from '@storybook/vue3';
import withTest from './decorators/withTest';
import withTheme from "./decorators/withTheme";
import './tailwindcss.css';
import '@/styles/styles.scss';
import './styles.scss';

// Registers and enables scss language support
SyntaxHighlighter.registerLanguage('scss', scss);

export const parameters = {
  options: {
    storySort: (story1, story2) => {
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
        },
        releases: {
          '*': {
            'rest-reverse': {
              'rest-reverse': {
                changeLog: {}
              },
            }
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
        contributingGuide: {}
      };
      const hasKey = (obj, key) => Object.hasOwn(obj, key);
      const compareAlphabetical = (a, b) => a.localeCompare(b, { numeric: true });
      const toCamelCase = (str) => str.toLowerCase().replace(/[^a-zA-Z0-9.-]+(.)/g, (m, chr) => chr.toUpperCase())
      const getStoryPath = (story) => [...story.title.split('/'), story.name].map(key => toCamelCase(key));
      const story1Path = getStoryPath(story1);
      const story2Path = getStoryPath(story2);
      const compareStoryPaths = (order, path1, path2) => {
        if (!path1.length || !path2.length) return path1.length - path2.length;
        const [path1Head, ...path1Tail] = path1;
        const [path2Head, ...path2Tail] = path2;
        if (!order || 'rest-reverse' in order && !hasKey(order, path1Head)) {
          const reverseOrder = order && order['rest-reverse'];
          const comp = compareAlphabetical(path1Head, path2Head);
          if (comp === 0) return compareStoryPaths(reverseOrder, path1Tail, path2Tail);
          return reverseOrder ? comp * -1 : comp
        }
        if (path1Head === path2Head) {
          return compareStoryPaths(order[path1Head] || order['*'], path1Tail, path2Tail);
        }
        if (hasKey(order, path1Head) && hasKey(order, path2Head)) {
          const orderKeys = Object.keys(order);
          return orderKeys.indexOf(path1Head) - orderKeys.indexOf(path2Head);
        } else if (hasKey(order, path1Head) && !hasKey(order, path2Head)) {
          return -1;
        } else if (!hasKey(order, path1Head) && hasKey(order, path2Head)) {
          return 1;
        } else {
          return compareStoryPaths(order['*'], path1, path2);
        }
      }
      return compareStoryPaths(storiesOrder, story1Path, story2Path)
    }
  },
  viewMode: 'docs',
  backgrounds: {
    values: [
      {
        name: 'brand',
        value: 'var(--color-background-brand)'
      }
    ]
  },
}

export const globalTypes = {
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
}
export const decorators = [withTest, withTheme]

document.body.onload = function() {
  // Set LTR as default directionality.
  document.body.setAttribute('dir', 'ltr')
}

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
