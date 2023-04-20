import {
  withVariants,
  withModelValue,
} from '@sb/decorators';
import { content as contentArgTypes } from '@sb/helpers/argTypes';
import { useArgTypes } from '@sb/helpers';
import {
  getCSSValue,
  getStyleTests,
  getFocusTests,
} from '@tests/interactions/helpers';
import {
  UiIcon,
  UiCheckbox,
  UiText,
  UiList,
} from '@index';
import type { CheckboxProps } from '@index';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import {
  userEvent,
  within,
} from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { PlayFunctionContext } from '@storybook/types';
import type {
  Meta,
  StoryObj,
  VueRenderer,
} from '@storybook/vue3';

type CheckboxArgsType = CheckboxProps & {
  content?: string;
  modifiers?: string[];
  items?: Required<CheckboxProps['value']>[];
}
type CheckboxMetaType = Meta<CheckboxArgsType>;
type CheckboxStoryType = StoryObj<CheckboxArgsType>;
type PlayContext = PlayFunctionContext<VueRenderer, CheckboxArgsType>;

export const stringItemsData = [
  'Russia, Kazakhstan or Mongolia',
  'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
  'Europe',
];
export const complexItemsData = [
  {
    label: 'Russia, Kazakhstan or Mongolia',
    id: 'as-group-with-object-north-asia',
  },
  {
    label: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
    id: 'as-group-with-object-south-asia',
  },
  {
    label: 'Europe',
    id: 'as-group-with-object-europe',
  },
];
const getStatesTests = async ({
  canvasElement, step,
}: PlayContext, results: Partial<CSSStyleDeclaration>[]) => {
  const checkboxes = [ ...canvasElement.querySelectorAll('.ui-checkbox__checkbox') ];
  const labels = [ ...canvasElement.querySelectorAll('.ui-checkbox__label') ];
  await step('Correct border colors', () => {
    getStyleTests(checkboxes, 'borderColor', results, ':after');
  });
  await step('Correct background colors', () => {
    getStyleTests(checkboxes, 'backgroundColor', results);
  });
  await getFocusTests(step, [
    checkboxes[3],
    checkboxes[7],
  ]);
  await step('Correct Label color', () => {
    getStyleTests(labels, 'color', results);
  });
};
const getToggleTest = async (step: PlayContext['step'], index: number) => {
  const input = [ ...document.querySelectorAll('input') ][index];
  const expected = !input.checked;
  await step(`toggle checkbox - ${index + 1}`, async () => {
    await userEvent.click(input);
    expect(input.checked).toBe(expected);
  });
};
const { argTypes } = useArgTypes(UiCheckbox, { variables: { regexp: /^(\.ui-checkbox|\.ui-checkbox__checkbox)$/ } });
const meta = {
  title: 'Atoms/Checkbox',
  component: UiCheckbox,
  excludeStories: /.*(Type|Data)$/,
  args: {
    modelValue: false,
    content: 'I read and accept Terms of Service and Privacy Policy.',
    modifiers: [],
    value: '',
    id: '',
    disabled: false,
    inputAttrs: { 'data-testid': 'input-element' },
    iconCheckmarkAttrs: { 'data-testid': 'icon-checkmark' },
    textLabelAttrs: { 'data-testid': 'text-label' },
  },
  argTypes: {
    ...argTypes,
    modelValue: { control: 'boolean' },
    contentArgTypes,
  },
  parameters: {
    cssProperties: {
      '--checkbox-gap': 'var(--space-12)',
      '--checkbox-hover-border-block-color':
        'var(--checkbox-hover-border-block-start-color, var(--color-border-error-strong-hover)) var(--checkbox-hover-border-block-end-color, var(--color-border-error-strong-hover))',
      '--checkbox-hover-border-inline-color':
        'var(--checkbox-hover-border-inline-start-color, var(--color-border-error-strong-hover)) var(--checkbox-hover-border-inline-end-color, var(--color-border-error-strong-hover))',
      '--checkbox-checked-hover-background': 'var(--color-border-error-strong-hover)',
      '--checkbox-checked-hover-border-color': 'var(--color-selectioncontrols-selection-hover)',
      '--checkbox-active-border-block-color':
        'var(--checkbox-active-border-block-start-color, var(--color-border-strong-active)) var(--checkbox-active-border-block-end-color, var(--color-border-strong-active))',
      '--checkbox-active-border-inline-color':
        'var(--checkbox-active-border-inline-start-color, var(--color-border-strong-active)) var(--checkbox-active-border-inline-end-color, var(--color-border-strong-active))',
      '--checkbox-checked-active-background': 'var(--color-border-error-strong-active)',
      '--checkbox-checked-active-border-block-color':
        'var(--checkbox-checked-active-border-block-start-color, var(--color-border-error-strong-active)) var(--checkbox-checked-active-border-block-end-color, var(--color-border-error-strong-active))',
      '--checkbox-checked-active-border-inline-color':
        'var(--checkbox-checked-active-border-inline-start-color, var(--color-border-error-strong-active)) var(--checkbox-checked-active-border-inline-end-color, var(--color-border-error-strong-active))',
      '--checkbox-border-start-start-radius': 'var(--border-radius-form)',
      '--checkbox-border-start-end-radius': 'var(--border-radius-form)',
      '--checkbox-border-end-start-radius': 'var(--border-radius-form)',
      '--checkbox-border-end-end-radius': 'var(--border-radius-form)',
      '--checkbox-transition': 'border-color 150ms ease-in-out, background-color 150ms ease-in-out',
      '--checkbox-checkbox-margin-block':
        'var(--checkbox-checkbox-margin-block-start, var(--space-2)) var(--checkbox-checkbox-margin-block-end, var(--space-2))',
      '--checkbox-checkbox-margin-inline':
        'var(--checkbox-checkbox-margin-inline-start, var(--space-2)) var(--checkbox-checkbox-margin-inline-end, var(--space-2))',
      '--checkbox-size': '1.25rem',
      '--checkbox-background': 'var(--color-background-white)',
      '--checkbox-border-block':
        'var(--checkbox-border-block-start, var(--checkbox-border)) var(--checkbox-border-block-end, var(--checkbox-border))',
      '--checkbox-border-inline':
        'var(--checkbox-border-inline-start, var(--checkbox-border)) var(--checkbox-border-inline-end, var(--checkbox-border))',
      '--checkbox-border-block-style':
        'var(--checkbox-border-block-start-style, solid) var(--checkbox-border-block-end-style, solid)',
      '--checkbox-border-inline-style':
        'var(--checkbox-border-inline-start-style, solid) var(--checkbox-border-inline-end-style, solid)',
      '--checkbox-border-block-color':
        'var(--checkbox-border-block-start-color, var(--color-border-error-strong)) var(--checkbox-border-block-end-color, var(--color-border-error-strong))',
      '--checkbox-border-inline-color':
        'var(--checkbox-border-inline-start-color, var(--color-border-error-strong)) var(--checkbox-border-inline-end-color, var(--color-border-error-strong))',
      '--checkbox-border-block-width':
        'var(--checkbox-border-block-start-width, 2px) var(--checkbox-border-block-end-width, 2px)',
      '--checkbox-border-inline-width':
        'var(--checkbox-border-inline-start-width, 2px) var(--checkbox-border-inline-end-width, 2px)',
      '--checkbox-checked-background': 'var(--color-border-error-strong)',
      '--checkbox-checked-border-block-color':
        'var(--checkbox-checked-border-block-start-color, var(--color-border-error-strong)) var(--checkbox-checked-border-block-end-color, var(--color-border-error-strong))',
      '--checkbox-checked-border-inline-color':
        'var(--checkbox-checked-border-inline-start-color, var(--color-border-error-strong)) var(--checkbox-checked-border-inline-end-color, var(--color-border-error-strong))',
      '--checkbox-checked-checkmark-color': 'var(--color-text-on-selection)',
      '--checkbox-checkmark-size': '1rem',
      '--checkbox-checkmark-color': 'transparent',
      '--checkbox-label-margin': '0 0 0 var(--space-12)',
      '--checkbox-label-color': 'var(--color-text-disabled)',
      '--checkbox-checked-hover-border-block-color':
        'var(--checkbox-checked-hover-border-block-start-color, var(--color-border-error-strong-hover)) var(--checkbox-checked-hover-border-block-end-color, var(--color-border-error-strong-hover))',
      '--checkbox-checked-hover-border-inline-color':
        'var(--checkbox-checked-hover-border-inline-start-color, var(--color-border-error-strong-hover)) var(--checkbox-checked-hover-border-inline-end-color, var(--color-border-error-strong-hover))',
    },
    chromatic: { disableSnapshot: false },
  },
  decorators: [ withModelValue ],
} satisfies CheckboxMetaType;
export default meta;

export const Basic: CheckboxStoryType = {
  render: () => ({
    components: { UiCheckbox },
    setup(props, { attrs }) {
      const {
        content, modifiers, ...args
      } = attrs;
      return {
        content,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiCheckbox
      v-bind="args"
    >
      {{ content }}
    </UiCheckbox>`,
  }),
};
Basic.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiCheckbox
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :input-attrs="inputAttrs"
    :icon-checkmark-attrs="iconCheckmarkAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
  >
    {{ content }}
  </UiCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiCheckbox } from '@infermedica/component-library';

const modelValue = ref(false);
const value = '';
const id = '';
const disabled = false;
const inputAttrs = {
  'data-testid': 'input-element'
};
const iconCheckmarkAttrs = {
  'data-testid': 'icon-checkmark'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
const modifiers = [];
const content = 'I read and accept Terms of Service and Privacy Policy.';
</script>"`,
    },
  },
};

export const BasicVariants: CheckboxStoryType = { ...Basic };
BasicVariants.argTypes = {
  modelValue: { control: false },
  value: { control: false },
  disabled: { control: false },
  modifiers: { control: false },
  id: { control: false },
  inputAttrs: { control: false },
  iconCheckmarkAttrs: { control: false },
  textLabelAttrs: { control: false },
};
BasicVariants.decorators = [ withVariants ];
BasicVariants.parameters = {
  docs: { source: { code: null } },
  variants: [
    {
      label: 'default',
      modelValue: false,
    },
    ...[
      'hover',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
      modelValue: false,
    })),
    {
      label: 'focus',
      class: 'pseudo-focus-within',
      modelValue: false,
    },
    {
      label: 'checked default',
      modelValue: true,
    },
    ...[
      'hover',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
      modelValue: true,
    })),
    {
      label: 'checked focus',
      class: 'pseudo-focus-within',
      modelValue: true,
    },
  ],
};
BasicVariants.play = async (context) => getStatesTests(context, [
  ...[
    '',
    '-hover',
    '-active',
  ].map((state) => ({ borderColor: getCSSValue(`--color-border-strong${state}`) })),
  { borderColor: getCSSValue('--color-border-strong') },
  ...[
    '',
    '-hover',
    '-active',
    '',
  ].map((state) => ({
    borderColor: getCSSValue(`--color-selectioncontrols-selection${state}`),
    backgroundColor: getCSSValue(`--color-selectioncontrols-selection${state}`),
  })),
].map((result) => ({
  backgroundColor: getCSSValue('--color-background-white'),
  color: getCSSValue('--color-text-body'),
  ...result,
})));

export const DisabledVariants: CheckboxStoryType = { ...BasicVariants };
DisabledVariants.parameters = {
  docs: { source: { code: null } },
  variants: BasicVariants.parameters.variants.map(
    (variant: Record<string, unknown>) => ({
      ...variant,
      class: `ui-checkbox--is-disabled ${variant.class}`,
    }),
  ),
};
DisabledVariants.play = async (context) => getStatesTests(context, [
  ...Array(4).fill({}),
  ...Array(4).fill({ backgroundColor: getCSSValue('--color-icon-disabled') }),
].map((result) => ({
  backgroundColor: getCSSValue('--color-background-white'),
  borderColor: getCSSValue('--color-icon-disabled'),
  color: getCSSValue('--color-text-disabled'),
  ...result,
})));

export const ErrorVariants: CheckboxStoryType = { ...BasicVariants };
ErrorVariants.parameters = {
  docs: { source: { code: null } },
  variants: BasicVariants.parameters.variants.map(
    (variant: Record<string, unknown>) => ({
      ...variant,
      class: `ui-checkbox--has-error ${variant.class}`,
    }),
  ),
};
ErrorVariants.play = async (context) => getStatesTests(context, [
  ...[
    '',
    '-hover',
    '-active',
    '',
  ].map((state) => ({ borderColor: getCSSValue(`--color-border-error-strong${state}`) })),
  ...[
    '',
    '-hover',
    '-active',
    '',
  ].map((state) => ({
    borderColor: getCSSValue(`--color-border-error-strong${state}`),
    backgroundColor: getCSSValue(`--color-border-error-strong${state}`),
  })),
].map((result) => ({
  backgroundColor: getCSSValue('--color-background-white'),
  color: getCSSValue('--color-text-body'),
  ...result,
})));

export const WithStringValue: CheckboxStoryType = { ...Basic };
WithStringValue.args = { value: 'I read and accept Terms of Service and Privacy Policy.' };
WithStringValue.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiCheckbox
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :input-attrs="inputAttrs"
    :icon-checkmark-attrs="iconCheckmarkAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
  >
    {{ content }}
  </UiCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiCheckbox } from '@infermedica/component-library';

const modelValue = ref(false);
const value = 'I read and accept Terms of Service and Privacy Policy.';
const id = '';
const disabled = false;
const inputAttrs = {
  'data-testid': 'input-element'
};
const iconCheckmarkAttrs = {
  'data-testid': 'icon-checkmark'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
const modifiers = [];
const content = 'I read and accept Terms of Service and Privacy Policy.';
</script>"`,
    },
  },
};
WithStringValue.play = async ({ step }) => {
  await getToggleTest(step, 0);
};

export const WithObjectValue: CheckboxStoryType = { ...Basic };
WithObjectValue.args = {
  value: {
    label: 'Europe',
    id: 'value-as-object-europe',
  },
};
WithObjectValue.argTypes = { value: { control: 'object' } };
WithObjectValue.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiCheckbox
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :input-attrs="inputAttrs"
    :icon-checkmark-attrs="iconCheckmarkAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
  >
    {{ content }}
  </UiCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiCheckbox } from '@infermedica/component-library';

const modelValue = ref(false);
const value = {
  label: 'Europe',
  id: 'value-as-object-europe',
};
const id = '';
const disabled = false;
const inputAttrs = {
  'data-testid': 'input-element'
};
const iconCheckmarkAttrs = {
  'data-testid': 'icon-checkmark'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
const modifiers = [];
const content = 'I read and accept Terms of Service and Privacy Policy.';
</script>"`,
    },
  },
};
WithObjectValue.play = async ({ step }) => {
  await getToggleTest(step, 0);
};

const AsGroupTemplate: CheckboxStoryType = {
  render: () => ({
    components: {
      UiCheckbox,
      UiList,
      UiListItem,
    },
    setup(props, {
      attrs: {
        items,
        modifiers,
        ...args
      },
    }) {
      return {
        UiCheckbox,
        items,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiList>
      <UiListItem
        v-for="(item, key) in items"
        v-bind="args"
        :tag="UiCheckbox"
        :value="item"
      >
        {{ item.label || item}}
      </UiListItem>
    </UiList>`,
  }),
};
AsGroupTemplate.argTypes = {
  modelValue: { control: 'array' },
  items: {
    table: { category: 'stories controls' },
    control: 'object',
  },
  id: { control: false },
  value: { control: false },
  content: { control: false },
};
AsGroupTemplate.play = async ({ step }) => {
  await getToggleTest(step, 0);
  await getToggleTest(step, 1);
  await getToggleTest(step, 2);
};

export const AsGroupWithStringValue: CheckboxStoryType = { ...AsGroupTemplate };
AsGroupWithStringValue.args = {
  ...meta.args,
  modelValue: [],
  items: stringItemsData,
};
AsGroupWithStringValue.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiList>
    <UiListItem
      v-for="(item, key) in items"
      :key="key"
      v-model="modelValue"
      :input-attrs="inputAttrs"
      :icon-checkmark-attrs="iconCheckmarkAttrs"
      :text-label-attrs="textLabelAttrs"
      :tag="UiCheckbox"
      :value="item"
    >
      {{ item }}
    </UiListItem>
  </UiList>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  UiCheckbox,
  UiList,
} from '@infermedica/component-library';
import UiListItem from '@infermedica/component-library/components/organisms/UiList/_internal/UiListItem.vue';

const modelValue = ref([]);
const disabled = false;
const inputAttrs = {
  'data-testid': 'input-element'
};
const iconCheckmarkAttrs = {
  'data-testid': 'icon-checkmark'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
const modifiers = [];
const items = ${JSON.stringify(stringItemsData)}
</script>"`,
    },
  },
};

export const AsGroupWithObjectValue: CheckboxStoryType = { ...AsGroupTemplate };
AsGroupWithObjectValue.args = {
  modelValue: [],
  items: complexItemsData,
};
AsGroupWithObjectValue.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiList>
    <UiListItem
      v-for="(item, key) in items"
      :key="key"
      v-model="modelValue"
      :input-attrs="inputAttrs"
      :icon-checkmark-attrs="iconCheckmarkAttrs"
      :text-label-attrs="textLabelAttrs"
      :tag="UiCheckbox"
      :value="item"
    >
      {{ item.label }}
    </UiListItem>
  </UiList>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  UiCheckbox,
  UiList,
} from '@infermedica/component-library';
import UiListItem from '@infermedica/component-library/components/organisms/UiList/_internal/UiListItem.vue';

const modelValue = ref([]);
const disabled = false;
const inputAttrs = {
  'data-testid': 'input-element'
};
const iconCheckmarkAttrs = {
  'data-testid': 'icon-checkmark'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
const modifiers = [];
const items = ${JSON.stringify(complexItemsData)}
</script>"`,
    },
  },
};

export const WithCheckboxSlot: CheckboxStoryType = {
  render: () => ({
    components: {
      UiCheckbox,
      UiIcon,
    },
    setup(props, {
      attrs: {
        content,
        modifiers,
        ...args
      },
    }) {
      return {
        content,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiCheckbox v-bind="args">
      <template #checkbox="{
        checked,
        iconCheckmarkAttrs
      }">
        <div
          :class="[
            'ui-checkbox__checkbox',
            { 'ui-checkbox__checkbox--is-checked': checked },
          ]"
        >
          <UiIcon
            v-bind="iconCheckmarkAttrs"
            class="ui-checkbox__checkmark"
          />
        </div>
      </template>
      {{ content }}
    </UiCheckbox>`,
  }),
};
WithCheckboxSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiCheckbox
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :input-attrs="inputAttrs"
    :icon-checkmark-attrs="iconCheckmarkAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
  >
    <template #checkbox="{
      checked,
      iconCheckmarkAttrs
    }">
      <div
        :class="[
          'ui-checkbox__checkbox',
          { 'ui-checkbox__checkbox--is-checked': checked },
        ]"
      >
        <UiIcon
          v-bind="iconCheckmarkAttrs"
          class="ui-checkbox__checkmark"
        />
      </div>
    </template>
    {{ content }}
  </UiCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiCheckbox } from '@infermedica/component-library';

const modelValue = ref(false);
const value = '';
const id = '';
const disabled = false;
const inputAttrs = {
  'data-testid': 'input-element'
};
const iconCheckmarkAttrs = {
  'data-testid': 'icon-checkmark'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
const modifiers = [];
const content = 'I read and accept Terms of Service and Privacy Policy.';
</script>"`,
    },
  },
};

export const WithCheckmarkSlot: CheckboxStoryType = {
  render: () => ({
    components: {
      UiCheckbox,
      UiIcon,
    },
    setup(props, {
      attrs: {
        content,
        modifiers,
        ...args
      },
    }) {
      return {
        content,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiCheckbox v-bind="args">
      <template
        #checkmark="{ iconCheckmarkAttrs }"
      >
        <UiIcon
          v-bind="iconCheckmarkAttrs"
          class="ui-checkbox__checkmark"
        />
      </template>
      {{ content }}
    </UiCheckbox>`,
  }),
};
WithCheckmarkSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiCheckbox
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :input-attrs="inputAttrs"
    :icon-checkmark-attrs="iconCheckmarkAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
  >
    <template
      #checkmark="{ iconCheckmarkAttrs }"
    >
      <UiIcon
        v-bind="iconCheckmarkAttrs"
        class="ui-checkbox__checkmark"
      />
    </template>
    {{ content }}
  </UiCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiCheckbox } from '@infermedica/component-library';

const modelValue = ref(false);
const value = '';
const id = '';
const disabled = false;
const inputAttrs = {
  'data-testid': 'input-element'
};
const iconCheckmarkAttrs = {
  'data-testid': 'icon-checkmark'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
const modifiers = [];
const content = 'I read and accept Terms of Service and Privacy Policy.';
</script>"`,
    },
  },
};

export const WithLabelSlot: CheckboxStoryType = {
  render: () => ({
    components: {
      UiCheckbox,
      UiText,
    },
    setup(props, {
      attrs: {
        content,
        modifiers,
        ...args
      },
    }) {
      return {
        content,
        args: {
          ...args,
          class: modifiers,
        },
      };
    },
    template: `<UiCheckbox v-bind="args">
      <template #label="{
        hasLabel,
        textLabelAttrs,
      }">
        <UiText
          v-bind="textLabelAttrs"
          class="ui-checkbox__label"
        >
          {{ content }}
        </UiText>
      </template>
    </UiCheckbox>`,
  }),
};
WithLabelSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiCheckbox
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :input-attrs="inputAttrs"
    :icon-checkmark-attrs="iconCheckmarkAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
  >
    <template #label="{
      hasLabel,
      textLabelAttrs,
    }">
      <UiText
        v-bind="textLabelAttrs"
        class="ui-checkbox__label"
      >
        {{ content }}
      </UiText>
    </template>
  </UiCheckbox>>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiCheckbox } from '@infermedica/component-library';

const modelValue = ref(false);
const value = '';
const id = '';
const disabled = false;
const inputAttrs = {
  'data-testid': 'input-element'
};
const iconCheckmarkAttrs = {
  'data-testid': 'icon-checkmark'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
const modifiers = [];
const content = 'I read and accept Terms of Service and Privacy Policy.';
</script>"`,
    },
  },
};
