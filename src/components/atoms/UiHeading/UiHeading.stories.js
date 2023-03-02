import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import { content, modifiers } from '@sb/helpers/argTypes';
import { AsGroupWithObject } from '@/components/atoms/UiCheckbox/UiCheckbox.stories';

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
      options: [
        'ui-heading--theme-secondary',
        'ui-heading--theme-brand'
      ],
    }),
  },
  parameters: {
    cssProperties: {
      '--heading-font': 'var(--font-h6)',
      '--heading-letter-spacing': 'var(--letter-spacing-h6)',
      '--heading-margin-block':
        'var(--heading-margin-block-start, 0) var(--heading-margin-block-end, 0)',
      '--heading-margin-inline':
        'var(--heading-margin-inline-start, 0) var(--heading-margin-inline-end, 0)',
      '--heading-color': 'var(--color-text-heading)',
    },
  },
};

export const Common = {
  render: (args) => ({
    components: { UiHeading },
    setup() {
      return { ...args };
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
    components: { UiHeading },
    setup() {
      return { ...args };
    },
    template: `<UiHeading
      :level="level"
      :class="modifiers"
    >
      {{ content }}
    </UiHeading>`,
  }),

  args: { tag: 'span' },
  parameters: { chromatic: { disableSnapshot: true } },
};
