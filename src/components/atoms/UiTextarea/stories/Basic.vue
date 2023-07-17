<template>
  <UiTextarea
    v-model="value"
    v-bind="args"
    :content="value"
  />
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  inject,
  useAttrs,
  toRefs,
  defineOptions,
} from 'vue';
import { UiTextarea } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const { modelValue } = toRefs(attrs);

const value = inject('value') || ref(modelValue);
const args = computed(() => (attrs));
</script>
