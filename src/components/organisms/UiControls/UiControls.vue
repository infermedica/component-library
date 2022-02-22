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
      v-bind="{toBack, toNext, hideNextButton, invalid, translation}"
    >
      <div class="ui-controls__bottom">
        <!-- @slot Use this slot to replace next template. -->
        <slot
          v-if="toNext"
          v-bind="{hideNextButton, validNext, invalid, translation}"
          name="next"
        >
          <UiButton
            v-if="!hideNextButton"
            v-bind="validNext"
            class="ui-controls__next"
            :class="{'ui-button--is-disabled': invalid}"
          >
            {{ translation.next }}
          </UiButton>
        </slot>
        <!-- @slot Use this slot to replace back template. -->
        <slot
          name="back"
          v-bind="{toBack, translation}"
        >
          <UiButton
            v-if="toBack"
            :to="toBack"
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
import { computed } from 'vue';
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
function hasError() {
  emit('has-error');
}
const validNext = computed(() => (
  props.invalid
    ? {
      onClick: hasError,
    }
    : { to: props.toNext }
));
</script>

<style lang="scss">
.ui-controls {
  --container-padding: 0;

  display: flex;
  flex-direction: column;

  &__container {
    display: flex;
    flex: 1;
    padding: var(--controls-container-padding, var(--space-32) var(--space-20));

    @media (min-width: 768px) {
      padding: var(--controls-container-tablet-padding, var(--space-48) var(--space-48) var(--space-40));
    }
  }

  &__bottom {
    display: flex;
    flex-direction: row-reverse;
    align-items: var(--controls-bottom-align-items, center);
    justify-content: var(--controls-bottom-justify-content, space-between);
    height: var(--controls-bottom, 5rem);
    padding: var(--controls-bottom-padding, var(--space-12) var(--space-20));
    border: var(--controls-bottom-border, solid var(--color-border-divider));
    border-width: var(--controls-bottom-border-width, 1px 0 0 0);

    @media (min-width: 768px) {
      padding: var(--controls-tablet-bottom-padding, var(--space-16) var(--space-32));
    }
  }

  &__next {
    margin: var(--controls-next-margin, 0 0 0 auto);

    [dir=rtl] & {
      margin: var(--controls-next-margin, 0 auto 0 0);
    }
  }

  &__back {
    margin: var(--controls-back-margin, 0 auto 0 0);

    [dir=rtl] & {
      margin: var(--controls-back-margin, 0 0 0 auto);
    }
  }
}
</style>
