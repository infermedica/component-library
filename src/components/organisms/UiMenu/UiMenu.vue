<template>
  <component
    :is="tag"
    class="ui-menu"
  >
    <!-- @slot Use this slot to place menu items -->
    <slot>
      <template
        v-for="(item, key) in items"
        :key="key"
      >
        <UiMenuItem v-bind="item">
          <!-- @slot Use this slot to place menu item content. -->
          <slot
            :name="item.name"
            v-bind="{
              item
            }"
          >
            {{ item.name || item.value }}
          </slot>
        </UiMenuItem>
      </template>
    </slot>
  </component>
</template>

<script setup lang="ts">
import {
  computed,
  provide,
} from 'vue';
import type { PropType } from 'vue';
import type { HTMLTag } from '../../../types/tag';
import UiMenuItem from './_internal/UiMenuItem.vue';
import UiList from '../UiList/UiList.vue';

export type MenuValue = string | string[];
export type MenuIconVisible = 'default' | 'always' | 'never';
export interface MenuItem {
  value: string;
  iconLabel?: string;
  iconVisible?: MenuIconVisible;
  name?: string;
  [key: string]: unknown;
}
const props = defineProps({
  modelValue: {
    type: [String, Object, Array] as PropType<MenuValue>,
    default: '',
  },
  tag: {
    type: [String, Object] as PropType<HTMLTag | Record<string, unknown>>,
    default: UiList,
  },
  items: {
    type: Array as PropType<MenuItem[]>,
    default: () => ([]),
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: MenuValue):void;}>();
const modelValue = computed(() => (props.modelValue));
function changeHandler(value: MenuValue):void {
  emit('update:modelValue', value);
}
provide('changeHandler', changeHandler);
provide('modelValue', modelValue);
</script>
