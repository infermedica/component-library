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
  getCurrentInstance,
  inject,
  provide,
  ref,
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
const setAttrs: AttrsFunc | Ref<AttrsFunc> | undefined = inject('elementsAttrs');
const elementAttrs = (attrs: Record<string, unknown>): Record<string, unknown> => {
  const elementAttrs = (setAttrs as Ref<AttrsFunc>).value || setAttrs;
  const {
    elementAttrs: elementAttrsForNested, ...rest
  } = elementAttrs(attrs);
  if (elementAttrsForNested) {
    nestedElementsAttrs.value = elementAttrsForNested as AttrsFunc;
  } else {
    nestedElementsAttrs.value = elementAttrs as AttrsFunc;
  }
  return {
    ...attrs,
    ...rest,
  };
};
const nestedElementsAttrs = ref<AttrsFunc>(() => ({}));
const parentComponent = getCurrentInstance()?.parent;
if (!parentComponent || (parentComponent.type.name !== 'UiInteractiveSvg' && parentComponent.type.name !== 'UiInteractiveSvgElement')) {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('UiInteractiveSvgElement has to be child of UiInteractiveSvg or nested in another UiInteractiveSvgElement');
  }
}
provide('elementsAttrs', nestedElementsAttrs);
</script>

