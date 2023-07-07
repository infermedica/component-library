<template>
  <UiTabs
    v-model="value"
    v-bind="args"
  >
    <template
      v-for="({ name }, key) in items"
      #[name]="{ item: { name } }"
      :key="key"
    >
      <UiText>
        {{ content[name] }}
      </UiText>
    </template>
  </UiTabs>
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import {
  computed,
  ref,
  useAttrs,
} from 'vue';
import { UiTabs } from '@infermedica/component-library';
import UiText from '../../../atoms/UiText/UiText.vue';

const attrs = useAttrs();
const {
  modelValue,
  content,
  items,
  modifiers,
  ...rest
} = attrs;

const value = ref(modelValue);
const args = computed(() => ({
  ...rest,
  items,
  class: modifiers,
}));

</script>
