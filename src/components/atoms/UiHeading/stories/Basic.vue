<template>
  <UiHeading v-bind="args">
    {{ content }}
  </UiHeading>
</template>

<script setup>
import {
  computed,
  defineOptions,
  useAttrs,
  toRefs,
} from 'vue';
import { UiHeading } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const { content } = toRefs(attrs);
const args = computed(() => (attrs));
</script>
