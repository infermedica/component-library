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
        <UiBulletPointsItem v-bind="item.bulletPointsItemAttrs">
          <!-- @slot Use this slot to replace bullet point item content. -->
          <slot
            :name="item.name"
            v-bind="{item}"
          >
            <UiText>{{ item.text }}</UiText>
            <template v-if="item.children?.items">
              <component
                is="ui-bullet-points"
                v-bind="item.children"
              />
            </template>
          </slot>
        </UiBulletPointsItem>
      </template>
    </slot>
  </component>
</template>

<script setup>
import { computed, provide } from 'vue';
import UiBulletPointsItem from './_internal/UiBulletPointsItem.vue';
import UiText from '../../atoms/UiText/UiText.vue';

const props = defineProps({
  /**
   * Use this props to set list tag.
   */
  tag: {
    type: String,
    default: 'ul',
  },
  /**
   * Use this props to set list type.
   */
  type: {
    type: String,
    default: '1',
  },
  /**
   * Use this props to set list of bullet points.
   */
  items: {
    type: Array,
    default: () => ([]),
  },
  /**
   * Use this props to set the bullet point icon.
   */
  icon: {
    type: String,
    default: 'bullet-common',
  },
});
const tag = computed(() => (props.tag));
provide('tag', tag);

const listStyleType = computed(() => {
  const type = {
    a: { style: 'lower-latin', suffix: ')' },
    A: { style: 'upper-latin', suffix: ')' },
    i: { style: 'lower-roman', suffix: '.' },
    I: { style: 'upper-roman', suffix: '.' },
    1: { style: 'decimal', suffix: '.' },
    ar: { style: 'arabic-indic', suffix: '.' },
  };

  // TODO: decide how to handle latin/roman styles
  // Decimal appears to be perfectly fine for most of Arabic variants

  return {
    '--list-style-type': type[props.type]?.style,
    '--list-item-suffix': `"${type[props.type]?.suffix}"`,
  };
});

const itemsToRender = computed(() => (props.items.map((item, index) => {
  const { name, children } = item;
  if (typeof item === 'string') {
    return {
      name: `bullet-point-${index}`,
      text: item,
    };
  }
  return {
    name: name || `bullet-point-${index}`,
    ...item,
    children: Array.isArray(children)
      ? {
        tag: props.tag,
        type: props.type,
        items: children,
        icon: props.icon,
      }
      : {
        items: children?.items,
        ...(children?.bulletPointAttrs || {
          tag: props.tag,
          type: props.type,
          icon: props.icon,
        }),
      },
  };
})));
</script>

<style lang="scss">
.ui-bullet-points {
  padding: 0;
  margin: 0;
  counter-reset: counter;
  list-style-type: none;
}
</style>
