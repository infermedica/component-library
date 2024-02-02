<template>
  <UiInput
    v-model="value"
    v-bind="args"
  />
</template>

<script setup>
import {
  reactive,
  computed,
  inject,
  useAttrs,
  defineOptions,
} from 'vue';
import { UiInput } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = reactive(useAttrs());
const args = computed(() => (attrs));
const value = inject('value', '');
</script>
