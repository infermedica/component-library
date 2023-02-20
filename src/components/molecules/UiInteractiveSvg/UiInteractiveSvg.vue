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
import type {
  HTMLAttributes,
  SVGAttributes,
} from 'vue';
import type { InteractiveSvgElementAttrsProps } from './_internal/UiInteractiveSvgElement.vue';
import type {
  DefineAttrsProps,
  InteractiveSvgRegion,
  InteractiveSvgBodyPart,
} from '../../../types';

export type InteractiveSvgFuncAttrs = HTMLAttributes
// eslint-disable-next-line no-use-before-define
& { elementAttrs?: InteractiveSvgFunc; }
& ({
  region?: InteractiveSvgRegion;
  'focus-for'?: InteractiveSvgRegion;
  part?: undefined
} | {
  part?: InteractiveSvgBodyPart;
  'focus-for'?: InteractiveSvgBodyPart;
  region?: undefined
})
export type InteractiveSvgFunc = (
  attrs: InteractiveSvgFuncAttrs
) => { elementsAttrs?: InteractiveSvgFunc } & InteractiveSvgElementAttrsProps;
export interface InteractiveSvgProps {
  /**
   * Use this props to pass function that returns attrs for UiInteractiveSvgElements
  */
  elementsAttrs?: InteractiveSvgFunc;
}
export type InteractiveSvgAttrsProps = DefineAttrsProps<InteractiveSvgProps, SVGAttributes>

const props = withDefaults(defineProps<InteractiveSvgProps>(), { elementsAttrs: () => ({}) });
provide<InteractiveSvgFunc>('elementsAttrs', props.elementsAttrs);
</script>
