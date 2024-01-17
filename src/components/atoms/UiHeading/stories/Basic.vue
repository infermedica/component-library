<template>
  <UiHeading v-bind="args">
    {{ content }}
  </UiHeading>
</template>

<script setup>
import {
  reactive,
  computed,
  useAttrs,
  toRefs,
  defineOptions,
} from 'vue';
import { UiHeading } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = reactive(useAttrs());
const args = computed(() => (attrs));
const { content } = toRefs(attrs);
</script>
