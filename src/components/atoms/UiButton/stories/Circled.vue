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
  reactive,
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
const attrs = reactive(useAttrs());
const args = computed(() => (attrs));
const {
  content,
  icon,
} = toRefs(attrs);
</script>
