<template>
  <UiButton
    class="ui-button--text ui-navigation-item"
    :class="{'ui-button--secondary': isSecondary, 'ui-button--small': isSmall}"
  >
    <!-- @slot Use this slot to place navigation item content. -->
    <slot />
  </UiButton>
</template>
<script setup>
import { computed, inject, getCurrentInstance } from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';

const modifiers = inject('modifiers');
const isSecondary = computed(() => modifiers.value.includes('ui-navigation--secondary'));
const isSmall = computed(() => modifiers.value.includes('ui-navigation--small'));
const parentComponent = getCurrentInstance().parent;
if (!parentComponent || parentComponent.type.__name !== 'UiNavigation') {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('UiNavigationItem has to be child of UiNavigation');
  }
}
</script>
<style lang="scss">
.ui-navigation-item {
  margin: var(--navigation-item-margin, 0 var(--space-8));
}
</style>
