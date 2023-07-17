<template>
  <UiIcon v-bind="args" />
</template>

<script setup>
import {
  computed,
  defineOptions,
  useAttrs,
  toRefs,
} from 'vue';
import { UiIcon } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const { content } = toRefs(attrs);
const args = computed(() => (attrs));
</script>
