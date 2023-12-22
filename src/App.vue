<template>
  <UiPhoneNumber
    v-model:prefix="prefix"
    v-model:phone-number="phoneNumber"
  />
</template>

<script setup lang="ts">
// import { UiButton } from '../index';
import { ref } from 'vue';
import UiPhoneNumber from './components/organisms/UiPhoneNumber/UiPhoneNumber.vue';

const prefix = ref({
  code: '+1',
  countryCode: 'US',
  country: 'United States of America',
});
const phoneNumber = ref('');
</script>

<style lang="scss">
.custom-button {
  --button-border-radius: 0;
}
</style>
