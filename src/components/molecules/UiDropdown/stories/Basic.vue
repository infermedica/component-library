<template>
  <UiDropdown
    v-model="language"
    :items="args.items"
    :text="language"
  />
</template>

<script setup>
import {
  ref,
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import { UiDropdown } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const language = ref('Polski');
</script>
