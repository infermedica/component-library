<template>
  <UiTextarea
    v-model="value"
    v-bind="args"
  />
</template>

<script setup>
import {
  computed,
  inject,
  useAttrs,
  defineOptions,
} from 'vue';
import { UiTextarea } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const value = inject('value');
</script>
