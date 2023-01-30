<template>
  <transition>
    <slot
      v-if="isLoading"
      name="loader"
    />
    <div v-else>
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { TransitionProps } from 'vue';
import type { DefineAttrsProps } from '../../../../types';

export interface LoaderNativeTransitionProps {
  /**
   * Use this props to show UiLoader component
   */
  isLoading?: boolean;
}
export type LoaderNativeTransitionAttrsProps = DefineAttrsProps<LoaderNativeTransitionProps, TransitionProps>;
withDefaults(defineProps<LoaderNativeTransitionProps>(), { isLoading: true });
</script>
