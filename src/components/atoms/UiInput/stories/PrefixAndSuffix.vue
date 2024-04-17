<template>
  <UiInput v-bind="args">
    <template #aside>
      <UiIcon
        :icon="'close' as Icon"
        class="ui-input__aside"
      />
    </template>
  </UiInput>
</template>

<script setup lang="ts">
import {
  reactive,
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import {
  UiIcon,
  UiInput,
} from '@infermedica/component-library';
import type { Icon } from '../../../../types/icon';

defineOptions({ inheritAttrs: false });
const attrs = reactive(useAttrs());
const args = computed(() => (attrs));

</script>

<style lang="scss" scope>
.ui-input__aside {
  --icon-color: var(--color-gray-600);
}
</style>
