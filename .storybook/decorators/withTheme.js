import {onMounted} from 'vue';

const withTheme = (story, context) => ({
  components: {story},
  setup() {
    const theme = context.parameters.theme || context.globals.theme;
    const themeName = theme ? `theme-${theme}` : 'theme-default';
    const selector = context.viewMode === 'docs' ? `#anchor--${context.id} .docs-story` : '.sb-show-main';
    onMounted(() => {
      if(themeName) {
        const element = document.querySelector(selector);
        if (!element) return;
        const classesToRemove = [...element.classList]
          .filter(className => className.startsWith('theme-'));
        element.classList.remove(...classesToRemove);
        element.classList.add(themeName);
      }
    })
  },
  template: `<story />`
})

export default withTheme;
