<template>
  <div class="ui-question">
    <!-- @slot Use this slot to replace title template. -->
    <slot
      name="title"
      v-bind="{
        title,
        headingTitleAttrs
      }"
    >
      <UiHeading
        v-if="title"
        v-bind="headingTitleAttrs"
        class="ui-question__title"
      >
        {{ title }}
      </UiHeading>
    </slot>
    <slot
      name="actions-top"
      v-bind="{
        settings: defaultProps.settings,
        translation: defaultProps.translation,
        buttonInfoAttrs,
        iconInfoAttrs: defaultProps.iconInfoAttrs,
      }"
    >
      <div
        v-if="defaultProps.settings.info"
        class="ui-question__actions-top"
      >
        <!-- @slot Use this slot to replace info template. -->
        <slot
          name="info"
          v-bind="{
            buttonInfoAttrs,
            settings: defaultProps.settings,
            translation: defaultProps.translation,
            iconInfoAttrs: defaultProps.iconInfoAttrs,
          }"
        >
          <UiButton
            v-if="defaultProps.settings.info"
            v-bind="buttonInfoAttrs"
            class="ui-question__info ui-button--text ui-button--small ui-button--has-icon"
          >
            <UiIcon
              v-bind="defaultProps.iconInfoAttrs"
              class="ui-button__icon"
            />
            {{ defaultProps.translation.info }}
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
      v-bind="{
        hasActionsBottom,
        buttonWhyAttrs,
        buttonIssueAttrs,
        settings: defaultProps.settings,
        translation: defaultProps.translation,
      }"
    >
      <div
        v-if="hasActionsBottom"
        class="ui-question__actions-bottom"
      >
        <!-- @slot Use this slot to replace why template. -->
        <slot
          name="why"
          v-bind="{
            settings: defaultProps.settings,
            translation: defaultProps.translation,
            buttonWhyAttrs,
          }"
        >
          <div
            v-if="defaultProps.settings.why"
            class="ui-question__action"
          >
            <UiButton
              v-bind="buttonWhyAttrs"
              class="ui-button--small ui-button--text"
            >
              {{ defaultProps.translation.why }}
            </UiButton>
          </div>
        </slot>
        <!-- @slot Use this slot to replace issue template. -->
        <slot
          name="issue"
          v-bind="{
            buttonIssueAttrs,
            settings:defaultProps.settings,
            translation: defaultProps.translation,
          }"
        >
          <div
            v-if="defaultProps.settings.issue.action"
            class="ui-question__action"
          >
            <UiButton
              v-bind="buttonIssueAttrs"
              class="ui-button--small ui-button--text"
            >
              {{ defaultProps.translation.issue.action }}
            </UiButton>
          </div>
        </slot>
      </div>
    </slot>
    <!-- @slot Use this slot to replace feedback template. -->
    <slot
      name="feedback"
      v-bind="{
        hasFeedback,
        settings: defaultProps.settings,
        translation: defaultProps.translation,
        notificationFeedbackAttrs: defaultProps.notificationFeedbackAttrs,
      }"
    >
      <UiNotification
        v-if="hasFeedback"
        v-bind="defaultProps.notificationFeedbackAttrs"
        type="success"
        :translation="{ action: defaultProps.translation.issue.skip }"
        class="ui-question__feedback"
      >
        {{ defaultProps.translation.issue.feedback }}
      </UiNotification>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { NotificationType } from '@/components/molecules/UiNotification/UiNotification.vue';
import type { PropsAttrs } from '../../../types/attrs';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiNotification from '../../molecules/UiNotification/UiNotification.vue';
import type {
  Icon,
  IconAsString,
} from '../../../types/icon';

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
export interface QuestionSettings {
  info: boolean;
  why: boolean;
  issue: {
    action: boolean;
    feedback: boolean;
    skip: boolean;
  };
  [key: string]: unknown;
}

const props = defineProps({
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
  settings: {
    type: Object as PropType<QuestionSettings>,
    default: () => ({
      info: false,
      why: false,
      issue: {
        action: false,
        feedback: false,
        skip: true,
      },
    }),
  },
  /**
   * Use this props to pass attrs for title UiHeading
   */
  headingTitleAttrs: {
    type: Object,
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
   * Use this props to pass attrs for info UiIcon
   */
  iconInfoAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for why UiButton
   */
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
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for feedback UiNotification
   */
  notificationFeedbackAttrs: {
    type: Object,
    default: () => ({}),
  },
});
const buttonActionAttrs = computed(() => {
  if (typeof props.settings?.issue?.skip === 'boolean') {
    if (!props.settings?.issue?.skip) {
      return {};
    }
  }
  return props.notificationFeedbackAttrs?.buttonActionAttrs;
});
const defaultProps = computed(() => ({
  translation: {
    ...{
      info: 'What does it mean?',
      why: 'Why am I being asked this?',
    },
    ...props.translation,
    issue: {
      ...{
        action: 'Report an issue with this question',
        feedback: 'Thank you. We’ll review this question as soon as possible.',
        skip: 'Skip this question',
      },
      ...props.translation?.issue,
    },
  } as QuestionTranslation,
  settings: {
    ...{
      info: false,
      why: false,
    },
    ...props.settings,
    issue: {
      ...{
        action: false,
        feedback: false,
        skip: true,
      },
      ...props.settings?.issue,
    },
  } as QuestionSettings,
  iconInfoAttrs: {
    icon: 'info' as Icon,
    ...props.iconInfoAttrs,
  },
  notificationFeedbackAttrs: {
    type: 'success' as NotificationType,
    ...props.notificationFeedbackAttrs,
    buttonActionAttrs: buttonActionAttrs.value,
  },
}));
const hasActionsBottom = computed(() => (
  defaultProps.value.settings.why
    || defaultProps.value.settings.issue
));
const hasFeedback = computed(() => (
  defaultProps.value.settings.issue.action
    && defaultProps.value.settings.issue.feedback
));
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-question {
  $this: &;
  $element: question;

  &__actions-top {
    margin: functions.var($element + "-actions-top", margin, var(--space-12) 0 0 0);
  }

  &__content {
    margin: functions.var($element + "-content", margin, var(--space-32) 0 0 0);

    @include mixins.from-tablet {
      margin: functions.var($element + "-tablet-content", margin, var(--space-48) 0 0 0);
    }
  }

  &__actions-bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: functions.var($element + "-actions-bottom", margin, var(--space-32) 0 0 0);

    @include mixins.from-tablet {
      flex-direction: row;
      align-items: flex-start;
      margin: functions.var($element + "-tablet-actions-bottom", margin, var(--space-48) 0 0 0);
    }
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: functions.var($element + "-action", margin, var(--space-20) 0 0 0);

    @include mixins.from-tablet {
      margin: functions.var($element + "-tablet-action", margin, 0);

      &::before {
        width: functions.var($element + "-action-indicator", width, 1px);
        align-self: stretch;
        margin: functions.var($element + "-action-indicator", margin, 0 var(--space-16));
        background: functions.var($element + "-action-indicator", background, var(--color-border-divider));
        content: "";
      }
    }

    &:first-of-type {
      margin: 0;

      @include mixins.from-tablet {
        &::before {
          content: unset;
        }
      }
    }
  }

  &__feedback {
    margin: functions.var($element + "-actions-top", margin, var(--space-24) 0 0 0);
  }
}
</style>
