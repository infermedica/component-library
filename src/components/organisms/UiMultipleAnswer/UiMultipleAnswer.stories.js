import UiMultipleAnswer from '@/components/organisms/UiMultipleAnswer/UiMultipleAnswer.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
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
  title: 'Organisms/MultipleAnswer',
  component: UiMultipleAnswer,
  subcomponents: {
    UiList,
    UiListItem,
    UiRadio,
    UiCheckbox,
    UiText,
    UiButton,
    UiIcon,
    UiAlert,
  },
  args: {
    initModelValue: [],
    initInvalid: true,
    items: [
      {
        name: 'Seconds to minutes',
      },
      {
        name: 'A few minutes to 4 hours',
      },
      {
        name: '4 hours to 3 days',
      },
    ],
    name: 'diagnosis',
    legend: 'How long have you had a fever?',
    hint: 'Select one answer',
    touched: false,
    alertHintAttrs: {
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
    UiMultipleAnswer,
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
  template: `<UiMultipleAnswer
    v-model="modelValue"
    v-model:invalid="invalid"
    :items="items"
    :name="name"
    :legend="legend"
    :hint="hint"
    :touched="touched"
    @update:modelValue="onUpdateModelValue"
    @update:invalid="onUpdateInvalid"
  />`,
});

export const WithMultipleChoices = Template.bind({
});
WithMultipleChoices.args = {
  name: 'suggest',
  hint: 'Select all answers that apply',
  items: [
    {
      name: 'Fatigue',
    },
    {
      name: 'Fever',
    },
    {
      name: 'Nausea',
    },
  ],
};

export const WithButtonInfo = Template.bind({
});
WithButtonInfo.args = {
  name: 'suggest',
  hint: 'Select all answers that apply',
  items: [
    {
      name: 'Fatigue',
      buttonInfoAttrs: {
        'aria-label': 'how to check it?',
        to: {
          path: '/',
        },
      },
    },
    {
      name: 'Fever',
    },
    {
      name: 'Illusion of surrounding objects being bigger or smaller than they actually are',
      buttonInfoAttrs: {
        'aria-label': 'what does it mean?',
        to: {
          path: '/',
        },
      },
    },
  ],
};

export const WithSingleChoice = Template.bind({
});
WithSingleChoice.args = {
  initModelValue: {
  },
  items: [
    {
      name: 'Fatigue',
      buttonInfoAttrs: {
        'aria-label': 'how to check it?',
        to: {
          path: '/',
        },
      },
    },
    {
      name: 'Fever',
    },
    {
      name: 'Illusion of surrounding objects being bigger or smaller than they actually are',
      buttonInfoAttrs: {
        'aria-label': 'what does it mean?',
        to: {
          path: '/',
        },
      },
    },
  ],
};
