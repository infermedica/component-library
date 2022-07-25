<template>
  <component
    :is="file"
    class="ui-icon"
  />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, h } from 'vue';
import type { PropType } from 'vue';
import type { Icon } from '../../../types/icon';

const props = defineProps({
  /**
   * Use this prop to set the icon.
   */
  icon: {
    type: [String, Object] as PropType<Icon>,
    default: '',
  },
});
const file = computed<SVGElement>(() => {
  if (!props.icon) return h('svg');
  if (typeof props.icon === 'string') {
    return defineAsyncComponent(() => import(`../../../assets/icons/${props.icon}.svg`));
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
