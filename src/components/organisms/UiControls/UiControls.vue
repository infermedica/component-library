<template>
  <UiContainer class="ui-controls">
    <!-- @slot Use this slot to replace container content. -->
    <slot name="container">
      <div
        v-bind="containerAttrs"
        class="ui-controls__container"
      >
        <!-- @slot Use this slot to place container content. -->
        <slot />
      </div>
    </slot>
    <!-- @slot Use this slot to replace bottom template. -->
    <slot
      name="bottom"
      v-bind="{
        toNext,
        hideNextButton,
        buttonNextAttrs: defaultProps.buttonNextAttrs,
        invalid,
        toBack,
        iconBackAttrs: defaultProps.iconBackAttrs,
        buttonBackAttrs: defaultProps.buttonBackAttrs,
        translation: defaultProps.translation,
      }"
    >
      <div class="ui-controls__bottom">
        <!-- @slot Use this slot to replace next template. -->
        <slot
          name="next"
          v-bind="{
            toNext,
            hideNextButton,
            buttonNextAttrs: defaultProps.buttonNextAttrs,
            invalid,
            translation: defaultProps.translation
          }"
        >
          <UiButton
            v-if="toNext && !hideNextButton"
            v-bind="defaultProps.buttonNextAttrs"
            class="ui-controls__next"
            :class="{ 'ui-button--is-disabled': invalid }"
          >
            {{ defaultProps.translation?.next }}
          </UiButton>
          <span
            v-else
          />
        </slot>
        <!-- @slot Use this slot to replace back template. -->
        <slot
          name="back"
          v-bind="{
            hideBackButton,
            toBack,
            buttonBackAttrs: defaultProps.buttonBackAttrs,
            iconBackAttrs: defaultProps.iconBackAttrs,
            translation: defaultProps.translation
          }"
        >
          <UiButton
            v-if="toBack && !hideBackButton"
            v-bind="defaultProps.buttonBackAttrs"
            class="ui-button--text ui-controls__back"
          >
            <UiIcon
              v-bind="defaultProps.iconBackAttrs"
              class="ui-button__icon"
            /> {{ defaultProps.translation?.back }}
          </UiButton>
        </slot>
      </div>
    </slot>
  </UiContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiContainer from '../UiContainer/UiContainer.vue';
import type { ContainerAttrsProps } from '../UiContainer/UiContainer.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';
import type { DefineAttrsProps } from '../../../types';

export interface ControlsTranslation {
  back?: string,
  next?: string,
}
export type ControlsNavigation = string | Record<string, unknown>;
export interface ControlsProps {
  /**
   * Use this props to move the responsibility to move to the next screen to question content.
   */
  hideNextButton?: boolean;
  /**
   * Use this props to move the responsibility to move to the back screen to question content.
   */
  hideBackButton?: boolean;
  /**
   * Use this props to set route to back screen.
   */
  toBack?: ControlsNavigation;
  /**
   * Use this props to set route to next screen.
   */
  toNext?: ControlsNavigation;
  /**
   * Use this props to set invalid state of the question.
   */
  invalid?: boolean;
  /**
   * Use this props to override labels inside component translation.
   */
  translation?: ControlsTranslation;
  /**
   *  Use this props to pass attrs to container element.
   */
  containerAttrs?: DefineAttrsProps<null>;
  /**
   * Use this props to pass attrs for next UiButton.
   */
  buttonNextAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for back UiButton.
   */
  buttonBackAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for back UiIcon.
   */
  iconBackAttrs?: IconAttrsProps;
}
export type ControlsAttrsProps = DefineAttrsProps<ControlsProps, ContainerAttrsProps>
export interface ControlsEmits {
  (e: 'has-error'): void
}

const props = withDefaults(defineProps<ControlsProps>(), {
  hideNextButton: false,
  hideBackButton: false,
  toBack: '',
  toNext: '',
  invalid: true,
  translation: () => ({
    back: 'Back',
    next: 'Next',
  }),
  containerAttrs: () => ({}),
  buttonNextAttrs: () => ({}),
  buttonBackAttrs: () => ({}),
  iconBackAttrs: () => ({ icon: 'chevron-left' }),
});
const emit = defineEmits<ControlsEmits>();
function hasError(): void {
  emit('has-error');
}
const defaultProps = computed<ControlsProps>(() => ({
  translation: {
    back: 'Back',
    next: 'Next',
    ...props.translation,
  },
  buttonBackAttrs: {
    to: props.toBack,
    ...props.buttonBackAttrs,
  },
  iconBackAttrs: {
    icon: 'chevron-left',
    ...props.iconBackAttrs,
  },
  buttonNextAttrs: {
    onClick: props.invalid
      ? hasError
      : undefined,
    to: props.invalid
      ? undefined
      : props.toNext,
    ...props.buttonNextAttrs,
  },
}));
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-controls {
  $element: controls;

  --container-padding-block: 0;
  --container-padding-inline: 0;
  --container-tablet-padding-block: 0;
  --container-tablet-padding-inline: 0;
  --container-desktop-padding-block: 0;
  --container-desktop-padding-inline: 0;

  display: flex;
  flex-direction: column;

  &__container {
    @include mixins.use-logical($element + "-container", padding, var(--space-32) var(--space-20));

    flex: 1;

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-container", padding, var(--space-48) var(--space-64));
    }
  }

  &__bottom {
    @include mixins.use-logical($element + "-bottom", padding, var(--space-12) var(--space-20));
    @include mixins.inner-border(
      $element: $element + "-bottom",
      $color:  var(--color-border-divider),
      $width: 1px 0 0 0
    );

    display: flex;
    height: functions.var($element + "-bottom", height, 5rem);
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-bottom", padding, var(--space-16) var(--space-32));
    }
  }
}
</style>
