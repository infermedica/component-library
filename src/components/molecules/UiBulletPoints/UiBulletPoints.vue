<template>
  <component
    :is="tag"
    :style="listStyleType"
    class="ui-bullet-points"
  >
    <!-- @slot Use this slot to place bullet points items-->
    <slot />
  </component>
</template>

<script setup>
import { computed, provide } from 'vue';

const props = defineProps({
  /**
   * Use this props to set list tag.
   */
  tag: {
    type: String,
    default: 'ul',
  },
  /**
   * Use this props to set list type.
   */
  type: {
    type: String,
    default: '1',
  },
});
const tag = computed(() => (props.tag));
provide('tag', tag);

const listStyleType = computed(() => {
  const type = {
    a: { style: 'lower-latin', suffix: ')' },
    A: { style: 'upper-latin', suffix: ')' },
    i: { style: 'lower-roman', suffix: '.' },
    I: { style: 'upper-roman', suffix: '.' },
    1: { style: 'decimal', suffix: '.' },
    ar: { style: 'arabic-indic', suffix: '.' },
  };

  // TODO: decide how to handle latin/roman styles
  // Decimal appears to be perfectly fine for most of Arabic variants

  return {
    '--list-style-type': type[props.type]?.style,
    '--list-item-suffix': `"${type[props.type]?.suffix}"`,
  };
});
</script>

<style lang="scss">
.ui-bullet-points {
  padding: 0;
  margin: 0;
  counter-reset: counter;
  list-style-type: none;
}
</style>
