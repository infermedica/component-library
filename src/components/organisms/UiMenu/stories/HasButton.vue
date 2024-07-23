<template>
  <div class="has-button">
    <UiMenu
      v-bind="args"
      class="has-button__menu"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import { UiMenu } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
</script>

<style lang="scss">
@use "../../../../styles/mixins";
.has-button {
  max-height: 20.5rem;
  overflow-y: auto;

  &__menu {
    @include mixins.use-logical(null, margin, var(--space-12) 0 0 0);

    .ui-menu-item {
      padding-block: var(--space-2);
    }

    .ui-list-item__content span {
      margin-inline: var(--space-8);
    }
  }
}
</style>
