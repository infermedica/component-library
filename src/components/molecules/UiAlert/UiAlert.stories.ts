import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { UiAlert } from '@/../index';
import { withVariants } from '@sb/decorators';
import { useArgTypes } from '@sb/helpers';
import { content } from '@sb/helpers/argTypes/index.js';

// FIXME: handle CSS Var without default value
const { argTypes } = useArgTypes(UiAlert, { variables: { regexp: /^(\.ui-alert|\.ui-alert__icon|\.ui-alert__message)$/ } });

const meta = {
  title: 'Molecules/Alert',
  component: UiAlert,
  args: {
    content: 'Select one answer',
    type: 'error',
    hasIcon: true,
  },
  argTypes: {
    ...argTypes,
    content,
    type: {
      control: 'select',
      options: [
        'default',
        'success',
        'info',
        'warning',
        'error',
      ],
    },
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
      viewports: [
        320,
        1200,
      ],
    },
    docs: { source: { code: null } },
  },
} satisfies Meta<typeof UiAlert>;
export default meta;
type Story = StoryObj<typeof UiAlert>;

export const Basic: Story = {
  render: () => ({
    components: { UiAlert },
    setup(props, { attrs }) {
      const {
        content, ...args
      } = attrs;
      return {
        content,
        args,
      };
    },
    template: `<UiAlert v-bind="args">
      {{ content }}
    </UiAlert>`,
  }),
};
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiAlert
   :type="type"
   :has-icon="hasIcon"
  >{{ content }}</UiAlert>
</template>

<script setup lang="ts">
import { UiAlert } from '@infermedica/component-library';

const type = 'error';
const hasIcon = true;
const iconAlertAttrs = { 
  'data-testid': 'icon-alert',
}
const textMessageAttrs = {
  'data-testid': 'text-message',
}
</script>`,
    },
  },
};

export const Variants: Story = { ...Basic };
Variants.decorators = [ withVariants ];
Variants.parameters = {
  variants: meta.argTypes.type.options
    .map((option) => ({
      label: option,
      type: option,
    })),
};

export const WithIconSlot: Story = { ...Basic };

export const WithMessageSlot: Story = { ...Basic };
