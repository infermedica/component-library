import UiRating from '@/components/molecules/UiRating/UiRating.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import { ref } from 'vue';
import { modifiers } from '@sb/helpers/argTypes';

export default {
  title: 'Molecules/Rating',
  component: UiRating,
  subcomponents: {
    UiRadio,
    UiIcon,
  },
  args: {
    initModelValue: 3,
    modifiers: [],
    max: 5,
    name: '',
    tag: 'fieldset',
    legend: 'How helpful was this checkup for you?',
    settings: {
      iconDefault: 'star-outlined',
      iconActive: 'star-filled',
    },
    translation: { stars: (index) => (`${index} stars`) },
    radioOptionAttrs: { 'data-testid': 'option-radio-input' },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state. Starting from 0.',
      table: { category: 'stories controls' },
      control: 'number',
    },
    modifiers: modifiers({ options: [ 'ui-rating--is-disabled' ] }),
    modelValue: { control: false },
    radioOptionAttrs: { table: { subcategory: 'Attrs props' } },
  },
};

const Template = (args) => ({
  components: { UiRating },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiRating
    v-model="modelValue"
    :max="max"
    :name="name"
    :tag="tag"
    :legend="legend"
    :settings="settings"
    :translation="translation"
    :radio-option-attrs="radioOptionAttrs"
    :class="modifiers"
  />{{modelValue}}`,
});

export const Common = Template.bind({});

export const IsDisabled = Template.bind({});
IsDisabled.args = { modifiers: [ 'ui-rating--is-disabled' ] };

export const WithRadioOptionsAttrsAsArray = Template.bind({});
WithRadioOptionsAttrsAsArray.args = {
  radioOptionAttrs: [
    { 'data-testid': 'first-option-radio-input' },
    undefined,
    {
      'data-testid': 'third-option-radio-input',
      iconDefaultAttrs: {
        icon: 'star-outlined',
        'data-testid': 'third-option-icon-default',
      },
      iconActiveAttrs: {
        icon: 'star-filled',
        'data-testid': 'third-option-icon-active',
      },
    },
  ],
};

export const WithIconSlot = (args) => ({
  components: {
    UiRating,
    UiIcon,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiRating
      v-model="modelValue"
      :max="max"
      :name="name"
      :tag="tag"
      :legend="legend"
      :settings="settings"
      :translation="translation"
      :radio-option-attrs="radioOptionAttrs"
      :class="modifiers"
  >
    <template 
      #icon="{
        index,
        finalScore,
        iconActiveAttrs,
        iconDefaultAttrs,
      }"
    >
      <template v-if="index <= finalScore">
        <UiIcon
          v-bind="iconActiveAttrs"
          class="ui-rating__icon"
        />
      </template>
      <template v-else>
        <UiIcon
            v-bind="iconDefaultAttrs"
            class="ui-rating__icon"
        />
      </template>
    </template>
  </UiRating>`,
});
