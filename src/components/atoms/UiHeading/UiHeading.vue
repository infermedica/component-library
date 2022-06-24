<template>
  <component
    :is="headingTag"
    class="ui-heading"
    :class="headingClass"
  >
    <!-- @slot Use this slot to place content inside heading -->
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  /**
   * Use this props to set heading level from 1-6
   */
  level: {
    type: [Number, String],
    default: '2',
    validator: (value) => {
      const level = parseInt(value, 10);
      return (level <= 6 && level > 0);
    },
  },
  /**
   * Use this props to set heading HTML tag
   */
  tag: {
    type: String,
    default: '',
  },
});
const headingTag = computed(() => (props.tag ? props.tag : `h${props.level}`));
const headingClass = computed(() => `ui-heading--h${props.level}`);
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-heading {
  @include font(heading, body-1);

  margin: var(--heading-margin, 0);
  color: var(--heading-color, var(--color-text-heading));
  text-decoration: var(--heading-text-decoration);
  text-transform: var(--heading-text-transform);

  @for $i from 1 through 6 {
    &--h#{$i} {
      --heading-font: var(--font-h#{$i});
      --heading-letter-spacing: var(--letter-spacing-h#{$i});
    }
  }
}
</style>
