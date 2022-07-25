import { ref } from 'vue';
import UiScale from '@/components/molecules/UiScale/UiScale.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';

export default {
  title: 'Molecules/Scale',
  component: UiScale,
  subcomponents: {
    UiButton, UiIcon, UiText, UiRadio,
  },
  args: {
    initModelValue: 4,
    name: '',
    steps: 10,
    translation: {
      mild: 'Mild',
      unbearable: 'Unbearable',
    },
    buttonDecrementAttrs: { 'aria-label': 'decrement pain' },
    buttonIncrementAttrs: { 'aria-label': 'increment pain' },
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
  parameters: {
    cssprops: {
      'scale-option-active-transform': {
        value: 'scale(0.96)',
        control: 'text',
        description: '',
      },
      'scale-square-base-background': {
        value: 'var(--color-dataviz-diverging-track)',
        control: 'text',
        description: '',
      },
      'scale-square-overlay-background': {
        value: 'var(--color-dataviz-diverging-strongly-negative)',
        control: 'text',
        description: '',
      },
      'scale-square-overlay-opacity': {
        value: '0',
        control: 'text',
        description: '',
      },
      'scale-label-background': {
        value: 'var(--color-background-selection)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiScale },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiScale
    v-model="modelValue"
    :name="name"
    :steps="steps"
    :translation="translation"
    :button-decrement-attrs="buttonDecrementAttrs"
    :button-increment-attrs="buttonIncrementAttrs"
  />`,
});

export const Common = Template.bind({});

export const WithDecrementSlot = (args) => ({
  components: { UiScale, UiButton, UiIcon },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiScale
    v-model="modelValue"
    :name="name"
    :steps="steps"
    :translation="translation"
    :button-decrement-attrs="buttonDecrementAttrs"
    :button-increment-attrs="buttonIncrementAttrs"
  >
    <template #decrement="{attrs, decrement}">
      <UiButton
        class="ui-scale__decrement ui-button--outlined ui-button--circled ui-button--has-icon"
        v-bind="attrs"
        @click="decrement"
      >
        <UiIcon
          icon="minus"
        />
      </UiButton>
    </template>
  </UiScale>`,
});

export const WithIncrementSlot = (args) => ({
  components: { UiScale, UiButton, UiIcon },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiScale
    v-model="modelValue"
    :name="name"
    :steps="steps"
    :translation="translation"
    :button-decrement-attrs="buttonDecrementAttrs"
    :button-increment-attrs="buttonIncrementAttrs"
  >
    <template #increment="{attrs, increment}">
      <UiButton
        class="ui-scale__increment ui-button--outlined ui-button--circled ui-button--has-icon"
        v-bind="attrs"
        @click="increment"
      >
        <UiIcon
          icon="plus"
        />
      </UiButton>
    </template>
  </UiScale>`,
});
