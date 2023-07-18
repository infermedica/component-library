<template>
  <UiList
    :items="itemsToRender"
  />
</template>

<script setup>
import {
  computed,
  defineOptions,
  useAttrs,
  toRefs,
  inject,
  unref,
} from 'vue';
import {
  UiCheckbox,
  UiList,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const { items } = toRefs(attrs);
const args = computed(() => (attrs));
const value = inject('value');
const itemsToRender = computed(() => items.value.map((item) => {
  if (typeof item === 'string') {
    return {
      label: item,
      tag: UiCheckbox,
      value: item,
      modelValue: value.value,
      'onUpdate:modelValue': (val) => (value.value = val),
    };
  }
  item.tag = UiCheckbox;
  // TODO: modelValue for Object
  return item;
}));
</script>
