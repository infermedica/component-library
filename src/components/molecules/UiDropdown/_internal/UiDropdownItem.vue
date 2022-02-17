<template>
  <UiButton
    ref="dropdownitem"
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

<script setup>
import {
  computed, ref, inject, useAttrs,
} from 'vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';

const props = defineProps({
  value: {
    type: [String, Object],
    default: '',
  },
});
const attrs = useAttrs();
const dropdownitem = ref(null);
const changeHandler = inject('changeHandler');
const dropdownItemKeydownHandler = inject('dropdownItemKeydownHandler');
const modelValue = inject('modelValue');
const isChecked = computed(() => {
  if (!modelValue.value) {
    return false;
  }
  if (typeof modelValue.value === 'string') {
    return props.value === modelValue.value;
  }
  return Object.keys(props.value)
    .every((key) => (modelValue.value[key] === props.value[key]));
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
function optionChangeHandler(value) {
  if (isOption.value) {
    changeHandler(value);
  }
}
const buttonAttrs = computed(() => ({
  role: isOption.value ? 'radio' : undefined,
  'aria-checked': isOption.value ? `${isChecked.value}` : undefined,
  onClick: attrs.to ? undefined : optionChangeHandler.bind(this, props.value),
}));
</script>

<style lang="scss">
@import '../../../../styles/mixins/_mixins.scss';

.ui-dropdown-item {
  $this: &;

  @include font(body-1);

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

  .focus-is-hidden & {
    &:focus {
      --button-background: var(--dropdown-item-button-focus-hidden-background, var(--button-hover-background));
    }
  }
}
</style>
