<template>
  <UiHeading v-bind="args">
    {{ content }}
  </UiHeading>
</template>

<script setup>
import {
  computed,
  useAttrs,
  toRefs,
  defineOptions,
} from 'vue';
import { UiHeading } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const { content } = toRefs(attrs);
</script>
