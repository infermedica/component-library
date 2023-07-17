<template>
  <UiButton v-bind="args">
    <UiIcon
      v-if="icon"
      :icon="icon"
      class="ui-button__icon"
    />
    {{ content }}
    <UiIcon
      v-if="iconEnd"
      :icon="iconEnd"
      class="ui-button__icon ui-button__icon--end"
    />
  </UiButton>
</template>

<script setup>
import {
  computed,
  defineOptions,
  useAttrs,
  toRefs,
} from 'vue';
import {
  UiButton,
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
