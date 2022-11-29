import { ref } from 'vue';
import UiScale from '@/components/molecules/UiScale/UiScale.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';

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
};

const Template = (args) => ({
  components: { UiScale },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
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
  />`,
});

export const Common = Template.bind({});

export const WithRadioOptionAttrsAsArray = Template.bind({});
WithRadioOptionAttrsAsArray.args = {
  radioOptionAttrs: [
    undefined,
    undefined,
    {
      'data-testid': 'third-radio-input-element',
      radioElementAttrs: { 'data-testid': 'third-radio-element' },
      textLabelAttrs: { 'data-testid': 'third-label-text' },
    },
  ],
};

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
