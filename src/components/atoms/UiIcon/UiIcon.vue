<template>
  <component
    :is="file"
    class="ui-icon"
  />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue';

const props = defineProps({
  icon: {
    type: [String, Object],
    default: '',
  },
});
const file = computed(() => (typeof props.icon === 'string'
  ? defineAsyncComponent(() => import(
    /* webpackChunkName: "icons" */
    /* webpackMode: "eager" */
    /* webpackPreload: true */
    `../../../assets/svg/${props.icon}.svg`
  ))
  : props.icon));
</script>

<style lang="scss">
.ui-icon {
  flex: none;
  width: var(--icon-size, var(--icon-width, 1rem));
  height: var(--icon-size, var(--icon-height, 1rem));
  fill: var(--icon-color);
}

.rtl-supported {
  [dir="rtl"] & {
    transform: scaleX(-1);
  }
}
</style>
