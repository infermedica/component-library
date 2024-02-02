<template>
  <UiButton v-bind="args">
    <UiIcon
      :icon="icon"
      class="ui-button__icon"
    />
  </UiButton>
</template>

<script setup>
import {
  reactive,
  computed,
  useAttrs,
  toRefs,
  defineOptions,
} from 'vue';
import {
  UiButton,
  UiIcon,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = reactive(useAttrs());
const args = computed(() => (attrs));
const { icon } = toRefs(attrs);
</script>
