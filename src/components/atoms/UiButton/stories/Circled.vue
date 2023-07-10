<template>
  <UiButton v-bind="args">
    <UiText>
      {{ content }}
    </UiText>
  </UiButton>
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
  UiText,
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
  modifiers,
  ...rest
} = attrs;
const args = computed(() => ({
  ...rest,
  class: modifiers,
}));
</script>
