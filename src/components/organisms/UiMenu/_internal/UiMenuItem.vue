<template>
  <UiListItem
    v-bind="attrs"
    class="ui-menu-item"
  >
    <UiButton
      v-bind="defaultProps.buttonMenuItemAttrs"
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
    </UiButton>
  </UiListItem>
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import {
  computed,
  useAttrs,
} from 'vue';
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
   * Use this props to pass attrs for menu item UiButton
   */
  buttonMenuItemAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const {
  attrs, listeners,
} = useAttributes();
const isSelected = computed(() => (attrs.value.class && (attrs.value.class as string).includes('ui-menu-item--is-selected')));
const hasSuffix = computed(() => props.suffixVisible === 'always' || (props.suffixVisible === 'default' && isSelected.value));
const buttonClass = computed(() => ({ 'ui-button--is-selected': isSelected.value }));
const defaultProps = computed(() => ({
  buttonMenuItemAttrs: {
    ...listeners.value,
    ...props.buttonMenuItemAttrs,
  },
  suffixAttrs: {
    icon: props.icon as Icon,
    ...props.suffixAttrs,
  },
}));
</script>

<style lang="scss">
@use "../../../../styles/functions";

.ui-menu-item {
  $this: &;
  $element: menu-item;

  --list-item-padding: #{functions.var($element, padding, var(--space-8) )};

  &__button {
    --button-padding: #{functions.var($element + '-button', padding, var(--space-8))};
    --button-border-width: #{functions.var($element + "button", border-width, 0)};
    --button-font: #{functions.var($element + "button", font, var(--font-body-1))};
    --button-letter-spacing: #{functions.var($element + "button", letter-spacing, var(--letter-spacing-body-1))};

    width: 100%;
    justify-content: space-between;
  }

  &__label {
    flex: 1;
    color: functions.var($element + "-label", color, var(--color-text-body));
    text-align: start;
  }

  &__suffix {
    margin: functions.var($element, margin, 0 0 0 var(--space-12));

    [dir="rtl"] & {
      margin: functions.var($element + "rtl", margin, 0 var(--space-12) 0 0);
    }
  }

  &--is-selected {
    #{$this}__label {
      color: functions.var($element + "-label", color, unset);
    }
  }

  &--compact {
    --list-item-padding: #{functions.var($element, padding, var(--space-4) var(--space-8) )};
  }
}
</style>
