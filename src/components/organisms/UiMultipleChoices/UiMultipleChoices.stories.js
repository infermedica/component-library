import UiMultipleChoices from '@/components/organisms/UiMultipleChoices/UiMultipleChoices.vue';
import UiMultipleChoicesItem from '@/components/organisms/UiMultipleChoices/_internal/UiMultipleChoicesItem.vue';
import UiAlert from '@/components/molecules/UiAlert/UiAlert.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';

const events = actions({
  onUpdateInvalid: 'update:invalid',
});

export default {
  title: 'Organisms/MultipleChoices',
  component: UiMultipleChoices,
  subcomponents: {
    UiMultipleChoicesItem, UiAlert, UiList, UiListItem,
  },
  args: {
    initModelValue: [],
    initInvalid: true,
    source: 'predefined',
    options: [
      { name: 'Yes', value: 'present' },
      { name: 'No', value: 'absent' },
      { name: 'Don\'t know', value: 'unknown' },
    ],
    hint: 'Select one answer in each row',
    choices: [
      {
        id: 9,
        question: 37,
        name: 'I have diabetes',
        linked_observation: 'p_8',
      },
      {
        id: 8,
        question: 37,
        name: 'I have hypertension',
        linked_observation: 'p_9',
      },
      {
        id: 7,
        question: 37,
        name: 'I have high cholesterol',
        linked_observation: 'p_10',
      },
    ],
    touched: false,
    alertHintAttrs: {},
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
  components: { UiMultipleChoices },
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
    :source="source"
    :options="options"
    :choices="choices"
    :hint="hint"
    :touched="touched"
    :alert-hint-attrs="alertHintAttrs"
    @update:invalid="onUpdateInvalid"
  />`,
});

export const Common = Template.bind({});

export const WithButtonInfo = Template.bind({});
WithButtonInfo.args = {
  choices: [
    {
      id: 9,
      question: 37,
      name: 'I have diabetes',
      linked_observation: 'p_8',
      translation: { info: 'What does it mean?' },
      buttonInfoAttrs: {
        to: { path: '/' },
      },
    },
    {
      id: 8,
      question: 37,
      name: 'I have hypertension',
      linked_observation: 'p_9',
    },
    {
      id: 7,
      question: 37,
      name: 'I have high cholesterol',
      linked_observation: 'p_10',
      translation: { info: 'How to check it?' },
      buttonInfoAttrs: {
        to: { path: '/' },
      },
    },
  ],
};

export const WithHintSlot = (args) => ({
  components: { UiMultipleChoices, UiAlert },
  setup() {
    const modelValue = ref(args.initModelValue);
    const invalid = ref(args.initInvalid);
    return {
      ...args,
      modelValue,
      invalid,
    };
  },
  template: `<UiMultipleChoices
    v-model="modelValue"
    v-model:invalid="invalid"
    :source="source"
    :options="options"
    :choices="choices"
    :hint="hint"
    :touched="touched"
    :alert-hint-attrs="alertHintAttrs"
  >
    <template #hint="{hint, hintType}">
      <UiAlert
        v-if="hint"
        :type="hintType"
        class="ui-multiple-choices__hint"
      >
        {{ hint }}
      </UiAlert>
    </template>
  </UiMultipleChoices>`,
});

export const WithListItemSlot = (args) => ({
  components: { UiMultipleChoices, UiListItem, UiMultipleChoicesItem },
  setup() {
    const modelValue = ref(args.initModelValue);
    const invalid = ref(args.initInvalid);
    return {
      ...args,
      modelValue,
      invalid,
    };
  },
  template: `<UiMultipleChoices
    v-model="modelValue"
    v-model:invalid="invalid"
    :source="source"
    :options="options"
    :choices="choices"
    :hint="hint"
    :touched="touched"
    :alert-hint-attrs="alertHintAttrs"
  >
    <template #list-type="{choice, options, evidences, updateHandler, hasError}">
      <UiListItem class="ui-multiple-choices__list-item">
        <UiMultipleChoicesItem
          :choice="choice"
          :options="options"
          :model-value="evidences"
          :invalid="hasError(choice.id)"
          class="ui-multiple-choices__choice"
          @update:modelValue="updateHandler($event)"
        />
      </UiListItem>
    </template>
  </UiMultipleChoices>`,
});

export const WithChoiceItem = (args) => ({
  components: { UiMultipleChoices, UiMultipleChoicesItem },
  setup() {
    const modelValue = ref(args.initModelValue);
    const invalid = ref(args.initInvalid);
    return {
      ...args,
      modelValue,
      invalid,
    };
  },
  template: `<UiMultipleChoices
    v-model="modelValue"
    v-model:invalid="invalid"
    :source="source"
    :options="options"
    :choices="choices"
    :hint="hint"
    :touched="touched"
    :alert-hint-attrs="alertHintAttrs"
  >
    <template #choice-item="{choice, options, evidences, hasError, updateHandler}">
      <UiMultipleChoicesItem
        :choice="choice"
        :options="options"
        :model-value="evidences"
        :invalid="hasError(choice.id)"
        class="ui-multiple-choices__choice"
        @update:modelValue="updateHandler($event)"
      />
    </template>
  </UiMultipleChoices>`,
});
