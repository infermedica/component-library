import UiMultipleChoices from '@/components/organisms/UiMultipleChoices/UiMultipleChoices.vue';
import UiMultipleChoicesItem from '@/components/organisms/UiMultipleChoices/_internal/UiMultipleChoicesItem.vue';
import UiAlert from '@/components/atoms/UiAlert/UiAlert.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import { ref } from 'vue';

export default {
  title: 'Organisms/MultipleChoices',
  component: UiMultipleChoices,
  subcomponents: {
    UiMultipleChoicesItem, UiAlert, UiList, UiListItem,
  },
  args: {
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
      {
        id: 6,
        question: 37,
        name: 'I’ve been recently injured',
        linked_observation: 'p_264',
      },
      {
        id: 5,
        question: 37,
        name: 'I smoke cigarettes',
        linked_observation: 'p_28',
      },
      {
        id: 4,
        question: 37,
        name: "I'm overweight or obese",
        linked_observation: 'p_7',
      },
      {
        id: 3,
        question: 37,
        name: "I'm pregnant",
        linked_observation: 'p_42',
      },
      {
        id: 2,
        question: 37,
        name: "I'm postmenopausal",
        linked_observation: 'p_11',
      },
    ],
    options: [
      { name: 'Yes', value: 'present' },
      { name: 'No', value: 'absent' },
      { name: 'Don\'t know', value: 'unknown' },
    ],
    hint: 'Select one answer in each row',
    source: 'predefined',
    alertHintAttrs: {
      id: 'hint',
    },
  },
  argTypes: {
    modelValue: {
      control: false,
    },
    source: {
      control: {
        type: 'text',
      },
      description: 'Is deprecated and will be removed',
    },
    hint: {
      control: { type: 'text' },
      table: {
        category: 'props',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiMultipleChoices },
  setup() {
    const modelValue = ref([]);
    return { ...args, modelValue };
  },
  template: `<UiMultipleChoices
    v-model="modelValue"
    :source="source"
    :options="options"
    :choices="choices"
    :hint="hint"
    :invalid="invalid"
    :touched="touched"
    :alert-hint-attrs="alertHintAttrs"
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
    },
    {
      id: 6,
      question: 37,
      name: 'I’ve been recently injured',
      linked_observation: 'p_264',
    },
    {
      id: 5,
      question: 37,
      name: 'I smoke cigarettes',
      linked_observation: 'p_28',
    },
    {
      id: 4,
      question: 37,
      name: "I'm overweight or obese",
      linked_observation: 'p_7',
    },
    {
      id: 3,
      question: 37,
      name: "I'm pregnant",
      linked_observation: 'p_42',
      translation: { info: 'How to check it?' },
      buttonInfoAttrs: {
        to: { path: '/' },
      },
    },
    {
      id: 2,
      question: 37,
      name: "I'm postmenopausal",
      linked_observation: 'p_11',
    },
  ],
};

export const WithHintSlot = (args) => ({
  components: { UiMultipleChoices, UiAlert },
  setup() {
    const modelValue = ref([]);
    return { ...args, modelValue };
  },
  template: `<UiMultipleChoices
    v-model="modelValue"
    :source="source"
    :options="options"
    :choices="choices"
    :hint="hint"
    :invalid="invalid"
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
    const modelValue = ref([]);
    return { ...args, modelValue };
  },
  template: `<UiMultipleChoices
    v-model="modelValue"
    :source="source"
    :options="options"
    :choices="choices"
    :hint="hint"
    :invalid="invalid"
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
    const modelValue = ref([]);
    return { ...args, modelValue };
  },
  template: `<UiMultipleChoices
    v-model="modelValue"
    :source="source"
    :options="options"
    :choices="choices"
    :hint="hint"
    :invalid="invalid"
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
