<template>
  <div class="ui-backdrop" />
</template>

<script setup lang="ts">
import type { DefineAttrsProps } from '../../../types';

export type BackdropAttrsProps = DefineAttrsProps<null>;
</script>

<style lang="scss">
@use "../../../styles/functions";

.ui-backdrop {
  $element: backdrop;

  position: fixed;
  inset: 0;
  background: functions.var($element, background, var(--color-backdrop));
  opacity: functions.var($element, opacity, var(--opacity-medium));
}
</style>
