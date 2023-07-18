<template>
  <UiProgress
    v-bind="args"
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
