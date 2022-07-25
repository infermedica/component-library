<template>
  <component
    :is="tag"
    v-bind="elementAttrs($attrs)"
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
  getCurrentInstance, inject, provide, ref,
} from 'vue';
import type { Ref } from 'vue';
import type { AttrsFunc } from '../UiInteractiveSvg.vue';

defineProps({
  /**
   *  Use this props to set component tag.
   */
  tag: {
    type: String,
    default: 'path',
  },
});
const setAttrs: AttrsFunc | Ref<AttrsFunc> | undefined = inject('setElementsAttrs');
const elementAttrs = (attrs: Record<string, unknown>): Record<string, unknown> => {
  const setElementAttrs = (setAttrs as Ref<AttrsFunc>).value || setAttrs;
  const { setElementsAttrs: setElementAttrsForNested, ...rest } = setElementAttrs(attrs);
  if (setElementAttrsForNested) {
    nestedSetElementsAttrs.value = setElementAttrsForNested as AttrsFunc;
  } else {
    nestedSetElementsAttrs.value = setElementAttrs as AttrsFunc;
  }
  return {
    ...attrs,
    ...rest,
  };
};
const nestedSetElementsAttrs = ref<AttrsFunc>(() => ({}));
const parentComponent = getCurrentInstance()?.parent;
if (!parentComponent || (parentComponent.type.name !== 'UiInteractiveSvg' && parentComponent.type.name !== 'UiInteractiveSvgElement')) {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('UiInteractiveSvgElement has to be child of UiInteractiveSvg or nested in another UiInteractiveSvgElement');
  }
}
provide('setElementsAttrs', nestedSetElementsAttrs);
</script>

