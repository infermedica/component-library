# Symptom Checker UI Kit
UI components for Symptom Checker App
## Development setup

Install NPM dependencies:
``` bash
npm install
```
Run Storybook:
``` bash
npm run storybook:serve
```
Develop!
## Contributing Guide
### Scripts
#### Components
Use `create-component` to create a new component, run
``` bash
npm run create-component
```
and select it level (`atoms`, `molecules` or `organisms`). 
It created a new component directory in `src/components/{level}`.

Use `create-index` to create package index.js with components exports.
``` js
// Auto-generated file by create-index.js. Do not edit manually
import UiButton from './src/components/atoms/UiButton/UiButton.vue';

export {
    UiButton,
}
```
#### Linters
Use `lint:scss` to run `stylelint` and lint styles in `*.{vue,htm,html,css,sss,less,scss}`.
```
npm run lint:scss --fix
```

Use `lint:js` to run `eslint` and lint js code.
```
npm run lint:js --fix
```
## Coding guidelines
Use **Pascal Case** and **prefix** `Ui` for component to avoid naming collision.
```
Ui<ComponentName>
```
### Components Files Structure
Use `create-component` to create component. It created directory with 3 files.
```
./Ui<ComponentName>
|__Ui<ComponentName>.vue
|__Ui<ComponentName>.spec.js
|__Ui<ComponentName>.stories.mdx
```
- `vue` Vue.js component file. In this file you can find `template`, `script`, `styles` 
by scss and `i18n` for eng strings.
- `spec.js` Jest test file. By default you can find `render test` on it. Read more about 
[Vue Test Utils](https://vue-test-utils.vuejs.org/) and [Jest](https://jestjs.io/)
- `stories.mdx` Storybook stories file. By default you can find `common` stories. Read more about 
[Storybook](https://storybook.js.org/) and [Storybook MDX](https://storybook.js.org/docs/react/writing-docs/mdx)
### CSS Rules
#### Naming
We want to fallow [BEMs](http://getbem.com/introduction/) for naming SCSS modifiers and CSS classes.
For example `ui-list__element--is-active`
#### [WIP] CSS Custom Properties
We want to use [Css Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) instead SASS variable.
``` scss
.ui-button {
  background: var(--button-background, transparent); // set empty variable
  padding: var(--button-padding, 0 0 0 8px); // or set default value
  
  &:hover {
    --button-background: var(--c-primary);
  }
}
```
Example for `UiList` component
``` scss
.ui-list {
    list-style-type: var(--list-list-style-type, none)
    
    &__element {
        color: var(--list-element-color);
        background: var(--list-element-background);

        &:hover {
            --list-element-background: var(--c-primary);
        }
        
        &--is-active {
            --list-element-color: var(--c-primary);
        }
    }

    &--has-dots {
        --list-list-style-type: circle;
    }
}
```
in progress...
### Template Rules
- use semantic HTML for example `<a/>` for elements witch change the route and `<button/>` for actions.
- use `slots` and `props` for content:
    - `props` should be used only for common case
    - **DO NOT** use `props` for properties that can be set by css
    - provide a slot's to allow template replacement
``` html
<slot name="header">
    <UiHeading 
        :level="1" 
        :title="title" 
        :subtitle="subtitle"
    />
</slot>
```
### Unit Test
Minimum set of test should be contained components: external API (`props`, `slots` and `$events`), internal API (`methods`)
### UI Kit Directives
- `outline`: `v-outline` disabled focus styles when user use mouse to navigation but is enabled for keyboard navigation.
- `click-outside`: `v-click-outside(Function)` will be useful when you want do something after click outside element (for example close the dropdown).
- `testid`: `v-testid(String)` added `data-testid` at `dev` environment.
