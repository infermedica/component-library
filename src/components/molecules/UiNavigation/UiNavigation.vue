<template>
  <nav
    ref="nav"
    class="ui-navigation"
    :class="{'ui-navigation--is-multiline': isMultiline}"
  >
    <!-- @slot Use this slot to place content inside component.-->
    <slot>
      <template
        v-for="(item, key) in itemsToRender"
        :key="key"
      >
        <UiNavigationItem
          class=" ui-navigation__item"
          v-bind="item.attrs"
        >
          <!-- @slot Use this slot to replace navigation item content. -->
          <slot
            :name="item.name"
            v-bind="{item}"
          >
            {{ item.text }}
          </slot>
        </UiNavigationItem>
      </template>
    </slot>
  </nav>
</template>

<script setup>
import {
  computed, ref, onMounted, onBeforeUnmount, nextTick, useAttrs, provide,
} from 'vue';
import UiNavigationItem from './_internal/UiNavigationItem.vue';

const props = defineProps({
  /**
   * Use this props to pass list of navigation items.
   */
  items: {
    type: Array,
    default: () => ([]),
  },
});
const attrs = useAttrs();
const nav = ref(null);
const isMultiline = ref(false);
const modifiers = computed(() => (attrs?.class || ''));
provide('modifiers', modifiers);
const itemsToRender = computed(() => (props.items.map((item, key) => {
  const { name, text, ...attrs } = item;
  return {
    name: name || `navigation-item-${key}`,
    text,
    attrs,
  };
})));
const resizeObserver = new ResizeObserver((entries) => {
  const { target } = entries[0];
  isMultiline.value = [...target.children].at(-1).offsetTop > target.offsetTop;
});
onMounted(async () => {
  await nextTick();
  resizeObserver.observe(nav.value);
});
onBeforeUnmount(() => {
  resizeObserver.unobserve(nav.value);
});
</script>

<style lang="scss">
.ui-navigation {
  $this: &;

  display: var(--navigation-display, inline-flex);
  flex-flow: var(--navigation-flow, row wrap);
  align-items: var(--navigation-align-items, center);
  justify-content: var(--navigation-justify-content, center);
  margin: var(--navigation-margin, 0 calc(var(--space-8) * -1));

  &--is-multiline {
    --navigation-margin: var(--navigation-multiline-margin, 0 calc(var(--space-8) * -1) calc(var(--space-12) * -1));
    --navigation-item-margin:
      var(--navigation-item-multiline-margin, 0 var(--space-8) var(--space-12))
  ;
  }
}
</style>
