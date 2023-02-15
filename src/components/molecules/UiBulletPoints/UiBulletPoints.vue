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
            <template v-if="item.children">
              <component
                :is="'ui-bullet-points'"
                v-bind="item.children"
                class="ui-bullet-points--nested"
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
  ComputedRef,
  CSSProperties,
  LiHTMLAttributes,
  OlHTMLAttributes,
} from 'vue';
import UiBulletPointsItem from './_internal/UiBulletPointsItem.vue';
import type { BulletPointsItemAttrsProps } from './_internal/UiBulletPointsItem.vue';
import type {
  DefineAttrsProps,
  IconName,
  HTMLListTag,
} from '../../../types';

export type BulletPointsType = 'a' | 'A' | 'i' | 'I' | '1' | 'ar';
export interface BulletPointsItemComplex extends BulletPointsItemAttrsProps {
  name?: string;
  text?: string;
  // eslint-disable-next-line no-use-before-define
  children?: BulletPointsItem[] | BulletPointsAttrsProps;
}
export type BulletPointsItem = string | BulletPointsItemComplex;
export type BulletPointsRenderItem = ({name: string; text: string}
  | {name: string}
  // eslint-disable-next-line no-use-before-define
  | {children: BulletPointsItem[] | BulletPointsAttrsProps; name: string;})
  & BulletPointsItemAttrsProps;
export interface BulletPointsProps {
  /**
   * Use this props to set list tag.
   */
  tag?: HTMLListTag;
  /**
   * Use this props to set list type.
   */
  type?: BulletPointsType;
  /**
   * Use this props to set list of bullet points.
   */
  items?: BulletPointsItem[];
  /**
   * Use this props to set the bullet point icon.
   */
  icon?: IconName;
}
export type BulletPointsAttrsProps = DefineAttrsProps<BulletPointsProps, LiHTMLAttributes | OlHTMLAttributes>;

const props = withDefaults(defineProps<BulletPointsProps>(), {
  tag: 'ul',
  type: '1',
  items: () => ([]),
  icon: 'bullet-common',
});
const tag = computed(() => props.tag);
provide<ComputedRef<HTMLListTag>>('tag', tag);
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
    '--_list-style-type': type[props.type].style,
    '--_list-item-suffix': `"${type[props.type].suffix}"`,
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
    if ((item.children)) {
      return {
        ...item,
        name: item.name || `bullet-point-${index}`,
        children: Array.isArray(item.children) ? {
          tag: props.tag,
          type: props.type,
          items: item.children,
          icon: props.icon,
        } : {
          items: item.children?.items,
          tag: props.tag,
          type: props.type,
          icon: props.icon,
          ...item.children,
        },
      };
    }
    return {
      ...item,
      name: item.name || `bullet-point-${index}`,
    };
  })));
const bulletPointsItemAttrs = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  name, text, children, ...itemAttrs
}: BulletPointsRenderItem) => itemAttrs;
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-bullet-points {
  $element: bullet-points;

  --_bullet-points-gap: #{functions.var($element, gap, var(--space-4))};

  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  counter-reset: counter;
  gap: var(--_bullet-points-gap);
  list-style-type: none;

  &--nested {
    margin-block-start: var(--_bullet-points-gap);
  }
}
</style>
