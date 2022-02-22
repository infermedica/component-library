<template>
  <component
    :is="tag"
    class="ui-list"
  >
    <!-- @slot Use this slot to place list items-->
    <slot />
  </component>
</template>

<script setup>
defineProps({
  /**
     * Use this props to set list tag.
     */
  tag: {
    type: String,
    default: 'ul',
  },
});
</script>

<style lang="scss">
.ui-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
