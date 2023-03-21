import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiText } from '@/../index';
import { withVariants } from '@sb/decorators';

const UiTextModifiers = [
  'ui-text--body-1-thick',
  'ui-text--body-2-comfortable',
  'ui-text--body-2-compact',
  'ui-text--body-2-comfortable-thick',
  'ui-text--body-2-compact-thick',
  'ui-text--caption',
  'ui-text--button-1',
];

const meta = {
  title: 'Atoms/Text',
  component: UiText,
  args: { content: 'How to use it?' },
  argTypes: {
    content: {
      description: 'Use this control to set the content.',
      table: { category: 'stories controls' },
      control: 'text',
    },
    modifiers: {
      name: 'class',
      description: 'Use this control to add modifier to class.',
      table: { category: 'html attributes' },
      control: 'multi-select',
      options: UiTextModifiers,
    },
    tag: { control: { type: 'text' } },
    default: { control: false },
  },
} satisfies Meta<typeof UiText>;
export default meta;
type Story = StoryObj<typeof UiText>;

export const Basic: Story = {
  render: (args) => ({
    components: { UiText },
    setup() {
      const {
        content,
        modifiers,
        ...rest
      } = args;
      return {
        content,
        rest: {
          ...rest,
          class: modifiers,
        },
      };
    },
    template: `<UiText v-bind="rest">
      {{ content }}
    </UiText>`,
  }),
};
Basic.args = { modifiers: [] };

export const WithTag: Story = { ...Basic };
WithTag.args = { tag: 'span' };

export const AllVariants: Story = {...Basic };
AllVariants.argTypes = {
  tag: { control: false },
  modifiers: { control: false },
};
AllVariants.decorators = [ withVariants ]
AllVariants.parameters = {
  variants: [
    ...UiTextModifiers.map((variant) => ({
      label: `${variant.replace('ui-text--', '')}`,
      class: `${variant}`,
    })),
  ],
  chromatic: { disableSnapshot: false },
  docs: { source: { code: null } },
};

export const Secondary: Story = { ...AllVariants };
Secondary.decorators = [
  ...AllVariants.decorators,
  () => ({ template: '<div class="ui-text--theme-secondary"><story/></div>' })
];

export const Brand: Story = { ...AllVariants };
Brand.parameters = {
  ...AllVariants.parameters,
  backgrounds: { default: 'brand' },
};
Brand.decorators = [
  ...AllVariants.decorators,
  () => ({ template: '<div class="ui-text--theme-brand"><story/></div>' })
];
