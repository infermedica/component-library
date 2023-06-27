<template>
  <UiButton class="ui-button--text">
    <UiIcon
      icon="chevron-left"
      class="ui-button__icon"
    />
    <!-- @slot Use this slot to place back button label. -->
    <slot />
  </UiButton>
</template>

<script setup lang="ts">
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
</script>

<style lang="scss">

</style>
