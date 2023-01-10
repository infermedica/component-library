<template>
  <li
    class="ui-list-item"
    v-bind="listItemAttrs"
  >
    <!-- @slot Use this slot to replace list item content template. -->
    <slot
      name="content"
      v-bind="{
        tag,
        hasSuffix,
        suffixComponent,
        suffixAttrs: defaultProps.suffixAttrs
      }"
    >
      <component
        :is="tag"
        v-bind="$attrs"
        class="ui-list-item__content"
      >
        <!-- @slot Use this slot to place content inside list-item. -->
        <slot />
      </component>
      <!-- @slot Use this slot to replace suffix template -->
      <slot
        name="suffix"
        v-bind="{
          hasSuffix,
          suffixComponent,
          suffixAttrs: defaultProps.suffixAttrs
        }"
      >
        <component
          :is="suffixComponent"
          v-if="hasSuffix"
          v-bind="defaultProps.suffixAttrs"
          class="ui-list-item__suffix"
        />
      </slot>
    </slot>
  </li>
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { Icon } from '../../../../types/icon';
import type { PropsAttrs } from '../../../../types/attrs';
import UiListItemSuffixAsButton from './UiListItemSuffixAsButton.vue';
import UiListItemSuffixAsText from './UiListItemSuffixAsText.vue';

const props = defineProps({
  /**
   * Use this props to set list item content tag.
   */
  tag: {
    type: [
      String,
      Object,
    ],
    default: 'div',
  },
  /**
   * Use this props to set suffix icon.
   */
  icon: {
    type: [
      String,
      Object,
    ] as PropType<Icon>,
    default: '',
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
   * Use this props to pass attrs for list item element
   */
  listItemAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const hasButtonSuffix = computed(() => !!Object.keys(props.suffixAttrs).filter(
  (key) => key.match(/(^on*|to|href)/),
).length);
const suffixComponent = computed(() => (hasButtonSuffix.value
  ? UiListItemSuffixAsButton
  : UiListItemSuffixAsText));
const defaultProps = computed(() => ({
  suffixAttrs: hasButtonSuffix.value
    ? {
      icon: props.icon,
      ...props.suffixAttrs,
    }
    : props.suffixAttrs,
}));
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-list-item {
  $this: &;
  $element: list-item;

  display: flex;
  align-items: center;

  @include mixins.inner-border(
    $element,
    $color: var(--color-border-divider),
    $width: 1px 0 0 0,
  );

  &:last-of-type {
    &::after {
      @include mixins.use-logical($element, border-width, 1px 0);
    }
  }

  &__content {
    @include mixins.use-logical($element + "-content", padding, var(--space-12) var(--space-20));

    display: flex;
    flex: 1;
    align-items: flex-start;
    justify-content: space-between;

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-content", padding, var(--space-12));
    }

    @include mixins.hover {
      background: functions.var($element + "-content-hover", background, var(--color-background-white-hover));
    }
  }

  &__suffix {
    @include mixins.use-logical($element + "-suffix", margin, 0 0 0 var(--space-12));
  }

  &--has-error {
    background: functions.var($element, background, var(--color-background-error));

    @include mixins.hover {
      background: functions.var($element + "-hover", background, var(--color-background-error));
    }
  }
}
</style>
