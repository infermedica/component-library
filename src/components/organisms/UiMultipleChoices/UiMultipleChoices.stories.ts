import { ref } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import deepmerge from 'deepmerge';
import {
  useArgTypes,
  extendEvents,
} from '@sb/helpers';
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
import './UiMultipleChoices.scss';

type MultipleChoicesArgsType = MultipleChoicesProps;
type MultipleChoicesMetaType = Meta<MultipleChoicesArgsType>;
type MultipleChoicesStoryType = StoryObj<MultipleChoicesArgsType>;

const events = extendEvents([
  'update:modelValue',
  'update:invalid',
]);

const { argTypes } = useArgTypes(deepmerge(UiMultipleChoices, events));

const meta = {
  title: 'Organisms/uiMultipleChoicesTS',
  component: UiMultipleChoices,
  args: {
    modelValue: [],
    items: [
      {
        label: 'I have diabetes',
        textLabelAttrs: { 'data-testid': 'label-text' },
      },
      {
        label: 'I have hypertension',
        textLabelAttrs: { 'data-testid': 'label-text' },
      },
      {
        label: 'I have high cholesterol',
        textLabelAttrs: { 'data-testid': 'label-text' },
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
} satisfies MultipleChoicesMetaType;

export default meta;

export const Basic: MultipleChoicesStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: { UiMultipleChoices },
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

const isSidePanelOpen = ref(false);

function handleButtonInfoClick() {
  isSidePanelOpen.value = !isSidePanelOpen.value;
}

const ExplanationSidePanel = {
  components: {
    UiBulletPoints,
    UiText,
    UiHeading,
    UiSidePanel,
  },
  setup() {
    const title = 'Explanation';
    const modelValue = isSidePanelOpen;
    const items = [
      { text: 'Find the artery on the neck and put your two fingers on it.' },
      { text: 'Count the beat number for 15 seconds and multiply the number by 4.' },
      { text: 'Check if the number is within the normal range for age.' },
    ];

    return {
      modelValue,
      title,
      items,
    };
  },
  template: `<UiSidePanel
    v-model="modelValue"
    :title="title"
    class="multiple-choices-side-panel"
  >
    <UiText class="ui-text--body-1-thick">
      Bradycardia
    </UiText>
    <UiHeading
      :level="3"
      class="multiple-choices-side-panel__heading"
    >
      What does it mean?
    </UiHeading>
    <UiText>
      A heart rate below the normal range for age. Age 0 to 3 months: &lt126 bpm; age 3 to 6 months: &lt116 bpm; age 6 to 12 months: &lt106 bpm.
    </UiText>
    <UiHeading 
      :level="3"
      class="multiple-choices-side-panel__heading"
    >
      How to check it?
    </UiHeading>
    <UiBulletPoints
      :items="items"
      tag="ol"
      type="1"
    />
</UiSidePanel>`,
};

export const WithButtonInfo: MultipleChoicesStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiMultipleChoices,
      ExplanationSidePanel,
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
    template: `
    <div>
      <UiMultipleChoices
        v-model="value"
        v-model:invalid="isInvalid"
        v-bind="args"
      />
      <ExplanationSidePanel />
    </div>`,
  }),
};

WithButtonInfo.args = {
  ...Basic.args,
  items: [
    {
      id: 'i-have-diabetes',
      label: 'I have diabetes',
      translation: { info: 'What does it mean?' },
      buttonInfoAttrs: { onClick: handleButtonInfoClick },
      iconInfoAttrs: { 'data-testid': 'info-icon' },
    },
    {
      id: 'i-have-hypertension',
      label: 'I have hypertension',
    },
    {
      id: 'i-have-hypertension',
      label: 'I have high cholesterol',
      translation: { info: 'How to check it?' },
      buttonInfoAttrs: { onClick: handleButtonInfoClick },
      iconInfoAttrs: { 'data-testid': 'info-icon' },
    },
  ],
};
