<template>
  <ul class="ui-list">
    <template
      v-for="(item, key) in itemsToRender"
      :key="key"
    >
      <UiListItem
        v-bind="item"
      >
        <template
          v-for="(_, name) in slots"
          #[name]="data"
        >
          <slot
            v-bind="data"
            :name="name"
          />
        </template>
        <template v-if="useListItemSlot">
          <!-- @slot Use this slot to replace list item content -->
          <slot
            name="listItem"
            v-bind="{ item }"
          >
            <UiText>
              {{ item.label }}
            </UiText>
          </slot>
          <template>
          <!-- TODO: restore support for children rendering -->
          </template>
        </template>
        <template v-else>
          <!-- @slot Use this slot to replace list item content -->
          <slot
            :name="item.name"
            v-bind="{ item }"
          >
            <UiText>
              {{ item.label }}
            </UiText>
          </slot>
        </template>
        <template v-if="item.children?.items">
          <UiList
            v-bind="item.children"
          />
        </template>
      </UiListItem>
    </template>
  </ul>
</template>

<script setup lang="ts">
import {
  computed,
  type HTMLAttributes,
  useSlots,
} from 'vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiListItem, { type ListItemAttrsProps } from './_internal/UiListItem.vue';
import type {
  DefineAttrsProps,
  HTMLListTag,
} from '../../../types';

export interface ListRenderItem extends ListItemAttrsProps {
  name: string;
  label?: string;
  children?: ListItemAttrsProps;
}
export type ListItem = string | ListRenderItem;
export interface ListProps {
  /**
   * Use this props to pass list items.
   */
  items?: ListItem[];
  /**
   * Use this props to pass list tag.
   */
  tag?: HTMLListTag;
}
export type ListAttrsProps<HTMLAttrs = HTMLAttributes> = DefineAttrsProps<ListProps, HTMLAttrs>;

const props = withDefaults(defineProps<ListProps>(), {
  items: () => ([]),
  tag: 'ul',
});
const itemsToRender = computed(() => (props.items
  .map((item, index) => {
    if (typeof item === 'string') {
      return {
        name: `list-item-${index}`,
        label: item,
      };
    }
    return {
      ...item,
      name: item.name || `list-item-${index}`,
    };
  })));
const slots = useSlots();
const useListItemSlot = computed(() => ('listItem' in slots));
</script>

<style lang="scss">
.ui-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
