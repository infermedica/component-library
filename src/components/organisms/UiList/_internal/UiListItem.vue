<template>
  <component
    :is="tag"
    class="ui-list-item"
  >
    <!-- @slot Use this slot to place content inside list-item. -->
    <slot />
    <!-- @slot Use this slot to replace suffix template -->
    <slot
      name="suffix"
      v-bind="{
        hasSuffix,
        suffixAttrs: defaultProps.suffixAttrs
      }"
    >
      <UiListItemSuffix
        v-if="hasSuffix"
        v-bind="defaultProps.suffixAttrs"
        class="ui-list-item__suffix"
      />
    </slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { HTMLTag } from '../../../../types/tag';
import type { Icon } from '../../../../types/icon';
import type { PropsAttrs } from '../../../../types/attrs';
import UiListItemSuffix from './UiListItemSuffix.vue';

const props = defineProps({
  /**
   * Use this props to set list item tag.
   */
  tag: {
    type: String as PropType<HTMLTag>,
    default: 'li',
  },
  /**
   * Use this props to set suffix icon.
   */
  icon: {
    type: [
      String,
      Object,
    ] as PropType<Icon>,
    default: 'info',
  },
  /**
   * Use this props to control suffix visibility.
   */
  hasSuffix: {
    type: Boolean,
    default: false,
  },
  /**
   * Use this props to pass attrs for UIListItemSuffix
   */
  suffixAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for menu item UiButton
   */
  buttonListItemAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const defaultProps = computed(() => ({
  suffixAttrs: {
    icon: props.icon as Icon,
    ...props.suffixAttrs,
  },
}));
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-list-item {
  $this: &;
  $element: list-item;

  display: flex;

  @include mixins.inner-border(
    $element,
    $color: var(--color-border-divider),
    $width: 1px 0 0 0,
  );

  padding: functions.var($element, padding, var(--space-12) var(--space-20));

  @include mixins.from-tablet {
    padding: functions.var($element, padding, var(--space-12));
  }

  &:last-of-type {
    &::after {
      border-width: functions.var($element, border-width, 1px 0);
    }
  }

  @include mixins.hover {
    background: functions.var($element + "-hover", background, var(--color-background-white-hover));
  }

  &:active {
    background: functions.var($element + "-active", background, var(--color-background-white-hover));
  }

  &__label {
    flex: 1;
    text-align: start;
    color: functions.var($element + "-label", color, var(--color-text-body));
  }

  &--has-error {
    background: functions.var($element + "-error", background, var(--color-background-error));

    @include mixins.hover {
      background: functions.var($element + "-error-hover", background, var(--color-background-error));
    }

    &:active {
      background: functions.var($element + "-error-active", background, var(--color-background-error));
    }
  }
}
</style>
