<template>
  <UiList :items="Radioes">
    <template
      v-for="(radio, key) in Radioes"
      :key="key"
      #[radio.name]
    />
  </UiList>
</template>

<script setup lang="ts">
import {
  reactive,
  computed,
  inject,
  useAttrs,
  defineOptions,
  toRefs,
  withDefaults,
} from 'vue';
import {
  UiList,
  UiRadio,
} from '@infermedica/component-library';
import type { DefineAttrsProps } from '../../../../types';

export interface RadioGroupProps {
  items?: Record<any, any>[],
}
export type RadioGroupAttrsProps = DefineAttrsProps<RadioGroupProps>;
const props = withDefaults(defineProps<RadioGroupProps>(), { items: () => ([]) });

defineOptions({ inheritAttrs: false });
const attrs = reactive(useAttrs());
const args = computed(() => (attrs));
const { content } = toRefs(attrs);
const value = inject('value');
const Radioes = props.items.map((item, index) => {
  const template = {
    tag: UiRadio,
    modelValue: value.value,
    value: item.value || item,
    name: item.id || `Radio-${index}`,
    id: item.id || `Radio-${index}`,
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
