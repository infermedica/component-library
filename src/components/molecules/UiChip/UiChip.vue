<template>
  <div class="ui-chip">
    <!-- @slot Use this slot to replace label template. -->
    <slot
      name="label"
      v-bind="{ textLabelAttrs }"
    >
      <!-- @slot Use this slot to place content inside chip. -->
      <UiText
        v-bind="textLabelAttrs"
        class="ui-text--body-2-comfortable ui-chip__label"
      >
        <slot />
      </UiText>
    </slot>
    <!-- @slot Use this slot to replace remove template. -->
    <slot
      name="remove"
      v-bind="{
        buttonRemoveAttrs,
        clickHandler,
        iconRemoveAttrs: defaultProps.iconRemoveAttrs,
      }"
    >
      <UiButton
        v-bind="buttonRemoveAttrs"
        class="ui-button--icon ui-button--circled ui-chip__remove"
        @click="clickHandler"
      >
        <slot
          name="icon"
          v-bind="{ iconRemoveAttrs: defaultProps.iconRemoveAttrs }"
        >
          <UiIcon
            v-bind="defaultProps.iconRemoveAttrs"
            class=" ui-button__icon ui-chip__icon"
          />
        </slot>
      </UiButton>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type { TextAttrsProps } from '../../atoms/UiText/UiText.vue';
import type { DefineAttrsProps } from '../../../types';

export interface ChipProps {
  /**
   * Use this props to pass attrs for remove UiButton
   */
  textLabelAttrs?: TextAttrsProps;
  /**
   * Use this props to pass attrs for remove UiButton
   */
  buttonRemoveAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for remove UiIcon
   */
  iconRemoveAttrs?: IconAttrsProps;
}
export type ChipAttrsProps = DefineAttrsProps<ChipProps>;
export interface ChipEmits {
  (e:'remove'): void;
}

const props = withDefaults(defineProps<ChipProps>(), {
  textLabelAttrs: () => ({}),
  buttonRemoveAttrs: () => ({}),
  iconRemoveAttrs: () => ({ icon: 'remove-filled' }),
});
const defaultProps = computed(() => {
  const icon: IconAttrsProps['icon'] = 'remove-filled';
  return {
    iconRemoveAttrs: {
      icon,
      ...props.iconRemoveAttrs,
    },
  };
});
const emit = defineEmits<ChipEmits>();
const clickHandler = () => {
  emit('remove');
};
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-chip {
  $this: &;
  $element: chip;

  @include mixins.use-logical($element, padding, var(--space-4) var(--space-4) var(--space-4) var(--space-12));
  @include mixins.use-logical($element, border-radius, var(--border-radius-form));

  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: functions.var($element, background, var(--color-chip-background));
  gap: functions.var($element, gap, var(--space-8));

  &__label {
    --text-color: #{functions.var($element + "-label", color, var(--color-chip-text))};
  }

  &__icon {
    --_remove-filled-close: #{functions.var($element + "-remove-filled-close", color, var(--color-chip-icon))};
    --button-icon-color: #{functions.var($element + "-icon", color, var(--color-chip-icon-background))};
    --button-hover-icon-color:
      #{functions.var(
        $element + "-icon-hover",
        color,
        var(--color-chip-icon-background-hover)
      )};
    --button-active-icon-color:
      #{functions.var(
        $element + "-icon-active",
        color,
        var(--color-chip-icon-background-active)
      )};
  }

  &__remove {
    @include mixins.pointer-area($element + "-remove", var(--space-32));

    align-self: flex-start;
  }
}
</style>
