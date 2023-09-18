import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
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

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onFocus: 'onFocus',
  onBlur: 'onBlur',
});

export default {
  title: 'Atoms/Checkbox',
  component: UiCheckbox,
  subcomponents: {
    UiIcon,
    UiText,
  },
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

export const WithLabel = {
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

export const IsDisabled = {
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

  args: { modifiers: [ 'ui-checkbox--is-disabled' ] },
};

export const HasError = {
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

  args: { modifiers: [ 'ui-checkbox--has-error' ] },
};

export const ValueAsObject = {
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
      {{ value.label }}
    </UiCheckbox>`,
  }),

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
};

export const AsGroupWithPrimitiveTypes = {
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
        v-for="(value, key) in values"
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

  args: {
    initModelValue: [ 'Europe' ],
    values: [
      'Russia, Kazakhstan or Mongolia',
      'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      'Europe',
    ],
  },

  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'array',
    },
    values: {
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

export const AsGroupWithObject = {
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
        v-for="(value, key) in values"
        :key="key"
        :tag="UiCheckbox"
        v-model="modelValue"
        :value="value"
        :id="value.id"
        :disabled="disabled"
        :input-attrs="inputAttrs"
        :icon-checkmark-attrs="iconCheckmarkAttrs"
        :text-label-attrs="textLabelAttrs"
        :class="modifiers"
        @update:modelValue="onUpdateModelValue"
        @focus="onFocus"
        @blur="onBlur"
      >
        {{ value.label }}
      </UiListItem>
    </UiList>`,
  }),

  args: {
    initModelValue: [ {
      label: 'Europe',
      id: 'as-group-with-object-europe',
    } ],
    values: [
      {
        label: 'Russia, Kazakhstan or Mongolia',
        id: 'as-group-with-object-russia-kazakhstan-mongolia',
      },
      {
        label: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
        id: 'as-group-with-object-asia-excluding-middle-east-russia-mongolia-kazakhstan',
      },
      {
        label: 'Europe',
        id: 'as-group-with-object-europe',
      },
    ],
  },

  argTypes: {
    initial: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'array',
    },
    values: {
      description: 'Use this control to set the values of checkbox group.',
      table: { category: 'stories controls' },
      control: 'array',
    },
    id: { control: false },
    value: { control: false },
    modifiers: { control: false },
    content: { control: false },
  },
};

export const AsGroupWithNestedObject = {
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
        v-for="(value, key) in values"
        :key="key"
        :tag="UiCheckbox"
        v-model="modelValue"
        :value="value"
        :id="value.id"
        :disabled="disabled"
        :input-attrs="inputAttrs"
        :icon-checkmark-attrs="iconCheckmarkAttrs"
        :text-label-attrs="textLabelAttrs"
        :class="modifiers"
        @update:modelValue="onUpdateModelValue"
        @focus="onFocus"
        @blur="onBlur"
      >
        {{ value.label }}
      </UiListItem>
    </UiList>`,
  }),

  args: {
    initModelValue: [ {
      label: 'Europe',
      id: 'as-group-with-nested-object-europe',
      checkboxAttrs: { 'data-testid': 'europe-checkbox' },
    } ],
    values: [
      {
        label: 'Russia, Kazakhstan or Mongolia',
        id: 'as-group-with-nested-object-russia-kazakhstan-mongolia',
      },
      {
        label: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
        id: 'as-group-with-nested-object-asia-excluding-middle-east-russia-mongolia-kazakhstan',
      },
      {
        label: 'Europe',
        id: 'as-group-with-nested-object-europe',
      },
    ],
  },

  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'object',
    },
    values: {
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

export const WithCheckboxSlot = {
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
};

export const WithLabelSlot = {
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
};
