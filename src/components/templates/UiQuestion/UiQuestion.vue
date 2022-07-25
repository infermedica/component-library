<template>
  <div class="ui-question">
    <!-- @slot Use this slot to replace title template. -->
    <slot
      name="title"
      v-bind="{title}"
    >
      <UiHeading
        v-if="title"
        class="ui-question__title"
      >
        {{ title }}
      </UiHeading>
    </slot>
    <slot
      name="actions-top"
      v-bind="{buttonInfoAttrs, options, translation}"
    >
      <div
        v-if="options.info"
        class="ui-question__actions-top"
      >
        <!-- @slot Use this slot to replace info template. -->
        <slot
          name="info"
          v-bind="{buttonInfoAttrs, options, translation}"
        >
          <UiButton
            v-if="options.info"
            v-bind="buttonInfoAttrs"
            class="ui-question__info ui-button--text ui-button--small ui-button--has-icon"
          >
            <UiIcon
              icon="info"
              class="ui-button__icon"
            />
            {{ translation.info }}
          </UiButton>
        </slot>
      </div>
    </slot>
    <div class="ui-question__content">
      <!-- @slot Use this slot to place content inside question. -->
      <slot />
    </div>
    <!-- @slot Use this slot to replace actions template. -->
    <slot
      name="actions-bottom"
      v-bind="{buttonWhyAttrs, buttonIssueAttrs, options, translation}"
    >
      <div
        v-if="options.why || options.issue"
        class="ui-question__actions-bottom"
      >
        <!-- @slot Use this slot to replace why template. -->
        <slot
          name="why"
          v-bind="{options, translation}"
        >
          <div
            v-if="options.why"
            class="ui-question__action"
          >
            <UiButton
              v-bind="buttonWhyAttrs"
              class="ui-button--small ui-button--text"
            >
              {{ translation.why }}
            </UiButton>
          </div>
        </slot>
        <!-- @slot Use this slot to replace issue template. -->
        <slot
          name="issue"
          v-bind="{buttonIssueAttrs, options, translation}"
        >
          <div
            v-if="options.issue"
            class="ui-question__action"
          >
            <UiButton
              v-bind="buttonIssueAttrs"
              class="ui-button--small ui-button--text"
            >
              {{ translation.issue.action }}
            </UiButton>
          </div>
        </slot>
      </div>
    </slot>
    <!-- @slot Use this slot to replace feedback template. -->
    <slot
      name="feedback"
      v-bind="{options, translation, buttonSkipAttrs}"
    >
      <UiNotification
        v-if="options.issue?.feedback"
        type="success"
        :translation="{
          action: translation.issue.skip
        }"
        :button-action-attrs="buttonSkipAttrs"
        class="ui-question__feedback"
      >
        {{ translation.issue.feedback }}
      </UiNotification>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { PropsAttrs } from '../../../types/attrs';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiNotification from '../../molecules/UiNotification/UiNotification.vue';

export interface QuestionTranslation {
  info: string;
  why: string;
  issue: {
    action: string;
    feedback: string;
    skip: string;
  };
  [key: string] : unknown;
}
export interface QuestionOptions {
  info: boolean;
  why: boolean;
  issue: {
    feedback: boolean;
  };
  [key: string]: unknown;
}
defineProps({
  /**
   * Use this props to set question title.
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set valid state of the question.
   */
  translation: {
    type: Object as PropType<QuestionTranslation>,
    default: () => ({
      info: 'What does it mean?',
      why: 'Why am I being asked this?',
      issue: {
        action: 'Report an issue with this question',
        feedback: 'Thank you. We’ll review this question as soon as possible.',
        skip: 'Skip this question',
      },
    }),
  },
  /**
   * Use this props to setup question.
   */
  options: {
    type: Object as PropType<QuestionOptions>,
    default: () => ({
      info: true,
      why: true,
      issue: {
        feedback: true,
      },
    }),
  },
  /**
   * Use this props to pass attrs for question skip UiButton
   */
  buttonSkipAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for info UiButton
   */
  buttonInfoAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for why UiButton
   */
  buttonWhyAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for issue UiButton
   */
  buttonIssueAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-question {
  padding: var(--question-padding, 0 var(--space-20));

  @include from-tablet {
    padding: var(--question-tablet-padding, var(--space-16) var(--space-48));
  }

  &__title {
    background: inherit;
  }

  &__actions-top {
    display: flex;
    margin: var(--question-actions-top-margin, var(--space-12) 0 0 0);
  }

  &__actions-bottom {
    display: flex;
    flex-direction: column;
    margin: var(--question-actions-bottom-margin, var(--space-32) 0 0 0);

    @include from-tablet {
      flex-direction: row;
      align-items: center;
      margin: var(--question-tablet-actions-bottom-margin, var(--space-32) 0 0 0);
    }
  }

  &__content {
    margin: var(--question-content-margin, var(--space-32) 0 0 0);

    @include from-tablet {
      margin: var(--question-tablet-content-margin, var(--space-32) 0 0 0);
    }
  }

  &__action {
    display: flex;
    align-items: center;
    margin: var(--question-action-margin, var(--space-20) 0 0 0);

    @include from-tablet {
      margin: var(--question-tablet-action-margin, 0);
    }

    &::before {
      @include from-tablet {
        width: 1px;
        flex: none;
        align-self: stretch;
        margin: var(--question-action-before-margin, 0 var(--space-12));
        background: var(--question-action-before-background, var(--color-border-divider));
        content: "";
      }
    }

    &:first-child {
      margin: 0;

      &::before {
        content: none;
      }
    }
  }

  &__feedback {
    --alert-icon-margin: 0 var(--space-12) 0 0;

    align-items: flex-start;
    margin: var(--space-24) 0 0 0;

    [dir="rtl"] & {
      --alert-icon-margin: 0 0 0 var(--space-12);
    }
  }
}
</style>
