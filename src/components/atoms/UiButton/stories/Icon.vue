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
  UiButton,
  UiIcon,
} from '@infermedica/component-library';
import {
  computed,
  defineOptions,
  useAttrs,
} from 'vue';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const {
  icon,
  modifiers,
  ...rest
} = attrs;
const args = computed(() => ({
  ...rest,
  class: modifiers,
}));
</script>

<style lang="scss">

</style>
