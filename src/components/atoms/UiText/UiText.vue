<template>
  <component
    :is="tag"
    class="ui-text"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { HTMLTag } from '../../../types/tag';

defineProps({
  /**
   * Use this to set text tag.
   */
  tag: {
    type: String as PropType<HTMLTag>,
    default: 'p',
  },
});
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-text {
  $styles: "body-1-thick", "body-2-comfortable", "body-2-compact", "body-2-comfortable-thick", "body-2-compact-thick", "caption", "button-1";

  @include font(text, body-1);

  margin: var(--text-margin, 0);
  color: var(--text-color, var(--color-text-body));

  @each $style in $styles {
    &--#{$style} {
      --text-font: var(--font-#{$style});
      --text-letter-spacing: var(--letter-spacing-#{$style});
    }
  }
}
</style>
