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
    storySort: {
      order: [
        'Welcome',
        'Getting Started',
        ['Development Guide', ['Installation', ['*']]],
        'Releases',
        ['v0.5.x', 'v0.4.x', 'v0.3.x', 'v0.2.x', 'v0.1.x', 'v0.0.x'],
        'Atoms',
        'Molecules',
        'Organisms',
        'Templates',
        'Utilities',
        ['Directives', ['Docs', '*']],
      ]
    },
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
