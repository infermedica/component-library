<template>
  <div class="ui-container">
    <!-- @slot Use this slot to place content inside container. -->
    <slot />
  </div>
</template>

<script lang="ts">
import type { DefineAttrsProps } from '../../../types';

export default { name: 'UiContainer' };

export type ContainerAttrsProps = DefineAttrsProps<null>
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-container {
  $element: container;

  @include mixins.use-logical($element, padding, var(--space-32) var(--space-20 ));
  @include mixins.use-logical($element, border-radius, 0);

  background: functions.var($element, background, var(--color-background-white));
  box-shadow: functions.var($element, box-shadow, var(--box-shadow-low));

  @include mixins.from-tablet {
    @include mixins.use-logical($element + "-tablet", padding, var(--space-48));
    @include mixins.use-logical($element + "-tablet", border-radius, var(--border-radius-container));
  }

  @include mixins.from-desktop {
    @include mixins.use-logical($element + "-desktop", padding, var(--space-48) var(--space-64));
  }
}
</style>
