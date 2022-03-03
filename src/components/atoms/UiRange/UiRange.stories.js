import UiRange from '@/components/atoms/UiRange/UiRange.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';

import { ref } from 'vue';

export default {
  title: 'Atoms/Range',
  component: UiRange,
  subcomponents: { UiButton, UiIcon },
  args: {
    modelValue: 50,
    min: 18,
    max: 122,
    buttonIncrementAttrs: {
      'aria-label': 'increment age',
    },
    buttonDecrementAttrs: {
      'aria-label': 'decrement age',
    },
    ariaLabel: 'patient age',
    disabled: false,
    modifiers: [],
  },
  argTypes: {
    modelValue: { control: false },
    min: { control: 'number' },
    max: { control: 'number' },
    ariaLabel: {
      control: 'text',
      table: {
        category: 'HTML attributes',
      },
    },
  },
  parameters: {
    cssprops: {
      'range-thumb-hover-background-color': {
        value: 'var(--color-range-thumb-hover)',
        control: 'text',
        description: '',
      },
      'range-thumb-active-background-color': {
        value: 'var(--color-range-thumb-active)',
        control: 'text',
        description: '',
      },
      'range-mobile-increment-margin': {
        value: 'var(--space-24) 0 0 var(--space-12)',
        control: 'text',
        description: '',
      },
      'range-mobile-decrement-margin': {
        value: 'var(--space-24) var(--space-12) 0 0',
        control: 'text',
        description: '',
      },
      'range-thumb-size': {
        value: '3rem',
        control: 'text',
        description: '',
      },
      'range-track-margin': {
        value: undefined,
        control: 'text',
        description: '',
      },
      'range-selected-track-background': {
        value: 'var(--color-range-progress-indicator)',
        control: 'text',
        description: '',
      },
      'range-track-background': {
        value: 'var(--color-progress-track)',
        control: 'text',
        description: '',
      },
      'range-track-height': {
        value: '4px',
        control: 'text',
        description: '',
      },
      'range-track-border-radius': {
        value: '4px',
        control: 'text',
        description: '',
      },
      'range-thumb-background-color': {
        value: 'var(--color-range-thumb)',
        control: 'text',
        description: '',
      },
      'range-thumb-background-image': {
        value: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 48 48\'%3E%3Cpath d=\'M34 12l-2.828 2.828L40.344 24l-9.172 9.172L34 36l12-12zm0 0M14 12l2.828 2.828L7.656 24l9.172 9.172L14 36 2 24zm0 0\' fill-rule=\'evenodd\' fill=\'%23fff\'/%3E%3C/svg%3E%0A")',
        control: 'text',
        description: '',
      },
      'range-thumb-background-size': {
        value: '1.5rem',
        control: 'text',
        description: '',
      },
      'range-thumb-border-radius': {
        value: '50%',
        control: 'text',
        description: '',
      },
      'range-thumb-box-shadow': {
        value: 'var(--box-shadow-high)',
        control: 'text',
        description: '',
      },
      'range-selected-track-width': {
        value: undefined,
        control: 'text',
        description: '',
      },
      'range-value-color': {
        value: 'var(--color-text-body)',
        control: 'text',
        description: '',
      },
    },
  },
};

export const Common = (args) => ({
  components: { UiRange },
  setup() {
    const modelValue = ref(50);
    return { ...args, modelValue };
  },
  template: `<UiRange 
    v-model="modelValue"
    :min="min"
    :max="max"
    :button-increment-attrs="buttonIncrementAttrs"
    :button-decrement-attrs="buttonDecrementAttrs"
    :aria-label="ariaLabel"
  />`,
});

export const WithDecrementSlot = (args) => ({
  components: { UiRange, UiButton, UiIcon },
  setup() {
    const modelValue = ref(50);
    return { ...args, modelValue };
  },
  template: `<UiRange 
    v-model="modelValue"
    :min="min"
    :max="max"
    :button-increment-attrs="buttonIncrementAttrs"
    :button-decrement-attrs="buttonDecrementAttrs"
    :aria-label="ariaLabel"
  >
    <template #decrement="{attrs, change, value}">
      <UiButton
        class="ui-range__decrement ui-button--outlined ui-button--circled ui-button--has-icon"
        tabindex="-1"
        v-bind="attrs"
        @click="change(value, -1)"
      >
        <UiIcon icon="minus"/>
      </UiButton>
    </template>
  </UiRange>`,
});

export const WithIncrementSlot = (args) => ({
  components: { UiRange, UiButton, UiIcon },
  setup() {
    const modelValue = ref(50);
    return { ...args, modelValue };
  },
  template: `<UiRange 
    v-model="modelValue"
    :min="min"
    :max="max"
    :button-increment-attrs="buttonIncrementAttrs"
    :button-decrement-attrs="buttonDecrementAttrs"
    :aria-label="ariaLabel"
  >
    <template #increment="{attrs, change, value}">
      <UiButton
        class="ui-range__increment ui-button--outlined ui-button--circled ui-button--has-icon"
        tabindex="-1"
        v-bind="attrs"
        @click="change(value, 1)"
      >
        <UiIcon icon="plus"/>
      </UiButton>
    </template>
  </UiRange>`,
});

export const WithValueSlot = (args) => ({
  components: { UiRange, UiButton, UiIcon },
  setup() {
    const modelValue = ref(50);
    return { ...args, modelValue };
  },
  template: `<UiRange 
    v-model="modelValue"
    :min="min"
    :max="max"
    :button-increment-attrs="buttonIncrementAttrs"
    :button-decrement-attrs="buttonDecrementAttrs"
    :aria-label="ariaLabel"
  >
    <template #value="{value}">
      <div class="ui-range__value">
        {{ value }}
      </div>
    </template>
  </UiRange>`,
});

export const WithRangeSlot = (args) => ({
  components: { UiRange, UiButton, UiIcon },
  setup() {
    const modelValue = ref(50);
    return { ...args, modelValue };
  },
  template: `<UiRange 
    v-model="modelValue"
    :min="min"
    :max="max"
    :button-increment-attrs="buttonIncrementAttrs"
    :button-decrement-attrs="buttonDecrementAttrs"
    :aria-label="ariaLabel"
  >
    <template #range="{attrs, min, max, value, change}">
      <input
        v-bind="attrs"
        type="range"
        :min="min"
        :max="max"
        :value="value"
        class="ui-range__track"
        @input="change($event.target.value)"
      >
    </template>
  </UiRange>`,
});
