<template>
  <component
    :is="tag"
    class="ui-text"
  >
    <slot />
  </component>
</template>

<script setup>
defineProps({
  /**
   * Use this to set text tag.
   */
  tag: {
    type: String,
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
