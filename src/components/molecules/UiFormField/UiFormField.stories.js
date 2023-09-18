import UiFormField from '@/components/molecules/UiFormField/UiFormField.vue';
import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiInput from '@/components/atoms/UiInput/UiInput.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiAlert from '@/components/molecules/UiAlert/UiAlert.vue';
import './UiFormField.stories.scss';
import { ref } from 'vue';
import UiFormFieldTextLength from '@/components/molecules/UiFormField/_internal/UiFormFieldTextLength.vue';

export default {
  title: 'Molecules/FormField',
  component: UiFormField,
  args: {
    message: 'What is your height?',
    id: '',
    hint: 'Required',
    errorMessage: 'Please enter a valid height',
    textMessageAttrs: { 'data-testid': 'message-text' },
    textHintAttrs: { 'data-testid': 'hint-text' },
    alertAttrs: { 'data-testid': 'alert' },
    showTextLengthAlert: false,
  },
  // TODO: add argTypes for new props
  argTypes: {
    id: { control: 'text' },
    message: {
      description: 'Use this props to set message text',
      table: {
        category: 'props',
        type: { summary: 'boolean|string' },
      },
    },
    messageSlot: {
      name: 'message',
      description: 'Use this slot to replace message template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
      control: 'object',
    },
    hint: {
      description: 'Use this props to set hint text',
      table: {
        category: 'props',
        type: { summary: 'boolean|string' },
      },
    },
    hintSlot: {
      name: 'hint',
      description: 'Use this slot to replace hint template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
      control: 'object',
    },
    textMessageAttrs: { table: { subcategory: 'Attrs props' } },
    textHintAttrs: { table: { subcategory: 'Attrs props' } },
    alertAttrs: { table: { subcategory: 'Attrs props' } },
  },
  parameters: {
    cssProperties: {
      '--form-field-alert-margin-block':
        'var(--form-field-alert-margin-block-start, var(--space-8)) var(--form-field-alert-margin-block-end, 0)',
      '--form-field-alert-margin-inline':
        'var(--form-field-alert-margin-inline-start, 0) var(--form-field-alert-margin-inline-end, 0)',
    },
  },
};

export const WithInput = {
  render: (args) => ({
    components: {
      UiFormField,
      UiInput,
    },
    setup() {
      return { ...args };
    },
    template: `<UiFormField
      :message="message"
      :id="id"
      :hint="hint"
      :error-message="errorMessage"
      :text-message-attrs="textMessageAttrs"
      :text-hint-attrs="textHintAttrs"
      :alert-attrs="alertAttrs"
      class="form-field-with-input"
    >
      <template #default="{ id }">
        <UiInput
          :id="id"
          suffix="cm"
          type="number"
          :class="[
            'form-field-with-input__input',
            { 'ui-input--has-error': errorMessage },
          ]"
        />
      </template>
    </UiFormField>`,
  }),
};

export const WithCheckboxes = {
  render: (args) => ({
    components: {
      UiFormField,
      UiCheckbox,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiText class="form-field-with-checkboxes-description">
      What’s wrong with this question?
    </UiText>
    <UiFormField
      :message="message"
      :id="id"
      :hint="hint"
      :error-message="errorMessage"
      :text-message-attrs="textMessageAttrs"
      :text-hint-attrs="textHintAttrs"
      :alert-attrs="alertAttrs"
      class="form-field-with-checkboxes"
    >
      <UiCheckbox
        :class="[
          'form-field-with-checkboxes__checkbox',
          { 'ui-checkbox--has-error': errorMessage },
        ]"
      >
        I found a typo
      </UiCheckbox>
      <UiCheckbox
        :class="[
          'form-field-with-checkboxes__checkbox',
          { 'ui-checkbox--has-error': errorMessage },
        ]"
      >
        Other (please comment below)
      </UiCheckbox>
    </UiFormField>`,
  }),

  args: {
    errorMessage: 'Please select at least one issue.',
    message: false,
    hint: false,
  },
};

export const WithLabelSlot = {
  render: (args) => ({
    components: {
      UiFormField,
      UiInput,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiFormField
      :message="message"
      :id="id"
      :hint="hint"
      :error-message="errorMessage"
      :text-message-attrs="textMessageAttrs"
      :text-hint-attrs="textHintAttrs"
      :alert-attrs="alertAttrs"
      class="form-field-with-input"
    >
      <template #label="{
        message,
        hint,
        id,
        textMessageAttrs,
        textHintAttrs,
      }">
        <label
          v-if="message"
          :for="id"
          class="ui-form-field__label"
        >
          <UiText
            v-bind="textMessageAttrs"
            class="ui-text--body-2-comfortable ui-form-field__label-text"
          >
            {{ message }}
          </UiText>
          <UiText
            v-if="hint"
            v-bind="textHintAttrs"
            class="ui-text--body-2-comfortable ui-text--theme-secondary ui-form-field__hint"
          >
            {{ hint }}
          </UiText>
        </label>
      </template>
      <template #default="{ id }">
        <UiInput
          :id="id"
          suffix="cm"
          type="number"
          :class="[
            'form-field-with-input__input',
            { 'ui-input--has-error': errorMessage },
          ]"
        />
      </template>
    </UiFormField>`,
  }),
};

export const WithAlertSlot = {
  render: (args) => ({
    components: {
      UiFormField,
      UiInput,
      UiText,
      UiAlert,
    },
    setup() {
      return { ...args };
    },
    template: `<UiFormField
      :message="message"
      :id="id"
      :hint="hint"
      :alert-attrs="alertAttrs"
      :error-message="errorMessage"
      class="form-field-with-input"
    >
      <template #alert="{
        alertAttrs,
        errorMessage
      }">
        <UiAlert
          v-if="errorMessage"
          v-bind="alertAttrs"
          class="ui-form-field__alert"
        >
          {{ errorMessage }}
        </UiAlert>
      </template>
      <template #default="{ id }">
        <UiInput
          :id="id"
          suffix="cm"
          type="number"
          :class="[
            'form-field-with-input__input',
            { 'ui-input--has-error': errorMessage },
          ]"
        />
      </template>
    </UiFormField>`,
  }),
};

export const WithTextarea = {
  render: (args) => ({
    components: {
      UiFormField,
      UiFormFieldTextLength,
    },
    setup() {
      const alertErrorMessage = 'Use max 240 characters ';
      const maxLength = 240;
      const fieldValue = ref('');
      return {
        ...args,
        alertErrorMessage,
        maxLength,
        fieldValue,
      };
    },
    template: `<UiFormField
    :message="message"
    :id="id"
    :hint="hint"
    :error-message="errorMessage"
    :text-message-attrs="textMessageAttrs"
    :text-hint-attrs="textHintAttrs"
    :alert-attrs="alertAttrs"
    :showTextLengthAlert="showTextLengthAlert"
  >
    <template #textLengthAlert>
      <UiFormFieldTextLength />
    </template>
  </UiFormField>`,
  }),
  args: {
    message: 'Label',
    showTextLengthAlert: true,
  },
};
