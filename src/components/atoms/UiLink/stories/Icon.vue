<template>
  <UiLink v-bind="args">
    <UiIcon
      :icon="icon"
      class="ui-link__icon"
    />
  </UiLink>
</template>

<script setup>
import {
  UiLink,
  UiIcon,
} from '@infermedica/component-library';
import {
  computed,
  defineOptions,
  toRefs,
  useAttrs,
} from 'vue';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const { icon } = toRefs(attrs);
const args = computed(() => (attrs));
</script>

<style lang="scss">

</style>
