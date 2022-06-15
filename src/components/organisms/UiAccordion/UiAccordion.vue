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
            v-bind="{item}"
          />
        </UiAccordionItem>
      </template>
    </slot>
  </UiList>
</template>

<script setup>
import { computed, provide } from 'vue';
import UiAccordionItem from './_internal/UiAccordionItem.vue';
import UiList from '../UiList/UiList.vue';

const props = defineProps({
  /**
   * Use this props or v-model to set opened items.
   */
  modelValue: {
    type: [String, Array],
    default: '',
  },
  /**
   * Use this props to pass accordion items.
   */
  items: {
    type: Array,
    default: () => ([]),
  },
});
const emit = defineEmits(['update:modelValue']);
const opened = computed(() => (props.modelValue));
provide('opened', opened);
function toggle(name) {
  if (typeof opened.value === 'string') {
    if (opened.value === name) {
      emit('update:modelValue', '');
    } else {
      emit('update:modelValue', name);
    }
  } else if (opened.value.includes(name)) {
    emit('update:modelValue', opened.value.filter((item) => (item !== name)));
  } else {
    emit('update:modelValue', [...opened.value, name]);
  }
}
provide('toggle', toggle);
const itemsToRender = computed(() => (props.items.map((item, key) => {
  const { name } = item;
  if (typeof item === 'string') {
    return {
      name: `accordion-item-${key}`,
      text: item,
    };
  }
  return {
    name: name || `accordion-item-${key}`,
    ...item,
  };
})));
</script>
