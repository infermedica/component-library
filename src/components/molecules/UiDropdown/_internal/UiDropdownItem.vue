<template>
  <UiButton
    ref="dropdownItem"
    :tabindex="tabindex"
    class="ui-button--outlined ui-dropdown-item"
    :class="{
      'ui-button--is-selected': isChecked,
    }"
    v-bind="buttonAttrs"
    @keydown="dropdownItemKeydownHandler"
  >
    <slot />
    <UiIcon
      v-if="isChecked"
      icon="present"
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
import type {
  PropType,
  ComputedRef,
} from 'vue';
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
@use "../../../../styles/functions";

.ui-dropdown-item {
  $element: dropdown-item;

  --button-padding: #{functions.var($element, padding, var(--space-8))};
  --button-border-width: 0;
  --button-color: #{functions.var($element, color, var(--color-text-body))};
  --button-hover-color: #{functions.var($element + "-hover", color, var(--color-text-body))};
  --button-active-color: #{functions.var($element + "-active", color, var(--color-text-body))};
  --button-font: #{functions.var($element, font, var(--font-body-1))};
  --button-letter-spacing: #{functions.var($element, letter-spacing, var(--letter-spacing-body-1))};

  justify-content: space-between;
  margin: functions.var($element, margin, var(--space-8) 0 0 0);

  &:first-of-type {
    margin-top: 0;
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
