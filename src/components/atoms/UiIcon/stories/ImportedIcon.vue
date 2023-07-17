<template>
  <UiIcon
    :icon="icon"
    class="imported-icon"
  />
</template>

<script setup>
import {
  defineOptions,
  defineAsyncComponent,
} from 'vue';
import { UiIcon } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const icon = defineAsyncComponent(() => import('../../../../../public/logo.svg'));
</script>

<style lang="scss">
.imported-icon {
  --icon-width: 7.75rem;
  --icon-height: auto;
}
</style>
