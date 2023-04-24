import { onMounted } from 'vue';
import type { DecoratorFunction } from '@storybook/types';
import type { VueRenderer} from '@storybook/vue3';


const withTheme: DecoratorFunction<VueRenderer> = (
  story,
  { globals, id, parameters, viewMode }) => ({
  components: { story },
  setup() {
    const theme = parameters.theme || globals.theme;
    const themeName = theme
      ? `theme-${theme}`
      : 'theme-default';
    const selector = viewMode === 'docs'
      ? `#anchor--${id} .docs-story`
      : '.sb-show-main';
    onMounted(() => {
      const element = document.querySelector(selector);
      if (!element) return;
      const classesToRemove = [...element.classList]
        .filter(className => className.startsWith('theme-'));
      element.classList.remove(...classesToRemove);
      element.classList.add(themeName);
    })
  },
  template: `<story />`
})

export default withTheme;
