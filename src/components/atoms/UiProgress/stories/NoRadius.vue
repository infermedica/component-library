<template>
  <UiProgress
    v-bind="args"
    class="no-radius"
  />
</template>

<script setup>
import {
  computed,
  defineOptions,
  useAttrs,
} from 'vue';
import { UiProgress } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const args = computed(() => (attrs));
</script>

<style lang="scss">
@use "../../../../styles/mixins";

.no-radius {
  @include mixins.override-logical('progress', null, border-radius, 0);
  @include mixins.override-logical('progress-indicator', null, border-radius, 0);
}
</style>
