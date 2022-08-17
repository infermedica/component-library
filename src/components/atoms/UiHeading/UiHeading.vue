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

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { HTMLTag } from '../../../types/tag';

export type HeadingLevel ='1' | '2' | '3' | '4' | '5' | '6' | 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingTag =`h${HeadingLevel}`;
export type HeadingClass =`ui-heading--${HeadingTag}`
const props = defineProps({
  /**
   * Use this props to set heading HeadingLevel from 1-6
   */
  level: {
    type: [Number, String] as PropType<HeadingLevel>,
    default: '2',
  },
  /**
   * Use this props to set heading HTML HeadingTag
   */
  tag: {
    type: String as PropType<HTMLTag>,
    default: '',
  },
});
const headingTag = computed<HTMLTag>(() => (props.tag ? props.tag : `h${props.level}`));
const headingClass = computed<HeadingClass>(() => `ui-heading--h${props.level}`);
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";
@import "../../../styles/functions/functions";

.ui-heading {
  $this: &;
  $element: heading;

  @include font($element, body-1);

  margin: css-var($element, margin, 0);
  color: css-var($element, color, var(--color-text-heading));

  @for $i from 1 through 6 {
    &--h#{$i} {
      font: css-var($element, font, var(--font-h#{$i}));
      letter-spacing: css-var($element, letter-spacing, var(--letter-spacing-h#{$i}));
    }
  }

  @at-root [class*="-secondary"] {
    #{$this},
    &#{$this} {
      --color-text-heading: var(--color-text-dimmed);
    }
  }

  @at-root [class*="-brand"] {
    #{$this},
    &#{$this} {
      --color-text-heading: var(--color-text-on-brand);
    }
  }
}
</style>
