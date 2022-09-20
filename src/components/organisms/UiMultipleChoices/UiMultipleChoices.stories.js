import UiMultipleChoices from '@/components/organisms/UiMultipleChoices/UiMultipleChoices.vue';
import UiMultipleChoicesItem from '@/components/organisms/UiMultipleChoices/_internal/UiMultipleChoicesItem.vue';
import UiAlert from '@/components/molecules/UiAlert/UiAlert.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onUpdateInvalid: 'update:invalid',
});

export default {
  title: 'Organisms/MultipleChoices',
  component: UiMultipleChoices,
  subcomponents: {
    UiMultipleChoicesItem,
    UiAlert,
    UiList,
  },
  args: {
    initModelValue: [],
    hint: 'Select one answer in each row',
    touched: false,
    initInvalid: true,
    items: [
      {
        id: 9,
        name: 'I have diabetes',
      },
      {
        id: 8,
        name: 'I have hypertension',
      },
      {
        id: 7,
        name: 'I have high cholesterol',
      },
    ],
    options: [
      {
        name: 'Yes',
        value: 'present',
      },
      {
        name: 'No',
        value: 'absent',
      },
      {
        name: 'Don\'t know',
        value: 'unknown',
      },
    ],
    alertHintAttrs: {
      'data-testid': 'alert-hint',
    },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: {
        category: 'stories controls',
      },
      control: 'array',
    },
    initInvalid: {
      name: 'invalid',
      description: 'Use this control to set initial state of invalid props.',
      table: {
        category: 'stories controls',
      },
      control: 'boolean',
    },
    hint: {
      description: 'Use this props to set hint for question.',
      table: {
        category: 'props',
        type: {
          summary: 'string',
        },
      },
      control: 'text',
    },
    hintSlot: {
      name: 'hint',
      description: 'Use this slot to replace hint template.',
      table: {
        category: 'slots',
        type: {
          summary: 'unknown',
        },
      },
    },
    modelValue: {
      control: false,
    },
    invalid: {
      control: false,
    },
  },
};

const Template = (args) => ({
  components: {
    UiMultipleChoices,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    const invalid = ref(args.initInvalid);
    return {
      ...args,
      ...events,
      modelValue,
      invalid,
    };
  },
  template: `<UiMultipleChoices
    v-model="modelValue"
    v-model:invalid="invalid"
    :hint="hint"
    :touched="touched"
    :items="items"
    :options="options"
    @update:modelValue="onUpdateModelValue"
    @update:invalid="onUpdateInvalid"
  />`,
});

export const Common = Template.bind({
});

export const WithButtonInfo = Template.bind({
});
WithButtonInfo.args = {
  choices: [
    {
      id: 19,
      name: 'I have diabetes',
      translation: {
        info: 'What does it mean?',
      },
      buttonInfoAttrs: {
        to: {
          path: '/',
        },
      },
    },
    {
      id: 18,
      name: 'I have hypertension',
    },
    {
      id: 17,
      name: 'I have high cholesterol',
      translation: {
        info: 'How to check it?',
      },
      buttonInfoAttrs: {
        to: {
          path: '/',
        },
      },
    },
  ],
};
