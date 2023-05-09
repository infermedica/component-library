import { withVariants } from '@sb/decorators';
import { content as contentArgTypes } from '@sb/helpers/argTypes';
import { useArgTypes } from '@sb/helpers';
import {
  UiAlert,
  UiIcon,
  UiText,
} from '@index';
import type { AlertProps } from '@index';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';

type AlertArgsType = AlertProps & {
  content?: string;
  modifiers?: string[];
}
type AlertMetaType = Meta<AlertArgsType>;
type AlertStoryType = StoryObj<AlertArgsType>;
const { argTypes } = useArgTypes(UiAlert);

const meta = {
  title: 'Molecules/Alert',
  component: UiAlert,
  args: {
    content: 'Please select one answer',
    type: 'error',
    hasIcon: true,
    iconAlertAttrs: { 'data-testid': 'icon-element' },
    textMessageAttrs: { 'data-testid': 'text-element' },
  },
  argTypes: {
    ...argTypes,
    content: contentArgTypes,
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
    iconAlertAttrs: { table: { subcategory: 'Attrs props' } },
    textMessageAttrs: { table: { subcategory: 'Attrs props' } },
  },
  parameters: {
    cssProperties: {
      '--alert-gap': 'var(--space-4)',
      '--alert-vertical-align': 'top',
      '--alert-icon-color': 'var(--color-icon-error)',
      '--alert-color': 'var(--color-text-error)',
    },
  },
} satisfies AlertMetaType;
export default meta;

export const Basic: AlertStoryType = {
  render: () => ({
    components: { UiAlert },
    setup(props, { attrs }) {
      const {
        content, ...args
      } = attrs;
      return {
        content,
        ...args,
      };
    },
    template: `<UiAlert v-bind="args">
      {{ content }}
    </UiAlert>`,
  }),
};
Basic.args = { type: 'error' };
Basic.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiAlert
    :type="type"
    :hasIcon="hasIcon"
    :iconAlertAttrs="iconAlertAttrs"
    :textMessageAttrs="textMessageAttrs"
  >
    {{ content }}
  </UiAlert>
</template>

<script setup lang="ts">
import { UiAlert } from '@infermedica/component-library';

const content = 'Please select one answer';
const type = 'error';
const hasIcon = true;
const iconAlertAttrs = { 'data-testid': 'icon-element' };
const textMessageAttrs = { 'data-testid': 'text-element' };
</script>"`,
    },
  },
};

export const Types: AlertStoryType = { ...Basic };
Types.decorators = [ withVariants ];
Types.parameters = {
  docs: { source: { code: null } },
  variants: [ ...[
    'error',
    'success',
    'info',
    'warning',
  ].map((variant) => ({
    label: variant,
    type: variant,
  })) ],
};

export const WithoutIcon: AlertStoryType = { ...Basic };
WithoutIcon.args = { hasIcon: false };
WithoutIcon.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiAlert
    :type="type"
    :hasIcon="hasIcon"
    :iconAlertAttrs="iconAlertAttrs"
    :textMessageAttrs="textMessageAttrs"
  >
    {{ content }}
  </UiAlert>
</template>

<script setup lang="ts">
import { UiAlert } from '@infermedica/component-library';

const content = 'Please select one answer';
const type = 'error';
const hasIcon = false;
const iconAlertAttrs = { 'data-testid': 'icon-element' };
const textMessageAttrs = { 'data-testid': 'text-element' };
</script>"`,
    },
  },
};

export const WithIconSlot: AlertStoryType = {
  render: () => ({
    components: {
      UiAlert,
      UiIcon,
    },
    setup(props, { attrs }) {
      const {
        content, ...args
      } = attrs;
      return {
        content,
        ...args,
      };
    },
    template: `<UiAlert
      v-bind="args"
    >
      <template #icon="{ iconAlertAttrs }">
        <UiIcon
          v-if="iconAlertAttrs.icon"
          v-bind="iconAlertAttrs"
          class="ui-alert__icon"
        />
      </template>
      {{ content }}
    </UiAlert>`,
  }),
};
WithIconSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiAlert
    :type="type"
    :hasIcon="hasIcon"
    :iconAlertAttrs="iconAlertAttrs"
    :textMessageAttrs="textMessageAttrs"
  >
    <template #icon="{ iconAlertAttrs }">
      <UiIcon
        v-if="iconAlertAttrs.icon"
        v-bind="iconAlertAttrs"
        class="ui-alert__icon"
      />
    </template>
    {{ content }}
  </UiAlert>
</template>

<script setup lang="ts">
import { UiAlert, UiIcon } from '@infermedica/component-library';

const content = 'Please select one answer';
const type = 'error';
const hasIcon = true;
const iconAlertAttrs = { 'data-testid': 'icon-element' };
const textMessageAttrs = { 'data-testid': 'text-element' };
</script>"`,
    },
  },
};

export const WithMessageSlot: AlertStoryType = {
  render: () => ({
    components: {
      UiAlert,
      UiText,
    },
    setup(props, { attrs }) {
      const {
        content, ...args
      } = attrs;
      return {
        content,
        ...args,
      };
    },
    template: `<UiAlert
      v-bind="args"
    >
      <template #message="{ textMessageAttrs }">
        <UiText
          v-bind="textMessageAttrs"
          class="ui-text--body-2-comfortable ui-alert__message"
        >
          {{ content }}
        </UiText>
      </template>
    </UiAlert>`,
  }),
};
WithMessageSlot.parameters = {
  docs: {
    source: {
      code: `<template></template>
  <UiAlert
    :type="type"
    :hasIcon="hasIcon"
    :iconAlertAttrs="iconAlertAttrs"
    :textMessageAttrs="textMessageAttrs"
  >
    <template #message="{ textMessageAttrs }">
      <UiText
        v-bind="textMessageAttrs"
        class="ui-text--body-2-comfortable ui-alert__message"
      >
        {{ content }}
      </UiText>
    </template>
    {{ content }}
  </UiAlert>
</template>

<script setup lang="ts">
import { UiAlert, UiText } from '@infermedica/component-library';

const content = 'Please select one answer';
const type = 'error';
const hasIcon = true;
const iconAlertAttrs = { 'data-testid': 'icon-element' };
const textMessageAttrs = { 'data-testid': 'text-element' };
</script>"`,
    },
  },
};
