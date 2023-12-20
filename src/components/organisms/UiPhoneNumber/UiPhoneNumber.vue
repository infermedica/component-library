<template>
  <div class="ui-phone-number">
    <!-- TODO: change to fiedset, legend, label -->
    <UiText class="ui-phone-number__text">
      Phone number
    </UiText>
    <UiPhoneNumberPrefix
      v-model="prefix"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiPhoneNumberPrefix from './_internal/UiPhoneNumberPrefix/UiPhoneNumberPrefix.vue';

const prefix = ref({
  code: '+1',
  countryCode: 'US',
  country: 'United States of America',
});
</script>

<style lang="scss">
.ui-phone-number {
  width: 320px;

  &__text {
    margin-bottom: var(--space-8);
  }
}
</style>
