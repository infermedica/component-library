import ComponentNameCamelCase from '@/components/ComponentFolder/ComponentNameCamelCase/ComponentNameCamelCase.vue';
export default {
  title: 'ComponentType/ComponentName',
  component: ComponentNameCamelCase,
  args: {
    content: 'content',
  },
  argTypes: {
    content: {
      control: {
        type: 'text',
      },
    },
  },
};
export const Common = {
  render: (args) => ({
    components: {
      ComponentNameCamelCase,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: `<ComponentNameCamelCase
    :content="content"
  >
  {{ content }}
  </ComponentNameCamelCase>`,
  }),
  args: {
    content: 'common',
  },
};
