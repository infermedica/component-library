<template>
  <UiBackdrop v-bind="args" />
</template>

<script setup>
import {
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import { UiBackdrop } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
</script>
