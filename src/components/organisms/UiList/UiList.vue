<template>
  <component
    :is="tag"
    class="ui-list"
  >
    <!-- @slot Use this slot to place list items-->
    <slot />
  </component>
</template>

<script>
import Vue from 'vue';
import UiListItem from './_internal/UiListItem.vue';

// TODO: Vue3  this.component('UiLitItem', UiListItem)
Vue.component('UiListItem', UiListItem);

export default {
  name: 'UiList',
  props: {
    /**
     * Use this props to set list tag.
     */
    tag: {
      type: String,
      default: 'ul',
    },
  },
};
</script>

<style lang="scss">
.ui-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
