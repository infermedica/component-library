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
@import "../../../styles/functions/functions";

.ui-text {
  $this: &;
  $element: text;

  @include font(text, body-1);

  margin: css-var($element, margin, 0);
  color: css-var($element, color, var(--color-text-body));

  $styles: "body-1-thick", "body-2-comfortable", "body-2-compact",
    "body-2-comfortable-thick", "body-2-compact-thick", "caption", "button-1";

  @each $style in $styles {
    &--#{$style} {
      font: css-var($element, font, var(--font-#{$style}));
      letter-spacing:
        css-var(
          $element,
          letter-spacing,
          var(--letter-spacing-#{$style})
        );
    }
  }

  @at-root [class*="-secondary"] {
    #{$this},
    &#{$this} {
      --color-text-body: var(--color-text-dimmed);
    }
  }

  @at-root [class*="-brand"] {
    #{$this},
    &#{$this} {
      --color-text-body: var(--color-text-on-brand);
    }
  }
}
</style>
