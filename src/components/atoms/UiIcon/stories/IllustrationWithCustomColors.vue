<template>
  <UiIcon
    v-bind="args"
    class="illustration-with-custom-colors"
  />
</template>

<script setup>
import {
  computed,
  defineOptions,
  useAttrs,
  toRefs,
} from 'vue';
import { UiIcon } from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const { content } = toRefs(attrs);
const args = computed(() => (attrs));
</script>

<style lang="scss">
.illustration-with-custom-colors {
  --icon-width: 15rem;
  --icon-height: auto;
  --boy-skin: #f0d7bf;
  --boy-hair: #bf9b6f;
  --boy-background: #f1eff0;
  --boy-shirt: #b2746e;
  --boy-undershirt: #7e6865;
  --boy-browser-page-header: #d9a491;
  --boy-browser-page-button-outline: #d9baba;
  --boy-browser-page-icon: #d9baba;
  --boy-browser: #ddd;
  --boy-laptop: #51636e;
  --boy-laptop-logo: #91a5b1;
}
</style>
