<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <UiFormField
    message="Phone number"
    :error-message="error"
  >
    <UiPhoneNumber v-model="modelValue" />
  </UiFormField>
</template>

<script setup>
import { ref } from 'vue';
import UiFormField from '../../UiFormField/UiFormField.vue';
import UiPhoneNumber from '../UiPhoneNumber.vue';

const modelValue = ref({
  prefix: {
    code: '+1',
    countryCode: 'US',
    country: 'United States of America',
  },
  phoneNumber: '',
});

// const error = 'Please enter the phone number';
const error = false;
</script>
