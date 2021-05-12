<template>
  <component
    :is="tag"
    class="ui-text"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UiText',
  props: {
    tag: {
      type: String,
      default: 'p',
    },
  },
};
</script>

<style lang="scss">
@import '../../../styles/mixins/_mixins.scss';

.ui-text {
  $styles: '1-thick', '2-comfortable', '2-compact', '2-comfortable-thick', '2-compact-thick';

  @include font(--font-body-1);

  margin: var(--text-margin, 0);
  color: var(--text-color, var(--color-text-body));

  @each $style in $styles {
    &--#{$style} {
      @include font(--font-body-#{$style});
    }
  }
}
</style>
