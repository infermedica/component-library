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
  content,
  icon,
  iconEnd,
  modifiers,
  ...rest
} = attrs;
const args = computed(() => ({
  ...rest,
  class: modifiers,
}));
</script>
