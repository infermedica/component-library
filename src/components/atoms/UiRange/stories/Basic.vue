<template>
  <UiRange
    v-bind="args"
    v-model="value"
  />
</template>

<script setup>
import {
  reactive,
  computed,
  useAttrs,
  defineOptions,
  inject,
} from 'vue';
import { UiRange } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = reactive(useAttrs());
const args = computed(() => (attrs));
const value = inject('value');
</script>
