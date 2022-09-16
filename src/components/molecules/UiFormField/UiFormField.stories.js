import UiFormField from '@/components/molecules/UiFormField/UiFormField.vue';
import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiInput from '@/components/atoms/UiInput/UiInput.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiAlert from '@/components/molecules/UiAlert/UiAlert.vue';

export default {
  title: 'Molecules/FormField',
  component: UiFormField,
  subcomponents: {
    UiAlert,
    UiText,
  },
  args: {
    errorMessage: 'Please enter a valid height',
    label: 'What is your height?',
    hint: 'Required',
    id: '',
  },
  argTypes: {
    id: {
      control: 'text',
    },
    label: {
      description: 'Use this props to set label text',
      table: {
        category: 'props',
        type: {
          summary: 'boolean|string',
        },
      },
    },
    labelSlot: {
      name: 'label',
      description: 'Use this slot to replace label template.',
      table: {
        category: 'slots',
        type: {
          summary: 'unknown',
        },
      },
      control: 'object',
    },
  },
};

export const WithInput = (args) => ({
  components: {
    UiFormField,
    UiInput,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: `<UiFormField
    :label-attrs="labelAttrs"
    :label="label"
    :id="id"
    :hint="hint"
    :alert-attrs="alertAttrs"
    :error-message="errorMessage"
  >
    <template #default="{id}">
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
    return {
      ...args,
    };
  },
  template: `<UiText style="margin: 0 0 var(--space-24) 0;">What’s wrong with this question?</UiText>
  <UiFormField
    :label-attrs="labelAttrs"
    :label="label"
    :id="id"
    :hint="hint"
    :alert-attrs="alertAttrs"
    :error-message="errorMessage"
    style="--form-field-alert-margin: 0;"
  >
    <UiCheckbox
      style="margin: 0 0 var(--space-24) 0;"
      :class="{
        'ui-checkbox--has-error': errorMessage
      }"
    >
      I found a typo
    </UiCheckbox>
    <UiCheckbox
      style="margin: 0 0 var(--space-24) 0;"
      :class="{
        'ui-checkbox--has-error': errorMessage
      }"
    >
      Other (please comment below) 
    </UiCheckbox>
  </UiFormField>`,
});
WithCheckboxes.args = {
  errorMessage: 'Please select at least one issue.',
  label: false,
  hint: false,
};

export const WithLabelSlot = (args) => ({
  components: {
    UiFormField,
    UiInput,
    UiText,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: `<UiFormField
    :label-attrs="labelAttrs"
    :label="label"
    :id="id"
    :hint="hint"
    :alert-attrs="alertAttrs"
    :error-message="hasError && errorMessage"
  >
    <template #label="{attrs, label, hint, id}">
      <UiText
        v-if="label"
        tag="label"
        :for="id"
        class="ui-form-field__label"
        v-bind="attrs"
      >
        <UiText
          class="ui-text--body-2-comfortable ui-form-field__label-text"
          tag="span"
        >
          {{ label }}
        </UiText>
        <UiText
          v-if="hint"
          class="ui-text--body-2-comfortable ui-text--theme-secondary ui-form-field__label-hint"
          tag="span"
        >
          {{ hint }}
        </UiText>
      </UiText>
    </template>
    <template #default="{id}">
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

export const WithAlertSlot = (args) => ({
  components: {
    UiFormField,
    UiInput,
    UiText,
    UiAlert,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: `<UiFormField
    :label-attrs="labelAttrs"
    :label="label"
    :id="id"
    :hint="hint"
    :alert-attrs="alertAttrs"
    :error-message="hasError && errorMessage"
  >
    <template #alert="{attrs, errorMessage}">
      <UiAlert
        v-if="errorMessage"
        v-bind="attrs"
        class="ui-form-field__alert"
      >
        {{ errorMessage }}
      </UiAlert>
    </template>
    <template #default="{id}">
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
