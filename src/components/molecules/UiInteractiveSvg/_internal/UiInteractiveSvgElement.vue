<template>
  <component
    :is="tag"
    v-bind="elementsAttrs($attrs)"
    class="ui-interactive-svg-element"
  >
    <!-- @slot Use this slot to place svg elements. -->
    <slot />
  </component>
</template>

<script lang="ts">
export default {
  name: 'UiInteractiveSvgElement',
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import {
  getCurrentInstance,
  inject,
  provide,
  ref,
  isRef,
} from 'vue';
import type { Ref } from 'vue';
import type { InteractiveSvgAttrsFunc } from '../UiInteractiveSvg.vue';
import type { DefineAttrsProps } from '../../../../types';

export interface InteractiveSvgElementProps {
  /**
  *  Use this props to set component tag.
  */
  tag?: string;
}
export type InteractiveSvgElementAttrsProps = DefineAttrsProps<InteractiveSvgElementProps>;

withDefaults(defineProps<InteractiveSvgElementProps>(), { tag: 'path' });
const setAttrs = inject<InteractiveSvgAttrsFunc | Ref<InteractiveSvgAttrsFunc>>('elementsAttrs');
const elementsAttrs = (attrs: Record<string, unknown>) => {
  if (!setAttrs) {
    return {};
  }
  const elementsAttrs = isRef<InteractiveSvgAttrsFunc>(setAttrs) ? setAttrs.value : setAttrs;
  const {
    elementsAttrs: elementsAttrsForNested, ...rest
  } = elementsAttrs(attrs);
  if (elementsAttrsForNested) {
    nestedElementsAttrs.value = elementsAttrsForNested;
  } else {
    nestedElementsAttrs.value = elementsAttrs;
  }
  return {
    ...attrs,
    ...rest,
  };
};
const nestedElementsAttrs = ref<InteractiveSvgAttrsFunc>(() => ({}));
const parentComponent = getCurrentInstance()?.parent;
if (!parentComponent || (parentComponent.type.name !== 'UiInteractiveSvg' && parentComponent.type.name !== 'UiInteractiveSvgElement')) {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('UiInteractiveSvgElement has to be child of UiInteractiveSvg or nested in another UiInteractiveSvgElement');
  }
}
provide('elementsAttrs', nestedElementsAttrs);
</script>

