import UiRange from '@/components/atoms/UiRange/UiRange.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiNumberStepper from '@/components/molecules/UiNumberStepper/UiNumberStepper.vue';
import { ref } from 'vue';
import { expect } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import { actions } from '@storybook/addon-actions';
import { disabled } from '@sb/helpers/argTypes';

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
    disabled: false,
    min: 18,
    max: 122,
    step: 1,
    buttonIncrementAttrs: {
      'aria-label': 'increment age',
      'data-testid': 'increment-age',
    },
    buttonDecrementAttrs: {
      'aria-label': 'decrement age',
      'data-testid': 'decrement-age',
      class: 'unicorn',
    },
    ariaLabel: 'patient age',
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: {
        category: 'stories controls',
      },
      control: {
        type: 'number',
      },
    },
    disabled,
    ariaLabel: {
      name: 'aria-label',
      description: 'Use this control to set aria-label attribute.',
      control: 'text',
      table: {
        category: 'html attributes',
      },
    },
    min: { control: 'number' },
    max: { control: 'number' },
    modelValue: { control: false },
  },
};

export const Common = (args) => ({
  components: { UiRange },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue, ...events };
  },
  template: `<UiRange 
  v-model="modelValue"
  :min="min"
  :max="max"
  :step="step"
  :button-increment-attrs="buttonIncrementAttrs"
  :button-decrement-attrs="buttonDecrementAttrs"
  :aria-label="ariaLabel"
  @update:modelValue="onUpdateModelValue"
  @error="onError"
  class="custom"
/>`,
});
Common.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('increment-age'));
  await expect(canvas.getByText('51')).toBeInTheDocument();
  await userEvent.click(canvas.getByTestId('decrement-age'));
  await expect(canvas.getByText('50')).toBeInTheDocument();
};

export const WithDecrementSlot = (args) => ({
  components: { UiRange, UiButton, UiIcon },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue, ...events };
  },
  template: `<UiRange 
  v-model="modelValue"
  :min="min"
  :max="max"
  :step="step"
  :button-increment-attrs="buttonIncrementAttrs"
  :button-decrement-attrs="buttonDecrementAttrs"
  :aria-label="ariaLabel"
  @update:modelValue="onUpdateModelValue"
  @error="onError"
>
  <template #decrement="{decrement, attrs}">
    <UiButton
      v-bind="attrs"
      class="ui-button--circled ui-button--outlined ui-button--has-icon ui-number-stepper__decrement"
      @click="decrement"
    >
      <UiIcon icon="minus" />
    </UiButton>
  </template>
</UiRange>`,
});

export const WithIncrementSlot = (args) => ({
  components: { UiRange, UiButton, UiIcon },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue, ...events };
  },
  template: `<UiRange 
  v-model="modelValue"
  :min="min"
  :max="max"
  :step="step"
  :button-increment-attrs="buttonIncrementAttrs"
  :button-decrement-attrs="buttonDecrementAttrs"
  :aria-label="ariaLabel"
  @update:modelValue="onUpdateModelValue"
  @error="onError"
>
  <template #increment="{increment, attrs}">
    <UiButton
      v-bind="attrs"
      class="ui-button--circled ui-button--outlined ui-button--has-icon ui-number-stepper__increment"
      @click="increment"
    >
      <UiIcon icon="plus" />
    </UiButton>
  </template>
</UiRange>`,
});

export const WithValueSlot = (args) => ({
  components: { UiRange, UiText },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue, ...events };
  },
  template: `<UiRange 
  v-model="modelValue"
  :min="min"
  :max="max"
  :step="step"
  :button-increment-attrs="buttonIncrementAttrs"
  :button-decrement-attrs="buttonDecrementAttrs"
  :aria-label="ariaLabel"
  @update:modelValue="onUpdateModelValue"
  @error="onError"
>
  <template #value="{value}">
    <UiText
      tag="span"
      class="ui-range__value"
    >
      {{ value }}
    </UiText>
  </template>
</UiRange>`,
});

export const WithRangeSlot = (args) => ({
  components: { UiRange },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue, ...events };
  },
  template: `<UiRange 
  v-model="modelValue"
  :min="min"
  :max="max"
  :step="step"
  :button-increment-attrs="buttonIncrementAttrs"
  :button-decrement-attrs="buttonDecrementAttrs"
  :aria-label="ariaLabel"
  @update:modelValue="onUpdateModelValue"
  @error="onError"
>
  <template #range="{attrs, min, max, value, change}">
    <input
      v-bind="attrs"
      type="range"
      :min="min"
      :max="max"
      :value="value"
      class="ui-range__track"
      @input="change($event.target.valueAsNumber)"
    >
  </template>
</UiRange>`,
});
