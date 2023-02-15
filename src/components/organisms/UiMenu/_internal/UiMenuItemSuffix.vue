<template>
  <span class="ui-menu-item-suffix">
    <!-- @slot Use this slot to replace label template. -->
    <slot
      name="label"
      v-bind="{ label }"
    >
      {{ label }}
    </slot>
    <!-- @slot Use this slot to replace icon template. -->
    <slot
      name="icon"
      v-bind="{
        hasIcon,
        iconSuffixAttrs: defaultProps.iconSuffixAttrs
      }"
    >
      <UiIcon
        v-bind="defaultProps.iconSuffixAttrs"
        class="ui-button__icon ui-menu-item-suffix__icon"
      />
    </slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';
import type {
  DefineAttrsProps,
  Icon,
} from '../../../../types';

export interface MenuItemSuffixProps {
  /**
   * Use this props to set label.
   */
  label?: string;
  /**
   * Use this props to set icon.
   */
  icon?: Icon;
  /**
   * Use this props to pass attrs for suffix UIIcon
   */
  iconSuffixAttrs?: IconAttrsProps;
}
export type MenuItemSuffixAttrsProps = DefineAttrsProps<MenuItemSuffixProps>;

const props = withDefaults(defineProps<MenuItemSuffixProps>(), {
  label: '',
  icon: 'checkmark',
  iconSuffixAttrs: () => ({}),
});
const defaultProps = computed(() => ({
  iconSuffixAttrs: {
    icon: props.icon,
    ...props.iconSuffixAttrs,
  },
}));
const hasIcon = computed(() => !!defaultProps.value.iconSuffixAttrs.icon);
</script>

<style lang="scss">
@use "../../../../styles/functions";

.ui-menu-item-suffix {
  $element: menu-item-suffix;

  --button-icon-block: #{functions.var($element + "-icon", margin-block, 0)};
  --button-icon-inline: #{functions.var($element + "-icon", margin-inline, 0)};

  display: flex;
  align-items: center;
  gap: functions.var($element, gap, var(--space-4));
}
</style>
