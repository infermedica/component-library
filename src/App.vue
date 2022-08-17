<template>
  <UiButton class="custom-button">
    Label
  </UiButton>
</template>

<script setup>
import { UiButton } from '../index.ts';
</script>

<style lang="scss">
.custom-button {
  --button-border-radius: 0;
}
</style>
