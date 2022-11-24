import UiRange from '@/components/atoms/UiRange/UiRange.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiNumberStepper from '@/components/molecules/UiNumberStepper/UiNumberStepper.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';
import { keyboardFocus } from '@/utilities/directives';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onError: 'error',
});

export default {
  title: 'Atoms/Range',
  component: UiRange,
  subcomponents: { UiNumberStepper },
  args: {
    initModelValue: 50,
    min: 18,
    max: 122,
    step: 1,
    inputAttrs: { 'data-testid': 'input-element' },
    headingValueAttrs: { 'data-testid': 'value-heading' },
    ariaLabel: 'patient age',
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: { type: 'number' },
    },
    ariaLabel: {
      name: 'aria-label',
      description: 'Use this control to set aria-label attribute.',
      control: 'text',
      table: { category: 'html attributes' },
    },
    min: { control: 'number' },
    max: { control: 'number' },
    modelValue: { control: false },
    inputAttrs: { table: { subcategory: 'Attrs props' } },
    headingValueAttrs: { table: { subcategory: 'Attrs props' } },
  },
};

export const Common = (args) => ({
  components: { UiRange },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiRange 
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :input-attrs="inputAttrs"
    :heading-value-attrs="headingValueAttrs"
    :aria-label="ariaLabel"
    @update:modelValue="onUpdateModelValue"
    @error="onError"
  />`,
});

export const WithDecrementSlot = (args) => ({
  components: {
    UiRange,
    UiButton,
    UiIcon,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
      ...events,
    };
  },
  template: `<UiRange 
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :input-attrs="inputAttrs"
    :heading-value-attrs="headingValueAttrs"
    :aria-label="ariaLabel"
    @update:modelValue="onUpdateModelValue"
    @error="onError"
  >
    <template 
      #decrement="{
        decrement,
        hasControls,
        isMin,
        buttonDecrementAttrs,
        iconDecrementAttrs,
      }"
    >
      <UiButton
        v-if="hasControls"
        v-bind="buttonDecrementAttrs"
        :class="['ui-button--outlined ui-button--circled ui-number-stepper__decrement', {
          'ui-button--is-disabled': isMin
        }]"
        @click="decrement"
      >
        <UiIcon
          v-bind="iconDecrementAttrs"
          class="ui-button__icon"
        />
      </UiButton>
    </template>
  </UiRange>`,
});

export const WithIncrementSlot = (args) => ({
  components: {
    UiRange,
    UiButton,
    UiIcon,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
      ...events,
    };
  },
  template: `<UiRange 
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :input-attrs="inputAttrs"
    :heading-value-attrs="headingValueAttrs"
    :aria-label="ariaLabel"
    @update:modelValue="onUpdateModelValue"
    @error="onError"
  >
    <template 
      #increment="{
        increment,
        hasControls,
        isMax,
        buttonIncrementAttrs,
        iconIncrementAttrs,
      }"
    >
      <UiButton
        v-if="hasControls"
        v-bind="buttonIncrementAttrs"
        :class="['ui-button--outlined ui-button--circled ui-number-stepper__increment', {
          'ui-button--is-disabled': isMax
        }]"
        @click="increment"
      >
        <UiIcon
          v-bind="iconIncrementAttrs"
          class="ui-button__icon"
        />
      </UiButton>
    </template>
  </UiRange>`,
});

export const WithValueSlot = (args) => ({
  components: {
    UiRange,
    UiHeading,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
      ...events,
    };
  },
  template: `<UiRange 
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :input-attrs="inputAttrs"
    :heading-value-attrs="headingValueAttrs"
    :aria-label="ariaLabel"
    @update:modelValue="onUpdateModelValue"
    @error="onError"
  >
    <template 
      #value="{ 
        value,
        headingValueAttrs,
      }"
    >
      <UiHeading
        v-bind="headingValueAttrs"
        class="ui-range__value"
      >
        {{ value }}
      </UiHeading>
    </template>
  </UiRange>`,
});

export const WithRangeSlot = (args) => ({
  components: { UiRange },
  directives: { keyboardFocus },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
      ...events,
    };
  },
  template: `<UiRange 
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :input-attrs="inputAttrs"
    :heading-value-attrs="headingValueAttrs"
    :aria-label="ariaLabel"
    @update:modelValue="onUpdateModelValue"
    @error="onError"
  >
    <template 
      #range="{
        inputAttrs,
        min,
        max,
        change,
        value
      }"
    >
      <input
        v-keyboard-focus
        v-bind="inputAttrs"
        type="range"
        :min="min"
        :max="max"
        :value="value"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="value"
        class="ui-range__track"
        @input="change($event.target.valueAsNumber)"
      />
    </template>
  </UiRange>`,
});
