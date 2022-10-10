<template>
  <svg
    class="ui-interactive-svg"
  >
    <!-- @slot Use this slot to place svg elements. -->
    <slot />
  </svg>
</template>

<script lang="ts">
export default { name: 'UiInteractiveSvg' };
</script>

<script setup lang="ts">
import {
  computed,
  provide,
  useAttrs,
} from 'vue';
import type { PropType } from 'vue';

export type AttrsFunc = (attrs: Record<string, unknown>) => Record<string, unknown>;
const props = defineProps({
  /**
  * Use this props to pass function that returns attrs for UiInteractiveSvgElements
  */
  elementsAttrs: {
    type: Function as PropType<AttrsFunc>,
    default: (attrs: Record<string, unknown>) => ({}),
  },
});
// TODO: remove in 0.6.0 / BEGIN
const attrs = useAttrs();
const setElementsAttrs = computed(() => (attrs.setElementsAttrs || attrs['set-elements-attrs']));
if (setElementsAttrs.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiInteractiveSVG]: The `setElementsAttrs` props will be removed in 0.6.0. Please use `elementsAttrs` props instead.');
  }
}
// END
provide('elementsAttrs', setElementsAttrs.value || props.elementsAttrs);
</script>
