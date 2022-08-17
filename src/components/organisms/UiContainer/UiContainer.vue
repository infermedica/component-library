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
@import "../../../styles/mixins/mixins";
@import "../../../styles/functions/functions";

.ui-container {
  $element: container;

  padding: css-var($element, padding, var(--space-40) var(--space-32));
  background: css-var($element, background, var(--color-background-white));
  border-radius: css-var($element, border-radius, 0);
  box-shadow: css-var($element, box-shadow, var(--box-shadow-low));

  @include from-tablet {
    padding: css-var($element + "-tablet", padding, var(--space-48));
    border-radius: css-var($element + "-tablet", border-radius, var(--border-radius-container));
  }

  @include from-desktop {
    padding: css-var($element + "-desktop", padding, var(--space-48) var(--space-64));
  }
}
</style>
