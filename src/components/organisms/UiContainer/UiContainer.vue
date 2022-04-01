<template>
  <div class="ui-container">
    <!-- @slot Use this slot to place content inside container. -->
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
  border-radius: var(--container-border-radius, 0);
  box-shadow: var(--box-shadow-low);

  @media (min-width: 768px) {
    border-radius: var(--container-tablet-border-radius, var(--border-radius-container));
  }
}
</style>
