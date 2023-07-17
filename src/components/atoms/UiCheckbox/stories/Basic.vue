<template>
  <UiCheckbox v-bind="args">
    {{ content }}
  </UiCheckbox>
</template>

<script setup>
import {
  computed,
  defineOptions,
  useAttrs,
  toRefs,
} from 'vue';
import { UiCheckbox } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const { content } = toRefs(attrs);
const args = computed(() => (attrs));
</script>
