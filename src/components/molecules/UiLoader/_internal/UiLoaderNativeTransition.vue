<template>
  <transition>
    <slot
      v-if="isLoading"
      name="loader"
    />
    <div v-else>
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps({
  /**
   * Use this props to show UiLoader component
   */
  isLoading: {
    type: Boolean,
    default: true,
  },
});
</script>
