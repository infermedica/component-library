<template>
  <UiFormField
    id="ui-phone-number-form-field"
    :error-message="errorMessage"
    class="ui-phone-number-prefix-form-field"
  >
    <template #default="{ id }">
      <UiInput
        :id="id"
        :class="[
          'ui-phone-number-prefix-form-field__input',
          { 'ui-input--has-error': errorMessage },
        ]"
        placeholder="Enter phone number"
      />
    </template>
  </UiFormField>
</template>

<script setup lang="ts">
import UiInput from '../../../../atoms/UiInput/UiInput.vue';
import UiFormField from '../../../../molecules/UiFormField/UiFormField.vue';

const errorMessage = false;

</script>

<style lang="scss">

</style>
