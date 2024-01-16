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
  computed,
  useAttrs,
  toRefs,
  defineOptions,
} from 'vue';
import {
  UiButton,
  UiText,
  UiIcon,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const {
  content,
  icon,
} = toRefs(attrs);
</script>
