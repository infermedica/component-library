<template>
  <UiButton
    ref="dropdownItem"
    :tabindex="tabindex"
    class="ui-button--outlined ui-dropdown-item"
    :class="{ 'ui-button--is-selected': isChecked, }"
    v-bind="buttonItemAttrs"
    @keydown="dropdownItemKeydownHandler"
  >
    <slot />
    <UiIcon
      v-if="isChecked"
      v-bind="defaultProps.iconItemAttrs"
      class="ui-button__icon ui-dropdown-item__icon"
    />
  </UiButton>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  inject,
  useAttrs,
} from 'vue';
import type { ComputedRef } from 'vue';
import equal from 'fast-deep-equal';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../../atoms/UiButton/UiButton.vue';
import type { DropdownProps } from '../UiDropdown.vue';
import type { DefineAttrsProps } from '../../../../types';

export interface DropdownItemProps {
  /**
   * Use this props to set the value of the dropdown item.
   */
  value?: DropdownProps['modelValue'];
  /**
   *  Use this props to pass attrs to UiIcon.
   */
  iconItemAttrs?: IconAttrsProps;
}
export type DropdownItemAttrsProps = DefineAttrsProps<DropdownItemProps, ButtonAttrsProps>;

const props = withDefaults(defineProps<DropdownItemProps>(), {
  value: '',
  iconItemAttrs: () => ({ icon: 'present' }),
});
const defaultProps = computed<DropdownItemProps>(() => ({
  iconItemAttrs: {
    icon: props.iconItemAttrs.icon || 'present',
    ...props.iconItemAttrs,
  },
}));
const attrs = useAttrs();
const dropdownItem = ref<null | HTMLButtonElement>(null);
const changeHandler = inject<(value: DropdownProps['modelValue']) => void>('changeHandler');
// eslint-disable-next-line @typescript-eslint/no-empty-function
const dropdownItemKeydownHandler = inject<(e: Event) => Promise<void> | void>('dropdownItemKeydownHandler', () => {});
const modelValue = inject<ComputedRef<DropdownProps['modelValue']>>('modelValue', computed(() => ''));
const isChecked = computed(() => {
  if (!modelValue.value) {
    return false;
  }
  if (typeof modelValue.value === 'string') {
    return props.value === modelValue.value;
  }
  return equal(
    JSON.parse(JSON.stringify(modelValue.value)),
    JSON.parse(JSON.stringify(props.value)),
  );
});
const isOption = computed(() => !!props.value);
const tabindex = computed(() => {
  if (isChecked.value || !modelValue.value) {
    return 0;
  }
  if (typeof modelValue.value === 'string') {
    return !modelValue.value ? 0 : -1;
  }
  return !Object.keys(modelValue.value).length ? 0 : -1;
});
function optionChangeHandler(value: DropdownItemProps['value']): void {
  if (isOption.value && changeHandler) {
    changeHandler(value);
  }
}
const buttonItemAttrs = computed<ButtonAttrsProps>(() => ({
  role: isOption.value ? 'radio' : undefined,
  'aria-checked': isOption.value ? `${isChecked.value}` : undefined,
  onClick: attrs.to ? undefined : optionChangeHandler.bind(this, props.value),
}));
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-dropdown-item {
  $element: dropdown-item;

  @include mixins.override-logical(button, $element, padding, var(--space-8));
  @include mixins.override-logical(button, null, border-width, 0);

  --button-color: #{functions.var($element, color, var(--color-text-body))};
  --button-hover-color: #{functions.var($element + "-hover", color, var(--color-text-body))};
  --button-active-color: #{functions.var($element + "-active", color, var(--color-text-body))};
  --button-font: #{functions.var($element, font, var(--font-body-1))};
  --button-letter-spacing: #{functions.var($element, letter-spacing, var(--letter-spacing-body-1))};

  @include mixins.use-logical($element, margin, var(--space-8) 0 0);

  justify-content: space-between;

  &:first-of-type {
    @include mixins.use-logical($element, margin, 0);
  }

  /* fixme: do something to remove this hack */
  /* stylelint-disable-next-line selector-class-pattern */
  &.ui-button--is-selected {
    --button-color: unset;
    --button-hover-color: unset;
    --button-active-color: unset;
  }
}
</style>
