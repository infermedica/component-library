<template>
  <UiList class="ui-accordion">
    <!-- @slot Use this slot to place accordion items. -->
    <slot>
      <template
        v-for="(item, key) in itemsToRender"
        :key="key"
      >
        <UiAccordionItem
          v-bind="item"
        >
          <!-- @slot Use this slot to replace accordion item content. -->
          <slot
            :name="item.name"
            v-bind="{ item }"
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
import type { ComputedRef } from 'vue';
import UiAccordionItem from './_internal/UiAccordionItem.vue';
import type { AccordionItemAttrsProps } from './_internal/UiAccordionItem.vue';
import UiList from '../UiList/UiList.vue';
import type { ListAttrsProps } from '../UiList/UiList.vue';
import type { DefineAttrsProps } from '../../../types';

export type AccordionToggle = (name: string) => void;
export type AccordionModelValue = string | string[];
export interface AccordionProps {
  /**
   * Use this props or v-model to set opened items.
   */
  modelValue?: AccordionModelValue;
  /**
   * Use this props to pass accordion items.
   */
  items?: (string | AccordionItemAttrsProps)[];
}
export type AccordionAttrsProps = DefineAttrsProps<AccordionProps, ListAttrsProps>
export interface AccordionEmits {
  (e: 'update:modelValue', value: AccordionModelValue): void;
}

const props = withDefaults(defineProps<AccordionProps>(), {
  modelValue: '',
  items: () => ([]),
});
const emit = defineEmits<AccordionEmits>();
const opened = computed(() => (props.modelValue));
provide<ComputedRef<AccordionModelValue>>('opened', opened);
const toggle: AccordionToggle = (name) => {
  if (typeof opened.value === 'string') {
    emit('update:modelValue', opened.value === name ? '' : name);
  } else if (opened.value.includes(name)) {
    emit('update:modelValue', opened.value.filter((item) => (item !== name)));
  } else {
    emit('update:modelValue', [
      ...opened.value,
      name,
    ]);
  }
};
provide<AccordionToggle>('toggle', toggle);
const itemsToRender = computed<AccordionItemAttrsProps[]>(() => (
  props.items.map((item, key) => {
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
