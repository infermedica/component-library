import {
  withVariants,
  withModelValue,
} from '@sb/decorators';
import {
  UiText,
  UiRadio,
  UiList,
} from '@index';
import {
  getCSSValue,
  getStyleTests,
  getFocusTests,
} from '@tests/interactions/helpers';
import {
  content,
} from '@sb/helpers/argTypes';
import type { PlayFunctionContext } from '@storybook/types';
import { useArgTypes } from '@sb/helpers';
import type { RadioProps } from '@index';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import type {
  Meta,
  StoryObj,
  VueRenderer,
} from '@storybook/vue3';

type RadioArgsType = RadioProps & {
  content?: string;
  modifiers?: string[];
  items?: Required<RadioProps['value']>[];
}
type RadioMetaType = Meta<RadioArgsType>;
type RadioStoryType = StoryObj<RadioArgsType>;
type PlayContext = PlayFunctionContext<VueRenderer, RadioArgsType>;

const getStatesTests = async ({
  canvasElement, step,
}: PlayContext, results: Partial<CSSStyleDeclaration>[]) => {
  const radioElements = [ ...canvasElement.querySelectorAll('.ui-radio__radio') ];
  const markElements = [ ...canvasElement.querySelectorAll('.ui-radio__mark') ];
  const labels = [ ...canvasElement.querySelectorAll('.ui-radio__label') ];
  await step('Correct border colors', () => {
    getStyleTests(radioElements, 'borderColor', results, ':after');
  });
  await step('Correct background colors', () => {
    getStyleTests(markElements, 'backgroundColor', results);
  });
  await getFocusTests(step, [
    radioElements[3],
    radioElements[7],
  ]);
  await step('Correct Label color', () => {
    getStyleTests(labels, 'color', results);
  });
};

const stringItemsData = [
  'I’m overweight or obese',
  'I have hypertension',
  'I have smoked cigarettes for at least 10 years',
];
const complexItemsData = [
  {
    label: 'I’m overweight or obese',
    id: 'as-group-with-object-overweight-or-obese',
  },
  {
    label: 'I have hypertension',
    id: 'as-group-with-object-hypertension',
  },
  {
    label: 'I have smoked cigarettes for at least 10 years',
    id: 'as-group-with-object-smoked-cigarettes',
  },
];

const { argTypes } = useArgTypes(UiRadio, { variables: { regexp: /^(\.ui-radio|\.ui-radio__radio)$/ } });
export default {
  title: 'Atoms/Radio',
  component: UiRadio,
  excludeStories: /.*(Type|Data)$/,
  args: {
    modelValue: '',
    content: 'I’m overweight or obese',
    modifiers: [],
    value: 'overweight-or-obese',
    id: '',
    disabled: false,
    inputAttrs: { 'data-testid': 'input-element' },
    radioElementAttrs: { 'data-testid': 'radio-element' },
    textLabelAttrs: { 'data-testid': 'text-label' },
  },
  argTypes: {
    ...argTypes,
    modelValue: { control: 'text' },
    content,
    value: { control: 'text' },
  },
  parameters: {
    cssProperties: {
      '--radio-gap': 'var(--space-12)',
      '--radio-hover-border-block-color':
        'var(--radio-hover-border-block-start-color, var(--color-border-strong-hover)) var(--radio-hover-border-block-end-color, var(--color-border-strong-hover))',
      '--radio-hover-border-inline-color':
        'var(--radio-hover-border-inline-start-color, var(--color-border-strong-hover)) var(--radio-hover-border-inline-end-color, var(--color-border-strong-hover))',
      '--radio-checked-hover-border-block-color':
        'var(--radio-checked-hover-border-block-start-color, var(--color-selectioncontrols-selection-hover)) var(--radio-checked-hover-border-block-end-color, var(--color-selectioncontrols-selection-hover))',
      '--radio-checked-hover-border-inline-color':
        'var(--radio-checked-hover-border-inline-start-color, var(--color-selectioncontrols-selection-hover)) var(--radio-checked-hover-border-inline-end-color, var(--color-selectioncontrols-selection-hover))',
      '--radio-checked-hover-mark-color': 'var(--color-selectioncontrols-selection-hover)',
      '--radio-active-border-block-color':
        'var(--radio-active-border-block-start-color, var(--color-border-strong-active)) var(--radio-active-border-block-end-color, var(--color-border-strong-active))',
      '--radio-active-border-inline-color':
        'var(--radio-active-border-inline-start-color, var(--color-border-strong-active)) var(--radio-active-border-inline-end-color, var(--color-border-strong-active))',
      '--radio-checked-active-border-block-color':
        'var(--radio-checked-active-border-block-start-color, var(--color-selectioncontrols-selection-active)) var(--radio-checked-active-border-block-end-color, var(--color-selectioncontrols-selection-active))',
      '--radio-checked-active-border-inline-color':
        'var(--radio-checked-active-border-inline-start-color, var(--color-selectioncontrols-selection-active)) var(--radio-checked-active-border-inline-end-color, var(--color-selectioncontrols-selection-active))',
      '--radio-checked-active-mark-color': 'var(--color-selectioncontrols-selection-active)',
      '--radio-border-start-start-radius': 'var(--border-radius-circle)',
      '--radio-border-start-end-radius': 'var(--border-radius-circle)',
      '--radio-border-end-start-radius': 'var(--border-radius-circle)',
      '--radio-border-end-end-radius': 'var(--border-radius-circle)',
      '--radio-transition': 'border-color 150ms ease-in-out, background-color 150ms ease-in-out',
      '--radio-radio-margin-block':
        'var(--radio-radio-margin-block-start, var(--space-2)) var(--radio-radio-margin-block-end, var(--space-2))',
      '--radio-radio-margin-inline':
        'var(--radio-radio-margin-inline-start, var(--space-2)) var(--radio-radio-margin-inline-end, var(--space-2))',
      '--radio-size': '1.25rem',
      '--radio-background': 'var(--color-background-white)',
      '--radio-border-block':
        'var(--radio-border-block-start, var(--radio-border)) var(--radio-border-block-end, var(--radio-border))',
      '--radio-border-inline':
        'var(--radio-border-inline-start, var(--radio-border)) var(--radio-border-inline-end, var(--radio-border))',
      '--radio-border-block-style':
        'var(--radio-border-block-start-style, solid) var(--radio-border-block-end-style, solid)',
      '--radio-border-inline-style':
        'var(--radio-border-inline-start-style, solid) var(--radio-border-inline-end-style, solid)',
      '--radio-border-block-color':
        'var(--radio-border-block-start-color, var(--color-border-strong)) var(--radio-border-block-end-color, var(--color-border-strong))',
      '--radio-border-inline-color':
        'var(--radio-border-inline-start-color, var(--color-border-strong)) var(--radio-border-inline-end-color, var(--color-border-strong))',
      '--radio-border-block-width':
        'var(--radio-border-block-start-width, 2px) var(--radio-border-block-end-width, 2px)',
      '--radio-border-inline-width':
        'var(--radio-border-inline-start-width, 2px) var(--radio-border-inline-end-width, 2px)',
      '--radio-checked-border-block-color':
        'var(--radio-checked-border-block-start-color, var(--color-border-error-strong)) var(--radio-checked-border-block-end-color, var(--color-border-error-strong))',
      '--radio-checked-border-inline-color':
        'var(--radio-checked-border-inline-start-color, var(--color-border-error-strong)) var(--radio-checked-border-inline-end-color, var(--color-border-error-strong))',
      '--radio-checked-mark-color': 'var(--color-border-error-strong)',
      '--radio-mark-size': '0.625rem',
      '--radio-mark-color': 'transparent',
      '--radio-label-margin': '0 0 0 var(--space-12)',
      '--radio-label-color': 'var(--color-text-disabled)',
    },
  },
  decorators: [ withModelValue ],
} satisfies RadioMetaType;

export const Basic: RadioStoryType = {
  render: () => ({
    components: { UiRadio },
    setup(props, { attrs }) {
      return { ...attrs };
    },
    template: `<UiRadio
      v-bind="$attrs"
    >
      {{ content }}
    </UiRadio>`,
  }),
};
Basic.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiRadio
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :input-attrs="inputAttrs"
    :radio-element-attrs="radioElementAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
  >
    {{ content }}
  </UiRadio>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiRadio } from '@infermedica/component-library';

const modelValue = ref('');
const value = 'overweight-or-obese';
const id = '';
const disabled = false;
const inputAttrs = {
  'data-testid': 'input-element'
};
const radioElementAttrs = {
  'data-testid': 'radio-element'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
const modifiers = [];
const content = 'I’m overweight or obese';
</script>"`,
    },
  },
};

export const BasicVariants: RadioStoryType = { ...Basic };
BasicVariants.argTypes = {
  modelValue: { control: false },
  value: { control: false },
  disabled: { control: false },
  modifiers: { control: false },
  id: { control: false },
  inputAttrs: { control: false },
  textLabelAttrs: { control: false },
};
BasicVariants.decorators = [ withVariants ];
BasicVariants.parameters = {
  docs: { source: { code: null } },
  variants: [
    {
      label: 'default',
      modelValue: '',
    },
    ...[
      'hover',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
      modelValue: '',
    })),
    {
      label: 'focus',
      class: 'pseudo-focus-within',
      modelValue: '',
    },
    {
      label: 'checked default',
      modelValue: 'overweight-or-obese',
    },
    ...[
      'hover',
      'active',
    ].map((variant) => ({
      label: `${variant}`,
      class: `pseudo-${variant}`,
      modelValue: 'overweight-or-obese',
    })),
    {
      label: 'checked focus',
      class: 'pseudo-focus-within',
      modelValue: 'overweight-or-obese',
    },
  ],
};
BasicVariants.play = async (context) => getStatesTests(context, [
  ...[
    '',
    '-hover',
    '-active',
    '',
  ].map((state) => ({ borderColor: getCSSValue(`--color-border-strong${state}`) })),
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
  backgroundColor: getCSSValue('transparent'),
  color: getCSSValue('--color-text-body'),
  ...result,
})));

export const DisabledVariants: RadioStoryType = { ...BasicVariants };
DisabledVariants.parameters = {
  docs: { source: { code: null } },
  variants: BasicVariants.parameters.variants.map(
    (variant: Record<string, unknown>) => ({
      ...variant,
      class: `ui-radio--is-disabled ${variant.class}`,
    }),
  ),
};
DisabledVariants.play = async (context) => getStatesTests(context, [
  ...Array(4).fill({}),
  ...Array(4).fill({ backgroundColor: getCSSValue('--color-icon-disabled') }),
].map((result) => ({
  backgroundColor: getCSSValue('transparent'),
  borderColor: getCSSValue('--color-icon-disabled'),
  color: getCSSValue('--color-text-disabled'),
  ...result,
})));

export const ErrorVariants: RadioStoryType = { ...BasicVariants };
ErrorVariants.parameters = {
  docs: { source: { code: null } },
  variants: BasicVariants.parameters.variants.map(
    (variant: Record<string, unknown>) => ({
      ...variant,
      class: `ui-radio--has-error ${variant.class}`,
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
  backgroundColor: getCSSValue('transparent'),
  color: getCSSValue('--color-text-body'),
  ...result,
})));

export const WithStringValue: RadioStoryType = { ...Basic };

export const WithObjectValue: RadioStoryType = { ...Basic };
WithObjectValue.args = {
  value: {
    label: 'I’m overweight or obese',
    id: 'value-as-object-overweight-or-obese',
  },
};
WithObjectValue.argTypes = {
  modelValue: { control: 'object' },
  value: { control: 'object' },
};
WithObjectValue.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiRadio
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :input-attrs="inputAttrs"
    :radio-element-attrs="radioElementAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
  >
    {{ content }}
  </UiRadio>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiRadio } from '@infermedica/component-library';

const modelValue = ref({});
const value = {
  label: 'I’m overweight or obese',
  id: 'value-as-object-overweight-or-obese',
};
const id = '';
const disabled = false;
const inputAttrs = {
  'data-testid': 'input-element'
};
const radioElementAttrs = {
  'data-testid': 'radio-element'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
const modifiers = [];
const content = 'I’m overweight or obese';
</script>"`,
    },
  },
};

const AsGroupTemplate: RadioStoryType = {
  render: () => ({
    components: {
      UiRadio,
      UiList,
      UiListItem,
    },
    setup(props, { attrs }) {
      return {
        ...attrs,
        UiRadio,
      };
    },
    template: `<UiList>
      <UiListItem
        v-for="(item, key) in items"
        :key="key"
        :tag="UiRadio"
        v-bind="$attrs"
        :value="item.value || item"
      >
        {{ item.label || item }}
      </UiListItem>
    </UiList>`,
  }),
};
AsGroupTemplate.argTypes = {
  items: {
    description: 'Use this control to set the values of radio group.',
    table: { category: 'stories controls' },
    control: { type: 'object' },
  },
  id: { control: false },
  value: { control: false },
  content: { control: false },
};

export const AsGroupWithStringValue: RadioStoryType = { ...AsGroupTemplate };
AsGroupWithStringValue.args = { items: stringItemsData };
AsGroupWithStringValue.argTypes = {
  ...AsGroupTemplate.argTypes,
  modelValue: { control: 'text' },
};
AsGroupWithStringValue.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiList>
    <UiListItem
      v-for="(item, key) in items"
      :key="key"
      :tag="UiRadio"
      v-model="modelValue"
      :class="modifiers"
      :value="item"
      :disabled="disabled"
      :input-attrs="inputAttrs"
      :radio-element-attrs="radioElementAttrs"
      :text-label-attrs="textLabelAttrs"
      :class="modifiers"
    >
      {{ item }}
    </UiListItem>
  </UiList>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  UiRadio,
  UiList,
} from '@infermedica/component-library';
import UiListItem from '@infermedica/component-library/components/organisms/UiList/_internal/UiListItem.vue';

const modelValue = ref('');
const disabled = false;
const inputAttrs = {
  'data-testid': 'input-element'
};
const radioElementAttrs = {
  'data-testid': 'radio-element'
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

export const AsGroupWithObjectValue = { ...AsGroupTemplate };
AsGroupWithObjectValue.args = { items: complexItemsData };
AsGroupWithObjectValue.argTypes = {
  ...AsGroupTemplate.argTypes,
  modelValue: { control: 'object' },
};
AsGroupWithObjectValue.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiList>
    <UiListItem
      v-for="(item, key) in items"
      :key="key"
      :tag="UiRadio"
      v-model="modelValue"
      :class="modifiers"
      :value="item"
      :disabled="disabled"
      :input-attrs="inputAttrs"
      :radio-element-attrs="radioElementAttrs"
      :text-label-attrs="textLabelAttrs"
      :class="modifiers"
    >
      {{ item }}
    </UiListItem>
  </UiList>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  UiRadio,
  UiList,
} from '@infermedica/component-library';
import UiListItem from '@infermedica/component-library/components/organisms/UiList/_internal/UiListItem.vue';

const modelValue = ref({});
const disabled = false;
const inputAttrs = {
  'data-testid': 'input-element'
};
const radioElementAttrs = {
  'data-testid': 'radio-element'
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

export const WithRadioSlot: RadioStoryType = {
  render: () => ({
    components: { UiRadio },
    setup(props, { attrs }) {
      return { ...attrs };
    },
    template: `<UiRadio
      v-bind="$attrs"
    >
      <template #radio="{
        checked,
        radioElementAttrs,
      }">
        <div
          v-bind="radioElementAttrs"
          :class="[
            'ui-radio__radio',
            { 'ui-radio__radio--is-checked': checked },
          ]"
        >
          <div class="ui-radio__mark" />
        </div>
      </template>
      {{ content }}
    </UiRadio>`,
  }),
};
WithRadioSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiRadio
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :input-attrs="inputAttrs"
    :radio-element-attrs="radioElementAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
  >
    <template #radio="{
      checked,
      radioElementAttrs,
    }">
      <div
        v-bind="radioElementAttrs"
        :class="[
          'ui-radio__radio',
          { 'ui-radio__radio--is-checked': checked },
        ]"
      >
        <div class="ui-radio__mark" />
      </div>
    </template>
    {{ content }}
  </UiRadio>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiRadio } from '@infermedica/component-library';

const modelValue = ref('');
const value = 'overweight-or-obese';
const id = '';
const disabled = false;
const inputAttrs = {
  'data-testid': 'input-element'
};
const radioElementAttrs = {
  'data-testid': 'radio-element'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
const modifiers = [];
const content = 'I’m overweight or obese';
</script>"`,
    },
  },
};

export const WithLabelSlot: RadioStoryType = {
  render: () => ({
    components: {
      UiRadio,
      UiText,
    },
    setup(props, { attrs }) {
      return { ...attrs };
    },
    template: `<UiRadio
      v-bind="$attrs"
    >
      <template #label="{
        hasLabel,
        textLabelAttrs,
      }">
        <UiText
          v-bind="textLabelAttrs"
          class="ui-radio__label"
        >
          {{ content }}
        </UiText>
      </template>
    </UiRadio>`,
  }),
};
WithLabelSlot.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiRadio
    v-model="modelValue"
    :value="value"
    :id="id"
    :disabled="disabled"
    :input-attrs="inputAttrs"
    :radio-element-attrs="radioElementAttrs"
    :text-label-attrs="textLabelAttrs"
    :class="modifiers"
  >
    <template #label="{
      hasLabel,
      textLabelAttrs,
    }">
      <UiText
        v-bind="textLabelAttrs"
        class="ui-radio__label"
      >
        {{ content }}
      </UiText>
    </template>
  </UiRadio>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UiRadio } from '@infermedica/component-library';

const modelValue = ref('');
const value = 'overweight-or-obese';
const id = '';
const disabled = false;
const inputAttrs = {
  'data-testid': 'input-element'
};
const radioElementAttrs = {
  'data-testid': 'radio-element'
};
const textLabelAttrs = {
  'data-testid': 'text-label'
};
const modifiers = [];
const content = 'I’m overweight or obese';
</script>"`,
    },
  },
};
