<template>
  <UiInput
    v-bind="args"
    v-model="value"
  /> {{ value }}
</template>

<script setup>
import {
  computed,
  defineOptions,
  inject,
  useAttrs,
} from 'vue';
import { UiInput } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const args = computed(() => (attrs));
const value = inject('value');
</script>
