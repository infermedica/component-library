<template>
  <svg
    class="ui-interactive-svg"
  >
    <!-- @slot Use this slot to place svg elements. -->
    <slot />
  </svg>
</template>

<script>
export default {
  name: 'UiInteractiveSvg',
};
</script>

<script setup>
import { provide } from 'vue';

const props = defineProps({
  /**
  * Use this props to pass function that returns attrs for UiInteractiveSvgElements
  */
  setElementsAttrs: {
    type: Function,
    default: (attrs) => ({}),
  },
});
provide('setElementsAttrs', props.setElementsAttrs);
</script>
