import UiMultipleChoices from '@/components/organisms/UiMultipleChoices/UiMultipleChoices.vue';
import UiMultipleChoicesItem from '@/components/organisms/UiMultipleChoices/_internal/UiMultipleChoicesItem.vue';
import UiAlert from '@/components/molecules/UiAlert/UiAlert.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import {
  ref,
  computed,
  nextTick,
} from 'vue';
import { actions } from '@storybook/addon-actions';
import { modifiers } from '@sb/helpers/argTypes';
import focusOnInvalidChoice from '@/utilities/helpers/focus-on-first-invalid-choice';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onUpdateInvalid: 'update:invalid',
  onClickInfoButton: 'click:info-button',
});

export default {
  title: 'Organisms/MultipleChoices',
  component: UiMultipleChoices,
  args: {
    initModelValue: [],
    modifiers: [],
    hint: 'Select one answer in each row',
    touched: false,
    initInvalid: true,
    items: [
      {
        label: 'I have diabetes',
        textLabelAttrs: { 'data-testid': 'label-text' },
      },
      { label: 'I have hypertension' },
      { label: 'I have high cholesterol' },
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
    alertHintAttrs: { 'data-testid': 'alert-hint' },
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
    modifiers: modifiers({ options: [ 'ui-multiple-choices--stacked' ] }),
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
    alertHintAttrs: { table: { subcategory: 'Attrs props' } },
  },
  parameters: {
    cssProperties: {
      '--multiple-choices-hint-padding-block': 'var(--multiple-choices-hint-padding-block-start, 0) var(--multiple-choices-hint-padding-block-end, var(--space-12))',
      '--multiple-choices-hint-padding-inline': 'var(--multiple-choices-hint-padding-inline-start, var(--space-20)) var(--multiple-choices-hint-padding-inline-end, var(--space-20))',
      '--multiple-choices-tablet-hint-padding-block': 'var(--multiple-choices-tablet-hint-padding-block-start, 0) var(--multiple-choices-tablet-hint-padding-block-end, var(--space-12))',
      '--multiple-choices-tablet-hint-padding-inline': 'var(--multiple-choices-tablet-hint-padding-inline-start, 0) var(--multiple-choices-tablet-hint-padding-inline-end, 0)',
    },
  },
};

export const Common = {
  render: (args) => ({
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
      :hint="hint"
      :touched="touched"
      :items="items"
      :options="options"
      :alert-hint-attrs="alertHintAttrs"
      @update:modelValue="onUpdateModelValue"
      @update:invalid="onUpdateInvalid"
    />`,
  }),
};

export const WithError = {
  render: (args) => ({
    components: { UiMultipleChoices },
    setup() {
      const modelValue = ref(args.initModelValue);
      const invalid = ref(args.initInvalid);
      const invalidChoices = ref(null);

      const handleSubmit = async () => {
        const { focusInvalidInput } = focusOnInvalidChoice(invalidChoices);

        await nextTick();
        await nextTick();
        focusInvalidInput();
      };

      handleSubmit();

      return {
        ...args,
        ...events,
        modelValue,
        invalid,
        invalidChoices,
      };
    },
    template: `<UiMultipleChoices
      ref="invalidChoices"
      v-model="modelValue"
      v-model:invalid="invalid"
      :hint="hint"
      :touched="touched"
      :items="items"
      :options="options"
      :alert-hint-attrs="alertHintAttrs"
      @update:modelValue="onUpdateModelValue"
      @update:invalid="onUpdateInvalid"
    />`,
  }),

  args: { touched: true },
};

export const WithOneCorrectAnswerAndErrors = {
  render: (args) => ({
    components: { UiMultipleChoices },
    setup() {
      const modelValue = ref(args.initModelValue);
      const invalid = ref(args.initInvalid);
      const invalidChoices = ref(null);

      const handleSubmit = async () => {
        const { focusInvalidInput } = focusOnInvalidChoice(invalidChoices);

        await nextTick();
        await nextTick();
        focusInvalidInput();
      };

      handleSubmit();

      return {
        ...args,
        ...events,
        modelValue,
        invalid,
        invalidChoices,
      };
    },
    template: `<UiMultipleChoices
      ref="invalidChoices"
      v-model="modelValue"
      v-model:invalid="invalid"
      :hint="hint"
      :touched="touched"
      :items="items"
      :options="options"
      :alert-hint-attrs="alertHintAttrs"
      @update:modelValue="onUpdateModelValue"
      @update:invalid="onUpdateInvalid"
    />`,
  }),

  args: {
    touched: true,
    initModelValue: [
      null,
      'present',
    ],
  },
};

export const WithButtonInfo = {
  render: (args) => ({
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
      :hint="hint"
      :touched="touched"
      :items="items"
      :options="options"
      :alert-hint-attrs="alertHintAttrs"
      @update:modelValue="onUpdateModelValue"
      @update:invalid="onUpdateInvalid"
    />`,
  }),

  args: {
    items: [
      {
        id: 'i-have-diabetes',
        label: 'I have diabetes',
        translation: { info: 'What does it mean?' },
        buttonInfoAttrs: { onClick: events.onClickInfoButton },
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
        buttonInfoAttrs: { onClick: events.onClickInfoButton },
        iconInfoAttrs: { 'data-testid': 'info-icon' },
      },
    ],
  },
};

export const AsEvidence = {
  render: (args) => ({
    components: { UiMultipleChoices },
    setup() {
      const { items } = args;
      const modelValue = ref(args.initModelValue);
      const invalid = ref(args.initInvalid);
      const evidence = computed(() => modelValue.value.map((item, index) => ({
        choice_id: item,
        id: items[index].linked_observation,
        source: 'suggest',
      })));
      return {
        ...args,
        ...events,
        modelValue,
        invalid,
        evidence,
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
  }),

  args: {
    items: [
      {
        linked_observation: 'p_7',
        label: 'High BMI',
      },
      {
        linked_observation: 'p_9',
        label: 'I have hypertension',
      },
      {
        linked_observation: 'p_28',
        label: 'I have smoked cigarettes for at least 10 years',
      },
    ],
  },
};

export const WithHintSlot = {
  render: (args) => ({
    components: {
      UiMultipleChoices,
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
    template: `<UiMultipleChoices
      v-model="modelValue"
      v-model:invalid="invalid"
      :hint="hint"
      :touched="touched"
      :items="items"
      :options="options"
      :alert-hint-attrs="alertHintAttrs"
      @update:modelValue="onUpdateModelValue"
      @update:invalid="onUpdateInvalid"
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

export const WithChoiceSlot = {
  render: (args) => ({
    components: {
      UiMultipleChoices,
      UiMultipleChoicesItem,
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
      :alert-hint-attrs="alertHintAttrs"
      @update:modelValue="onUpdateModelValue"
      @update:invalid="onUpdateInvalid"
    >
      <template #choice="{
        value,
        index,
        item,
        options,
        hasError,
        updateHandler,
      }">
        <UiMultipleChoicesItem
          :model-value="value[index]"
          v-bind="item"
          :options="options"
          :invalid="hasError(index)"
          class="ui-multiple-choices__choice"
          @update:model-value="updateHandler($event, index)"
        />
      </template>
    </UiMultipleChoices>`,
  }),
};

export const WithOptionSlot = {
  render: (args) => ({
    components: {
      UiMultipleChoices,
      UiMultipleChoicesItem,
      UiListItem,
      UiRadio,
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
      :alert-hint-attrs="alertHintAttrs"
      @update:modelValue="onUpdateModelValue"
      @update:invalid="onUpdateInvalid"
    >
      <template #option="{
        value,
        option,
        invalid,
      }">
        <UiListItem
          v-model="value"
          :list-item-attrs="{ class: 'ui-multiple-choices-item__option' }"
          :tag="UiRadio"
          v-bind="option"
          :class="{ 'ui-radio--has-error': invalid }"
          :name="multipleChoicesItemId"
        >
          {{ option.label }}
        </UiListItem>
      </template>
    </UiMultipleChoices>`,
  }),
};

export const Stacked = {
  render: (args) => ({
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
      :hint="hint"
      :touched="touched"
      :items="items"
      :options="options"
      :alert-hint-attrs="alertHintAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
      @update:invalid="onUpdateInvalid"
    />`,
  }),
  args: {
    hint: 'Select one answer for each statement',
    modifiers: [ 'ui-multiple-choices--stacked' ],
  },
};

export const StackedWithError = {
  render: (args) => ({
    components: { UiMultipleChoices },
    setup() {
      const modelValue = ref(args.initModelValue);
      const invalid = ref(args.initInvalid);
      const invalidChoices = ref(null);

      const handleSubmit = async () => {
        const { focusInvalidInput } = focusOnInvalidChoice(invalidChoices);

        await nextTick();
        focusInvalidInput();
      };

      handleSubmit();

      return {
        ...args,
        ...events,
        modelValue,
        invalid,
        invalidChoices,
      };
    },
    template: `<UiMultipleChoices
      ref="invalidChoices"
      v-model="modelValue"
      v-model:invalid="invalid"
      :hint="hint"
      :touched="touched"
      :items="items"
      :options="options"
      :alert-hint-attrs="alertHintAttrs"
      :class="modifiers"
      @update:modelValue="onUpdateModelValue"
      @update:invalid="onUpdateInvalid"
    />`,
  }),
  args: {
    hint: 'Select one answer for each statement',
    modifiers: [ 'ui-multiple-choices--stacked' ],
    touched: true,
  },
};
