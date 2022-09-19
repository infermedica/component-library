<template>
  <svg
    class="ui-interactive-svg"
  >
    <!-- @slot Use this slot to place svg elements. -->
    <slot />
  </svg>
</template>

<script lang="ts">
export default {
  name: 'UiInteractiveSvg',
};
</script>

<script setup lang="ts">
import { provide } from 'vue';
import type { PropType } from 'vue';

export type AttrsFunc = (attrs: Record<string, unknown>) => Record<string, unknown>;
const props = defineProps({
  /**
  * Use this props to pass function that returns attrs for UiInteractiveSvgElements
  */
  setElementsAttrs: {
    type: Function as PropType<AttrsFunc>,
    default: (attrs: Record<string, unknown>) => ({
    }),
  },
});
provide('setElementsAttrs', props.setElementsAttrs);
</script>
