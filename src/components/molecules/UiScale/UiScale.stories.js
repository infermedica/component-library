import { ref } from 'vue';
import UiScale from '@/components/molecules/UiScale/UiScale.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { actions } from '@storybook/addon-actions';
import { WithRadioOptionsAttrsAsArray } from '@/components/molecules/UiRating/UiRating.stories';

const events = actions({ onUpdateModelValue: 'update:modelValue' });

export default {
  title: 'Molecules/Scale',
  component: UiScale,
  subcomponents: {
    UiButton,
    UiIcon,
    UiText,
    UiRadio,
  },
  args: {
    initModelValue: 4,
    name: '',
    legend: 'How strong is the headache?',
    steps: 10,
    translation: {
      label: 'Pain scale',
      min: 'Mild',
      max: 'Unbearable',
    },
    radioOptionAttrs: {
      'data-testid': 'option-radio-input',
      radioElementAttrs: { 'data-testid': 'option-radio' },
    },
    textMinAttrs: { 'data-testid': 'min-text' },
    textMaxAttrs: { 'data-testid': 'max-text' },
    numberStepperAttrs: {
      buttonDecrementAttrs: { 'aria-label': 'decrement pain' },
      buttonIncrementAttrs: { 'aria-label': 'increment pain' },
    },
  },
  argTypes: {
    legend: {
      table: { category: 'props' },
      description: 'Use this props to set legend.',
    },
    legendSlot: {
      name: 'Legend',
      table: { category: 'slots' },
      description: 'Use this props to set legend.',
    },
    initModelValue: {
      description: 'Use this control to set initial state. Starting from 0.',
      table: { category: 'stories controls' },
      control: 'number',
    },
    modelValue: { control: false },
    radioOptionAttrs: { table: { subcategory: 'Attrs props' } },
    textMinAttrs: { table: { subcategory: 'Attrs props' } },
    textMaxAttrs: { table: { subcategory: 'Attrs props' } },
    numberStepperAttrs: { table: { subcategory: 'Attrs props' } },
  },
  parameters: {
    cssProperties: {
      '--scale-option-gap': 'var(--space-8)',
      '--scale-controls-gap': '1px',
      '--scale-mobile-controls-margin-block': 'var(--scale-mobile-controls-margin-block-start, var(--space-32)) var(--scale-mobile-controls-margin-block-end, 0)',
      '--scale-mobile-controls-margin-inline': 'var(--scale-mobile-controls-margin-inline-start, 0) var(--scale-mobile-controls-margin-inline-end, 0)',
      '--scale-option-border-block-width': 'var(--scale-option-border-block-start-width, 0) var(--scale-option-border-block-end-width, 0)',
      '--scale-option-border-inline-width': 'var(--scale-option-border-inline-start-width, 0) var(--scale-option-border-inline-end-width, 0)',
      '--scale-option-border-start-start-radius': 'inherit',
      '--scale-option-border-start-end-radius': 'inherit',
      '--scale-option-border-end-start-radius': 'inherit',
      '--scale-option-border-end-end-radius': 'inherit',
      '--scale-square-background': 'var(--color-dataviz-diverging-moderately-negative)',
      '--scale-square-border-start-start-radius': 'inherit',
      '--scale-square-border-start-end-radius': 'inherit',
      '--scale-square-border-end-start-radius': 'inherit',
      '--scale-square-border-end-end-radius': 'inherit',
      '--scale-square-overlay-background': 'var(--color-dataviz-diverging-strongly-negative)',
      '--scale-label-color': 'var(--color-text-on-selection)',
      '--scale-label-padding-block': 'var(--scale-label-padding-block-start, var(--space-8)) var(--scale-label-padding-block-end, var(--space-8))',
      '--scale-label-padding-inline': 'var(--scale-label-padding-inline-start, 0) var(--scale-label-padding-inline-end, 0)',
      '--scale-label-border-start-start-radius': 'inherit',
      '--scale-label-border-start-end-radius': 'inherit',
      '--scale-label-border-end-start-radius': 'inherit',
      '--scale-label-border-end-end-radius': 'inherit',
      '--scale-label-arrow-size': '8px',
      '--scale-checked-label-background': 'var(--color-background-selection)',
      '--scale-description-color': 'var(--color-text-dimmed)',
      '--scale-description-margin-block': 'var(--scale-description-margin-block-start, var(--space-16)) var(--scale-description-margin-block-end, 0)',
      '--scale-description-margin-inline': 'var(--scale-description-margin-inline-start, 0) var(--scale-description-margin-inline-end, 0)',
      '--scale-mild-color': 'var(--_scale-description-color)',
      '--scale-unbearable-color': 'var(--_scale-description-color)',
    },
  },
};

const Template = (args) => ({
  components: { UiScale },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiScale
    v-model="modelValue"
    :name="name"
    :legend="legend"
    :steps="steps"
    :translation="translation"
    :radio-option-attrs="radioOptionAttrs"
    :text-min-attrs="textMinAttrs"
    :text-max-attrs="textMaxAttrs"
    :number-stepper-attrs="numberStepperAttrs"
    @update:modelValue="onUpdateModelValue"
  />`,
});

export const Common = Template.bind({});

export const WithRadioOptionAttrsAsArray = Template.bind({});
WithRadioOptionAttrsAsArray.args = {
  radioOptionAttrs: [
    {},
    {},
    {
      'data-testid': 'third-radio-input-element',
      radioElementAttrs: { 'data-testid': 'third-radio-element' },
      textLabelAttrs: { 'data-testid': 'third-label-text' },
    },
  ],
};
WithRadioOptionAttrsAsArray.parameters = { chromatic: { disableSnapshot: true } };

export const WithDecrementSlot = (args) => ({
  components: {
    UiScale,
    UiButton,
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
  template: `<UiScale
    v-model="modelValue"
    :name="name"
    :legend="legend"
    :steps="steps"
    :translation="translation"
    :radio-option-attrs="radioOptionAttrs"
    :text-min-attrs="textMinAttrs"
    :text-max-attrs="textMaxAttrs"
    :number-stepper-attrs="numberStepperAttrs"
    @update:modelValue="onUpdateModelValue"
  >
    <template #decrement="{
      hasControls,
      buttonDecrementAttrs,
      isMin,
      decrement,
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
  </UiScale>`,
});
WithDecrementSlot.parameters = { chromatic: { disableSnapshot: true } };

export const WithIncrementSlot = (args) => ({
  components: {
    UiScale,
    UiButton,
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
  template: `<UiScale
    v-model="modelValue"
    :name="name"
    :legend="legend"
    :steps="steps"
    :translation="translation"
    :radio-option-attrs="radioOptionAttrs"
    :text-min-attrs="textMinAttrs"
    :text-max-attrs="textMaxAttrs"
    :number-stepper-attrs="numberStepperAttrs"
    @update:modelValue="onUpdateModelValue"
  >
    <template #increment="{
      hasControls,
      buttonIncrementAttrs,
      isMax,
      increment,
      iconIncrementAttrs
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
          class="ui-button__icon"
          icon="plus"
        />
      </UiButton>
    </template>
  </UiScale>`,
});
WithIncrementSlot.parameters = { chromatic: { disableSnapshot: true } };
