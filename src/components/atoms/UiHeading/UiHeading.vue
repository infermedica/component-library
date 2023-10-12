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
import {
  computed,
  type HTMLAttributes,
} from 'vue';
import type {
  DefineAttrsProps,
  HTMLTag,
} from '../../../types';

export interface HeadingProps {
  /**
   * Use this props to set heading HeadingLevel from 1-6
   */
  level?: '1' | '2' | '3' | '4' | '5' | '6' | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Use this props to set heading HTML HeadingTag
   */
  tag?: HTMLTag;
}
export type HeadingAttrsProps<T = HTMLAttributes> = DefineAttrsProps<HeadingProps, T>;

const props = withDefaults(defineProps<HeadingProps>(), {
  level: '2',
  tag: undefined,
});
const headingTag = computed(() => (props.tag ? props.tag : `h${props.level}`));
const headingClass = computed(() => `ui-heading--h${props.level}`);
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-heading {
  $this: &;
  $element: heading;

  @include mixins.font($element, body-1);
  @include mixins.use-logical($element, margin, 0);

  color: functions.var($element, color, var(--color-text-heading));

  @for $i from 1 through 6 {
    &--h#{$i} {
      font: functions.var($element, font, var(--font-h#{$i}));
      letter-spacing: functions.var($element, letter-spacing, var(--letter-spacing-h#{$i}));
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
