<template>
  <UiButton
    :class="['ui-toggle-button ui-button--outlined', {
      'ui-toggle-button--is-checked': isChecked,
      'ui-button--is-disabled': isDisabled,
      'ui-button--has-icon': hasIcon
    }]"
    :aria-checked="isChecked"
    role="radio"
    @click="clickHandler"
  >
    <!-- @slot Use this slot to place content inside component.-->
    <slot />
  </UiButton>
</template>

<script setup>
import {
  computed, getCurrentInstance, inject, watch, useAttrs,
} from 'vue';
import equal from 'fast-deep-equal';
import UiButton from '../../../atoms/UiButton/UiButton.vue';

const props = defineProps({
  /**
   * Use this props to set value of toggle button.
   */
  value: {
    type: [Number, String, Object],
    required: true,
  },
});
const emit = defineEmits(['check', 'uncheck']);
const attrs = useAttrs();
const parentComponent = getCurrentInstance().parent;
if (!parentComponent || parentComponent.type.name !== 'UiToggleButtonGroup') {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('UiToggleButton has to be child of UiToggleButtonGroup');
  }
}
const modelValue = inject('modelValue');
const isChecked = computed(() => (modelValue && equal(modelValue.value, props.value)));
const clickHandler = () => {
  modelValue.value = props.value;
};
watch(isChecked, () => {
  emit(isChecked.value ? 'check' : 'uncheck');
});
const isDisabled = computed(() => attrs.class?.includes('ui-toggle-button--is-disabled'));
const hasIcon = computed(() => attrs.class?.includes('ui-toggle-button--has-icon'));
</script>

<style lang="scss">
.ui-toggle-button {
  $this: &;

  --button-padding: var(--toggle-button-padding, #{calc(var(--space-8) - 1px) var(--space-12)});
  --button-border-radius: 0;
  --toggle-button-border-radius: var(--border-radius-form);

  flex-basis: var(--toggle-button-flex-basis, 0);
  flex-grow: var(--toggle-button-flex-grow, 1);
  flex-shrink: var(--toggle-button-flex-shrink, 1);
  letter-spacing: var(--toggle-button-letter-spacing, var(--letter-spacing-medium));

  &:first-child {
    --button-border-radius: var(--toggle-button-border-radius) 0 0 var(--toggle-button-border-radius);
  }

  &:last-child {
    --button-border-radius: 0 var(--toggle-button-border-radius)  var(--toggle-button-border-radius)  0;
  }

  &:not(:first-child) {
    --button-border-width:
      var(--toggle-button-border-width, 1px)
      var(--toggle-button-border-width, 1px) var(--toggle-button-border-width, 1px) 0;
  }

  [dir="rtl"] & {
    &:first-child {
      --button-border-radius: 0 var(--toggle-button-border-radius)  var(--toggle-button-border-radius)  0;
    }

    &:last-child {
      --button-border-radius: var(--toggle-button-border-radius) 0 0 var(--toggle-button-border-radius);
    }

    &:not(:first-child) {
      --button-border-width:
        var(--toggle-button-border-width, 1px) 0
        var(--toggle-button-border-width, 1px) var(--toggle-button-border-width, 1px);
    }
  }

  &--is-checked {
    --button-background: var(--toggle-button-checked-background, var(--color-background-selection));
    --button-hover-background:
      var(
        --toggle-button-checked-hover-background,
        var(--color-background-selection-hover)
      );
    --button-active-background:
      var(
        --toggle-button-checked-active-background,
        var(--color-background-selection-active)
      );
    --button-color: var(--toggle-button-checked-color, var(--color-text-on-selection));
    --button-hover-color: var(--toggle-button-checked-hover-color, var(--color-text-on-selection));
    --button-active-color: var(--toggle-button-checked-active-color, var(--color-text-on-selection));
    --button-border-color: var(--toggle-button-checked-border-color, var(--color-background-selection));
    --button-hover-border-color:
      var(
        --toggle-button-checked-hover-border-color,
        var(--color-background-selection-hover)
      );
    --button-active-border-color:
      var(
        --toggle-button-checked-active-border-color,
        var(--color-background-selection-active)
      );
    --button-icon-color: var(--color-icon-negative);
    --button-icon-color-hover: var(--color-icon-negative);
    --button-icon-color-active: var(--color-icon-negative);
  }

  &--is-checked.ui-button--is-disabled {
    --button-background: var(--toggle-button-checked-disabled-background, var(--color-background-disabled));
    --button-hover-background:
      var(
        --toggle-button-checked-disabled-background,
        var(--color-background-disabled)
      );
    --button-active-background:
      var(
        --toggle-button-checked-disabled-background,
        var(--color-background-disabled)
      );
    --button-color: var(--toggle-button-checked-disabled-color, var(--color-text-on-selection));
    --button-hover-color: var(--toggle-button-checked-disabled-color, var(--color-text-on-selection));
    --button-active-color: var(--toggle-button-checked-disabled-color, var(--color-text-on-selection));
    --button-icon-color: var(--color-icon-negative);
    --button-icon-color-hover: var(--color-icon-negative);
    --button-icon-color-active: var(--color-icon-negative);
  }
}
</style>
