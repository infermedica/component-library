<template>
  <UiList v-bind="args" />
</template>

<script setup>
import {
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import { UiList } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.icon-in-heading {
  $this: &;

  &__content {
    @include mixins.override-logical(button, null, padding, var(--space-16) var(--space-12));
    @include mixins.override-logical(button, null, border-radius, 0);
    @include mixins.override-logical(button, null, border-width, 0);

    @include mixins.focus {
      box-shadow: var(--focus-inner);
    }

    --button-gap: var(--space-12);
  }

  &__prefix {
    --icons-size: var(2rem);
  }
}
</style>

