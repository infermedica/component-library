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
    <!-- @slot Use this slot to replace description template. -->
    <slot
      name="description"
      v-bind="{
        description,
        headingDescriptionAttrs
      }"
    >
      <UiText
        v-if="description"
        v-bind="headingDescriptionAttrs"
        class="ui-question__description"
      >
        {{ description }}
      </UiText>
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
import UiButton from '../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../atoms/UiButton/UiButton.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import type { HeadingAttrsProps } from '../../atoms/UiHeading/UiHeading.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';
import UiNotification from '../../molecules/UiNotification/UiNotification.vue';
import type {
  NotificationProps,
  NotificationAttrsProps,
} from '../../molecules/UiNotification/UiNotification.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type { TextAttrsProps } from '../../atoms/UiText/UiText.vue';
import type { Icon } from '../../../types';

export interface QuestionTranslationSetting<T> {
  info?: T;
  why?: T;
  issue?: {
    action?: T;
    feedback?: T;
    skip?: T;
  };
}
export interface QuestionProps {
  /**
   * Use this props to set question title.
   */
  title?: string;
  /**
   * Use this props to set description title.
   */
  description?: string;
  /**
   * Use this props to set valid state of the question.
   */
  translation?: QuestionTranslationSetting<string>;
  /**
   * Use this props to setup question.
   */
  settings?: QuestionTranslationSetting<boolean>;
  /**
   * Use this props to pass attrs for title UiHeading
   */
  headingTitleAttrs?: HeadingAttrsProps;
  /**
   * Use this props to pass attrs for description UiText
   */
  headingDescriptionAttrs?: TextAttrsProps;
  /**
   * Use this props to pass attrs for info UiButton
   */
  buttonInfoAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for info UiIcon
   */
  iconInfoAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for why UiButton
   */
  buttonWhyAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for issue UiButton
   */
  buttonIssueAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for feedback UiNotification
   */
  notificationFeedbackAttrs?: NotificationAttrsProps;
}

const props = withDefaults(defineProps<QuestionProps>(), {
  title: '',
  description: '',
  translation: () => ({
    info: 'What does it mean?',
    why: 'Why am I being asked this?',
    issue: {
      action: 'Report an issue with this question',
      feedback: 'Thank you. We’ll review this question as soon as possible.',
      skip: 'Skip this question',
    },
  }),
  settings: () => ({
    info: false,
    why: false,
    issue: {
      action: false,
      feedback: false,
      skip: true,
    },
  }),
  headingTitleAttrs: () => ({}),
  headingDescriptionAttrs: () => ({}),
  buttonInfoAttrs: () => ({}),
  iconInfoAttrs: () => ({ icon: 'info' }),
  buttonWhyAttrs: () => ({}),
  buttonIssueAttrs: () => ({}),
  notificationFeedbackAttrs: () => ({ type: 'success' }),
});

const defaultSettingsIssue = computed(() => ({
  feedback: false,
  skip: true,
  action: false,
  ...props.settings?.issue,
}));
const defaultButtonActionAttrs = computed(() => (defaultSettingsIssue.value.skip
  ? props.notificationFeedbackAttrs?.buttonActionAttrs
  : {}));
const defaultProps = computed(() => {
  const icon: Icon = 'info';
  const type: NotificationProps['type'] = 'success';
  return {
    translation: {
      info: 'What does it mean?',
      why: 'Why am I being asked this?',
      ...props.translation,
      issue: {
        action: 'Report an issue with this question',
        feedback: 'Thank you. We’ll review this question as soon as possible.',
        skip: 'Skip this question',
        ...props.translation?.issue,
      },
    },
    settings: {
      info: false,
      why: false,
      ...props.settings,
      issue: defaultSettingsIssue.value,
    },
    iconInfoAttrs: {
      icon,
      ...props.iconInfoAttrs,
    },
    notificationFeedbackAttrs: {
      type,
      ...props.notificationFeedbackAttrs,
      buttonActionAttrs: defaultButtonActionAttrs.value,
    },
  };
});
const hasActionsBottom = computed(() => (
  defaultProps.value.settings.why
    || defaultProps.value.settings.issue.action
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

  &__description {
    @include mixins.use-logical($element + "-description", margin, var(--space-12) 0 0 0);
  }

  &__actions-top {
    @include mixins.use-logical($element + "-actions-top", margin, var(--space-12) 0 0 0);
  }

  &__content {
    @include mixins.use-logical($element + "-content", margin, var(--space-32) 0 0 0);

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-content", margin, var(--space-32) 0 0 0);
    }
  }

  &__actions-bottom {
    @include mixins.use-logical($element + "-actions-bottom", margin, var(--space-24) 0 0 0);

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-actions-bottom", margin, var(--space-32) 0 0 0);

      flex-direction: row;
      align-items: flex-start;
    }
  }

  &__action {
    @include mixins.use-logical($element + "-action", margin, var(--space-12) 0 0 0);

    display: flex;
    align-items: center;
    justify-content: flex-start;

    @include mixins.from-tablet {
      @include mixins.use-logical($element + "-tablet-action", margin, 0 0 0 var(--space-24));
    }

    &:first-of-type {
      margin: 0;
    }
  }

  &__feedback {
    @include mixins.use-logical($element + "-actions-top", margin, var(--space-24) 0 0 0);
  }
}
</style>
