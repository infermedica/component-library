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
        <UiListItem>
          <!-- @slot Use this slot to replace list item content -->
          <slot
            :name="item.name"
            v-bind="{item}"
          >
            <UiText>{{ item.text }}</UiText>
            <template v-if="item.children?.items">
              <component
                is="ui-list"
                v-bind="item.children"
              />
            </template>
          </slot>
        </UiListItem>
      </template>
    </slot>
  </component>
</template>

<script setup>
import { computed } from 'vue';
import UiListItem from './_internal/UiListItem.vue';
import UiText from '../../atoms/UiText/UiText.vue';

const props = defineProps({
  /**
   * Use this props to pass list tag.
   */
  tag: {
    type: String,
    default: 'ul',
  },
  /**
   * Use this props to pass list items.
   */
  items: {
    type: Array,
    default: () => ([]),
  },
});
const itemsToRender = computed(() => (props.items.map((item, key) => {
  if (typeof item === 'string') {
    return {
      name: `list-item-${key}`,
      text: item,
    };
  }
  return {
    name: item.name || `list-item-${key}`,
    ...item,
    children: Array.isArray(item.children)
      ? {
        tag: props.tag,
        items: item.children,
      }
      : {
        items: item.children?.items,
        ...(item.children?.itemsAttrs || {
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
