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

.ui-container {
  padding: var(--container-padding, var(--space-40) var(--space-32));
  background: var(--container-background, var(--color-white));
  border-radius: var(--container-border-radius, 0);
  box-shadow: var(--box-shadow-low);

  @include from-tablet {
    --container-padding: var(--space-48);

    border-radius: var(--container-tablet-border-radius, var(--border-radius-container));
  }

  @include from-desktop {
    --container-padding: var(--space-48) var(--space-64);
  }
}
</style>
