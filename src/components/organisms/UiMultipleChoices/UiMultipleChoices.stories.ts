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

const ExplanationSidePanel = {
  components: {
    UiBulletPoints,
    UiText,
    UiHeading,
    UiSidePanel,
  },
  setup() {
    const title = 'Explanation';
    const modelValue = ref(false);
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
  >
    <div class="multiple-choices-with-button-info-side-panel-content">
      <UiHeading
        :level="4"
        tag="p"
        class="ui-heading--theme-secondary">
        Bradycardia
      </UiHeading>
      <div class="multiple-choices-with-button-info-side-panel-content__section">
        <UiHeading
          :level="3"
        >
          What does it mean?
        </UiHeading>
        <UiText>
          A heart rate below the normal range for age. Age 0 to 3 months: &lt126 bpm; age 3 to 6 months: &lt116 bpm; age 6 to 12 months: &lt106 bpm.
        </UiText>
      </div>
      <div class="multiple-choices-with-button-info-side-panel-content__section">
        <UiHeading 
          :level="3"
        >
          How to check it?
        </UiHeading>
        <UiBulletPoints
          :items="items"
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
      ExplanationSidePanel,
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

      function handleButtonInfoClick() {
        isSidePanelOpen.value = !isSidePanelOpen.value;
      }
      const multipleChoicesItems = (items as MultipleChoicesItemAttrsProps[]).map((item) => (
        item.translate ? {
          ...item,
          buttonInfoAttrs: { onClick: handleButtonInfoClick },
        } : item));

      return {
        value,
        isInvalid,
        multipleChoicesItems,
        isSidePanelOpen,
        args,
      };
    },
    template: `<UiMultipleChoices
      v-model="value"
      v-model:invalid="isInvalid"
      :items="multipleChoicesItems"
      v-bind="args"
    />
    <ExplanationSidePanel v-model="isSidePanelOpen" />`,
  }),
};

export const WithButtonInfo: MultipleChoicesStoryType = { ...Basic };
WithButtonInfo.args = {
  items: meta.args.items.map((item) => ({
    ...item,
    translation: { info: 'How to check it?' },
    iconInfoAttrs: { 'data-testid': 'info-icon' },
    buttonInfoAttrs: { onClick: undefined },
  })),
};

export const WithErrors: MultipleChoicesStoryType = { ...Basic };
WithErrors.args = { touched: true };

// export const WithOneError: MultipleChoicesStoryType = { ...WithButtonInfo };
// WithOneError.args = {
//   ...Basic.args,
//   modelValue: [
//     'present',
//     'absent',
//   ],
//   touched: true,
//   items: buttonInfoItems,
// };

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
