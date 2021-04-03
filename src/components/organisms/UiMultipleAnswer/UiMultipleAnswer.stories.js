import UiMultipleAnswer from '@/components/organisms/UiMultipleAnswer/UiMultipleAnswer.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiAlert from '@/components/atoms/UiAlert/UiAlert.vue';
import { ref } from 'vue';

export default {
  title: 'Organisms/MultipleAnswer',
  component: UiMultipleAnswer,
  subcomponents: {
    UiList, UiListItem, UiRadio, UiCheckbox, UiText, UiButton, UiIcon, UiAlert,
  },
  args: {
    name: 'diagnosis',
    hint: 'Select one answer',
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
      {
        id: 's_1901',
        name: 'Over 3 days',
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
    translation: {
      explication: 'explication for',
    },
  },
  argTypes: {
    modelValue: {
      control: false,
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
  components: { UiMultipleAnswer },
  setup() {
    const modelValue = ref([]);
    return { ...args, modelValue };
  },
  template: `<UiMultipleAnswer
    v-model="modelValue"
    :choices="choices"
    :name="name"
    :invalid="invalid"
    :hint="hint"
    :touched="touched"
    :translation="translation"
  />`,
});

export const WithMultipleChoices = Template.bind({});
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
    {
      id: 's_305',
      name: 'Vomiting',
      common_name: 'Vomiting',
      source: 'suggest',
    },
    {
      id: 's_81',
      name: 'Chills',
      common_name: 'Chills',
      source: 'suggest',
    },
    {
      id: 's_370',
      name: 'Dizziness',
      common_name: 'Dizzy',
      source: 'suggest',
    },
  ],
};

export const WithSingleChoice = (args) => ({
  components: { UiMultipleAnswer },
  setup() {
    const modelValue = ref({});
    return { ...args, modelValue };
  },
  template: `<UiMultipleAnswer
    v-model="modelValue"
    :choices="choices"
    :name="name"
    :invalid="invalid"
    :hint="hint"
    :touched="touched"
    :translation="translation"
  />`,
});

export const WithHintSlot = (args) => ({
  components: { UiMultipleAnswer, UiAlert },
  setup() {
    const modelValue = ref({});
    return { ...args, modelValue };
  },
  template: `<UiMultipleAnswer
    v-model="modelValue"
    :choices="choices"
    :name="name"
    :invalid="invalid"
    :hint="hint"
    :touched="touched"
    :translation="translation"
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
    UiMultipleAnswer, UiListItem, UiRadio, UiText, UiButton, UiIcon,
  },
  setup() {
    const modelValue = ref({});
    return { ...args, modelValue };
  },
  template: `<UiMultipleAnswer
    v-model="modelValue"
    :choices="choices"
    :name="name"
    :invalid="invalid"
    :hint="hint"
    :touched="touched"
    :translation="translation"
  >
    <template #list-item="{choice, modelValue, updateHandler, errorClass, name, component}">
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
          class="ui-multiple-answer__choice"
          :class="errorClass"
          @update:modelValue="updateHandler(choice)"
        >
          <template #label>
            <div
              class="ui-multiple-answer__label"
              :class="component + '__label'"
            >
              <UiText
                tag="span"
              >
                {{ choice.name }}
              </UiText>
              <UiButton
                v-if="choice.explication"
                :aria-label="translation.explication + ' ' + choice.name"
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
    UiMultipleAnswer, UiRadio, UiText, UiButton, UiIcon,
  },
  setup() {
    const modelValue = ref({});
    return { ...args, modelValue };
  },
  template: `<UiMultipleAnswer
    v-model="modelValue"
    :choices="choices"
    :name="name"
    :invalid="invalid"
    :hint="hint"
    :touched="touched"
    :translation="translation"
  >
    <template #choice-item="{choice, modelValue, updateHandler, errorClass, name, component}">
      <component
        :is="component"
        :id="choice.id"
        :value="choice"
        :model-value="modelValue"
        :name="name"
        class="ui-multiple-answer__choice"
        :class="errorClass"
        @update:modelValue="updateHandler(choice)"
      >
        <template #label>
          <div
            class="ui-multiple-answer__label"
            :class="component + '__label'"
          >
            <UiText
              tag="span"
            >
              {{ choice.name }}
            </UiText>
            <UiButton
              v-if="choice.explication"
              :aria-label="translation.explication + ' ' + choice.name"
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
    UiMultipleAnswer, UiText, UiButton, UiIcon,
  },
  setup() {
    const modelValue = ref({});
    return { ...args, modelValue };
  },
  template: `<UiMultipleAnswer
    v-model="modelValue"
    :choices="choices"
    :name="name"
    :invalid="invalid"
    :hint="hint"
    :touched="touched"
    :translation="translation"
  >
    <template #label-s_1907="{choice, component}">
      <div
        class="ui-multiple-answer__label"
        :class="component + '__label'"
      >
        <UiText
          tag="span"
        >
          {{ choice.name }}
        </UiText>
        <UiButton
          v-if="choice.explication"
          :aria-label="translation.explication + ' ' + choice.name"
          class="ui-multiple-answer__explication ui-button--text ui-button--has-icon"
        >
          <UiIcon icon="info"/>
        </UiButton>
      </div>
    </template>
  </UiMultipleAnswer>`,
});
