<template>
  <UiList
    v-bind="args"
    class="answer-with-checkbox "
  />
</template>

<script setup>
import {
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import { UiList } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
</script>

<style lang="scss">
.answer-with-checkbox {
  &__label {
    display: flex;
    justify-content: space-between;
  }
}
</style>
