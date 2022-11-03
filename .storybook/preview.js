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
        // auto-generated release stories order
        ["v0.x.x",["v0.5.x",["v0.5.2","v0.5.1","v0.5.0"],"v0.4.x",["v0.4.3","v0.4.2","v0.4.1","v0.4.0"],"v0.3.x",["v0.3.4","v0.3.3","v0.3.2","v0.3.1","v0.3.0"],"v0.2.x",["v0.2.7","v0.2.6","v0.2.5","v0.2.4","v0.2.3","v0.2.2","v0.2.1","v0.2.0"],"v0.1.x",["v0.1.1","v0.1.0","v0.1.0-beta2","v0.1.0-beta1"],"v0.0.x",["v0.0.1-beta4"]]],
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
