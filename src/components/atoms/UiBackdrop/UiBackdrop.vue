<template>
  <div class="ui-backdrop" />
</template>

<script lang="ts">
export default {
  name: 'UiBackdrop',
};
</script>

<style lang="scss">
@import "../../../styles/functions/functions";

.ui-backdrop {
  $element: backdrop;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: css-var($element, background, var(--color-backdrop));
  opacity: css-var($element, opacity, var(--opacity-medium));
}
</style>
