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
      mild: 'Mild',
      unbearable: 'Unbearable',
    },
    numberStepperAttrs: {
      buttonDecrementAttrs: {
        'aria-label': 'decrement pain',
      },
      buttonIncrementAttrs: {
        'aria-label': 'increment pain',
      },
    },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state. Starting from 0.',
      table: {
        category: 'stories controls',
      },
      control: 'number',
    },
    modelValue: {
      control: false,
    },
  },
};

const Template = (args) => ({
  components: {
    UiScale,
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
    :number-stepper-attrs="numberStepperAttrs"
  />`,
});

export const Common = Template.bind({});

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
    :number-stepper-attrs="numberStepperAttrs"
  >
    <template #decrement="{decrement, hasControls, isMin, attrs}">
      <UiButton
        v-if="hasControls"
        v-bind="attrs"
        class="ui-button--outlined ui-button--circled ui-number-stepper__decrement"
        :class="{'ui-button--is-disabled': isMin}"
        @click="decrement"
      >
        <UiIcon
          class="ui-button__icon"
          icon="minus"
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
    :number-stepper-attrs="numberStepperAttrs"
  >
    <template #increment="{increment, hasControls, isMax, attrs}">
      <UiButton
        v-if="hasControls"
        v-bind="attrs"
        class="ui-button--outlined ui-button--circled ui-number-stepper__increment"
        :class="{'ui-button--is-disabled': isMax}"
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
