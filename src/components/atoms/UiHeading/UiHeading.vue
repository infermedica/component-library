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

<script>
import { computed } from 'vue';

export default {
  name: 'UiHeading',
  props: {
    /**
     * Use this props to set heading level from 1-6
     */
    level: {
      type: String,
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
  },
  setup(props) {
    const headingTag = computed(() => (props.tag ? props.tag : `h${props.level}`));
    const headingClass = computed(() => `ui-heading--h${props.level}`);
    return {
      headingTag,
      headingClass,
    };
  },
};
</script>

<style lang="scss">
@import '../../../styles/mixins/_mixins.scss';

.ui-heading {
  margin: var(--heading-margin, 0);
  color: var(--heading-color, var(--color-text-body));
  text-decoration: var(--heading-text-decoration);
  text-transform: var(--heading-text-transform);

  @for $i from 1 through 6 {
    &--h#{$i} {
      @include font(--font-h#{$i});
    }

    /**
     * Use special classes from h1 to h6 to overwrite styles for headings
     */
    &.h#{$i} {
      @include font(--font-h#{$i}, true);
    }
  }
}
</style>
