import UiFormField from '@/components/molecules/UiFormField/UiFormField.vue';
import UiInput from '@/components/atoms/UiInput/UiInput.vue';
import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiAlert from '@/components/atoms/UiAlert/UiAlert.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';

export default {
  title: 'Molecules/FormField',
  component: UiFormField,
  subcomponents: { UiAlert, UiText },
  args: {
    errorMessage: 'Please enter a valid height',
    label: 'What is your height?',
    hint: 'Required',
    id: '',
  },
  argTypes: {
    id: { control: 'text' },
    label: {
      description: 'Use this props to set label text',
      table: {
        category: 'props',
        type: { summary: 'boolean|string' },
      },
    },
    labelSlot: {
      name: 'label',
      description: 'Use this slot to replace label template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
      control: 'object',
    },
  },
  parameters: {
    cssprops: {
      'form-field-label-text-margin': {
        value: '0 0 var(--space-8) 0',
        control: 'text',
        description: '',
      },
      'form-field-label-text-color': {
        value: 'var(--color-text-body)',
        control: 'text',
        description: '',
      },
      'form-field-label-tag-margin': {
        value: '0 var(--space-8) 0 0',
        control: 'text',
        description: '',
      },
      'form-field-label-tag-color': {
        value: 'var(--color-text-dimmed)',
        control: 'text',
        description: '',
      },
      'form-field-alert-margin': {
        value: 'var(--space-8) 0 0 0',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiFormField, UiInput },
  setup() { return { ...args }; },
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
        style="width: 100%"
        suffix="cm"
        :class="{
          'ui-input--has-error': errorMessage
        }"
      />
    </template>
  </UiFormField>`,
});

export const WithInput = Template.bind({});

export const WithCheckbox = (args) => ({
  components: { UiFormField, UiCheckbox },
  setup() { return { ...args }; },
  template: `<UiFormField
    :label-attrs="labelAttrs"
    :label="label"
    :id="id"
    :hint="hint"
    :alert-attrs="alertAttrs"
    :error-message="hasError && errorMessage"
  >
    <template #default="{id}">
      <UiCheckbox
        :id="id"
        style="width: 100%"
        suffix="cm"
        :class="{
          'ui-checkbox--has-error': hasError
        }"
      >
        I read and accept Terms of Service and Privacy Policy.
      </UiCheckbox>
    </template>
  </UiFormField>`,
});
WithCheckbox.args = {
  errorMessage: 'Please agree to Terms of Service and Privacy Policy.',
  label: false,
  hint: false,
};

export const WithLabelSlot = (args) => ({
  components: { UiFormField, UiInput, UiText },
  setup() { return { ...args }; },
  template: `<UiFormField
    :label-attrs="labelAttrs"
    :label="label"
    :id="id"
    :hint="hint"
    :alert-attrs="alertAttrs"
    :error-message="hasError && errorMessage"
  >
    <template #label="{labelAttrs, label, hint, id}">
      <UiText
        v-if="label"
        tag="label"
        :for="id"
        class="ui-form-field__label"
        v-bind="labelAttrs"
      >
        <UiText
          class="ui-form-field__label-text"
          tag="span"
        >
          {{ label }}
        </UiText>
        <UiText
          v-if="hint"
          class="ui-form-field__label-tag"
          tag="span"
        >
          {{ hint }}
        </UiText>
      </UiText>
    </template>
    <template #default="{id}">
      <UiInput
        :id="id"
        style="width: 100%"
        suffix="cm"
        :class="{
          'ui-input--has-error': hasError
        }"
      />
    </template>
  </UiFormField>`,
});

export const WithAlertSlot = (args) => ({
  components: {
    UiFormField, UiInput, UiText, UiAlert,
  },
  setup() { return { ...args }; },
  template: `<UiFormField
    :label-attrs="labelAttrs"
    :label="label"
    :id="id"
    :hint="hint"
    :alert-attrs="alertAttrs"
    :error-message="hasError && errorMessage"
  >
    <template #alert="{alert, errorMessage}">
      <UiAlert
        v-if="errorMessage"
        v-bind="alert"
        class="ui-form-field__alert"
      >
        {{ errorMessage }}
      </UiAlert>
    </template>
    <template #default="{id}">
      <UiInput
        :id="id"
        style="width: 100%"
        suffix="cm"
        :class="{
          'ui-input--has-error': hasError
        }"
      />
    </template>
  </UiFormField>`,
});
