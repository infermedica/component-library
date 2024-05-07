<template>
  <UiButton class="ui-button--text ui-list-item-suffix-as-button">
    <!-- @slot Use this slot to replace label template. -->
    <slot
      name="label"
      v-bind="{
        label,
        labelSuffixAttrs,
      }"
    >
      <span
        v-if="label"
        v-bind="labelSuffixAttrs"
      >{{ label }}</span>
    </slot>
    <!-- @slot Use this slot to replace icon template. -->
    <slot
      name="icon"
      v-bind="{
        hasIcon,
        iconSuffixAttrs: defaultProps.iconSuffixAttrs,
      }"
    >
      <UiIcon
        v-if="hasIcon"
        v-bind="defaultProps.iconSuffixAttrs"
        class="ui-button__icon ui-list-item-suffix-as-button__icon"
      />
    </slot>
  </UiButton>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';
import type {
  DefineAttrsProps,
  Icon,
} from '../../../../types';

export interface ListItemSuffixAsButtonProps {
  /**
   * Use this props to set label.
   */
  label?: string;
  /**
   * Use this props to set icon.
   */
  icon?: Icon;
  /**
   * Use this props to pass attrs for suffix UiIcon.
   */
  iconSuffixAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for label element.
   */
  labelSuffixAttrs?: DefineAttrsProps<null>;
}
export type ListItemSuffixAsButtonAttrsProps = DefineAttrsProps<ListItemSuffixAsButtonProps, ButtonAttrsProps>;

const props = withDefaults(defineProps<ListItemSuffixAsButtonProps>(), {
  label: '',
  icon: '',
  iconSuffixAttrs: () => ({}),
  labelSuffixAttrs: () => ({}),
});
const defaultProps = computed(() => ({
  iconSuffixAttrs: {
    icon: props.icon,
    ...props.iconSuffixAttrs,
  },
}));
const hasIcon = computed(() => (!!defaultProps.value.iconSuffixAttrs?.icon));

// TODO: UiListItemSuffixAsButton will be removed in 2.0.0
if (process.env.NODE_ENV !== 'production') {
  console.warn('[@infermedica/component-library]: The `UiListItemSuffixAsButton` component is deprecated and it will be removed in v2.0.0. Please use `UiListItemSuffix` component instead.');
}
</script>
