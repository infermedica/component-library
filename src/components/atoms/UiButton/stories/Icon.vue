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
const attrs = useAttrs();
const args = computed(() => (attrs));
const { icon } = toRefs(attrs);
</script>
