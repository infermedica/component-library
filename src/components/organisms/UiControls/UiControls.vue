<template>
  <UiContainer class="ui-controls">
    <!-- @slot Use this slot to replace container content. -->
    <slot name="container">
      <div class="ui-controls__container">
        <!-- @slot Use this slot to place container content. -->
        <slot />
      </div>
    </slot>
    <!-- @slot Use this slot to replace bottom template. -->
    <slot
      name="bottom"
      v-bind="{buttonNextAttrs: nextAttrs, buttonBackAttrs: backAttrs, toBack, toNext, hideNextButton, invalid, translation}"
    >
      <div class="ui-controls__bottom">
        <!-- @slot Use this slot to replace next template. -->
        <slot
          v-if="toNext"
          v-bind="{hideNextButton, attrs: nextAttrs, invalid, translation, validNext}"
          name="next"
        >
          <UiButton
            v-if="!hideNextButton"
            v-bind="nextAttrs"
            class="ui-controls__next"
            :class="{'ui-button--is-disabled': invalid}"
          >
            {{ translation.next }}
          </UiButton>
        </slot>
        <!-- @slot Use this slot to replace back template. -->
        <slot
          name="back"
          v-bind="{toBack, attrs: backAttrs, translation}"
        >
          <UiButton
            v-if="toBack"
            v-bind="backAttrs"
            class="ui-controls__back ui-button--text ui-button--has-icon"
          >
            <UiIcon
              icon="chevron-left"
              class="ui-button__icon"
            /> {{ translation.back }}
          </UiButton>
        </slot>
      </div>
    </slot>
  </UiContainer>
</template>

<script setup>
import { computed, useSlots } from 'vue';
import UiContainer from '../UiContainer/UiContainer.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';

const props = defineProps({
  /**
   * Use this props to move the responsibility to move to the next screen to question content.
   */
  hideNextButton: {
    type: Boolean,
    default: false,
  },
  /**
   * Use this props to set route to back screen.
   */
  toBack: {
    type: [String, Object, Boolean],
    default: '',
  },
  /**
   * Use this props to set route to next screen.
   */
  toNext: {
    type: [String, Object, Boolean],
    default: '',
  },
  /**
   * Use this props to set invalid state of the question.
   */
  invalid: {
    type: Boolean,
    default: true,
  },
  /**
   * Use this props to pass attrs for next UiButton.
   */
  buttonNextAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for back UiButton.
   */
  buttonBackAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to override labels inside component translation.
   */
  translation: {
    type: Object,
    default: () => ({
      back: 'Back',
      next: 'Next',
    }),
  },
});
const emit = defineEmits(['has-error']);
const slots = useSlots();
function hasError() {
  emit('has-error');
}
// @deprecated will be removed in 0.4.0 use attrs props instead.
// TODO: remove in 0.4.0 / BEGIN
const validNext = computed(() => (
  props.invalid
    ? {
      onClick: hasError,
    }
    : {
      to: props.toNext,
    }
));
// END
if (process.env.NODE_ENV === 'development') {
  const { next } = slots;
  if (next) {
    console.warn('[@infermedica/component-library warn]: The "validNext" props bounded to "next" slot is deprecated and will be removed in v0.4.0. Please use "attrs" properties instead.');
  }
}
const nextAttrs = computed(() => (
  props.invalid
    ? {
      onClick: hasError,
      ...props.buttonNextAttrs,
    }
    : {
      to: props.toNext,
      ...props.buttonNextAttrs,
    }
));
const backAttrs = computed(() => (
  {
    to: props.toBack,
    ...props.buttonBackAttrs,
  }
));
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-controls {
  --container-padding: 0;

  display: flex;
  flex-direction: column;

  &__container {
    display: flex;
    flex: 1;
    padding: var(--controls-container-padding, var(--space-32) var(--space-20));

    @include from-tablet {
      padding: var(--controls-container-tablet-padding, var(--space-48) var(--space-48) var(--space-40));
    }
  }

  &__bottom {
    @include inner-border($element: controls-bottom, $color:  var(--color-border-divider), $width: 1px 0 0 0);

    display: flex;
    height: var(--controls-bottom, 5rem);
    flex-direction: row-reverse;
    align-items: var(--controls-bottom-align-items, center);
    justify-content: var(--controls-bottom-justify-content, space-between);
    padding: var(--controls-bottom-padding, var(--space-12) var(--space-20));

    @include from-tablet {
      padding: var(--controls-tablet-bottom-padding, var(--space-16) var(--space-32));
    }
  }

  &__next {
    margin: var(--controls-next-margin, 0 0 0 auto);

    [dir="rtl"] & {
      margin: var(--controls-next-margin, 0 auto 0 0);
    }
  }

  &__back {
    margin: var(--controls-back-margin, 0 auto 0 0);

    [dir="rtl"] & {
      margin: var(--controls-back-margin, 0 0 0 auto);
    }
  }
}
</style>
