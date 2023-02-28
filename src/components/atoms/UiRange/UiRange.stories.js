import UiRange from '@/components/atoms/UiRange/UiRange.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiNumberStepper from '@/components/molecules/UiNumberStepper/UiNumberStepper.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';
import { keyboardFocus } from '@/utilities/directives/index.ts';
import { WithLabelSlot } from '@/components/atoms/UiRadio/UiRadio.stories';

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
  parameters: {
    cssProperties: {
      '--range-thumb-size': '3rem',
      '--range-padding-block': 'var(--range-padding-block-start, calc(var(--_range-thumb-size) + 0.5rem)) var(--range-padding-block-end, 0)',
      '--range-padding-inline': 'var(--range-padding-inline-start, 0) var(--range-padding-inline-end, 0)',
      '--range-tablet-input-margin-block': 'var(--range-tablet-input-margin-block-start, 0) var(--range-tablet-input-margin-block-end, 0)',
      '--range-tablet-input-margin-inline': 'var(--range-tablet-input-margin-inline-start, 0) var(--range-tablet-input-margin-inline-end, 0)',
      '--range-track-background': 'var(--color-progress-track)',
      '--range-runnable-track-background': 'var(--color-range-progress-indicator)',
      '--range-track-height': '4px',
      '--range-track-border-start-start-radius': 'var(--_range-track-height)',
      '--range-track-border-start-end-radius': 'var(--_range-track-height)',
      '--range-track-border-end-start-radius': 'var(--_range-track-height)',
      '--range-track-border-end-end-radius': 'var(--_range-track-height)',
      '--range-value-margin-bottom': 'var(--space-8)',
      '--range-thumb-background-color': 'var(--color-range-thumb)',
      '--range-track-margin-block': 'var(--range-track-margin-block-start, 0) var(--range-track-margin-block-end, 0)',
      '--range-track-margin-inline': 'var(--range-track-margin-inline-start, 0) var(--range-track-margin-inline-end, 0)',
      '--range-thumb-border-block': 'var(--range-thumb-border-block-start, 0) var(--range-thumb-border-block-end, 0)',
      '--range-thumb-border-inline': 'var(--range-thumb-border-inline-start, 0) var(--range-thumb-border-inline-end, 0)',
      '--range-thumb-border-start-start-radius': 'var(--border-radius-circle)',
      '--range-thumb-border-start-end-radius': 'var(--border-radius-circle)',
      '--range-thumb-border-end-start-radius': 'var(--border-radius-circle)',
      '--range-thumb-border-end-end-radius': 'var(--border-radius-circle)',
      '--range-thumb-background-image': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath d='M34 12l-2.828 2.828L40.344 24l-9.172 9.172L34 36l12-12zm0 0M14 12l2.828 2.828L7.656 24l9.172 9.172L14 36 2 24zm0 0' fill-rule='evenodd' fill='%23fff'/%3E%3C/svg%3E%0A\")",
      '--range-thumb-icon-size': '1.5rem',
      '--range-thumb-box-shadow': 'var(--box-shadow-high)',
      '--range-thumb-transition': 'background-color 150ms ease-in-out',
      '--range-thumb-hover-background-color': 'var(--color-range-thumb-hover)',
      '--range-thumb-active-background-color': 'var(--color-range-thumb-active)',
    },
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
    <template #decrement="{
      decrement,
      hasControls,
      isMin,
      buttonDecrementAttrs,
      iconDecrementAttrs,
    }">
      <UiButton
        v-if="hasControls"
        v-bind="buttonDecrementAttrs"
        :class="[ 
          'ui-button--outlined ui-button--circled ui-number-stepper__decrement', 
          { 'ui-button--is-disabled': isMin },
        ]"
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
WithDecrementSlot.parameters = { chromatic: { disableSnapshot: true } };

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
    <template #increment="{
      increment,
      hasControls,
      isMax,
        buttonIncrementAttrs,
      iconIncrementAttrs,
    }">
      <UiButton
        v-if="hasControls"
        v-bind="buttonIncrementAttrs"
        :class="[ 
          'ui-button--outlined ui-button--circled ui-number-stepper__increment', 
          { 'ui-button--is-disabled': isMax },
       ]"
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
WithIncrementSlot.parameters = { chromatic: { disableSnapshot: true } };

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
    <template #value="{ 
      value,
      headingValueAttrs,
    }">
      <UiHeading
        v-bind="headingValueAttrs"
        class="ui-range__value"
      >
        {{ value }}
      </UiHeading>
    </template>
  </UiRange>`,
});
WithValueSlot.parameters = { chromatic: { disableSnapshot: true } };

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
    <template #range="{
      inputAttrs,
      min,
      max,
      change,
      value
    }">
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
WithRangeSlot.parameters = { chromatic: { disableSnapshot: true } };
