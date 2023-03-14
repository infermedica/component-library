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
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';

type CheckboxStoryArgs = CheckboxProps & {
  content?: string;
  class?: string[];
  items?: CheckboxProps['modelValue'];
}
type CheckboxStory = StoryObj<CheckboxStoryArgs>;

const events = actions({
  onFocus: 'onFocus',
  onBlur: 'onBlur',
});

export default {
  title: 'Atoms/Checkbox',
  component: UiCheckbox,
  args: {
    modelValue: false,
    content: 'I read and accept Terms of Service and Privacy Policy.',
    class: [],
    value: '',
    id: '',
    disabled: false,
    inputAttrs: { 'data-testid': 'input-element' },
    iconCheckmarkAttrs: { 'data-testid': 'icon-checkmark' },
    textLabelAttrs: { 'data-testid': 'text-label' },
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
} satisfies Meta<CheckboxStoryArgs>;

export const Basic: CheckboxStory = {
  render: (args, { modelValue }) => ({
    components: { UiCheckbox },
    props: Object.keys(args),
    setup() {
      return {
        events,
        modelValue,
      };
    },
    template: `<UiCheckbox
      v-bind="{
        ...$props,
        ...events
      }"
      v-model="modelValue"
    >
      {{ content }}
    </UiCheckbox>`,
  }),
};

const StateTemplate: CheckboxStory = { ...Basic };
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

export const Unchecked: CheckboxStory = { ...StateTemplate };
Unchecked.args = { modelValue: false };

export const Checked: CheckboxStory = { ...StateTemplate };
Checked.args = { modelValue: true };

export const ValueAsObject: CheckboxStory = { ...Basic };
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

const AsGroupTemplate: CheckboxStory = {
  render: (args, { modelValue }) => ({
    components: {
      UiCheckbox,
      UiList,
      UiListItem,
    },
    props: Object.keys(args),
    setup() {
      return {
        events,
        UiCheckbox,
        modelValue,
      };
    },
    template: `<UiList>
      <UiListItem
        v-for="(item, key) in items"
        :key="key"
        v-bind="{
          ...$props,
          ...events
        }"
        :tag="UiCheckbox"
        :value="item"
        v-model="modelValue"
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

export const AsGroupWithPrimitiveTypes: CheckboxStory = {
  ...AsGroupTemplate,
  args: {
    modelValue: [ 'Europe' ],
    items: [
      'Russia, Kazakhstan or Mongolia',
      'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      'Europe',
    ],
  },
};

const complexItems = [
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

export const AsGroupWithObject: CheckboxStory = { ...AsGroupTemplate };
AsGroupWithObject.args = {
  modelValue: [ complexItems[0] ],
  items: complexItems,
};

export const AsGroupWithNestedObject: CheckboxStory = { ...AsGroupTemplate };
AsGroupWithNestedObject.args = {
  modelValue: [ complexItems[0] ],
  items: [
    complexItems[0],
    complexItems[1],
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

export const WithCheckboxSlot: CheckboxStory = {
  render: (args, { modelValue }) => ({
    components: {
      UiCheckbox,
      UiIcon,
    },
    props: Object.keys(args),
    setup() {
      return {
        events,
        modelValue,
      };
    },
    template: `<UiCheckbox
      v-bind="{
        ...$props,
        ...events
      }"
      v-model="modelValue"
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
    </UiCheckbox>`,
  }),
};

export const WithLabelSlot: CheckboxStory = {
  render: (args, { modelValue }) => ({
    components: {
      UiCheckbox,
      UiText,
    },
    props: Object.keys(args),
    setup() {
      return {
        events,
        modelValue,
      };
    },
    template: `<UiCheckbox
      v-bind="{
        ...$props,
        ...events
      }"
      v-model="modelValue"
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
    </UiCheckbox>`,
  }),
};
