import UiScale from '@/components/molecules/UiScale/UiScale.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import { ref } from 'vue';

export default {
  title: 'Molecules/Scale',
  component: UiScale,
  subcomponents: {
    UiButton, UiIcon, UiText, UiRadio,
  },
  args: {
    modelValue: 5,
    name: 'scale',
    steps: 10,
    translation: {
      mild: 'Mild',
      unbearable: 'Unbearable',
    },
    buttonDecrementAttrs: { 'aria-label': 'decrement pain' },
    buttonIncrementAttrs: { 'aria-label': 'increment pain' },
  },
  argTypes: {
    modelValue: {
      control: false,
    },
    name: {
      control: 'text',
    },
  },
};

const Template = (args) => ({
  components: { UiScale },
  setup() {
    const modelValue = ref(5);
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
    const modelValue = ref(5);
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
    <template #decrement="attrs, decrement">
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
    const modelValue = ref(5);
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
    <template #increment="attrs, increment">
      <UiButton
        class="ui-scale__increment ui-button--outlined ui-button--circled ui-button--has-icon"
        v-bind="attrs"
        @click="decrement"
      >
        <UiIcon
          icon="plus"
        />
      </UiButton>
    </template>
  </UiScale>`,
});
