<template>
  <!-- @slot Use this slot to place container content. -->
  <slot />
  <!-- @slot Use this slot to replace actions template. -->
  <slot
    name="actions"
    v-bind="{
      toNext,
      hideNextButton,
      buttonNextAttrs,
      invalid,
      toBack,
      hideBackButton,
      buttonBackAttrs,
      iconBackAttrs,
      translation,
    }"
  >
    <div class="ui-controls-horizontal__actions">
      <!--
        @slot Use this slot to replace next template.
        @binding {ControlsNavigation} toNext
        @binding {boolean} hideNextButton
        @binding {ButtonAttrsProps} buttonNextAttrs
        @binding {boolean} invalid
        @binding {ControlsTranslation} translation
      -->
      <slot
        name="next"
        v-bind="{
          toNext,
          hideNextButton,
          buttonNextAttrs,
          invalid,
          translation,
        }"
      >
        <UiControlsNextButton
          v-if="toNext && !hideNextButton"
          v-bind="buttonNextAttrs"
          :class="{ 'ui-button--is-disabled': invalid }"
        >
          {{ translation?.next }}
        </UiControlsNextButton>
        <span v-else />
      </slot>
      <!--
        @slot Use this slot to replace back template.
        @binding {ControlsNavigation} toBack
        @binding {boolean} hideBackButton
        @binding {ButtonAttrsProps} buttonBackAttrs
        @binding {IconAttrsProps} iconBackAttrs
        @binding {ControlsTranslation} translation
       -->
      <slot
        name="back"
        v-bind="{
          toBack,
          hideBackButton,
          buttonBackAttrs,
          iconBackAttrs,
          translation,
        }"
      >
        <UiControlsBackButton
          v-if="toBack && !hideBackButton"
          v-bind="{
            buttonBackAttrs,
            iconBackAttrs,
          }"
        >
          {{ translation?.back }}
        </UiControlsBackButton>
      </slot>
    </div>
  </slot>
</template>

<script setup lang="ts">
import UiControlsBackButton from '../UiControlsBackButton.vue';
import UiControlsNextButton from '../UiControlsNextButton.vue';
import type { ControlsCommonProps as ControlsHorizontalProps } from '../../UiControls.vue';

withDefaults(defineProps<ControlsHorizontalProps>(), {
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
@use "../../../../../styles/functions";
@use "../../../../../styles/mixins";

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
