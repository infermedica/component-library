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

<script>
export default {
  name: 'UiInteractiveSvgElement',
  inheritAttrs: false,
};
</script>

<script setup>
import {
  getCurrentInstance, inject, provide, ref,
} from 'vue';

defineProps({
  /**
   *  Use this props to set component tag.
   */
  tag: {
    type: String,
    default: 'path',
  },
});
const setAttrs = inject('setElementsAttrs');
const elementAttrs = (attrs) => {
  const setElementAttrs = setAttrs.value || setAttrs;
  const { setElementsAttrs, ...rest } = setElementAttrs(attrs);
  if (setElementsAttrs) {
    nestedSetElementsAttrs.value = setElementsAttrs;
  }
  return {
    ...attrs,
    ...rest,
  };
};
const nestedSetElementsAttrs = ref(() => ({}));
const parentComponent = getCurrentInstance().parent;
if (!parentComponent || (parentComponent.type.name !== 'UiInteractiveSvg' && parentComponent.type.name !== 'UiInteractiveSvgElement')) {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('UiInteractiveSvgElement has to be child of UiInteractiveSvg or nested in another UiInteractiveSvgElement');
  }
}
provide('setElementsAttrs', nestedSetElementsAttrs);
</script>

