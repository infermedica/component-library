<template>
  <div class="ui-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'UiContainer',
};
</script>

<style lang="scss">
.ui-container {
  padding: var(--container-padding, var(--space-40) var(--space-32));
  background: var(--containter-background, var(--color-white));
  border-radius: var(--container-border-radius, var(--border-radius-card));
  box-shadow: var(--box-shadow-default);
}
</style>
