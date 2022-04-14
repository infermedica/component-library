<template>
  <component
    :is="file"
    class="ui-icon"
  />
</template>

<script setup>
import { computed, defineAsyncComponent, h } from 'vue';

const props = defineProps({
  /**
   * Use this prop to set the icon.
   */
  icon: {
    type: [String, Object],
    default: '',
  },
});
const file = computed(() => {
  if (!props.icon) return h('svg');
  if (typeof props.icon === 'string') {
    return defineAsyncComponent(() => import(
      /* webpackChunkName: "icons" */
      /* webpackMode: "eager" */
      /* webpackPreload: true */
      `../../../assets/icons/${props.icon}.svg`
    ));
  }
  return props.icon;
});
</script>

<style lang="scss">
.ui-icon {
  width: var(--icon-size, var(--icon-width, 1rem));
  height: var(--icon-size, var(--icon-height, 1rem));
  flex: none;
  fill: var(--icon-color);
}

.rtl-supported {
  [dir="rtl"] & {
    transform: scaleX(-1);
  }
}
</style>
