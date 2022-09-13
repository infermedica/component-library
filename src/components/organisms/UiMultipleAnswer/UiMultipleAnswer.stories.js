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
    choices: [
      {
        id: 's_1907',
        name: 'Seconds to minutes',
        explication: null,
        instruction: null,
        choices: [
          {
            id: 'present',
            label: 'Yes',
          },
          {
            id: 'absent',
            label: 'No',
          },
          {
            id: 'unknown',
            label: "Don't know",
          },
        ],
      },
      {
        id: 's_1868',
        name: 'A few minutes to 4 hours',
        explication: null,
        instruction: null,
        choices: [
          {
            id: 'present',
            label: 'Yes',
          },
          {
            id: 'absent',
            label: 'No',
          },
          {
            id: 'unknown',
            label: "Don't know",
          },
        ],
      },
      {
        id: 's_1870',
        name: '4 hours to 3 days',
        explication: null,
        instruction: null,
        choices: [
          {
            id: 'present',
            label: 'Yes',
          },
          {
            id: 'absent',
            label: 'No',
          },
          {
            id: 'unknown',
            label: "Don't know",
          },
        ],
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
    :choices="choices"
    :name="name"
    :legend="legend"
    :hint="hint"
    :touched="touched"
    @update:invalid="onUpdateInvalid"
  />`,
});

export const WithMultipleChoices = Template.bind({
});
WithMultipleChoices.args = {
  name: 'suggest',
  hint: 'Select all answers that apply',
  choices: [
    {
      id: 's_2100',
      name: 'Fatigue',
      common_name: 'Fatigue',
      source: 'suggest',
    },
    {
      id: 's_98',
      name: 'Fever',
      common_name: 'Fever',
      source: 'suggest',
    },
    {
      id: 's_156',
      name: 'Nausea',
      common_name: 'Feeling sick',
      source: 'suggest',
    },
  ],
};

export const WithButtonInfo = Template.bind({
});
WithButtonInfo.args = {
  name: 'suggest',
  hint: 'Select all answers that apply',
  choices: [
    {
      id: 's_2100',
      name: 'Fatigue',
      common_name: 'Fatigue',
      source: 'suggest',
      buttonInfoAttrs: {
        'aria-label': 'how to check it?',
        to: {
          path: '/',
        },
      },
    },
    {
      id: 's_98',
      name: 'Fever',
      common_name: 'Fever',
      source: 'suggest',
    },
    {
      id: 's_81',
      name: 'Illusion of surrounding objects being bigger or smaller than they actually are',
      common_name: 'Illusion',
      source: 'suggest',
      buttonInfoAttrs: {
        'aria-label': 'what does it mean?',
        to: {
          path: '/',
        },
      },
    },
  ],
};

export const WithSingleChoice = (args) => ({
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
    :choices="choices"
    :name="name"
    :legend="legend"
    :hint="hint"
    :touched="touched"
    @update:invalid="onUpdateInvalid"
  />`,
});

export const WithHintSlot = (args) => ({
  components: {
    UiMultipleAnswer,
    UiAlert,
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
    :choices="choices"
    :name="name"
    :legend="legend"
    :hint="hint"
    :touched="touched"
    @update:invalid="onUpdateInvalid"
  >
    <template #hint="{hint, hintType}">
      <UiAlert
        v-if="hint"
        :type="hintType"
        class="ui-multiple-answer__hint"
      >
        {{ hint }}
      </UiAlert>
    </template>
  </UiMultipleAnswer>`,
});

export const WithListItemSlot = (args) => ({
  components: {
    UiMultipleAnswer,
    UiListItem,
    UiCheckbox,
    UiRadio,
    UiText,
    UiButton,
    UiIcon,
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
    :choices="choices"
    :name="name"
    :legend="legend"
    :hint="hint"
    :touched="touched"
    @update:invalid="onUpdateInvalid"
  >
    <template #list-item="{choice, modelValue, updateHandler, errorClass, name, component, componentName}">
      <UiListItem
        class="ui-multiple-answer__list-item"
        :class="{'ui-multiple-answer__list-item--has-error': hasError}"
      >
        <component
          :is="component"
          :id="choice.id"
          :value="choice"
          :model-value="modelValue"
          :name="name"
          :legend="legend"
          class="ui-multiple-answer__choice"
          :class="errorClass"
          @update:modelValue="updateHandler(choice)"
        >
          <template #label>
            <div
              class="ui-multiple-answer__label"
              :class="componentName + '__label'"
            >
              <UiText
                tag="span"
              >
                {{ choice.name }}
              </UiText>
              <UiButton
                v-if="choice.explication"
                v-bind="choice.buttonInfoAttrs"
                class="ui-multiple-answer__explication ui-button--text ui-button--has-icon"
              >
                <UiIcon icon="info"/>
              </UiButton>
            </div>
          </template>
        </component>
      </UiListItem>
    </template>
  </UiMultipleAnswer>`,
});

export const WithChoiceItemSlot = (args) => ({
  components: {
    UiMultipleAnswer,
    UiCheckbox,
    UiRadio,
    UiText,
    UiButton,
    UiIcon,
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
    :choices="choices"
    :name="name"
    :legend="legend"
    :hint="hint"
    :touched="touched"
    @update:invalid="onUpdateInvalid"
  >
    <template #choice-item="{choice, modelValue, updateHandler, errorClass, name, component, componentName}">
      <component
        :is="component"
        :id="choice.id"
        :value="choice"
        :model-value="modelValue"
        :name="name"
        :legend="legend"
        class="ui-multiple-answer__choice"
        :class="errorClass"
        @update:modelValue="updateHandler(choice)"
      >
        <template #label>
          <div
            class="ui-multiple-answer__label"
            :class="componentName + '__label'"
          >
            <UiText
              tag="span"
            >
              {{ choice.name }}
            </UiText>
            <UiButton
              v-if="choice.explication"
              v-bind="choice.buttonInfoAttrs"
              class="ui-multiple-answer__explication ui-button--text ui-button--has-icon"
            >
              <UiIcon icon="info"/>
            </UiButton>
          </div>
        </template>
      </component>
    </template>
  </UiMultipleAnswer>`,
});

export const WithLabelChoiceIdSlot = (args) => ({
  components: {
    UiMultipleAnswer,
    UiText,
    UiButton,
    UiIcon,
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
    :choices="choices"
    :name="name"
    :legend="legend"
    :hint="hint"
    :touched="touched"
    @update:invalid="onUpdateInvalid"
  >
    <template #label-s_1907="{choice, component, componentName}">
      <div
        class="ui-multiple-answer__label"
        :class="componentName + '__label'"
      >
        <UiText
          tag="span"
        >
          {{ choice.name }}
        </UiText>
        <UiButton
          v-if="choice.explication"
          v-bind="choice.buttonInfoAttrs"
          class="ui-multiple-answer__explication ui-button--text ui-button--has-icon"
        >
          <UiIcon icon="info"/>
        </UiButton>
      </div>
    </template>
  </UiMultipleAnswer>`,
});
