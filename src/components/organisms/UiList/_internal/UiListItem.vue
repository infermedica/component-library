<template>
  <component
    :is="tag"
    class="ui-list-item"
  >
    <div class="ui-list-item__content">
      <!-- @slot Use this slot to place content inside menu-item. -->
      <slot />
    </div>
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
import UiListItemSuffix from './UiListItemSuffix.vue';
import type { HTMLTag } from '../../../../types/tag';
import type { Icon } from '../../../../types/icon';
import type { PropsAttrs } from '../../../../types/attrs';

const props = defineProps({
  /**
   * Use this props to set list item tag.
   */
  tag: {
    type: String as PropType<HTMLTag>,
    default: 'li',
  },
  /**
   * Use this props to set icon.
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
  padding: functions.var($element, padding, var(--space-12) var(--space-20));
  align-items: center;

  @include mixins.inner-border(
    $element,
    $color: var(--color-border-divider),
    $width: 1px 0 0 0,
  );

  @include mixins.from-tablet {
    padding: functions.var($element, padding, var(--space-12));
  }

  @include mixins.hover {
    background: functions.var($element + "-hover", background, var(--color-background-white-hover));
    color: functions.var($element + "-hover", color, var(--color-text-action-primary-hover));

    #{$this}__icon {
      --icon-color: #{functions.var($element + "-hover-icon", color, var(--color-icon-primary-hover))};
    }
  }

  &:active {
    background: functions.var($element + "-active", background, var(--color-background-white-active));
    color: functions.var($element + "-active", color, var(--color-text-action-primary-active));

    #{$this}__icon {
      --icon-color: #{functions.var($element + "-active-icon", color, var(--color-icon-primary-active))};
    }
  }

  &:last-of-type {
    &::after {
      border-width: functions.var($element, border-width, 1px 0);
    }
  }

  &__content {
    flex-grow: 1;
  }

  &--has-error {
    #{$this}__item {
      background-color: var(--color-background-error);
    }
  }
}
</style>
