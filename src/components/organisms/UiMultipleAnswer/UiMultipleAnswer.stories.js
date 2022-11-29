import UiMultipleAnswer from '@/components/organisms/UiMultipleAnswer/UiMultipleAnswer.vue';
import UiMultipleAnswerItem from '@/components/organisms/UiMultipleAnswer/_internal/UiMultipleAnswerItem.vue';
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
  onClickInfoButton: 'click:info-button',
});

export default {
  title: 'Organisms/MultipleAnswer',
  component: UiMultipleAnswer,
  subcomponents: {
    UiMultipleAnswerItem,
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
      'Seconds to minutes',
      'A few minutes to 4 hours',
      '4 hours to 3 days',
    ],
    name: 'multiple-answer',
    legend: 'How long have you had a fever?',
    hint: 'Select all answers that apply.',
    touched: false,
    hintAlertAttrs: { 'data-testid': 'alert-hint' },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: { category: 'stories controls' },
      control: 'array',
    },
    initInvalid: {
      name: 'invalid',
      description: 'Use this control to set initial state of invalid props.',
      table: { category: 'stories controls' },
      control: 'boolean',
    },
    hint: {
      description: 'Use this props to set hint for question.',
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
      control: 'text',
    },
    hintSlot: {
      name: 'hint',
      description: 'Use this slot to replace hint template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
    modelValue: { control: false },
    invalid: { control: false },
    hintAlertAttrs: { table: { subcategory: 'Attrs props' } },
  },
};

const Template = (args) => ({
  components: { UiMultipleAnswer },
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
    :hint-alert-attrs="hintAlertAttrs"
    @update:modelValue="onUpdateModelValue"
    @update:invalid="onUpdateInvalid"
  />`,
});

export const WithMultipleChoices = Template.bind({});

export const WithError = Template.bind({});
WithError.args = { touched: true };

export const WithButtonInfo = Template.bind({});
WithButtonInfo.args = {
  hint: 'Select all answers that apply',
  items: [
    {
      label: 'Fatigue',
      value: 'fatigue',
      translation: { info: 'How to check it??' },
      textLabelAttrs: { 'data-testid': 'label-text' },
      buttonInfoAttrs: { onClick: events.onClickInfoButton },
      labelInfoAttrs: { 'data-testid': 'suffix-label' },
      iconInfoAttrs: { 'data-testid': 'info-icon' },
    },
    {
      label: 'Fever',
      value: 'fever',
    },
    {
      label: 'Illusion of surrounding objects being bigger or smaller than they actually are',
      value: 'illusion',
      translation: { info: 'What does it mean?' },
      textLabelAttrs: { 'data-testid': 'label-text' },
      buttonInfoAttrs: { onClick: events.onClickInfoButton },
      labelInfoAttrs: { 'data-testid': 'suffix-label' },
      iconInfoAttrs: { 'data-testid': 'info-icon' },
    },
  ],
};

export const WithSingleChoice = Template.bind({});
WithSingleChoice.args = {
  initModelValue: {},
  hint: 'Select one answer.',
  items: [
    {
      label: 'Fatigue',
      value: 'fatigue',
      translation: { info: 'How to check it?' },
      textLabelAttrs: { 'data-testid': 'label-text' },
      buttonInfoAttrs: { onClick: events.onClickInfoButton },
      labelInfoAttrs: { 'data-testid': 'suffix-label' },
      iconInfoAttrs: { 'data-testid': 'info-icon' },
    },
    {
      label: 'Fever',
      value: 'fever',
    },
    {
      label: 'Illusion of surrounding objects being bigger or smaller than they actually are',
      value: 'illusion',
      translation: { info: 'What does it mean?' },
      textLabelAttrs: { 'data-testid': 'label-text' },
      buttonInfoAttrs: { onClick: events.onClickInfoButton },
      labelInfoAttrs: { 'data-testid': 'suffix-label' },
      iconInfoAttrs: { 'data-testid': 'info-icon' },
    },
  ],
};

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
    :items="items"
    :name="name"
    :legend="legend"
    :hint="hint"
    :touched="touched"
    :hint-alert-attrs="hintAlertAttrs"
    @update:modelValue="onUpdateModelValue"
    @update:invalid="onUpdateInvalid"
  >
    <template #hint="{
      hint,
      hintType,
      hintAlertAttrs
    }">
      <UiAlert
        v-if="hint"
        v-bind="hintAlertAttrs"
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
    UiMultipleAnswerItem,
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
    :hint-alert-attrs="hintAlertAttrs"
    @update:modelValue="onUpdateModelValue"
    @update:invalid="onUpdateInvalid"
  >
    <template #list-item="{
      item,
      name,
      hasError,
    }"> 
      <UiMultipleAnswerItem
        v-model="modelValue"
        v-bind="item"
        :name="name"
        :invalid="hasError"
      />
    </template>
  </UiMultipleAnswer>`,
});

export const WithChoiceSlot = (args) => ({
  components: {
    UiMultipleAnswer,
    UiCheckbox,
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
    :hint-alert-attrs="hintAlertAttrs"
    @update:modelValue="onUpdateModelValue"
    @update:invalid="onUpdateInvalid"
  >
    <template #choice="{
      id,
      value,
      invalid,
      label,
      component,
    }">
      <component
        :id="id"
        :is="component"
        v-model="modelValue"
        :value="value"
        :class="[ 
          'ui-list-item__content', 
          { 'ui-checkbox--has-error ui-list-item--has-error': invalid },
        ]"
      >
        {{ label }}
      </component>
    </template>
  </UiMultipleAnswer>`,
});

export const WithLabelChoiceIdSlot = (args) => ({
  components: { UiMultipleAnswer },
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
    :hint-alert-attrs="hintAlertAttrs"
    @update:modelValue="onUpdateModelValue"
    @update:invalid="onUpdateInvalid"
  >
    <template #label-fever="{ label }">
      {{ label }}
    </template>
  </UiMultipleAnswer>`,
});
WithLabelChoiceIdSlot.args = {
  items: [
    {
      label: 'Fatigue',
      value: 'fatigue',
      id: 'fatigue',
    },
    {
      label: 'Fever',
      value: 'fever',
      id: 'fever',
    },
    {
      label: 'Illusion of surrounding objects being bigger or smaller than they actually are',
      value: 'illusion',
      id: 'illusion',
    },
  ],
};
