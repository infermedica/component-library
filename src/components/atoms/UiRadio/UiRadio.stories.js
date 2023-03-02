import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
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
  title: 'Atoms/Radio',
  component: UiRadio,
  subcomponents: { UiText },
  args: {
    initModelValue: '',
    content: 'I’m overweight or obese',
    modifiers: [],
    name: '',
    disabled: false,
    value: 'overweight-or-obese',
    id: '',
    inputAttrs: { 'data-testid': 'input-element' },
    radioElementAttrs: { 'data-testid': 'radio-element' },
    textLabelAttrs: { 'data-testid': 'label-text' },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'text',
    },
    content,
    modifiers: modifiers({
      options: [
        'ui-radio--has-error',
        'ui-radio--is-disabled',
      ],
    }),
    name: {
      description: 'Use this control to set name attribute.',
      table: { category: 'html attributes' },
      control: { type: 'text' },
    },
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
};

export const WithLabel = {
  render: (args) => ({
    components: { UiRadio },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiRadio
      v-model="modelValue"
      :value="value"
      :id="id"
      :disabled="disabled"
      :input-attrs="inputAttrs"
      :radio-element-attrs="radioElementAttrs"
      :text-label-attrs="textLabelAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    >
      {{ content }}
    </UiRadio>`,
  }),
};

export const IsDisabled = {
  render: (args) => ({
    components: { UiRadio },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiRadio
      v-model="modelValue"
      :value="value"
      :id="id"
      :disabled="disabled"
      :input-attrs="inputAttrs"
      :radio-element-attrs="radioElementAttrs"
      :text-label-attrs="textLabelAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    >
      {{ content }}
    </UiRadio>`,
  }),

  args: { modifiers: [ 'ui-radio--is-disabled' ] },
};

export const HasError = {
  render: (args) => ({
    components: { UiRadio },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiRadio
      v-model="modelValue"
      :value="value"
      :id="id"
      :disabled="disabled"
      :input-attrs="inputAttrs"
      :radio-element-attrs="radioElementAttrs"
      :text-label-attrs="textLabelAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    >
      {{ content }}
    </UiRadio>`,
  }),

  args: { modifiers: [ 'ui-radio--has-error' ] },
};

export const ValueAsObject = {
  render: (args) => ({
    components: { UiRadio },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiRadio
      v-model="modelValue"
      :value="value"
      :id="value.id"
      :disabled="disabled"
      :input-attrs="inputAttrs"
      :radio-element-attrs="radioElementAttrs"
      :text-label-attrs="textLabelAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    >
      {{ value.label }}
    </UiRadio>`,
  }),

  args: {
    initModelValue: {
      label: 'I’m overweight or obese',
      id: 'value-as-object-overweight-or-obese',
    },
    value: {
      label: 'I’m overweight or obese',
      id: 'value-as-object-overweight-or-obese',
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

export const AsGroupWithPrimitiveTypes = {
  render: (args) => ({
    components: {
      UiRadio,
      UiList,
      UiListItem,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
        UiRadio,
      };
    },
    template: `<UiList>
      <UiListItem
        v-for="(value, key) in values"
        :key="key"
        :tag="UiRadio"
        v-model="modelValue"
        :name="name"
        :value="value"
        :id="id"
        :disabled="disabled"
        :input-attrs="inputAttrs"
        :radio-element-attrs="radioElementAttrs"
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
    initModelValue: 'I’m overweight or obese',
    values: [
      'I’m overweight or obese',
      'I have hypertension',
      'I have smoked cigarettes for at least 10 years',
    ],
    name: 'AsGroupWithPrimitiveTypes',
  },

  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'text',
    },
    values: {
      description: 'Use this control to set the values of radio group.',
      table: { category: 'stories controls' },
      control: { type: 'object' },
    },
    id: { control: false },
    value: { control: false },
    modifiers: { control: false },
    disabled: { control: false },
    content: { control: false },
  },
};

export const AsGroupWithObject = {
  render: (args) => ({
    components: {
      UiRadio,
      UiList,
      UiListItem,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
        UiRadio,
      };
    },
    template: `<UiList>
      <UiListItem
        v-for="(value, key) in values"
        :key="key"
        :tag="UiRadio"
        v-model="modelValue"
        :value="value"
        :id="value.id"
        :name="name"
        :disabled="disabled"
        :input-attrs="inputAttrs"
        :radio-element-attrs="radioElementAttrs"
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
    initModelValue: {
      label: 'I’m overweight or obese',
      id: 'as-group-with-object-overweight-or-obese',
    },
    values: [
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
    ],
    name: 'AsGroupWithObject',
  },

  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'object',
    },
    values: {
      description: 'Values of the radios group.',
      table: { category: 'stories controls' },
      control: { type: 'object' },
    },
    id: { control: false },
    value: { control: false },
    modifiers: { control: false },
    disabled: { control: false },
    content: { control: false },
  },

  parameters: { chromatic: { disableSnapshot: true } },
};

export const AsGroupWithNestedObject = {
  render: (args) => ({
    components: {
      UiRadio,
      UiList,
      UiListItem,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
        UiRadio,
      };
    },
    template: `<UiList>
      <UiListItem
        v-for="(value, key) in values"
        :key="key"
        :tag="UiRadio"
        v-model="modelValue"
        :value="value"
        :id="value.id"
        :name="name"
        :disabled="disabled"
        :input-attrs="inputAttrs"
        :radio-element-attrs="value.radioElementAttrs"
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
    initModelValue: {
      label: 'I’m overweight or obese',
      id: 'as-group-with-nested-object-overweight-or-obese',
      radioElementAttrs: { 'data-testid': 'overweight-or-obese-radio' },
    },
    values: [
      {
        label: 'I’m overweight or obese',
        id: 'overweight-or-obese',
        radioElementAttrs: { 'data-testid': 'overweight-or-obese-radio' },
      },
      {
        label: 'I have hypertension',
        id: 'as-group-with-nested-object-hypertension',
        radioElementAttrs: { 'data-testid': 'hypertension-radio' },
      },
      {
        label: 'I have smoked cigarettes for at least 10 years',
        id: 'as-group-with-nested-object-smoked-cigarettes',
        radioElementAttrs: { 'data-testid': 'smoked-cigarettes-radio' },
      },
    ],
    name: 'AsGroupWithNestedObject',
  },

  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'array',
    },
    values: {
      description: 'Values of the radios group.',
      table: { category: 'stories controls' },
      control: { type: 'object' },
    },
    id: { control: false },
    value: { control: false },
    modifiers: { control: false },
    content: { control: false },
  },

  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithRadioSlot = {
  render: (args) => ({
    components: { UiRadio },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiRadio
      v-model="modelValue"
      :value="value"
      :id="id"
      :disabled="disabled"
      :input-attrs="inputAttrs"
      :radio-element-attrs="radioElementAttrs"
      :text-label-attrs="textLabelAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
      @focus="onFocus"
      @blur="onBlur"
    >
      <template #radiobutton="{
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

  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithLabelSlot = {
  render: (args) => ({
    components: {
      UiRadio,
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
    template: `<UiRadio
      v-model="modelValue"
      :value="value"
      :id="id"
      :disabled="disabled"
      :input-attrs="inputAttrs"
      :radio-element-attrs="radioElementAttrs"
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
          class="ui-radio__label"
        >
          {{ content }}
        </UiText>
      </template>
    </UiRadio>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};
