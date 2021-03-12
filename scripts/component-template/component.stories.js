import ComponentNameCamelCase from '@/components/ComponentFolder/ComponentNameCamelCase/ComponentNameCamelCase.vue';

export default {
  title: 'ComponentType/ComponentName',
  component: ComponentNameCamelCase,
  args: {
    content: 'content',
  },
  argTypes: {
    content: {
      control: 'text',
    },
  },
};

const Template = (args) => ({
  components: { ComponentNameCamelCase },
  setup() {
    return { ...args };
  },
  template: `<ComponentNameCamelCase :common="common">
    {{ content }}
  </ComponentNameCamelCase>`,
});

export const Common = Template.bind({});
Common.args = {
  common: 'common',
};
