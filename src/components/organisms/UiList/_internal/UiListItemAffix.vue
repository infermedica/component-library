<template>
  <component
    :is="listItemAffixComponent"
    :class="[
      'ui-list-item-affix',
      { 'ui-button--text': isButton },
    ]"
  >
    <slot
      v-bind="{
        label,
        icon,
        isButton,
        hasIcon,
        iconAttrs,
        labelAttrs,
      }"
    />
  </component>
</template>

<script setup lang="ts">
import {
  computed,
  useAttrs,
} from 'vue';
import { type IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiText from '../../../atoms/UiText/UiText.vue';

import type {
  DefineAttrsProps,
  HTMLTag,
  Icon,
} from '../../../../types';

export interface ListItemAffixProps {
  /**
   * Use this props to set list item suffix tag.
   */
  tag?: HTMLTag;
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
  iconAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for label element.
   */
  labelAttrs?: DefineAttrsProps<null>;
}
export type ListItemAffixAttrsProps = DefineAttrsProps<ListItemAffixProps>
const props = withDefaults(defineProps<ListItemAffixProps>(), {
  tag: undefined,
  label: '',
  icon: '',
  iconAttrs: () => ({}),
  labelAttrs: () => ({}),
});
const attrs:ListItemAffixAttrsProps = useAttrs();

const isButton = computed(() => (!!Object.keys(attrs)
  .find((key) => key
    .match(/(^on*|to|href)/))));
const listItemAffixComponent = computed(() => {
  if (props.tag) {
    return props.tag;
  }
  return isButton.value
    ? UiButton
    : UiText;
});
const defaultProps = computed(() => ({
  iconAttrs: {
    icon: props.icon,
    class: [
      { 'ui-button__icon ui-button__icon-end': isButton.value },
      props.iconAttrs?.class,
    ],
    ...props.iconAttrs,
  },
}));
const hasIcon = computed(() => (defaultProps.value?.iconAttrs?.icon));
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-list-item-affix {
  $this: &;
  $element: list-item-affix;

  display: flex;
  align-items: center;
  gap: functions.var($element, gap, var(--space-4));

  &:not(.ui-button) {
    --icon-color: #{functions.var($element, icon-color, var(--color-icon-primary))};
    --text-color: #{functions.var($element, text-color, var(--color-text-action-primary))};
  }

  @at-root .ui-list-item__content {
    @include mixins.hover {
      #{$this}:not(.ui-button) {
        --icon-color: #{functions.var($element + '-hover', icon-color, var(--color-icon-primary-hover))};
        --text-color: #{functions.var($element + '-hover', text-color, var(--color-text-action-primary-hover))};
      }
    }

    &:active {
      #{$this}:not(.ui-button) {
        --icon-color: #{functions.var($element + '-active', icon-color, var(--color-icon-primary-active))};
        --text-color: #{functions.var($element, '-active', var(--color-text-action-primary-active))};
      }
    }
  }

  @at-root [class*="-secondary"] {
    #{$this}:not(.ui-button),
    &#{$this}:not(.ui-button) {
      --color-icon-primary: var(--color-icon-secondary);
      --color-icon-primary-hover: var(--color-icon-secondary-hover);
      --color-icon-primary-active: var(--color-icon-secondary-active);
      --color-text-action-primary: var(--color-text-on-brand);
      --color-text-action-primary-hover: var(--color-text-on-brand-hover);
      --color-text-action-primary-active: var(--color-text-on-brand-active);
    }
  }
}
</style>
