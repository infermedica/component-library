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
  @include font(--font-body-1);

  margin: var(--text-margin, 0);
  color: var(--text-color, var(--color-text-body));
}
</style>
