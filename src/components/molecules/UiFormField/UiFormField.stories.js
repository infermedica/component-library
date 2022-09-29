import UiFormField from '@/components/molecules/UiFormField/UiFormField.vue';
import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiInput from '@/components/atoms/UiInput/UiInput.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiAlert from '@/components/molecules/UiAlert/UiAlert.vue';

export default {
  title: 'Molecules/FormField',
  component: UiFormField,
  subcomponents: {
    UiText,
    UiAlert,
  },
  args: {
    message: 'What is your height?',
    id: '',
    hint: 'Required',
    errorMessage: 'Please enter a valid height',
    textMessageAttrs: { 'data-testid': 'text-message' },
    textHintAttrs: { 'data-testid': 'text-hint' },
    alertAttrs: { 'data-testid': 'alert' },
  },
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
};

export const WithInput = (args) => ({
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
  >
    <template #default="{ id }">
      <UiInput
        :id="id"
        suffix="cm"
        type="number"
        style="width: 100%"
        :class="{
          'ui-input--has-error': errorMessage
        }"
      />
    </template>
  </UiFormField>`,
});

export const WithCheckboxes = (args) => ({
  components: {
    UiFormField,
    UiCheckbox,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiText
    style="margin: 0 0 var(--space-24) 0;"
  >
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
    style="--form-field-alert-margin: 0;"
  >
    <UiCheckbox
      :class="{
        'ui-checkbox--has-error': errorMessage
      }"
      style="margin: 0 0 var(--space-24) 0;"
    >
      I found a typo
    </UiCheckbox>
    <UiCheckbox
      :class="{
        'ui-checkbox--has-error': errorMessage
      }"
      style="margin: 0 0 var(--space-24) 0;"
    >
      Other (please comment below)
    </UiCheckbox>
  </UiFormField>`,
});
WithCheckboxes.args = {
  errorMessage: 'Please select at least one issue.',
  message: false,
  hint: false,
};

export const WithLabelSlot = (args) => ({
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
        :class="{
          'ui-input--has-error': errorMessage
        }"
        style="width: 100%"
      />
    </template>
  </UiFormField>`,
});

export const WithAlertSlot = (args) => ({
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
        :class="{
          'ui-input--has-error': errorMessage
        }"
        style="width: 100%"
      />
    </template>
  </UiFormField>`,
});
