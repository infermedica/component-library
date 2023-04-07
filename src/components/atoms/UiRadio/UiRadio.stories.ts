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
import type { RadioProps } from '@index';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';
import type { PlayFunctionContext } from '@storybook/types';
import type {
  Meta,
  StoryObj,
  VueRenderer,
} from '@storybook/vue3';

type RadioArgsType = RadioProps & {
  content?: string;
  class?: string[];
  items?: Required<RadioProps['value']>[];
}
type RadioMetaType = Meta<RadioArgsType>;
type RadioStoryType = StoryObj<RadioArgsType>;
type PlayContext = PlayFunctionContext<VueRenderer, RadioArgsType>;

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

export default {
  title: 'Atoms/Radio',
  component: UiRadio,
  excludeStories: /.*(Type|Data)$/,
  args: {
    modelValue: '',
    content: 'I’m overweight or obese',
    class: [],
    value: 'overweight-or-obese',
    id: '',
    disabled: false,
    // name: '',
    inputAttrs: { 'data-testid': 'input' },
    textLabelAttrs: { 'data-testid': 'text' },
    radioElementAttrs: { 'data-testid': 'radio' },
  },
  argTypes: {
    modelValue: { control: 'text' },
    content,
    class: modifiers({
      options: [
        'ui-radio--has-error',
        'ui-radio--is-disabled',
      ],
    }),
    // name: {
    //   description: 'Use this control to set name attribute.',
    //   table: { category: 'html attributes' },
    //   control: { type: 'text' },
    // },
    value: { control: 'text' },
    id: { control: 'text' },
    inputAttrs: { table: { subcategory: 'Attrs props' } },
    radioElementAttrs: { table: { subcategory: 'Attrs props' } },
    textLabelAttrs: { table: { subcategory: 'Attrs props' } },
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

export const BasicVariants: RadioStoryType = { ...Basic };
BasicVariants.argTypes = {
  modelValue: { control: false },
  value: { control: false },
  disabled: { control: false },
  class: { control: false },
  id: { control: false },
  inputAttrs: { control: false },
  textLabelAttrs: { control: false },
};
BasicVariants.decorators = [ withVariants ];
BasicVariants.parameters = {
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
  modelValue: {
    description: 'Use this control to set initial state.',
    table: { category: 'stories controls' },
    control: 'object',
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

export const AsGroupWithStringValue: RadioStoryType = { ...AsGroupTemplate };
AsGroupWithStringValue.args = { items: stringItemsData };
AsGroupWithStringValue.argTypes = {
  modelValue: {
    description: 'Use this control to set initial state.',
    table: { category: 'stories controls' },
    control: 'text',
  },
  items: {
    description: 'Use this control to set the values of radio group.',
    table: { category: 'stories controls' },
    control: { type: 'object' },
  },
  id: { control: false },
  value: { control: false },
  class: { control: false },
  disabled: { control: false },
  content: { control: false },
};

export const AsGroupWithObjectValue = { ...AsGroupTemplate };
AsGroupWithObjectValue.args = { items: complexItemsData };
AsGroupWithObjectValue.argTypes = {
  modelValue: {
    description: 'Use this control to set initial state.',
    table: { category: 'stories controls' },
    control: 'object',
  },
  items: {
    description: 'Values of the radios group.',
    table: { category: 'stories controls' },
    control: { type: 'object' },
  },
  id: { control: false },
  value: { control: false },
  class: { control: false },
  disabled: { control: false },
  content: { control: false },
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
