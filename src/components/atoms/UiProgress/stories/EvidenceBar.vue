<template>
  <UiProgress
    v-bind="args"
    :class="[
      'evidence-bar', { 'evidence-bar--strong': isStrong },
    ]"
  />
</template>

<script setup lang="ts">
import {
  computed,
  withDefaults,
  useAttrs,
  defineOptions,
} from 'vue';
import { UiProgress } from '@infermedica/component-library';
import type { DefineAttrsProps } from '../../../../types';

export interface EvidenceBarProps {
  strongMin?: number,
}
export type EvidenceBarAttrsProps = DefineAttrsProps<EvidenceBarProps>;
const props = withDefaults(defineProps<EvidenceBarProps>(), { strongMin: 20 });

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const isStrong = computed(() => (args.value.value >= props.strongMin));
</script>

<style lang="scss">
 .evidence-bar {
   --progress-indicator-background: var(--color-dataviz-sequential-weak);

   max-width: 2rem;

   &--strong {
     --progress-indicator-background: var(--color-dataviz-sequential-strong);
   }
 }
</style>
