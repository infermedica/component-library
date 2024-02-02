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
  reactive,
  computed,
  inject,
  useAttrs,
  defineOptions,
  toRefs,
} from 'vue';
import { UiRadio } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = reactive(useAttrs());
const args = computed(() => (attrs));
const { content } = toRefs(attrs);
const value = inject('value', '');
</script>
