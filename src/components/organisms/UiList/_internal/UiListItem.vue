<template>
  <li
    v-bind="listItemAttrs"
    class="ui-list-item"
    role="option"
    aria-selected="false"
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
        <!-- @slot Use this slot to replace prefix template -->
        <slot
          name="prefix"
          v-bind="{
            hasPrefix,
            prefixComponent,
            prefixAttrs: defaultProps.prefixAttrs,
          }"
        >
          <component
            :is="prefixComponent"
            v-if="hasPrefix"
            v-bind="defaultProps.prefixAttrs"
            class="ui-list-item__prefix"
          />
        </slot>
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
import type { ListItemPrefixAttrsProps } from './UiListItemPrefix.vue';
import type { ListItemSuffixAttrsProps } from './UiListItemSuffix.vue';

export interface ListItemProps {
  /**
   * Use this props to set list item content tag.
   */
  tag?: HTMLTag;
  /**
   * @deprecated will be removed in 2.0.0; Use this props to set suffix icon.
   */
  icon?: Icon;
  /**
   * Use this props to control prefix visibility.
   */
  hasPrefix?: boolean;
  /**
   * Use this props to pass attrs for UIListItemPrefix
   */
  prefixAttrs?: ListItemPrefixAttrsProps;
  /**
   * Use this props to control suffix visibility.
   */
  hasSuffix?: boolean;
  /**
   * Use this props to pass attrs for UIListItemSuffix
   */
  suffixAttrs?: ListItemSuffixAttrsProps;
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
  hasPrefix: false,
  prefixAttrs: () => ({}),
  listItemAttrs: () => ({}),
});
const defaultProps = computed<ListItemProps>(() => ({
  ...props,
  suffixAttrs: {
    icon: props.icon,
    ...props.suffixAttrs,
  },
}));

if (props.icon !== '') {
  console.warn('[@infermedica/component-library]: The `icon` props is deprecated and it will be removed in v2.0.0. Please use `suffixAttrs` to pass icon.');
}

const attrs = useAttrs();
const filteredAttrs = computed(() => {
  const {
    name, label, children, ...rest
  } = attrs;
  return rest;
});

const prefixComponent = computed(() => (props.hasPrefix
  ? defineAsyncComponent(() => import('./UiListItemPrefix.vue'))
  : null));
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
    gap: functions.var($element + "-content", gap, var(--space-12));

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-content", padding, var(--space-12));
    }

    @include mixins.hover {
      background: functions.var($element + "-content-hover", background, var(--color-background-white-hover));
    }
  }

  &__suffix {
    margin-inline-start: auto;
  }

  &--has-error {
    background: functions.var($element, background, var(--color-background-error));

    @include mixins.hover {
      background: functions.var($element + "-hover", background, var(--color-background-error));
    }
  }
}
</style>
