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
