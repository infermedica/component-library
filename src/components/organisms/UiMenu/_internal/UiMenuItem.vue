<template>
  <UiListItem
    :list-item-attrs="defaultProps.listItemAttrs"
    :tag="UiButton"
    :class="[
      'ui-button--outlined ui-menu-item__button', buttonClass
    ]"
  >
    <!-- @slot Use this slot to replace label template. -->
    <slot name="label">
      <!-- @slot Use this slot to replace label template. -->
      <span class="ui-menu-item__label">
        <!-- @slot Use this slot to place label content inside menu-item. -->
        <slot />
      </span>
    </slot>

    <template #suffix>
      <!-- @slot Use this slot to replace suffix template -->
      <slot
        name="suffix"
        v-bind="{
          hasSuffix,
          suffixAttrs: defaultProps.suffixAttrs
        }"
      >
        <UiMenuItemSuffix
          v-if="hasSuffix"
          v-bind="defaultProps.suffixAttrs"
          class="ui-menu-item__suffix"
        />
      </slot>
    </template>
  </UiListItem>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';
import type { ListItemAttrsProps } from '../../UiList/_internal/UiListItem.vue';
import UiMenuItemSuffix from './UiMenuItemSuffix.vue';
import type { MenuItemSuffixAttrsProps } from './UiMenuItemSuffix.vue';
import useAttributes from '../../../../composable/useAttributes';
import type {
  DefineAttrsProps,
  Icon,
} from '../../../../types';

export interface MenuItemProps {
  /**
   * Use this props to set icon.
   */
  icon?: Icon;
  /**
   * Use this props to set suffix visibility.
   */
  suffixVisible?: 'default' | 'always' | 'never';
  /**
   * Use this props to pass attrs for UIMenuItemSuffix
   */
  suffixAttrs?: MenuItemSuffixAttrsProps;
  /**
   * Use this props to pass attrs for list item element
   */
  listItemAttrs?: ListItemAttrsProps;
}
export type MenuItemAttrsProps = DefineAttrsProps<MenuItemProps, ListItemAttrsProps>;

const props = withDefaults(defineProps<MenuItemProps>(), {
  icon: 'checkmark',
  suffixVisible: 'default',
  suffixAttrs: () => ({ class: 'ui-button--text ui-menu-item__suffix' }),
  listItemAttrs: () => ({ class: 'ui-menu-item' }),
});
const { attrs } = useAttributes();
const isSelected = computed(() => (attrs.value.class && attrs.value.class.includes('ui-menu-item--is-selected')));
const hasSuffix = computed(() => !!(props.suffixVisible === 'always' || (props.suffixVisible === 'default' && isSelected.value)));
const buttonClass = computed(() => ({ 'ui-button--is-selected': isSelected.value }));
const defaultProps = computed(() => ({
  suffixAttrs: {
    icon: props.icon,
    class: 'ui-button--text ui-menu-item__suffix',
    ...props.suffixAttrs,
  },
  listItemAttrs: {
    class: 'ui-menu-item',
    ...props.listItemAttrs,
  },
}));
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-menu-item {
  $this: &;
  $element: menu-item;

  --list-item-border-block-width: 0;
  --list-item-border-inline-width: 0;

  @include mixins.use-logical($element, padding, var(--space-4) var(--space-8));

  &__button {
    --_list-item-content-padding-block: #{functions.var($element + "-button", padding-block, var(--space-8))};
    --_list-item-content-padding-inline: #{functions.var($element + "-button", padding-inline, var(--space-8))};
    --list-item-content-padding-block: var(--_list-item-content-padding-block);
    --list-item-content-padding-inline: var(--_list-item-content-padding-inline);
    --list-item-tablet-content-padding-block: var(--_list-item-content-padding-block);
    --list-item-tablet-content-padding-inline: var(--_list-item-content-padding-inline);
    --button-padding-block: var(--_list-item-content-padding-block);
    --button-padding-inline: var(--_list-item-content-padding-inline);
    --button-border-block-width: #{functions.var($element + "-button", border--block-width, 0)};
    --button-border-inline-width: #{functions.var($element + "-button", border-inline-width, 0)};
    --button-font: #{functions.var($element + "-button", font, var(--font-body-1))};
    --button-letter-spacing: #{functions.var($element + "-button", letter-spacing, var(--letter-spacing-body-1))};

    justify-content: space-between;
  }

  &__label {
    flex: 1;
    color: functions.var($element + "-label", color, var(--color-text-body));
    text-align: start;
  }

  &__suffix {
    @include mixins.use-logical($element + "-suffix", margin, 0 0 0 var(--space-12));
  }

  &--is-selected {
    #{$this}__label {
      color: functions.var($element + "-label", color, unset);;
    }
  }
}
</style>
