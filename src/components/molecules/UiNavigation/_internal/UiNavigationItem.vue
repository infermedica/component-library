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

const modifiers = inject('modifiers') as ComputedRef<string>;
const isSmall = computed(() => modifiers.value.includes('ui-navigation--small'));
const parentComponent = getCurrentInstance()?.parent;
if (!parentComponent || parentComponent.type.name !== 'UiNavigation') {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('UiNavigationItem has to be child of UiNavigation');
  }
}
</script>
