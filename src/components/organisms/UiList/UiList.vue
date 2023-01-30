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
import type { HTMLAttributes } from 'vue';
import UiListItem from './_internal/UiListItem.vue';
import type { ListItemAttrsProps } from './_internal/UiListItem.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type {
  DefineAttrsProps,
  ListHTMLTag,
} from '../../../types';

export interface ListItemComplex extends ListItemAttrsProps {
  name: string;
  label?: string;
  // eslint-disable-next-line no-use-before-define
  children?: ListAttrsProps
}
export type ListItem = string | ListItemComplex;
export interface ListProps {
  /**
   * Use this props to pass list tag.
   */
  tag: ListHTMLTag;
  /**
   * Use this props to pass list items.
   */
  items: ListItem[],
}
export type ListAttrsProps<HTMLAttrs = HTMLAttributes> = DefineAttrsProps<ListProps, HTMLAttrs>;

const props = withDefaults(defineProps<ListProps>(), {
  tag: 'ul',
  items: () => ([]),
});
const itemsToRender = computed<ListItemComplex[]>(() => (props.items.map((item, key) => {
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
const listItemAttrs = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  name, label, children, ...rest
}: ListItemComplex) => rest;
</script>

<style lang="scss">
.ui-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
