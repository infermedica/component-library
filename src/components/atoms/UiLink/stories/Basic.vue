<template>
  <UiLink v-bind="args">
    {{ content }}
  </UiLink>
  <UiLink v-bind="args">
    <UiIcon
      :icon="icon"
      class="ui-link__icon"
    />{{ content }}
  </UiLink>
  <UiLink v-bind="args">
    {{ content }}<UiIcon
      :icon="icon"
      class="ui-link__icon ui-link__icon--end"
    />
  </UiLink>
</template>

<script setup>
import {
  reactive,
  computed,
  useAttrs,
  defineOptions,
  toRefs,
} from 'vue';
import {
  UiLink,
  UiIcon,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = reactive(useAttrs());
const args = computed(() => (attrs));
const {
  content, icon,
} = toRefs(attrs);
</script>
