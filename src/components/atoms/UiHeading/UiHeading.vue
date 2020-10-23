<template>
  <component
    :is="tag"
    class="ui-heading"
  >
    <!-- @slot Use this slot to place content inside heading -->
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UiHeading',
  props: {
    /**
     * Use this props to set heading level.
     */
    level: {
      type: String,
      default: '2',
    },
  },
  computed: {
    tag() {
      return `h${this.level}`;
    },
  },
};
</script>

<style lang="scss">
// .ui-heading {}

@for $i from 1 through 6 {
  h#{$i} {
    margin: 0;
    font-size: 1rem;
    font-weight: normal;
  }
}
</style>
