<template>
  <component
    :is="file"
    class="ui-icon"
  />
</template>

<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  h,
} from 'vue';
import type { SVGAttributes } from 'vue';
import type {
  DefineAttrsProps,
  Icon,
} from '../../../types';

export interface IconProps {
  /**
   * Use this prop to set the icon.
   */
  icon?: Icon;
}
export type IconAttrsProps = DefineAttrsProps<IconProps, SVGAttributes>;

const props = withDefaults(defineProps<IconProps>(), { icon: '' });
const file = computed<SVGElement>(() => {
  if (!props.icon) return h('svg');
  if (typeof props.icon === 'string') {
    return defineAsyncComponent({
      loader: () => import(`../../../assets/icons/${props.icon}.svg`),
      loadingComponent: () => h('svg', { class: 'ui-icon' }),
      delay: 0,
    });
  }
  return props.icon;
});
</script>

<style lang="scss">
@use "../../../styles/functions";

.ui-icon {
  $this: &;
  $element: icon;

  width: functions.var($element, size, functions.var($element, width, 1.5rem));
  height: functions.var($element, size, functions.var($element, height, 1.5rem));
  fill: functions.var($element, color);

  &.rtl-supported {
    [dir="rtl"] & {
      transform: scaleX(-1);
    }
  }
}
</style>
