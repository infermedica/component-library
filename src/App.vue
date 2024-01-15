<template>
  <UiFormField
    :id="inputID"
    class="custom-phone-number"
    message="Phone number"
    :error-message="error"
  >
    <UiPhoneNumber
      :id="inputID"
      v-model="modelValue"
      :error="error"
    />
  </UiFormField>
</template>

<script setup lang="ts">
// import { UiButton } from '../index';
import { ref } from 'vue';
import UiPhoneNumber from './components/molecules/UiPhoneNumber/UiPhoneNumber.vue';
import UiFormField from './components/molecules/UiFormField/UiFormField.vue';

const modelValue = ref({
  prefix: {
    code: '+1',
    countryCode: 'US',
    country: 'United States of America',
  },
  phoneNumber: '',
});

const inputID = 'phone-number-id';

// const error = 'Please enter the phone number';
const error = false;

</script>

<style lang="scss">
.custom-button {
  --button-border-radius: 0;
}

.custom-phone-number {
  width: 320px;
}
</style>
