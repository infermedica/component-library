<template>
  <component
    :is="tag"
    class="ui-list-item"
  >
    <!-- @slot Use this slot to place list item content. -->
    <slot />
  </component>
</template>

<script setup>
defineProps({
  /**
   * Use this props to set list item tag.
   */
  tag: {
    type: String,
    default: 'li',
  },
});
</script>

<style lang="scss">
.ui-list-item {
  padding: var(--list-item-padding, var(--space-12));
}
</style>
