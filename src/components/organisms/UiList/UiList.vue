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
        <UiListItem
          v-bind="listItemAttrs(item)"
        >
          <template
            v-for="(_, name) in $slots"
            #[name]="data"
          >
            <slot
              v-bind="data"
              :name="name"
            />
          </template>
          <!-- @slot Use this slot to replace list item content -->
          <slot
            :name="item.name"
            v-bind="{ item }"
          >
            <UiText
              v-if="item.label"
            >
              {{ item.label }}
            </UiText>
          </slot>
          <template v-if="item.children?.items">
            <ui-list
              v-bind="item.children"
            />
          </template>
        </UiListItem>
      </template>
    </slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { Icon } from '../../../types/icon';
import type { HTMLListTag } from '../../../types/tag';
import UiListItem from './_internal/UiListItem.vue';
import UiText from '../../atoms/UiText/UiText.vue';

export interface ListItemSuffixAttrs {
  label?: string;
  icon?: Icon;
  iconSuffixAttrs?: Record<string, unknown>;
  [key: string]: unknown;
}
export interface ListItemAttrs {
  icon?: Icon;
  hasSuffix?: boolean;
  suffixAttrs?: ListItemSuffixAttrs;
  [key: string]: unknown;
}
export interface ListItemComplex {
  name: string;
  label?: string;
  children?: {
    tag?: HTMLListTag;
    items?: (string | ListItemComplex)[];
    listItemAttrs?: ListItemAttrs;
  }
  listItemAttrs?: ListItemAttrs;
}
export type ListItem = string | ListItemComplex;

const props = defineProps({
  /**
   * Use this props to pass list tag.
   */
  tag: {
    type: String as PropType<HTMLListTag>,
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
const itemsToRender = computed(() => (props.items.map((item, key) => {
  if (typeof item === 'string') {
    return {
      name: `list-item-${key}`,
      label: item,
    };
  }
  return {
    ...item,
    name: item.name || `list-item-${key}`,
  };
})));
/* eslint-disable @typescript-eslint/no-unused-vars */
const listItemAttrs = ({
  name, label, children, ...rest
}: ListItemAttrs) => rest;
/* eslint-enable @typescript-eslint/no-unused-vars */
</script>

<style lang="scss">
.ui-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
