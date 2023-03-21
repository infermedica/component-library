import {
  withVariants,
  withModelValue,
} from '@sb/decorators';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';
import {
  UiIcon,
  UiCheckbox,
  UiText,
  UiList,
} from '@/../index';
import type { CheckboxProps } from '@/../index';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import { actions } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';

export type ArgsType = CheckboxProps & {
  content?: string;
  class?: string[];
  items?: CheckboxProps['modelValue'];
}
export type MetaType = Meta<ArgsType>;
export type StoryType = StoryObj<ArgsType>;
export const complexItemsData: CheckboxProps['modelValue'] = [
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

const events = actions({
  onFocus: 'onFocus',
  onBlur: 'onBlur',
});

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
    inputAttrs: {
      'data-testid': 'input-element',
      onFocus: events.onFocus,
      onBlur: events.onBlur,
    },
    iconCheckmarkAttrs: { 'data-testid': 'icon-element' },
    textLabelAttrs: { 'data-testid': 'text-element' },
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
} satisfies MetaType;

export const Basic: StoryType = {
  render: (args) => ({
    components: { UiCheckbox },
    setup() {
      return { ...args };
    },
    template: `<UiCheckbox
      v-bind="$attrs"
    >
      {{ content }}
    </UiCheckbox>`,
  }),
};

const StateTemplate: StoryType = { ...Basic };
StateTemplate.argTypes = {
  modelValue: { control: false },
  value: { control: false },
  disabled: { control: false },
  class: { control: false },
  id: { control: false },
  inputAttrs: { control: false },
  iconCheckmarkAttrs: { control: false },
  textLabelAttrs: { control: false },
};
StateTemplate.decorators = [ withVariants ];
StateTemplate.parameters = {
  variants: [
    { label: 'default' },
    {
      label: 'hover',
      class: 'pseudo-hover',
    },
    {
      label: 'active',
      class: 'pseudo-active',
    },
    {
      label: 'focus',
      class: 'pseudo-focus-within',
    },
    {
      label: 'disabled',
      class: 'ui-checkbox--is-disabled',
    },
    {
      label: 'error',
      class: 'ui-checkbox--has-error',
    },
    {
      label: 'error-hover',
      class: 'ui-checkbox--has-error pseudo-hover',
    },
    {
      label: 'error-active',
      class: 'ui-checkbox--has-error pseudo-active',
    },
  ],
};


const testFocusedCheckbox = (checkbox: Element) => {
  expect(window.getComputedStyle(checkbox).boxShadow).toBe('rgb(255, 255, 255) 0px 0px 0px 2px, rgb(47, 145, 234) 0px 0px 0px 4px');
}
const testDisabledLabel = async (canvasElement: Element) => {
  const disabledLabel = await canvasElement.querySelectorAll('.ui-checkbox__label')[4]
  expect(window.getComputedStyle(disabledLabel).color).toBe('rgb(164, 177, 191)');
}

export const Unchecked: StoryType = { ...StateTemplate };
Unchecked.args = { modelValue: false };
Unchecked.play = async ({canvasElement, step}) => {
  const checkboxes = await canvasElement.querySelectorAll('.ui-checkbox__checkbox')
  const expectedColors = [
    'rgb(125, 143, 163)',
    'rgb(71, 84, 99)',
    'rgb(31, 38, 44)',
    'rgb(125, 143, 163)',
    'rgb(193, 203, 213)',
    'rgb(250, 81, 79)',
    'rgb(212, 46, 46)',
    'rgb(161, 32, 32)',
  ];
  await step('Unchecked checkboxes have correct border color', async () => {
    checkboxes.forEach((checkbox: Element, index: number) => {
      expect(window.getComputedStyle(checkbox, ':after').borderColor).toBe(expectedColors[index]);
    })
  })
  await step('Focused checkbox has correct box-shadow', async () => {
    testFocusedCheckbox(checkboxes[3])
  });
  await step('Disabled checkbox has correct label color', async () => {
    await testDisabledLabel(canvasElement)
  });
}

export const Checked: StoryType = { ...StateTemplate };
Checked.args = { modelValue: true };
Checked.play = async ({canvasElement, step}) => {
  const checkboxes = await canvasElement.querySelectorAll('.ui-checkbox__checkbox')
  const expectedColors = [
    'rgb(26, 161, 117)',
    'rgb(18, 127, 91)',
    'rgb(11, 95, 67)',
    'rgb(26, 161, 117)',
    'rgb(193, 203, 213)',
    'rgb(250, 81, 79)',
    'rgb(212, 46, 46)',
    'rgb(161, 32, 32)',
  ];
  await step('Checked checkboxes have correct backgrounds color', async () => {
    checkboxes.forEach((checkbox: Element, index: number) => {
      expect(window.getComputedStyle(checkbox).backgroundColor).toBe(expectedColors[index]);
    })
  })
  await step('Focused checkbox has correct box-shadow', async () => {
    testFocusedCheckbox(checkboxes[3])
  });
  await step('Disabled checkbox has correct label color', async () => {
    await testDisabledLabel(canvasElement)
  });
}

export const ValueAsObject: StoryType = { ...Basic };
ValueAsObject.args = {
  modelValue: [ {
    label: 'Europe',
    id: 'value-as-object-europe',
  } ],
  value: {
    label: 'Europe',
    id: 'value-as-object-europe',
  },
};
ValueAsObject.argTypes = {
  modelValue: { control: 'object' },
  value: { control: 'object' },
};
ValueAsObject.parameters = { chromatic: { disableSnapshot: true } };

const AsGroupTemplate: StoryType = {
  render: (args) => ({
    components: {
      UiCheckbox,
      UiList,
      UiListItem,
    },
    setup() {
      return {
        UiCheckbox,
        ...args,
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

export const AsGroupWithPrimitiveTypes: StoryType = { ...AsGroupTemplate };
AsGroupWithPrimitiveTypes.args = {
  modelValue: [ 'Europe' ],
  items: [
    'Russia, Kazakhstan or Mongolia',
    'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
    'Europe',
  ],
};

export const AsGroupWithObject: StoryType = { ...AsGroupTemplate };
AsGroupWithObject.args = {
  modelValue: [ complexItemsData[0] ],
  items: complexItemsData,
};

export const AsGroupWithNestedObject: StoryType = { ...AsGroupTemplate };
AsGroupWithNestedObject.args = {
  modelValue: [ complexItemsData[0] ],
  items: [
    complexItemsData[0],
    complexItemsData[1],
    {
      label: 'Europe',
      id: 'as-group-with-object-europe',
      checkboxAttrs: { 'data-testid': 'europe-checkbox' },
    },
  ],
};
AsGroupWithNestedObject.argTypes = {
  ...AsGroupTemplate.argTypes,
  modelValue: { control: 'object' },
};

export const WithCheckboxSlot: StoryType = {
  render: (args) => ({
    components: {
      UiCheckbox,
      UiIcon,
    },
    setup() {
      return { ...args };
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

export const WithLabelSlot: StoryType = {
  render: (args) => ({
    components: {
      UiCheckbox,
      UiText,
    },
    setup() {
      return { ...args };
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
