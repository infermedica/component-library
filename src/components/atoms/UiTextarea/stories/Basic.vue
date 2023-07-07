<template>
  <UiTextarea
    v-model="value"
    v-bind="args"
    :content="value"
  />
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import {
  ref,
  computed,
  inject,
  useAttrs,
} from 'vue';
import { UiTextarea } from '@infermedica/component-library';

const attrs = useAttrs();
const {
  modelValue,
  modifiers,
  ...rest
} = attrs;

const value = inject('value') || ref(modelValue);
const args = computed(() => ({
  ...rest,
  class: modifiers,
}));

</script>

<style lang="scss">

</style>
