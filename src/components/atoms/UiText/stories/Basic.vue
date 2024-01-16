<template>
  <UiText v-bind="args">
    {{ content }}
  </UiText>
</template>

<script setup>
import {
  reactive,
  computed,
  useAttrs,
  toRefs,
  defineOptions,
} from 'vue';
import { UiText } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = reactive(useAttrs());
const args = computed(() => (attrs));
const { content } = toRefs(attrs);
</script>
