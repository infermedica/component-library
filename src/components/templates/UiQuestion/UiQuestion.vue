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
              icon="infoOutlined"
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
        class="ui-question__feedback"
      >
        <UiAlert
          type="success"
          class="ui-alert--secondary"
        >
          {{ translation.issue.feedback }}
        </UiAlert>
        <UiButton
          v-bind="buttonSkipAttrs"
          class="ui-question__skip ui-button--text ui-button--has-icon"
        >
          {{ translation.issue.skip }}
          <UiIcon
            icon="chevronRight"
            class="ui-button__icon ui-button__icon--right"
          />
        </UiButton>
      </UiNotification>
    </slot>
  </div>
</template>

<script>
import UiAlert from '../../atoms/UiAlert/UiAlert.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiNotification from '../../molecules/UiNotification/UiNotification.vue';

export default {
  name: 'UiQuestion',
  components: {
    UiAlert,
    UiButton,
    UiHeading,
    UiIcon,
    UiNotification,
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
     * Use this props to set valid state of the question.
     */
    translation: {
      type: Object,
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
      type: Object,
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
      type: Object,
      default: () => ({}),
    },
    /**
     * Use this props to pass attrs for info UiButton
     */
    buttonInfoAttrs: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Use this props to pass attrs for why UiButton
     */
    buttonWhyAttrs: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Use this props to pass attrs for issue UiButton
     */
    buttonIssueAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss">
.ui-question {
  padding: var(--question-padding, 0 var(--space-20));

  @media (min-width: 768px) {
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

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      margin: var(--question-tablet-actions-bottom-margin, var(--space-32) 0 0 0);
    }
  }

  &__content {
    margin: var(--question-content-margin, var(--space-32) 0 0 0);

    @media (min-width: 768px) {
      margin: var(--question-tablet-content-margin, var(--space-32) 0 0 0);
    }
  }

  &__action {
    display: flex;
    align-items: center;
    margin: var(--question-action-margin, var(--space-20) 0 0 0);

    @media (min-width: 768px) {
      margin: var(--question-tablet-action-margin, 0);
    }

    &::before {
      @media (min-width: 768px) {
        flex: none;
        align-self: stretch;
        width: 1px;
        margin: var(--question-action-before-margin, 0 var(--space-12));
        content: "";
        background: var(--question-action-before-background, var(--color-border-divider));
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

    [dir=rtl] & {
      --alert-icon-margin: 0 0 0 var(--space-12);
    }
  }

  &__skip {
    margin: var(--space-4) 0 0 var(--space-36);

    [dir=rtl] & {
      margin: var(--space-4) var(--space-36) 0 0;
    }
  }
}
</style>
