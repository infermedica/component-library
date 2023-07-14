import { ref } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { useArgTypes } from '@sb/helpers';
import {
  UiAlert,
  UiBulletPoints,
  UiHeading,
  UiMultipleChoices,
  UiSidePanel,
  UiText,
} from '@index';
import UiMultipleChoicesItem from '@/components/organisms/UiMultipleChoices/_internal/UiMultipleChoicesItem.vue';
import type { MultipleChoicesProps } from '@index';
import type { MultipleChoicesItemAttrsProps } from './_internal/UiMultipleChoicesItem.vue';
import './UiMultipleChoices.scss';

type MultipleChoicesArgsType = MultipleChoicesProps;
type MultipleChoicesMetaType = Meta<MultipleChoicesArgsType>;
type MultipleChoicesStoryType = StoryObj<MultipleChoicesArgsType>;

const { argTypes } = useArgTypes(UiMultipleChoices);

const meta = {
  title: 'Organisms/MultipleChoices',
  component: UiMultipleChoices,
  args: {
    modelValue: [],
    items: [
      {
        label: 'I have diabetes',
        textLabelAttrs: { 'data-testid': 'label-text' },
        translation: { info: 'What does it mean?' },
        iconInfoAttrs: { 'data-testid': 'info-icon' },
      },
      {
        label: 'I have hypertension',
        translation: { info: 'What does it mean? How to check it?' },
        textLabelAttrs: { 'data-testid': 'label-text' },
      },
      {
        label: 'I have high cholesterol',
        textLabelAttrs: { 'data-testid': 'label-text' },
        translation: { info: 'How to check it?' },
        iconInfoAttrs: { 'data-testid': 'info-icon' },
      },
    ],
    options: [
      {
        label: 'Yes',
        value: 'present',
      },
      {
        label: 'No',
        value: 'absent',
      },
      {
        label: "Don't know",
        value: 'unknown',
      },
    ],
    hint: 'Select one answer in each row',
    touched: false,
    invalid: true,
    alertHintAttrs: { 'data-testid': 'alert-hint' },
  },
  argTypes: {
    ...argTypes,
    modelValue: { control: 'object' },
    items: { control: 'object' },
    options: { control: 'object' },
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
      viewports: [
        320,
        1200,
      ],
    },
  },
} satisfies MultipleChoicesMetaType;
export default meta;

const UiSidePanelExplanation = {
  components: {
    UiBulletPoints,
    UiText,
    UiHeading,
    UiSidePanel,
  },
  setup() {
    const symptom = 'Slow heart rate';
    const explication = 'A heart rate below the normal range for age. Age 0 to 3 months: &lt126 bpm; age 3 to 6 months: &lt116 bpm; age 6 to 12 months: &lt106 bpm.';
    const instruction = [
      { text: 'Find the artery on the neck and put your two fingers on it.' },
      { text: 'Count the beat number for 15 seconds and multiply the number by 4.' },
      { text: 'Check if the number is within the normal range for age.' },
    ];

    return {
      symptom,
      explication,
      instruction,
    };
  },
  template: `<UiSidePanel
    title="Explanation"
  >
    <div class="multiple-choices-with-button-info-side-panel-content">
      <UiHeading
        :level="4"
        tag="p"
        class="ui-heading--theme-secondary">
        {{symptom}}
      </UiHeading>
      <div class="multiple-choices-with-button-info-side-panel-content__section">
        <UiHeading
          :level="3"
        >
          What does it mean?
        </UiHeading>
        <UiText>
          {{ explication }}
        </UiText>
      </div>
      <div class="multiple-choices-with-button-info-side-panel-content__section">
        <UiHeading 
          :level="3"
        >
          How to check it?
        </UiHeading>
        <UiBulletPoints
          :items="instruction"
          tag="ol"
        />
      </div>
    </div>
  </UiSidePanel>`,
};

export const Basic: MultipleChoicesStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiMultipleChoices,
      UiSidePanelExplanation,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        invalid,
        ...args
      } = attrs;

      const value = ref(modelValue);
      const isInvalid = ref(invalid);

      return {
        value,
        isInvalid,
        args,
      };
    },
    template: `<UiMultipleChoices
      v-model="value"
      v-model:invalid="isInvalid"
      v-bind="args"
    />`,
  }),
};

export const Explanation: MultipleChoicesStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiMultipleChoices,
      UiSidePanelExplanation,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        invalid,
        items,
        ...args
      } = attrs;

      const value = ref(modelValue);
      const isInvalid = ref(invalid);
      const isSidePanelOpen = ref(false);
      const handleButtonInfoClick = () => {
        isSidePanelOpen.value = !isSidePanelOpen.value;
      };
      const itemsToRender = (items as MultipleChoicesItemAttrsProps[]).map((item) => ({
        ...item,
        buttonInfoAttrs: {
          ...item?.buttonInfoAttrs,
          onClick: handleButtonInfoClick,
        },
      }));

      return {
        value,
        isInvalid,
        args,
        isSidePanelOpen,
        itemsToRender,
      };
    },
    template: `<UiMultipleChoices
      v-model="value"
      v-model:invalid="isInvalid"
      v-bind="args"
      :items="itemsToRender"
    />
    <UiSidePanelExplanation v-model="isSidePanelOpen"/>`,
  }),
};

export const Invalid: MultipleChoicesStoryType = { ...Basic };
Invalid.args = { touched: true };

export const InvalidExplanation: MultipleChoicesStoryType = { ...Explanation };
InvalidExplanation.args = {
  modelValue: [
    'present',
    'absent',
  ],
  touched: true,
};

export const WithHintSlot: MultipleChoicesStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiMultipleChoices,
      UiAlert,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        invalid,
        ...args
      } = attrs;

      const value = ref(modelValue);
      const isInvalid = ref(invalid);

      return {
        value,
        isInvalid,
        args,
      };
    },
    template: `<UiMultipleChoices
      v-model="value"
      v-model:invalid="isInvalid"
      v-bind="args"
    >
      <template #hint="{
        hint,
        alertHintAttrs,
        hintType,
      }">
        <UiAlert
          v-if="hint"
          v-bind="alertHintAttrs"
          :type="hintType"
          class="ui-multiple-choices__hint"
        >
          {{ hint }}
        </UiAlert>
      </template>
    </UiMultipleChoices>`,
  }),
};
WithHintSlot.parameters = { chromatic: { disableSnapshot: true } };

export const WithChoiceSlot: MultipleChoicesStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiMultipleChoices,
      UiMultipleChoicesItem,
    },
    setup(props, { attrs }) {
      const {
        modelValue,
        invalid,
        ...args
      } = attrs;

      const value = ref(modelValue);
      const isInvalid = ref(invalid);

      return {
        value,
        isInvalid,
        args,
      };
    },
    template: `<UiMultipleChoices
      v-model="value"
      v-model:invalid="isInvalid"
      v-bind="args"
    >
        <template #choice="{
          value,
          index,
          item,
          options,
          hasError,
          updateHandler
        }">
          <UiMultipleChoicesItem
            :model-value="value[index]"
            v-bind="item"
            :options="options"
            :invalid="hasError(index)"
            @update:model-value="updateHandler($event, index)"
          />
        </template>
    </UiMultipleChoices>`,
  }),
};
WithChoiceSlot.parameters = { chromatic: { disableSnapshot: true } };
