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
import type {
  PropType,
  ComputedRef,
} from 'vue';
import equal from 'fast-deep-equal';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type { DropdownValue } from '../UiDropdown.vue';
import type { Icon } from '../../../../types/icon';

const props = defineProps({
  /**
   * Use this props to set the value of the dropdown item.
   */
  value: {
    type: [
      String,
      Object,
    ] as PropType<DropdownValue>,
    default: '',
  },
  /**
   *  Use this props to pass attrs to UiIcon.
   */
  iconItemAttrs: {
    type: Object,
    default: () => ({ icon: 'present' }),
  },
});
const defaultProps = computed(() => ({
  iconItemAttrs: {
    icon: 'present' as Icon,
    ...props.iconItemAttrs,
  },
}));
const attrs = useAttrs();
const dropdownItem = ref<null | HTMLButtonElement>(null);
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
  return equal(JSON.parse(JSON.stringify(modelValue.value)), JSON.parse(JSON.stringify(props.value)));
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
const buttonItemAttrs = computed(() => ({
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

  --button-padding-logical: #{functions.var($element, padding-logical, var(--space-8))};
  --button-border-logical-width: 0;
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
