<template>
  <div class="has-outside-elements">
    <div class="has-outside-elements__header">
      <UiButton class="ui-button--icon">
        <UiIcon icon="close" />
      </UiButton>
    </div>
    <UiMenu
      v-bind="args"
      class="has-outside-elements__menu"
    />
    <div class="has-outside-elements__footer">
      <UiLink href="#" class="ui-link--theme-secondary">
        © 2021 Infermedica
      </UiLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import {
  UiMenu,
  UiButton,
  UiIcon,
  UiLink,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
</script>

<style lang="scss">
@use "../../../../styles/mixins";
.has-outside-elements {
  &__header {
    @include mixins.use-logical(null, padding, var(--space-20));
    display: flex;
    justify-content: flex-end;
    background-color: var(--color-background-subtle);
  }

  &__footer {
    @include mixins.use-logical(null, padding, var(--space-16));
  }

  &__menu {
    @include mixins.use-logical(null, margin, var(--space-12) 0 0 0);
  }
}
</style>
