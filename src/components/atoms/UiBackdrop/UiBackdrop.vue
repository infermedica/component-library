<template>
  <div class="ui-backdrop" />
</template>

<script lang="ts">
export default { name: 'UiBackdrop' };
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-backdrop {
  $element: backdrop;

  @include mixins.use-logical($element, inset, 0);

  position: fixed;
  background: functions.var($element, background, var(--color-backdrop));
  opacity: functions.var($element, opacity, var(--opacity-medium));
}
</style>
