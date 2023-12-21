<template>
  <div class="ui-phone-number">
    <label for="ui-phone-number-form-field" class="ui-phone-number-label">
      <UiText
        class="ui-text--body-2-comfortable"
        tag="span"
      >
        {{ message }}
      </UiText>
    </label>
    <div class="ui-phone-number-form-fields">
      <UiPhoneNumberPrefix
        v-model="prefix"
      />
      <UiPhoneNumberInput />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiPhoneNumberPrefix from './_internal/UiPhoneNumberPrefix/UiPhoneNumberPrefix.vue';
import UiPhoneNumberInput from './_internal/UiPhoneNumberInput/UiPhoneNumberInput.vue';

const prefix = ref({
  code: '+1',
  countryCode: 'US',
  country: 'United States of America',
});

const message = 'Phone number';
</script>

<style lang="scss">
@use "../../../styles/functions";

.ui-phone-number {
  --phone-number-dropdown-width: 320px;

  width: var(--phone-number-dropdown-width);

  &-label {
    margin-bottom: var(--space-8);
  }

  &-form-fields {
    display: flex;
    gap: var(--space-8);
  }
}
</style>
