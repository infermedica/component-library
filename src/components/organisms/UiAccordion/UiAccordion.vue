<template>
  <UiList class="ui-accordion">
    <!-- @slot Use this slot to place accordion items. -->
    <slot>
      <template
        v-for="(item, key) in itemsToRender"
        :key="key"
      >
        <UiAccordionItem
          :title="item.title"
          :name="item.name"
          :settings="item.settings"
          v-bind="item.accordionItemAttrs"
        >
          <!-- @slot Use this slot to replace accordion item content. -->
          <slot
            :name="item.name"
            v-bind="{
              item
            }"
          />
        </UiAccordionItem>
      </template>
    </slot>
  </UiList>
</template>

<script setup lang="ts">
import {
  computed,
  provide,
} from 'vue';
import type { PropType } from 'vue';
import UiAccordionItem from './_internal/UiAccordionItem.vue';
import UiList from '../UiList/UiList.vue';
import type { IconAsString } from '../../../types/icon';

export type AccordionValue = string | string[];
export interface AccordionItemSettings {
  iconOpen?: IconAsString;
  iconClose?: IconAsString;
  [key: string]: unknown
}
export interface AccordionItemAsObj {
  title: string;
  name?: string;
  accordionItemAttrs?: Record<string, unknown>;
  settings?: AccordionItemSettings;
  [key: string]: unknown;
}
export type AccordionItem = string | AccordionItemAsObj;
const props = defineProps({
  /**
   * Use this props or v-model to set opened items.
   */
  modelValue: {
    type: [String, Array] as PropType<AccordionValue>,
    default: '',
  },
  /**
   * Use this props to pass accordion items.
   */
  items: {
    type: Array as PropType<AccordionItem[]>,
    default: () => ([]),
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value:AccordionValue): void}>();
const opened = computed<AccordionValue>(() => (props.modelValue));
provide('opened', opened);
function toggle(name: string): void {
  if (typeof opened.value === 'string') {
    emit('update:modelValue', opened.value === name ? '' : name);
  } else if (opened.value.includes(name)) {
    emit('update:modelValue', opened.value.filter((item) => (item !== name)));
  } else {
    emit('update:modelValue', [...opened.value, name]);
  }
}
provide('toggle', toggle);
const itemsToRender = computed(() => (props.items.map((item: AccordionItem, key: number) => {
  if (typeof item === 'string') {
    return {
      name: `accordion-item-${key}`,
      title: item,
    };
  }
  return {
    name: `accordion-item-${key}`,
    ...item,
  };
})));
</script>
