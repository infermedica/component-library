<template>
  <UiButton
    class="ui-button--text ui-navigation-item"
    :class="{ 'ui-button--small': isSmall }"
  >
    <!-- @slot Use this slot to place navigation item content. -->
    <slot />
  </UiButton>
</template>
<script setup lang="ts">
import {
  computed,
  inject,
  getCurrentInstance,
} from 'vue';
import type { ComputedRef } from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../../atoms/UiButton/UiButton.vue';
import type { DefineAttrsProps } from '../../../../types';

export type NavigationItemAttrsProps = DefineAttrsProps<null, ButtonAttrsProps>;

const modifiers = inject<ComputedRef<string>>('modifiers', computed(() => ''));
const isSmall = computed(() => modifiers.value.includes('ui-navigation--small'));
const parentComponent = getCurrentInstance()?.parent;
if (!parentComponent || parentComponent.type.name !== 'UiNavigation') {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('UiNavigationItem has to be child of UiNavigation');
  }
}
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-navigation-item {
  $this: &;
  $element: navigation-item;

  --button-color: #{functions.var($element, color, var(--color-text-action-secondary))};
  --button-hover-color: #{functions.var($element + "-hover", color, var(--color-text-action-secondary-hover))};
  --button-active-color: #{functions.var($element + "-active", color, var(--color-text-action-secondary-active))};
}
</style>
