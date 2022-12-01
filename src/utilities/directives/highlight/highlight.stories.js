import { highlight } from '@/utilities/directives/index';
import UiInput from '@/components/atoms/UiInput/UiInput.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { ref } from 'vue';
import docs from './highlight.mdx';

export default {
  title: 'Utilities/Directives/Highlight',
  components: { UiText },
  parameters: { docs: { page: docs } },
};

export const WithDirective = () => ({
  components: {
    UiInput,
    UiText,
  },
  directives: { highlight },
  setup() {
    const searchQuery = ref('ipsum');
    const inputHandler = (value) => {
      searchQuery.value = value;
    };
    return {
      searchQuery,
      inputHandler,
    };
  },
  template: `
  <UiInput style="--input-padding-block: 5px; --input-padding-inline: 5px; margin-block-end: 10px" :modelValue="searchQuery" @update:modelValue="inputHandler"/>
  <UiText  v-highlight="searchQuery">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
  </UiText>`,
});
