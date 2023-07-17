<template>
  <UiLink v-bind="args">
    <UiIcon
      v-if="icon"
      :icon="icon"
      class="ui-link__icon"
    />
    {{ content }}
    <UiIcon
      v-if="iconEnd"
      :icon="iconEnd"
      class="ui-link__icon ui-link__icon--end"
    />
  </UiLink>
</template>

<script setup>
import {
  computed,
  defineOptions,
  useAttrs,
  toRefs,
} from 'vue';
import {
  UiLink,
  UiIcon,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const {
  content,
  icon,
  iconEnd,
} = toRefs(attrs);
const args = computed(() => (attrs));
</script>
