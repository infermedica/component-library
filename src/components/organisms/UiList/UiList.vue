<template>
  <component
    :is="tag"
    class="ui-list"
  >
    <!-- @slot Use this slot to place list items -->
    <slot>
      <template
        v-for="(item, key) in itemsToRender"
        :key="key"
      >
        <UiListItem v-bind="(item as ListRenderItemWithChildren).listItemAttrs">
          <!-- @slot Use this slot to replace list item content -->
          <slot
            :name="item.name"
            v-bind="{item}"
          >
            <UiText>{{ item.text }}</UiText>
            <template v-if="(item as ListRenderItemWithChildren).children?.items">
              <component
                :is="'ui-list'"
                v-bind="(item as ListRenderItemWithChildren)?.children"
              />
            </template>
          </slot>
        </UiListItem>
      </template>
    </slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import UiListItem from './_internal/UiListItem.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type { ListTag } from '../../../types/tag';

export type ListChildren = {tag?: ListTag, items?: ListChildren, listAttrs: Record<string, unknown>}
export interface ListItemAsObj {
  name: string;
  children: ListChildren | ListChildren[];
}
export type ListItem = string | ListItemAsObj;
export interface ListRenderItem {
  name: string;
  text: string;
}
export interface ListRenderItemWithChildren {
  name: string;
  text?: string;
  children?: {
    tag?: ListTag;
    items?: ListChildren | ListChildren[];
  };
  listItemAttrs?: Record<string, unknown>
}
export type ListRender = ListRenderItem | ListRenderItemWithChildren;
const props = defineProps({
  /**
   * Use this props to pass list tag.
   */
  tag: {
    type: String as PropType<ListTag>,
    default: 'ul',
  },
  /**
   * Use this props to pass list items.
   */
  items: {
    type: Array as PropType<ListItem[]>,
    default: () => ([]),
  },
});
const itemsToRender = computed<ListRender[]>(() => (props.items.map((item: ListItem, key: number) => {
  if (typeof item === 'string') {
    return {
      name: `list-item-${key}`,
      text: item,
    };
  }
  const { name, children } = item;
  return {
    ...item,
    name: name || `list-item-${key}`,
    children: Array.isArray(children)
      ? {
        tag: props.tag,
        items: children,
      }
      : {
        items: children?.items,
        ...(children?.listAttrs || {
          tag: props.tag,
        }),
      },
  };
})));
</script>

<style lang="scss">
.ui-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
