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
  type ComputedRef,
} from 'vue';
// import type {  } from 'vue';
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
