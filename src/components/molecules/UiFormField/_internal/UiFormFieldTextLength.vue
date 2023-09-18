<template>
  <UiTextarea
    :id="id"
    v-model="fieldLength"
    :class="{ 'ui-textarea--has-error': isAlertDisplayed }"
    :name="name"
    :max-length="maxLength"
    :placeholder="placeholder"
    :aria-label="placeholder"
  />
  <UiAlert
    v-if="message && isShown"
  >
    <UiText
      class="
        ui-form-field__alert
        ui-form-field-text-length__alert
      "
    >
      {{ message }}
    </UiText>
  </UiAlert>
  <UiText>
    {{ fieldLength?.length || 0 }} / {{ maxLength }}
  </UiText>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UiText from '../../../atoms/UiText/UiText.vue';
import UiTextarea from '../../../atoms/UiTextarea/UiTextarea.vue';
import UiAlert from '../../UiAlert/UiAlert.vue';

// TODO: move to props
const fieldLength = ref('');
const maxLength = 240;
const isShown = ref(true);
const id = '';
const isAlertDisplayed = ref(true);
const name = '';
const placeholder = '';
const message = 'Use max 240 characters';
</script>

<style lang="scss">
// TODO: fix style for alert
.ui-form-field-text-length {}
</style>
