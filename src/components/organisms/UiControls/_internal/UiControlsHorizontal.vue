<template>
  <!-- @slot Use this slot to place container content. -->
  <slot />
  <!-- @slot Use this slot to replace actions template. -->
  <slot name="actions">
    <div class="ui-controls-horizontal__actions">
      <!-- @slot Use this slot to replace next template. -->
      <slot name="next">
        <UiControlsNextButton>
          {{ translation.next }}
        </UiControlsNextButton>
      </slot>
      <!-- @slot Use this slot to replace back template. -->
      <slot name="back">
        <UiControlsBackButton>
          {{ translation.back }}
        </UiControlsBackButton>
      </slot>
    </div>
  </slot>
</template>

<script setup lang="ts">
import UiControlsBackButton from './UiControlsBackButton.vue';
import UiControlsNextButton from './UiControlsNextButton.vue';

import type { ButtonAttrsProps } from '../../../atoms/UiButton/UiButton.vue';
import type { IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';
import type { DefineAttrsProps } from '../../../../types';

export interface ControlsTranslation {
  back?: string;
  next?: string;
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
  /** Use this props to set direction of controls. */
  direction?: 'horizontal' | 'vertical',
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
  buttonNextAttrs: () => ({}),
  buttonBackAttrs: () => ({ to: '' }),
  iconBackAttrs: () => ({ icon: 'chevron-left' }),
});
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";
.ui-controls-horizontal {
  $element: controls-horizontal;

  &__actions {
    @include mixins.use-logical($element + "-actions", padding, var(--space-12) var(--space-20));
    @include mixins.inner-border(
        $element: $element + "-actions",
        $color:  var(--color-border-divider),
        $width: 1px 0 0 0
    );

    display: flex;
    height: functions.var($element + "-actions", height, 5rem);
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    align-self: stretch;

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-actions", padding, var(--space-16) var(--space-32));
    }
  }
}
</style>
