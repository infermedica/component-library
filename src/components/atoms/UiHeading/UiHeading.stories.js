import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import { content, modifiers } from '@sb/helpers/argTypes';
export default {
  title: 'Atoms/Heading',
  component: UiHeading,
  args: {
    content: 'Do you have any of the following symptoms?',
    modifiers: [],
    level: 2,
    tag: '',
  },
  argTypes: {
    content,
    level: {
      control: {
        type: 'range',
        min: 1,
        max: 6,
      },
    },
    modifiers: modifiers({
      options: ['ui-heading--theme-secondary', 'ui-heading--theme-brand'],
    }),
  },
};
export const Common = {
  render: (args) => ({
    components: {
      UiHeading,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: `<UiHeading
    :level="level"
    :class="modifiers"
  >
    {{ content }}
  </UiHeading>`,
  }),
};
export const AsSpan = {
  render: (args) => ({
    components: {
      UiHeading,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: `<UiHeading
    :level="level"
    :class="modifiers"
  >
    {{ content }}
  </UiHeading>`,
  }),
  args: {
    tag: 'span',
  },
};
