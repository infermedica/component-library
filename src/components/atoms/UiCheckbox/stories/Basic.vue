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
  computed,
  inject,
  useAttrs,
  defineOptions,
  toRefs,
} from 'vue';
import { UiCheckbox } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const { content } = toRefs(attrs);
const value = inject('value');
</script>
