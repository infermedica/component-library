import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import ComponentNameCamelCase from '@/components/ComponentFolder/ComponentNameCamelCase/ComponentNameCamelCase.vue';

const meta: Meta<typeof ComponentNameCamelCase> = {
  title: 'ComponentType/ComponentName',
  component: ComponentNameCamelCase,
};

export default meta;
type Story = StoryObj<typeof ComponentNameCamelCase>;

export const Basic: Story = {
  render: (args) => ({
    components: { ComponentNameCamelCase },
    setup() {
      return { ...args };
    },
    template: `<ComponentNameCamelCase
      :content="content"
    >
      {{ content }}
    </ComponentNameCamelCase>`,
  }),
  args: { content: 'basic' },
};
