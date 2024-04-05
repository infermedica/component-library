<template>
  <li
    v-bind="listItemAttrs"
    class="ui-list-item"
  >
    <slot
      name="content"
      v-bind="{
        tag,
        filteredAttrs,
        hasSuffix,
        suffixComponent,
        suffixAttrs: defaultProps.suffixAttrs,
      }"
    >
      <component
        :is="tag"
        v-bind="filteredAttrs"
        ref="content"
        class="ui-list-item__content"
      >
        <!-- @slot Use this slot to place content inside list-item. -->
        <slot />
        <!-- @slot Use this slot to replace suffix template -->
        <slot
          name="suffix"
          v-bind="{
            hasSuffix,
            suffixComponent,
            suffixAttrs: defaultProps.suffixAttrs,
          }"
        >
          <component
            :is="suffixComponent"
            v-if="hasSuffix"
            v-bind="defaultProps.suffixAttrs"
            class="ui-list-item__suffix"
          />
        </slot>
      </component>
    </slot>
  </li>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  useAttrs,
  defineAsyncComponent,
  type LiHTMLAttributes,
} from 'vue';
import type {
  DefineAttrsProps,
  HTMLTag,
} from '../../../../types';
import type { Icon } from '../../../../types/icon';
import type { ListItemSuffixAsTextAttrsProps } from './UiListItemSuffixAsText.vue';
import type { ListItemSuffixAsButtonAttrsProps } from './UiListItemSuffixAsButton.vue';

export interface ListItemProps {
  /**
   * Use this props to set list item content tag.
   */
  tag?: HTMLTag;
  /**
   * Use this props to set suffix icon.
   */
  icon?: Icon;
  /**
   * Use this props to control suffix visibility.
   */
  hasSuffix?: boolean;
  /**
   * Use this props to pass attrs for UIListItemSuffix
   */
  suffixAttrs?: ListItemSuffixAsTextAttrsProps | ListItemSuffixAsButtonAttrsProps;
  /**
   * Use this props to pass attrs for list item element
   */
  listItemAttrs?: DefineAttrsProps<null, LiHTMLAttributes>;
}
export type ListItemAttrsProps = DefineAttrsProps<ListItemProps>;

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ListItemProps>(), {
  tag: 'div',
  icon: '',
  hasSuffix: false,
  suffixAttrs: () => ({}),
  listItemAttrs: () => ({}),
});
const defaultProps = computed<ListItemProps>(() => ({
  ...props,
  suffixAttrs: {
    icon: props.icon,
    ...props.suffixAttrs,
  },
}));

const attrs = useAttrs();
const filteredAttrs = computed(() => {
  const {
    name, label, children, ...rest
  } = attrs;
  return rest;
});

const suffixComponent = computed(() => (props.hasSuffix
  ? defineAsyncComponent(() => import('./UiListItemSuffix.vue'))
  : null));

const content = ref<HTMLTag | null>(null);
defineExpose({ content });
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
    @include mixins.use-logical($element + "-content", padding, var(--space-12));

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
