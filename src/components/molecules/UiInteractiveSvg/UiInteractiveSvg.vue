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
import type { SVGAttributes } from 'vue';
import type { InteractiveSvgElementAttrsProps } from './_internal/UiInteractiveSvgElement.vue';
import type { DefineAttrsProps } from '../../../types';

export type InteractiveSvgAttrsFunc = (
  attrs?: Record<string, unknown>
) => InteractiveSvgProps & InteractiveSvgElementAttrsProps;
export interface InteractiveSvgProps {
  /**
   * Use this props to pass function that returns attrs for UiInteractiveSvgElements
  */
  elementsAttrs?: InteractiveSvgAttrsFunc;
}
export type InteractiveSvgAttrsProps = DefineAttrsProps<InteractiveSvgProps, SVGAttributes>

const props = withDefaults(defineProps<InteractiveSvgProps>(), { elementsAttrs: () => ({}) });
// TODO: remove in 0.6.0 / BEGIN
const attrs = useAttrs();
const setElementsAttrs = computed(() => (attrs.setElementsAttrs || attrs['set-elements-attrs']) as InteractiveSvgAttrsFunc | undefined);
if (setElementsAttrs.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiInteractiveSVG]: The `setElementsAttrs` props will be removed in 0.6.0. Please use `elementsAttrs` props instead.');
  }
}
// END
provide<InteractiveSvgAttrsFunc>('elementsAttrs', setElementsAttrs.value || props.elementsAttrs);
</script>
