<template>
  <div class="additional-element-row">
    <UiButton
      class="additional-element-row__button ui-button--text"
      @click="clickHandler"
    >
      <div class="additional-element-row__title">
        <UiIcon
          icon="plus"
          class="ui-button__icon"
        />
        <UiText class="additional-element-row__label">
          Didn't find chronic condition?
        </UiText>
      </div>
      <UiText class="additional-element-row__hint">
        Add with your own words
      </UiText>
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiText from '../../../atoms/UiText/UiText.vue';
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
