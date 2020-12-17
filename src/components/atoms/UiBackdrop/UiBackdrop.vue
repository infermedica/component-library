<template>
  <div class="ui-backdrop" />
</template>

<script>
export default {
  name: 'UiBackdrop',
};
</script>

<style lang="scss">
.ui-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: var(--backdrop-background, var(--color-ui-backdrop));
  opacity: var(--backdrop-opacity, var(--opacity-medium));
}
</style>
