<template>
  <component
    :is="tag"
    class="ui-text"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { DefineAttrs } from '../../../types/attrs';
import type { HTMLTag } from '../../../types/tag';

export interface TextProps {
  /**
   * Use this to set text tag.
   */
  tag?: HTMLTag;
}
export type TextAttrs<T= HTMLAttributes> = DefineAttrs<TextProps, T>;
withDefaults(defineProps<TextProps>(), { tag: 'p' });
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-text {
  $this: &;
  $element: text;

  @include mixins.font(text, body-1);
  @include mixins.use-logical($element, margin, 0);

  color: functions.var($element, color, var(--color-text-body));

  $styles: "body-1-thick", "body-2-comfortable", "body-2-compact",
    "body-2-comfortable-thick", "body-2-compact-thick", "caption", "button-1";

  @each $style in $styles {
    &--#{$style} {
      font: functions.var($element, font, var(--font-#{$style}));
      letter-spacing:
        functions.var(
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
