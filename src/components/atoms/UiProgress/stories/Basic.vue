<template>
  <UiProgress
    v-bind="args"
  />
</template>

<script setup>
import {
  reactive,
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import { UiProgress } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = reactive(useAttrs());
const args = computed(() => (attrs));
</script>
