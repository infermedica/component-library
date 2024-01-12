<template>
  <UiNumberStepper
    v-model="value"
    v-bind="args"
  >
    <template #default="{ value }">
      <UiText>{{ value }}</UiText>
    </template>
  </UiNumberStepper>
</template>

<script setup>
import {
  computed,
  inject,
  useAttrs,
  defineOptions,
} from 'vue';
import {
  UiNumberStepper,
  UiText,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const value = inject('value');
</script>
