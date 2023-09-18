<template>
  <UiRadio
    v-model="value"
    v-bind="args"
  >
    {{ content }}
  </UiRadio>
</template>

<script setup>
import {
  computed,
  inject,
  useAttrs,
  defineOptions,
  toRefs,
} from 'vue';
import { UiRadio } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const { content } = toRefs(attrs);
const value = inject('value');
</script>
