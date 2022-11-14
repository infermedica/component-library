<template>
  <UiText>
    {{ label }}
  </UiText>
</template>

<script setup lang="ts">
import UiText from '../../../atoms/UiText/UiText.vue';

defineProps({
  /**
   * Use this props to set label.
   */
  label: {
    type: String,
    default: '',
  },
});
</script>
