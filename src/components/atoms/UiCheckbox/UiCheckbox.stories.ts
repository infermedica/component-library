import {
  withVariants,
  withModelValue,
} from '@sb/decorators';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';
import {
  getCSSValue,
  getStyleTests,
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
  class?: string[];
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
  await step('Correct focus state', () => {
    getStyleTests([
      checkboxes[3],
      checkboxes[7],
    ], 'boxShadow', [
      results[3],
      results[7],
    ]);
  });
  await step('Correct Label color', () => {
    getStyleTests(labels, 'color', results);
  });
};
const getToggleTest = async ({ canvasElement }: PlayContext) => {
  const className = 'ui-checkbox__checkbox';
  const inputs: HTMLInputElement[] = await within(canvasElement).findAllByTestId('input');
  const expected = inputs.map((el) => !el.checked);
  const checkboxes = canvasElement.querySelectorAll(`.${className}`);
  const hasCheckedClass = (checkbox: Element) => checkbox.className.includes(`${className}--is-checked`);
  await inputs.reduce(
    async (events, checkbox) => {
      await events;
      return userEvent.click(checkbox);
    },
    Promise.resolve(),
  );
  checkboxes.forEach((checkbox, index) => {
    expect(hasCheckedClass(checkbox)).toBe(expected[index]);
  });
};

export default {
  title: 'Atoms/Checkbox',
  component: UiCheckbox,
  excludeStories: /.*(Type|Data)$/,
  args: {
    modelValue: false,
    content: 'I read and accept Terms of Service and Privacy Policy.',
    class: [],
    value: '',
    id: '',
    disabled: false,
    inputAttrs: { 'data-testid': 'input' },
    iconCheckmarkAttrs: { 'data-testid': 'icon' },
    textLabelAttrs: { 'data-testid': 'text' },
  },
  argTypes: {
    modelValue: { control: 'boolean' },
    content,
    class: modifiers({
      options: [
        'ui-checkbox--has-error',
        'ui-checkbox--is-disabled',
      ],
    }),
    id: { control: 'text' },
    value: { control: 'text' },
    inputAttrs: { table: { subcategory: 'Attrs props' } },
    iconCheckmarkAttrs: { table: { subcategory: 'Attrs props' } },
    textLabelAttrs: { table: { subcategory: 'Attrs props' } },
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
  },
  decorators: [ withModelValue ],
} satisfies CheckboxMetaType;

export const Basic: CheckboxStoryType = {
  render: () => ({
    components: { UiCheckbox },
    setup(props, { attrs }) {
      return { ...attrs };
    },
    template: `<UiCheckbox
      v-bind="$attrs"
    >
      {{ content }}
    </UiCheckbox>`,
  }),
};

export const BasicVariants: CheckboxStoryType = {
  render: () => ({
    components: { UiCheckbox },
    setup(props, { attrs }) {
      return { ...attrs };
    },
    template: `<UiCheckbox
      v-bind="$attrs"
    >
      {{ content }}
    </UiCheckbox>`,
  }),
};
BasicVariants.argTypes = {
  modelValue: { control: false },
  value: { control: false },
  disabled: { control: false },
  class: { control: false },
  id: { control: false },
  inputAttrs: { control: false },
  iconCheckmarkAttrs: { control: false },
  textLabelAttrs: { control: false },
};
BasicVariants.decorators = [ withVariants ];
BasicVariants.parameters = {
  variants: [
    {
      label: 'default',
      modelValue: false,
    },
    ...['hover', 'active'].map((variant) => ({
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
    ...['hover', 'active'].map((variant) => ({
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
  ].map((state) => ({
    backgroundColor: getCSSValue('--color-background-white'),
    borderColor: getCSSValue(`--color-border-strong${state}`),
  })),
  {
    backgroundColor: getCSSValue('--color-background-white'),
    borderColor: getCSSValue('--color-border-strong'),
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 2px, rgb(47, 145, 234) 0px 0px 0px 4px',
  },
  ...[
    '',
    '-hover',
    '-active',
  ].map((state) => ({
    borderColor: getCSSValue(`--color-selectioncontrols-selection${state}`),
    backgroundColor: getCSSValue(`--color-selectioncontrols-selection${state}`),
  })),
  {
    borderColor: getCSSValue('--color-selectioncontrols-selection'),
    backgroundColor: getCSSValue('--color-selectioncontrols-selection'),
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 2px, rgb(47, 145, 234) 0px 0px 0px 4px',
  },
].map((result) => ({
  ...result,
  color: getCSSValue('--color-text-body'),
})));

export const DisabledVariants: CheckboxStoryType = { ...BasicVariants };
DisabledVariants.parameters = {
  variants: BasicVariants.parameters.variants.map(
    (variant: Record<string, unknown>) => ({
      ...variant,
      class: `ui-checkbox--is-disabled ${variant.class}`,
    }),
  ),
};
DisabledVariants.play = async (context) => getStatesTests(context, [
  ...Array(3).fill({}),
  { boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 2px, rgb(47, 145, 234) 0px 0px 0px 4px' },
  ...Array(3).fill({ backgroundColor: getCSSValue('--color-icon-disabled') }),
  {
    backgroundColor: getCSSValue('--color-icon-disabled'),
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 2px, rgb(47, 145, 234) 0px 0px 0px 4px',
  },
].map((result) => ({
  backgroundColor: getCSSValue('--color-background-white'),
  borderColor: getCSSValue('--color-icon-disabled'),
  color: getCSSValue('--color-text-disabled'),
  ...result,
})));

export const ErrorVariants: CheckboxStoryType = { ...BasicVariants };
ErrorVariants.parameters = {
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
  ].map((state) => ({
    backgroundColor: getCSSValue('--color-background-white'),
    borderColor: getCSSValue(`--color-border-error-strong${state}`),
  })),
  {
    backgroundColor: getCSSValue('--color-background-white'),
    borderColor: getCSSValue('--color-border-error-strong'),
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 2px, rgb(47, 145, 234) 0px 0px 0px 4px',
  },
  ...[
    '',
    '-hover',
    '-active',
  ].map((state) => ({
    borderColor: getCSSValue(`--color-border-error-strong${state}`),
    backgroundColor: getCSSValue(`--color-border-error-strong${state}`),
  })),
  {
    borderColor: getCSSValue('--color-border-error-strong'),
    backgroundColor: getCSSValue('--color-border-error-strong'),
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 2px, rgb(47, 145, 234) 0px 0px 0px 4px',
  },
].map((result) => ({
  ...result,
  color: getCSSValue('--color-text-body'),
})));

export const WithStringValue: CheckboxStoryType = { ...Basic };
WithStringValue.args = {
  modelValue: false,
  value: 'I read and accept Terms of Service and Privacy Policy.',
  content: 'I read and accept Terms of Service and Privacy Policy.',
};
WithStringValue.argTypes = {
  modelValue: { control: 'boolean' },
  value: { control: 'text' },
};
WithStringValue.parameters = { chromatic: { disableSnapshot: true } };
WithStringValue.play = getToggleTest;

export const WithObjectValue: CheckboxStoryType = { ...Basic };
WithObjectValue.args = {
  modelValue: false,
  value: {
    label: 'Europe',
    id: 'value-as-object-europe',
  },
};
WithObjectValue.argTypes = {
  modelValue: { control: 'boolean' },
  value: { control: 'object' },
};
WithObjectValue.parameters = { chromatic: { disableSnapshot: true } };
WithObjectValue.play = getToggleTest;

const AsGroupTemplate: CheckboxStoryType = {
  render: () => ({
    components: {
      UiCheckbox,
      UiList,
      UiListItem,
    },
    setup(props, { attrs }) {
      return {
        UiCheckbox,
        ...attrs,
      };
    },
    template: `<UiList>
      <UiListItem
        v-for="(item, key) in items"
        :key="key"
        v-bind="$attrs"
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
    description: 'Values of the checkbox group.',
    table: { category: 'stories controls' },
    control: 'object',
  },
  id: { control: false },
  value: { control: false },
  class: { control: false },
  content: { control: false },
};
AsGroupTemplate.play = getToggleTest;

export const AsGroupWithStringValue: CheckboxStoryType = { ...AsGroupTemplate };
AsGroupWithStringValue.args = {
  modelValue: [],
  items: stringItemsData,
};

export const AsGroupWithObjectValue: CheckboxStoryType = { ...AsGroupTemplate };
AsGroupWithObjectValue.args = {
  modelValue: [],
  items: complexItemsData,
};

export const WithCheckboxSlot: CheckboxStoryType = {
  render: () => ({
    components: {
      UiCheckbox,
      UiIcon,
    },
    setup(props, { attrs }) {
      return { ...attrs };
    },
    template: `<UiCheckbox v-bind="$attrs">
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

export const WithCheckmarkSlot: CheckboxStoryType = {
  render: () => ({
    components: {
      UiCheckbox,
      UiIcon,
    },
    setup(props, { attrs }) {
      return { ...attrs };
    },
    template: `<UiCheckbox v-bind="$attrs">
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

export const WithLabelSlot: CheckboxStoryType = {
  render: () => ({
    components: {
      UiCheckbox,
      UiText,
    },
    setup(props, { attrs }) {
      return { ...attrs };
    },
    template: `<UiCheckbox v-bind="$attrs">
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
