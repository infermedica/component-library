<template>
  <UiCheckbox
    v-model="value"
    v-bind="args"
  >
    {{ content }}
  </uicheckbox>
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
import { UiCheckbox } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = reactive(useAttrs());
const args = computed(() => (attrs));
const { content } = toRefs(attrs);
const value = inject('value', {});
</script>
