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
        buttonAttrs,
        buttonRemoveAttrs,
        clickHandler,
        iconRemoveAttrs: defaultProps.iconRemoveAttrs
      }"
    >
      <UiButton
        v-bind="buttonAttrs || buttonRemoveAttrs"
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
import {
  computed,
  useAttrs,
} from 'vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type { PropsAttrs } from '../../../types/attrs';
import type { Icon } from '../../../types/icon';

const props = defineProps({
  /**
   * Use this props to pass attrs for remove UiButton
   */
  textLabelAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for remove UiButton
   */
  buttonRemoveAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for remove UiIcon
   */
  iconRemoveAttrs: {
    type: Object as PropsAttrs,
    default: () => ({ icon: 'remove-filled' }),
  },
});
const defaultProps = computed(() => ({
  iconRemoveAttrs: {
    icon: 'remove-filled' as Icon,
    ...props.iconRemoveAttrs,
  },
}));
const emit = defineEmits<{(e:'remove'): void}>();
function clickHandler(): void {
  emit('remove');
}
// TODO: remove in 0.6.0 / BEGIN
const attrs = useAttrs();
const buttonAttrs = computed(() => attrs.buttonAttrs || attrs['button-attrs']);
if (buttonAttrs.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiChip]: The `buttonAttrs` props will be removed in 0.6.0. Please use `buttonRemoveAttrs` props instead.');
  }
}
// END
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
    position: relative;
    align-self: flex-start;

    &::before {
      --_chip-remove-pointer-area-size: #{functions.var($element + "-remove-pointer-area", size, var(--space-32))};

      position: absolute;
      top: 50%;
      left: 50%;
      width: functions.var($element + "remove-pointer-area", width, var(--_chip-remove-pointer-area-size));
      height: functions.var($element + "remove-pointer-area", height, var(--_chip-remove-pointer-area-size));
      content: "";
      transform: translate(-50%, -50%);
    }
  }
}
</style>
