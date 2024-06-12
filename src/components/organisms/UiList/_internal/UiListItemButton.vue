<template>
  <UiButton class="search-dropdown-input-row__button ui-button--text ui-list-item-button">
    <div class="search-dropdown-input-row__title">
      <!-- @slot Use this slot to replace icon template. -->
      <slot
        name="icon"
        v-bind="{
          hasIcon,
          iconButtonAttrs: defaultProps.iconButtonAttrs,
        }"
      >
        <UiIcon
          v-if="hasIcon"
          v-bind="defaultProps.iconButtonAttrs"
          icon="plus"
          class="ui-button__icon ui-list-item-button__icon"
        />
      </slot>
      <!-- @slot Use this slot to replace label template. -->
      <slot
        name="label"
        v-bind="{
          label,
          labelButtonAttrs,
        }"
      >
        <span
          v-if="label"
          v-bind="labelButtonAttrs"
        >{{ label }}</span>
      </slot>
    </div>
    <!-- @slot Use this slot to replace hint template. -->
    <slot
      name="hint"
      v-bind="{
        hint,
        hintButtonAttrs,
      }"
    >
      <span
        v-if="hint"
        v-bind="hintButtonAttrs"
      >Add with your own words</span>
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

export interface ListItemButtonProps {
  /**
   * Use this props to set label.
   */
  label?: string;
  /**
   * Use this props to set icon.
   */
  hint?: string;
  /**
   * Use this props to set icon.
   */
  icon?: Icon;
  /**
   * Use this props to pass attrs for label element.
   */
  labelButtonAttrs?: DefineAttrsProps<null>;
  /**
   * Use this props to pass attrs for label element.
   */
  hintButtonAttrs?: DefineAttrsProps<null>;
  /**
   * Use this props to pass attrs for Button UiIcon.
   */
  iconButtonAttrs?: IconAttrsProps;
}
export type ListItemButtonAttrsProps = DefineAttrsProps<ListItemButtonProps, ButtonAttrsProps>;

const props = withDefaults(defineProps<ListItemButtonProps>(), {
  label: '',
  hint: '',
  icon: '',
  labelButtonAttrs: () => ({}),
  hintButtonAttrs: () => ({}),
  iconButtonAttrs: () => ({}),
});
const defaultProps = computed(() => ({
  iconButtonAttrs: {
    icon: props.icon,
    ...props.iconButtonAttrs,
  },
}));
const hasIcon = computed(() => (!!defaultProps.value.iconButtonAttrs?.icon));

// TODO: UiListItemButton will be removed in 2.0.0
console.warn('[@infermedica/component-library]: The `UiListItemButton` component is deprecated and it will be removed in v2.0.0. Please use `UiListItemButton` component instead.');
</script>
