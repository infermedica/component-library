<template>
  <UiRange
    v-model="value"
    v-bind="args"
  />
</template>

<script setup>
import {
  computed,
  defineOptions,
  inject,
  useAttrs,
} from 'vue';
import { UiRange } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const args = computed(() => (attrs));
const value = inject('value');

</script>
