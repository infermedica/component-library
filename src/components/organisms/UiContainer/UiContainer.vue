<template>
  <div class="ui-container">
    <!-- @slot Use this slot to place content inside container. -->
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'UiContainer',
};
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-container {
  $element: container;

  padding: functions.var($element, padding, var(--space-40) var(--space-32));
  background: functions.var($element, background, var(--color-background-white));
  border-radius: functions.var($element, border-radius, 0);
  box-shadow: functions.var($element, box-shadow, var(--box-shadow-low));

  @include mixins.from-tablet {
    padding: functions.var($element + "-tablet", padding, var(--space-48));
    border-radius: functions.var($element + "-tablet", border-radius, var(--border-radius-container));
  }

  @include mixins.from-desktop {
    padding: functions.var($element + "-desktop", padding, var(--space-48) var(--space-64));
  }
}
</style>
