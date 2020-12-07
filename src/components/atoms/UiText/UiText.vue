<template>
  <component
    :is="tag"
    class="ui-text"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UiText',
  props: {
    tag: {
      type: String,
      default: 'p',
    },
  },
};
</script>

<style lang="scss">
.ui-text {
  margin: var(--text-margin, 0);
  font: var(--text-font, var(--font-body-1));
}
</style>
