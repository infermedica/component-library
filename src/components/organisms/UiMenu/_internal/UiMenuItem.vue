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
import type { PropType } from 'vue';
import type { PropsAttrs } from '../../../../types/attrs';
import type { Icon } from '../../../../types/icon';
import type {
  MenuSuffixVisible,
  SuffixAttrs,
} from '../UiMenu.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';
import UiMenuItemSuffix from './UiMenuItemSuffix.vue';
import useAttributes from '../../../../composable/useAttributes';

export interface MenuItemAttrs {
  class?: string;
  [key: string]: unknown;
}

const props = defineProps({
  /**
   * Use this props to set icon.
   */
  icon: {
    type: [
      String,
      Object,
    ] as PropType<Icon>,
    default: 'checkmark',
  },
  /**
   * Use this props to set suffix visibility.
   */
  suffixVisible: {
    type: String as PropType<MenuSuffixVisible>,
    default: 'default',
  },
  /**
   * Use this props to pass attrs for UIMenuItemSuffix
   */
  suffixAttrs: {
    type: Object as PropType<SuffixAttrs>,
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
const { attrs } = useAttributes<MenuItemAttrs, object>();
const isSelected = computed(() => (attrs.value.class && attrs.value.class.includes('ui-menu-item--is-selected')));
const hasSuffix = computed(() => !!(props.suffixVisible === 'always' || (props.suffixVisible === 'default' && isSelected.value)));
const buttonClass = computed(() => ({ 'ui-button--is-selected': isSelected.value }));
const defaultProps = computed(() => ({
  suffixAttrs: {
    icon: props.icon as Icon,
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

  --list-item-border-logical-width: 0;

  @include mixins.use-logical($element, padding, var(--space-4) var(--space-8));

  &__button {
    --_list-item-content-padding-logical: #{functions.var($element + "-button", padding-logical, var(--space-8))};
    --list-item-content-padding-logical: var(--_list-item-content-padding-logical);
    --list-item-tablet-content-padding-logical: var(--_list-item-content-padding-logical);
    --button-padding-logical: var(--_list-item-content-padding-logical);
    --button-border-logical-width: #{functions.var($element + "-button", border-logical-width, 0)};
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
