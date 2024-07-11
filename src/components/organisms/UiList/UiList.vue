<template>
  <component
    :is="tag"
    class="ui-list"
    :aria-label="ariaLabel"
    :aria-multiselectable="ariaMultiselectable"
    :aria-activedescendant="ariaActivedescendant"
    :aria-busy="ariaBusy"
  >
    <!-- @slot Use this slot to place list items. -->
    <slot>
      <template
        v-for="(item, key) in itemsToRender"
        :key="key"
      >
        <UiListItem
          v-bind="item"
          class="focus-hidden"
        >
          <!-- Allow to use UiListItemSlots / BEGIN -->
          <template
            v-for="(_, name) in $slots"
            #[name]="data"
          >
            <slot
              v-bind="data"
              :name="name"
            />
          </template>
          <!-- END -->
          <!-- @slot Use this slot to replace list item content -->
          <slot
            :name="item?.name"
            v-bind="item"
          >
            <UiListItemContent :item="item" />
          </slot>
        </UiListItem>
      </template>
    </slot>
    <!-- @slot Use this slot to replace button -->
    <UiListItemButton v-if="showButton">
      <template
        v-for="(_, name) in itemsToRender"
        #[name]="data"
      >
        <slot
          v-bind="data"
          :name="name"
        />
      </template>
    </UiListItemButton>
  </component>
</template>

<script setup lang="ts">
import {
  computed,
  type HTMLAttributes,
} from 'vue';
import UiListItem, { type ListItemAttrsProps } from './_internal/UiListItem.vue';
import UiListItemButton from './_internal/UiListItemButton.vue';
import UiListItemContent from './_internal/UiListItemContent.vue';
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
   * Use this props to pass list tag.
   */
  tag?: HTMLListTag;
  /**
   * Use this props to pass list items.
   */
  items?: ListItem[];
  /**
   * Use this props to show button.
   */
  showButton?: boolean;
  /**
   * Use this props to ariaBusy.
   */
   ariaLabel?: string;
  /**
   * Use this props to ariaMultiselectable.
   */
  ariaMultiselectable?: boolean;
  /**
   * Use this props to ariaActivedescendant.
   */
  ariaActivedescendant?: number;
  /**
   * Use this props to ariaBusy.
   */
  ariaBusy?: boolean;
}
export type ListAttrsProps<HTMLAttrs = HTMLAttributes> = DefineAttrsProps<ListProps, HTMLAttrs>;

const props = withDefaults(defineProps<ListProps>(), {
  tag: 'ul',
  items: () => ([]),
  showButton: true,
  ariaLabel: 'Chronic conditions',
  ariaMultiselectable: true,
  ariaActivedescendant: 2,
  ariaBusy: false,
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
</script>

<style lang="scss">
.ui-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
