import { withPseudoState } from '@sb/decorators/withPseudoState';
import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import type { CheckboxProps } from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';
import type {
  StoryMeta,
  Story,
} from '@/types';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onFocus: 'onFocus',
  onBlur: 'onBlur',
});

const meta: StoryMeta<CheckboxProps> = {
  title: 'Atoms/Checkbox',
  component: UiCheckbox,
  args: {
    initModelValue: false,
    content: 'I read and accept Terms of Service and Privacy Policy.',
    modifiers: [],
    modelValue: false,
    value: '',
    id: '',
    disabled: false,
    inputAttrs: { 'data-testid': 'input-element' },
    iconCheckmarkAttrs: { 'data-testid': 'icon-checkmark' },
    textLabelAttrs: { 'data-testid': 'text-label' },
  },
  argTypes: {
    modelValue: { control: false },
    content,
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'boolean',
    },
    modifiers: modifiers({
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
};

export default meta;
type CheckboxStory = Story<CheckboxProps>;

export const Basic: CheckboxStory = {
  render: (args) => ({
    components: { UiCheckbox },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiCheckbox
      v-model="modelValue"
      :value="value"
      :id="id"
      :disabled="disabled"
      :input-attrs="inputAttrs"
      :icon-checkmark-attrs="iconCheckmarkAttrs"
      :text-label-attrs="textLabelAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    >
      {{ content }}
    </UiCheckbox>`,
  }),
};

const StateTemplate: CheckboxStory = {
  render: (args) => ({
    components: { UiCheckbox },
    setup() {
      const states = [
        'pseudo-hover',
        'pseudo-active',
        'pseudo-focus-within',
        'ui-checkbox--is-disabled',
        'ui-checkbox--has-error pseudo-hover',
        'ui-checkbox--has-error pseudo-active',
      ];
      return {
        ...args,
        states,
      };
    },
    template: `<template v-for="(state, index) in states">
      <UiCheckbox
        v-model="modelValue"
        :class="state"
      >
        {{ content }}
      </UiCheckbox>
    </template>`,
  }),
  argTypes: {
    initModelValue: { control: false },
    modelValue: { control: false },
    value: { control: false },
    disabled: { control: false },
    modifiers: { control: false },
    id: { control: false },
    inputAttrs: { control: false },
    iconCheckmarkAttrs: { control: false },
    textLabelAttrs: { control: false },
  },
  decorators: [ withPseudoState ],
};

export const Unchecked: CheckboxStory = {
  ...StateTemplate,
  args: { modelValue: false },
};

export const Checked: CheckboxStory = {
  ...StateTemplate,
  args: { modelValue: true },
};

export const ValueAsObject: CheckboxStory = {
  ...Basic,
  args: {
    initModelValue: [ {
      label: 'Europe',
      id: 'value-as-object-europe',
    } ],
    value: {
      label: 'Europe',
      id: 'value-as-object-europe',
    },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'object',
    },
    modelValue: { control: false },
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

const AsGroupTemplate: CheckboxStory = {
  render: (args) => ({
    components: {
      UiCheckbox,
      UiList,
      UiListItem,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
        UiCheckbox,
      };
    },
    template: `<UiList>
      <UiListItem
        v-for="(value, key) in items"
        :key="key"
        :tag="UiCheckbox"
        v-model="modelValue"
        :value="value"
        :id="id"
        :disabled="disabled"
        :input-attrs="inputAttrs"
        :icon-checkmark-attrs="iconCheckmarkAttrs"
        :text-label-attrs="textLabelAttrs"
        :class="modifiers"
        @update:modelValue="onUpdateModelValue"
        @focus="onFocus"
        @blur="onBlur"
      >
        {{ value }}
      </UiListItem>
    </UiList>`,
  }),
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'array',
    },
    items: {
      description: 'Values of the checkbox group.',
      table: { category: 'stories controls' },
      control: 'object',
    },
    id: { control: false },
    value: { control: false },
    modifiers: { control: false },
    content: { control: false },
  },
};

export const AsGroupWithPrimitiveTypes: CheckboxStory = {
  ...AsGroupTemplate,
  args: {
    initModelValue: [ 'Europe' ],
    items: [
      'Russia, Kazakhstan or Mongolia',
      'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      'Europe',
    ],
  },
};

export const AsGroupWithObject: CheckboxStory = {
  ...AsGroupTemplate,
  args: {
    initModelValue: [ {
      label: 'Europe',
      id: 'as-group-with-object-europe',
    } ],
    items: [
      'Russia, Kazakhstan or Mongolia',
      'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      'Europe',
    ],
  },
};

export const AsGroupWithNestedObject: CheckboxStory = {
  ...AsGroupTemplate,
  args: {
    initModelValue: [ {
      label: 'Europe',
      id: 'as-group-with-nested-object-europe',
      checkboxAttrs: { 'data-testid': 'europe-checkbox' },
    } ],
    items: [
      'Russia, Kazakhstan or Mongolia',
      'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      'Europe',
    ],
  },
  argTypes: {
    ...AsGroupTemplate.argTypes,
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'object',
    },
  },
};

export const WithCheckboxSlot: CheckboxStory = {
  render: (args) => ({
    components: {
      UiCheckbox,
      UiIcon,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiCheckbox
      v-model="modelValue"
      :value="value"
      :id="id"
      :disabled="disabled"
      :input-attrs="inputAttrs"
      :icon-checkmark-attrs="iconCheckmarkAttrs"
      :text-label-attrs="textLabelAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
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
  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithLabelSlot: CheckboxStory = {
  render: (args) => ({
    components: {
      UiCheckbox,
      UiText,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiCheckbox
      v-model="modelValue"
      :value="value"
      :id="id"
      :disabled="disabled"
      :input-attrs="inputAttrs"
      :icon-checkmark-attrs="iconCheckmarkAttrs"
      :text-label-attrs="textLabelAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
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
  parameters: { chromatic: { disableSnapshot: true } },
};
