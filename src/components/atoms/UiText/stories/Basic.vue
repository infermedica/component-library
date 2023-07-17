<template>
  <UiText v-bind="args">
    {{ content }}
  </UiText>
</template>

<script setup>
import {
  computed,
  defineOptions,
  useAttrs,
  toRefs,
} from 'vue';
import { UiText } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const { content } = toRefs(attrs);
const args = computed(() => (attrs));
</script>
