<template>
  <UiList :items="checkboxes">
    <template
      v-for="(checkbox, key) in checkboxes"
      :key="key"
      #[checkbox.name]
    />
  </UiList>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  useAttrs,
  defineOptions,
  toRefs,
  withDefaults,
} from 'vue';
import {
  UiList,
  UiCheckbox,
} from '@infermedica/component-library';
import type { DefineAttrsProps } from '../../../../types';

export interface CheckboxGroupProps {
  items?: Record<any, any>[],
}
export type CheckboxGroupAttrsProps = DefineAttrsProps<CheckboxGroupProps>;
const props = withDefaults(defineProps<CheckboxGroupProps>(), { items: () => ([]) });

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
const { content } = toRefs(attrs);
const value = inject('value');
const checkboxes = props.items.map((item, index) => {
  const template = {
    tag: UiCheckbox,
    modelValue: value.value,
    value: item.value || item,
    name: item.id || `checkbox-${index}`,
    id: item.id || `checkbox-${index}`,
  };
  if (typeof item === 'string') {
    return {
      ...template,
      label: item,
    };
  }
  return {
    ...template,
    ...item,
  };
});
</script>
