<template>
  <UiContainer class="ui-question">
    <!-- @slot Use this slot to replace container content. -->
    <slot
      name="container"
      v-bind="{title, hint}"
    >
      <div class="ui-question__container">
        <!-- @slot Use this slot to replace title template. -->
        <slot
          name="title"
          v-bind="{title}"
        >
          <UiHeading class="ui-question__title">
            {{ title }}
          </UiHeading>
        </slot>
        <!-- @slot Use this slot to replace hint template. -->
        <slot
          name="hint"
          v-bind="{hint}"
        >
          <UiText
            tag="div"
            class="ui-question__hint"
          >
            {{ hint }}
          </UiText>
        </slot>
        <!-- @slot Use this slot to place content inside question. -->
        <slot />
      </div>
    </slot>
    <!-- @slot Use this slot to replace bottom template. -->
    <slot
      name="bottom"
      v-bind="{toBack, toNext, isAnswerAbove, invalid, translation}"
    >
      <div class="ui-question__bottom">
        <!-- @slot Use this slot to replace back template. -->
        <slot
          name="back"
          v-bind="{toBack, translation}"
        >
          <UiButton
            :to="toBack"
            class="ui-question__back ui-button--text ui-button--has-icon"
          >
            <UiIcon
              icon="chevronLeft"
              class="ui-button__icon"
            /> {{ translation.back }}
          </UiButton>
        </slot>
        <!-- @slot Use this slot to replace answer above template. -->
        <slot
          v-bind="{isAnswerAbove, translation}"
          name="answer-above"
        >
          <UiText
            v-if="isAnswerAbove"
            tag="div"
            class="ui-question__answer-above"
          >
            {{ translation.answerAbove }}
          </UiText>
        </slot>
        <!-- @slot Use this slot to replace next template. -->
        <slot
          v-bind="{isAnswerAbove, validNext, invalid, translation}"
          name="next"
        >
          <UiButton
            v-if="!isAnswerAbove"
            v-bind="validNext"
            class="ui-question__next"
            :class="{'ui-button--is-disabled': invalid}"
          >
            {{ translation.next }}
          </UiButton>
        </slot>
      </div>
    </slot>
  </UiContainer>
</template>

<script>
import { computed } from 'vue';

import UiText from '../../atoms/UiText/UiText.vue';
import UiContainer from '../../organisms/UiContainer/UiContainer.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';

export default {
  name: 'UiQuestion',
  components: {
    UiText,
    UiContainer,
    UiButton,
    UiIcon,
    UiHeading,
  },
  props: {
    /**
     * Use this props to set question title.
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Use this props to set hint for question.
     */
    hint: {
      type: String,
      default: '',
    },
    /**
     * Use this props to move the responsibility to move to the next screen to question content.
     */
    isAnswerAbove: {
      type: Boolean,
      default: false,
    },
    /**
     * Use this props to set route to back screen.
     */
    toBack: {
      type: [String, Object],
      default: '',
    },
    /**
     * Use this props to set route to next screen.
     */
    toNext: {
      type: [String, Object],
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
        answerAbove: 'Select an answer above',
      }),
    },
  },
  emits: ['has-error'],
  setup(props, { emit }) {
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
    return { validNext };
  },
};
</script>

<style lang="scss">
.ui-question {
  --container-padding: 0;

  display: flex;
  flex-direction: column;

  &__container {
    display: flex;
    flex: 1;
    flex-direction: var(--question-container-flex-direction, column);
    align-items: var(--question-container-align-items, flex-start);
    justify-content: var(--question-container-justify-content, center);
    padding: var(--question-container-padding, var(--space-16) var(--space-32));

    @media (min-width: 480px) {
      align-items: var(--question-container-align-items, center);
    }
  }

  &__title {
    margin: var(--question-title-margin, 0 0 var(--space-32) 0);
    font: var(--font-h2); // TODO: update UiHeading component
  }

  &__hint {
    margin: var(--question-hint-margin, 0 0 var(--space-32) 0);
    font: var(--question-hint-font, var(--font-body-2-comfortable-thick));
    color: var(--question-hint-color, var(--color-text-dimmed));
  }

  &__bottom {
    display: flex;
    align-items: var(--question-bottom-align-items, center);
    justify-content: var(--question-bottom-justify-content, space-between);
    padding: var(--question-bottom-padding, var(--space-16) var(--space-32));
    border: var(--question-bottom-border, solid var(--color-border-divider));
    border-width: var(--question-bottom-border-width, 1px 0 0 0);
  }

  &__answer-above {
    color: var(--question-answer-above-color, var(--color-text-dimmed));
  }
}
</style>
