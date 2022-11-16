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
        contributingGuide: {}
      };
      const hasKey = (obj, key) => Object.hasOwn(obj, key);
      const compareAlphabetical = (prev, next) => prev.localeCompare(next, { numeric: true });
      const toCamelCase = (str) => str.toLowerCase().replace(/[^a-zA-Z0-9.-]+(.)/g, (m, chr) => chr.toUpperCase())
      const getStoryPath = (story) => [...story.title.split('/'), story.name].map(key => toCamelCase(key));
      const prevStoryPath = getStoryPath(prevStory);
      const nextStoryPath = getStoryPath(nextStory);
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
