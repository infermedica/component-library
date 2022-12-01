<template>
  <component
    :is="tag"
    :style="listStyleType"
    class="ui-bullet-points"
  >
    <!-- @slot Use this slot to place bullet points items -->
    <slot>
      <template
        v-for="(item, key) in itemsToRender"
        :key="key"
      >
        <UiBulletPointsItem
          v-bind="bulletPointsItemAttrs(item)"
        >
          <!-- @slot Use this slot to replace bullet point item content. -->
          <slot
            :name="item.name"
            v-bind="{ item }"
          >
            {{ item.text }}
            <template v-if="item.children?.items">
              <component
                :is="'ui-bullet-points'"
                v-bind="item.children"
              />
            </template>
          </slot>
        </UiBulletPointsItem>
      </template>
    </slot>
  </component>
</template>

<script lang="ts">
export default { name: 'UiBulletPoints' };
</script>

<script setup lang="ts">
import {
  computed,
  provide,
} from 'vue';
import type {
  CSSProperties,
  PropType,
} from 'vue';
import UiBulletPointsItem from './_internal/UiBulletPointsItem.vue';
import type { ListTag } from '../../../types/tag';
import type { IconAsString } from '../../../types/icon';

export type BulletPointsType = 'a' | 'A' | 'i' | 'I' | '1' | 'ar';
export interface BulletPointsRenderItem {
  name: string;
  text: string;
  children?: {
    tag: ListTag;
    type: BulletPointsType;
    items: Record<string, unknown>[];
    icon: IconAsString;
    [key: string]: string | Record<string, unknown>[];
  } | Record<string, unknown>;
  bulletPointsItemAttrs?: Record<string, unknown>
}
export interface BulletPointsItemAsObj {
  name: string,
  text: string,
  items?: Record<string, unknown>[];
  children?: {
    items?: Record<string, unknown>[]
    bulletPointAttrs?: Record<string, unknown>
  }
}
export type BulletPointsItem = string | BulletPointsItemAsObj;
const props = defineProps({
  /**
   * Use this props to set list tag.
   */
  tag: {
    type: String as PropType<ListTag>,
    default: 'ul',
  },
  /**
   * Use this props to set list type.
   */
  type: {
    type: String as PropType<BulletPointsType>,
    default: '1',
  },
  /**
   * Use this props to set list of bullet points.
   */
  items: {
    type: Array as PropType<BulletPointsItem[]>,
    default: () => ([]),
  },
  /**
   * Use this props to set the bullet point icon.
   */
  icon: {
    type: String as PropType<IconAsString>,
    default: 'bullet-common',
  },
});
const tag = computed(() => props.tag);
provide('tag', tag);
const listStyleType = computed<CSSProperties>(() => {
  const type = {
    a: {
      style: 'lower-latin',
      suffix: ')',
    },
    A: {
      style: 'upper-latin',
      suffix: ')',
    },
    i: {
      style: 'lower-roman',
      suffix: '.',
    },
    I: {
      style: 'upper-roman',
      suffix: '.',
    },
    1: {
      style: 'decimal',
      suffix: '.',
    },
    ar: {
      style: 'arabic-indic',
      suffix: '.',
    },
  };
  // TODO: decide how to handle latin/roman styles
  // Decimal appears to be perfectly fine for most of Arabic variants
  return {
    '--_list-style-type': type[props.type]?.style,
    '--_list-item-suffix': `"${type[props.type]?.suffix}"`,
  };
});
const itemsToRender = computed<BulletPointsRenderItem[]>(() => (
  props.items.map((item, index) => {
    if (typeof item === 'string') {
      return {
        name: `bullet-point-${index}`,
        text: item,
      };
    }
    return {
      ...item,
      name: item.name || `bullet-point-${index}`,
      children: Array.isArray(item.children)
        ? {
          tag: props.tag,
          type: props.type,
          items: item.children,
          icon: props.icon,
        }
        : {
          items: item.children?.items,
          tag: props.tag,
          type: props.type,
          icon: props.icon,
          ...item.children,
        },
    };
  })));
const bulletPointsItemAttrs = (item: BulletPointsRenderItem) => {
  const {
    name, text, children, ...rest
  } = item;
  return rest;
};
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-bullet-points {
  $element: bullet-points;

  @include mixins.use-logical($element, padding, 0);
  @include mixins.use-logical($element, margin, 0);

  display: flex;
  flex-direction: column;
  gap: functions.var($element, gap, var(--space-4));

  counter-reset: counter;
  list-style-type: none;
}
</style>
