<template>
  <UiButton v-bind="args">
    {{ content }}
  </UiButton>
  <UiButton
    v-bind="args"
    :is-loading="true"
  >
    {{ content }}
  </UiButton>
  <UiButton v-bind="args">
    <UiIcon
      :icon="icon"
      class="ui-button__icon"
    />{{ content }}
  </UiButton>
  <UiButton v-bind="args">
    {{ content }}<UiIcon
      :icon="icon"
      class="ui-button__icon ui-button__icon--end"
    />
  </UiButton>
</template>

<script setup>
import {
  computed,
  useAttrs,
  toRefs,
} from 'vue';
import {
  UiButton,
  UiIcon,
} from '@infermedica/component-library';

const attrs = useAttrs();
const args = computed(() => (attrs));
const {
  content, icon,
} = toRefs(attrs);
</script>
