<template>
  <UiProgress
    v-bind="args"
    class="heights"
  />
</template>

<script setup>
import {
  computed,
  defineOptions,
  useAttrs,
} from 'vue';
import { UiProgress } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const args = computed(() => (attrs));
</script>

<style lang="scss">
.heights {
  --progress-height: 3rem;
}
</style>
