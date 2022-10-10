<template>
  <UiListItem
    class="ui-menu-item"
    v-bind="defaultProps.menuItemAttrs"
  >
    <UiButton
      :class="[
        'ui-button--outlined ui-menu-item__button', buttonClass
      ]"
      v-bind="defaultProps.buttonMenuItemAttrs"
    >
      <!-- @slot Use this slot to replace label template -->

      <slot
        name="label"
      >
        <span class="ui-menu-item__label">
          <!-- @slot Use this slot to place label content inside menu-item -->
          <slot />
        </span>
      </slot>
      <!-- @slot Use this slot to replace suffix template -->
      <slot
        name="suffix"
        v-bind="{
          hasSuffix,
          ...defaultProps.suffixAttrs,
        }"
      >
        <UiMenuItemSuffix
          v-if="hasSuffix"
          :class="[
            'ui-menu-item__suffix', suffixClass
          ]"
          v-bind="defaultProps.suffixAttrs"
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
import type { Icon } from '../../../../types/icon';
import type { MenuIconVisible } from '../UiMenu.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';
import UiMenuItemSuffix from './UiMenuItemSuffix.vue';
import type { PropsAttrs } from '../../../../types/attrs';

const props = defineProps({
  /**
   * Use this prop to set button attributes.
   */
  buttonMenuItemAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this prop to set icon.
   */
  icon: {
    type: [
      String,
      Object,
    ] as PropType<Icon>,
    default: 'checkmark',
  },
  /**
   * Use this prop to set suffix label.
   */
  iconLabel: {
    type: String,
    default: '',
  },
  /**
   * Use this prop to control icon visibility.
   */
  iconVisible: {
    type: String as PropType<MenuIconVisible>,
    default: 'default',
  },
  /**
   * Use this prop to set suffix attributes.
   */
  suffixAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this prop to set icon suffix attributes.
   */
  suffixIconAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const attrs = useAttrs();
const isSelected = computed(() => attrs.class && (attrs.class as string).includes('ui-menu-item--is-selected'));
const hasIcon = computed(() => props.iconVisible !== 'never');
const hasSuffix = computed(() => props.iconLabel || props.iconVisible !== 'never');
const suffixClass = computed(() => ({ 'ui-menu-item-suffix--hide-icon': (props.iconVisible === 'default' && !isSelected.value) }));
const buttonClass = computed(() => ({ 'ui-button--is-selected': isSelected.value }));
const defaultProps = computed(() => ({
  buttonMenuItemAttrs: {
    ...Object.keys(attrs)
      .filter((key) => (key.match(/^on.*/gi)))
      .reduce((object, key) => (
        {
          ...object,
          [key]: attrs[key],
        }
      ), {}),
    ...props.buttonMenuItemAttrs,
  },
  menuItemAttrs: {
    ...Object.keys(attrs)
      .filter((key) => (!key.match(/^on.*/gi)))
      .reduce((object, key) => (
        {
          ...object,
          [key]: attrs[key],
        }
      ), {}),
  },
  suffixAttrs: {
    label: props.iconLabel,
    icon: props.icon,
    hasIcon: hasIcon.value,
    iconAttrs: props.suffixIconAttrs,
    ...props.suffixAttrs,
  },
}));

</script>

<style lang="scss">
@use "../../../../styles/functions";

.ui-menu-item {
  $this: &;
  $element: menu-item;

  --list-item-padding: #{functions.var($element, padding, var(--space-4) var(--space-8) )};

  &__button {
    --button-padding: #{functions.var($element + "-button", padding, var(--space-8))};
    --button-border-width: #{functions.var($element + "button", border-width, 0)};
    --button-font: #{functions.var($element + "button", font, var(--font-body-1))};
    --button-letter-spacing: #{functions.var($element + "button", letter-spacing, var(--letter-spacing-body-1))};

    width: 100%;
    justify-content: flex-start;
  }

  &__label {
    flex: 1;
    color: functions.var($element + "-label", color, var(--color-text-body));
    text-align: start;
  }

  &--is-selected {
    #{$this}__label {
      color: functions.var($element + "-label", color, unset);
    }
  }
}
</style>
