<template>
  <component
    :is="tag"
    class="ui-list"
  >
    <!-- @slot Use this slot to place list items. -->
    <slot>
      <template
        v-for="(item, key) in itemsToRender"
        :key="key"
      >
        <UiListItem
          v-bind="item"
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
    <template v-if="hasLoader">
      <component
        :is="loader"
        :is-loading="isLoading"
        v-bind="defaultProps.loaderAttrs"
      >
        <template #loader>
          <!-- @slot Use this slot to replace loader. -->
          <slot name="loader" />
        </template>
        <!-- @slot Use this slot to place content inside button. -->
        <slot />
      </component>
    </template>
  </component>
</template>

<script setup lang="ts">
import {
  h,
  computed,
  ref,
  watch,
  type HTMLAttributes,
  defineAsyncComponent,
  useSlots,
} from 'vue';
import UiListItem, { type ListItemAttrsProps } from './_internal/UiListItem.vue';
import type { LoaderAttrsProps } from '../../molecules/UiLoader/UiLoader.vue';
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
   * Use this props to set button into loading state.
   */
  isLoading?: boolean;
  /**
   * Use this props to pass attrs for UiLoader.
   */
  loaderAttrs?: LoaderAttrsProps;
}
export type ListAttrsProps<HTMLAttrs = HTMLAttributes> = DefineAttrsProps<ListProps, HTMLAttrs>;

const props = withDefaults(defineProps<ListProps>(), {
  tag: 'ul',
  items: () => ([]),
  isLoading: false,
  loaderAttrs: () => ({}),
});
const defaultProps = computed(() => ({
  loaderAttrs: {
    type: 'skeleton' as const,
    'transition-type': 'show',
    ...props.loaderAttrs,
  },
}));
const hasLoader = ref(props.isLoading);
watch(() => (props.isLoading), (isLoading) => {
  if (isLoading && !hasLoader.value) {
    hasLoader.value = true;
  }
}, { once: true });
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
const loader = computed(() => (
  hasLoader.value
    ? defineAsyncComponent({
      loader: () => import('../../molecules/UiLoader/UiLoader.vue'),
      delay: 0,
      loadingComponent: () => (slots.default
        ? h('slot', slots.default())
        : null)
      ,
    })
    : null
));
</script>

<style lang="scss">
.ui-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
