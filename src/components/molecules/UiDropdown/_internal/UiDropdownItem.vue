<template>
  <UiButton
    ref="dropdownItem"
    :tabindex="tabindex"
    class="ui-dropdown-item ui-button--outlined ui-button--small ui-button--has-icon"
    :class="{'ui-dropdown-item--selected': isChecked}"
    v-bind="buttonAttrs"
    @keydown="dropdownItemKeydownHandler"
  >
    <slot />
    <UiIcon
      v-if="isChecked"
      icon="present"
      class="ui-dropdown-item__icon"
    />
  </UiButton>
</template>

<script setup lang="ts">
import {
  computed, ref, inject, useAttrs,
} from 'vue';
import type { PropType, ComputedRef } from 'vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type { DropdownValue } from '../UiDropdown.vue';

export interface ButtonAttrs {
  role?: 'radio';
  'aria-checked'?: string;
  onClick?: ((value: DropdownValue) => void);
  [key: string]: unknown;
}
const props = defineProps({
  /**
   * Use this props to set the value of the dropdown item.
   */
  value: {
    type: [String, Object] as PropType<DropdownValue>,
    default: '',
  },
});
const attrs = useAttrs();
const dropdownItem = ref<null|HTMLButtonElement>(null);
const changeHandler = inject('changeHandler') as (value: DropdownValue) => void;
const dropdownItemKeydownHandler = inject('dropdownItemKeydownHandler') as (e: { key: string }) => Promise<void>;
const modelValue = inject('modelValue') as ComputedRef<DropdownValue>;
const isChecked = computed(() => {
  if (!modelValue.value) {
    return false;
  }
  if (typeof modelValue.value === 'string') {
    return props.value === modelValue.value;
  }
  return Object.keys(props.value)
    .every((key: string) => (
      modelValue.value as Record<string, unknown>)[key] === (props.value as Record<string, unknown>)[key]);
});
const isOption = computed(() => !!props.value);
const tabindex = computed(() => {
  if (isChecked.value) {
    return 0;
  }
  if (typeof modelValue.value === 'string') {
    return !modelValue.value ? 0 : -1;
  }
  return !Object.keys(modelValue.value).length ? 0 : -1;
});
function optionChangeHandler(value: DropdownValue): void {
  if (isOption.value) {
    changeHandler(value);
  }
}
const buttonAttrs = computed<ButtonAttrs>(() => ({
  role: isOption.value ? 'radio' : undefined,
  'aria-checked': isOption.value ? `${isChecked.value}` : undefined,
  onClick: attrs.to ? undefined : optionChangeHandler.bind(this, props.value),
}));
</script>

<style lang="scss">
@import "../../../../styles/mixins/mixins";

.ui-dropdown-item {
  @include font(dropdown-item, body-1, button);
  $this: &;

  --button-padding: var(--dropdown-item-button-padding, var(--space-8));
  --button-border-width: 0;
  --button-justify-content: space-between;
  --button-color: var(--color-text-body);
  --button-hover-color: var(--color-text-body);
  --button-active-color: var(--color-text-body);
  --button-border-radius: var(--border-radius-form);

  width: 100%;
  margin: var(--dropdown-item-margin, 0 0 var(--space-8) 0);

  &:last-of-type {
    margin: var(--dropdown-item-margin, 0);
  }

  &__icon {
    flex: none;
  }

  &--selected {
    --button-icon-color: var(--color-icon-negative);
    --button-icon-color-hover: var(--color-icon-negative);
    --button-icon-color-active: var(--color-icon-negative);
    --button-background: var(--dropdown-item-button-selected-background, var(--color-background-selection));
    --button-hover-background: var(--dropdown-item-button-selected-background, var(--color-background-selection-hover));
    --button-active-background: var(--dropdown-item-button-selected-background, var(--color-background-selection-active));
    --button-color: var(--color-text-on-selection);
    --button-hover-color: var(--color-text-on-selection);
    --button-active-color: var(--color-text-on-selection);
  }

  &--compact {
    --dropdown-item-button-padding: var(--space-4) var(--space-8);
  }

  &:focus {
    --button-background: var(--dropdown-item-button-focus-hidden-background, var(--button-hover-background));
  }
}
</style>
