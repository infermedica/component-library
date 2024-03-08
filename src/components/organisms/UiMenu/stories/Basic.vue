<template>
  <UiMenu v-bind="args" />
</template>

<script setup>
import {
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import { UiMenu } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
</script>
