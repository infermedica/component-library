<template>
  <UiIcon v-bind="args" />
</template>

<script setup>
import {
  reactive,
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import { UiIcon } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = reactive(useAttrs());
const args = computed(() => (attrs));
</script>
