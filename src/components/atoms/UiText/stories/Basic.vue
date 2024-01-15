<template>
  <UiText v-bind="args">
    {{ content }}
  </UiText>
</template>

<script setup>
import {
  computed,
  useAttrs,
  toRefs,
  defineOptions,
} from 'vue';
import { UiText } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const { content } = toRefs(attrs);
</script>
