import { ref } from 'vue';
import UiQuestion from '@/components/templates/UiQuestion/UiQuestion.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import UiMultipleAnswer from '@/components/organisms/UiMultipleAnswer/UiMultipleAnswer.vue';
import UiSimpleQuestion from '@/components/organisms/UiSimpleQuestion/UiSimpleQuestion.vue';
import { actions } from '@storybook/addon-actions';
import './UiQuestion.stories.scss';

const events = actions({
  onClickInfoButton: 'click:info-button',
  onClickWhyButton: 'click:why-button',
  onClickIssueButton: 'click:issue-button',
  onClickFeedbackButton: 'click:feedback-button',
});

export default {
  title: 'Templates/Question',
  component: UiQuestion,
  args: {
    items: [],
    title: 'Do you have a sore throat?',
    description: 'Please select the region you live in and places you.ve traveled to in the last 2 months.',
    translation: {
      info: 'What does it mean?',
      why: 'Why am I being asked this?',
      issue: {
        action: 'Report an issue with this question',
        feedback: 'Thank you. We’ll review this question as soon as possible.',
        skip: 'Skip this question',
      },
    },
    settings: {
      info: true,
      why: true,
      issue: {
        action: true,
        feedback: true,
        skip: true,
      },
    },
    headingTitleAttrs: { 'data-test': 'title-heading' },
    buttonInfoAttrs: {
      'data-test': 'info-button',
      onClick: events.onClickInfoButton,
    },
    iconInfoAttrs: { 'data-test': 'info-icon' },
    buttonWhyAttrs: {
      'data-test': 'why-button',
      onClick: events.onClickWhyButton,
    },
    buttonIssueAttrs: {
      'data-test': 'issue-button',
      onClick: events.onClickIssueButton,
    },
    notificationFeedbackAttrs: { buttonActionAttrs: { onClick: events.onClickFeedbackButton } },
    titleSlot: null,
  },
  argTypes: {
    items: {
      description: 'Use this control to set the items.',
      table: { category: 'stories controls' },
      control: 'array',
    },
    title: {
      description: 'Use this props to set question title.',
      table: { category: 'props' },
      control: 'text',
    },
    titleSlot: {
      name: 'title',
      description: 'Use this slot to replace title template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
      control: 'object',
    },
  },
  parameters: {
    cssProperties: {
      '--question-actions-top-margin-block':
        'var(--question-actions-top-margin-block-start, var(--space-24)) var(--question-actions-top-margin-block-end, 0)',
      '--question-actions-top-margin-inline':
        'var(--question-actions-top-margin-inline-start, 0) var(--question-actions-top-margin-inline-end, 0)',
      '--question-content-margin-block':
        'var(--question-content-margin-block-start, var(--space-32)) var(--question-content-margin-block-end, 0)',
      '--question-content-margin-inline':
        'var(--question-content-margin-inline-start, 0) var(--question-content-margin-inline-end, 0)',
      '--question-tablet-content-margin-block':
        'var(--question-tablet-content-margin-block-start, var(--space-48)) var(--question-tablet-content-margin-block-end, 0)',
      '--question-tablet-content-margin-inline':
        'var(--question-tablet-content-margin-inline-start, 0) var(--question-tablet-content-margin-inline-end, 0)',
      '--question-actions-bottom-margin-block':
        'var(--question-actions-bottom-margin-block-start, var(--space-32)) var(--question-actions-bottom-margin-block-end, 0)',
      '--question-actions-bottom-margin-inline':
        'var(--question-actions-bottom-margin-inline-start, 0) var(--question-actions-bottom-margin-inline-end, 0)',
      '--question-tablet-actions-bottom-margin-block':
        'var(--question-tablet-actions-bottom-margin-block-start, var(--space-48)) var(--question-tablet-actions-bottom-margin-block-end, 0)',
      '--question-tablet-actions-bottom-margin-inline':
        'var(--question-tablet-actions-bottom-margin-inline-start, 0) var(--question-tablet-actions-bottom-margin-inline-end, 0)',
      '--question-action-margin-block':
        'var(--question-action-margin-block-start, var(--space-20)) var(--question-action-margin-block-end, 0)',
      '--question-action-margin-inline':
        'var(--question-action-margin-inline-start, 0) var(--question-action-margin-inline-end, 0)',
      '--question-tablet-action-margin-block':
        'var(--question-tablet-action-margin-block-start, 0) var(--question-tablet-action-margin-block-end, 0)',
      '--question-tablet-action-margin-inline':
        'var(--question-tablet-action-margin-inline-start, 0) var(--question-tablet-action-margin-inline-end, 0)',
      '--question-action-indicator-margin-block':
        'var(--question-action-indicator-margin-block-start, 0) var(--question-action-indicator-margin-block-end, 0)',
      '--question-action-indicator-margin-inline':
        'var(--question-action-indicator-margin-inline-start, var(--space-16)) var(--question-action-indicator-margin-inline-end, var(--space-16))',
      '--question-action-indicator-width': '1px',
      '--question-action-indicator-background': 'var(--color-border-divider)',
    },
  },
};

export const AsMultipleAnswer = {
  render: (args) => ({
    components: {
      UiQuestion,
      UiMultipleAnswer,
    },
    setup() {
      const modelValue = ref('');
      return {
        ...args,
        modelValue,
      };
    },
    template: `<UiQuestion
      :title="title"
      :description="description"
      :translation="translation"
      :settings="settings"
      :heading-title-attrs="headingTitleAttrs"
      :button-info-attrs="buttonInfoAttrs"
      :icon-info-attrs="iconInfoAttrs"
      :button-why-attrs="buttonWhyAttrs"
      :button-issue-attrs="buttonIssueAttrs"
      :notification-feedback-attrs="notificationFeedbackAttrs"
      class="question-as-multiple-answer"
    >
      <UiMultipleAnswer
        v-model="modelValue"
        name="group-single"
        :items="items"
        hint="Select one answer"
      />
    </UiQuestion>`,
  }),

  args: {
    items: [
      {
        label: 'Fatigue',
        value: 'fatigue',
        buttonInfoAttrs: { ariaLabel: 'how to check it?' },
        iconInfoAttrs: { 'data-testid': 'info-icon' },
        textLabelAttrs: { 'data-testid': 'label-text' },
      },
      {
        label: 'Fever',
        value: 'fever',
      },
      {
        label: 'Illusion of surrounding objects being bigger or smaller than they actually are',
        value: 'illusion',
        buttonInfoAttrs: { ariaLabel: 'what does it mean?' },
        iconInfoAttrs: { 'data-testid': 'info-icon' },
        textLabelAttrs: { 'data-testid': 'label-text' },
      },
    ],
  },

  decorators: [ (story) => ({
    components: {
      story,
      UiControls,
    },
    template: `<UiControls
      :to-next="{path: '/next'}"
      :to-back="{path: '/back'}"
      class="max-w-195 min-h-135 w-full"
    >
      <story/>
    </UiControls>`,
  }) ],
};

export const WithoutSkipThisQuestion = {
  render: (args) => ({
    components: {
      UiQuestion,
      UiMultipleAnswer,
    },
    setup() {
      const modelValue = ref('');
      return {
        ...args,
        modelValue,
      };
    },
    template: `<UiQuestion
      :title="title"
      :translation="translation"
      :settings="settings"
      :heading-title-attrs="headingTitleAttrs"
      :button-info-attrs="buttonInfoAttrs"
      :icon-info-attrs="iconInfoAttrs"
      :button-why-attrs="buttonWhyAttrs"
      :button-issue-attrs="buttonIssueAttrs"
      :notification-feedback-attrs="notificationFeedbackAttrs"
      class="question-as-multiple-answer"
    >
      <UiMultipleAnswer
        v-model="modelValue"
        name="group-single"
        :items="items"
      />
    </UiQuestion>`,
  }),

  args: {
    items: [
      {
        label: 'Fatigue',
        value: 'fatigue',
        buttonInfoAttrs: { ariaLabel: 'how to check it?' },
        iconInfoAttrs: { 'data-testid': 'info-icon' },
        textLabelAttrs: { 'data-testid': 'label-text' },
      },
      {
        label: 'Fever',
        value: 'fever',
      },
      {
        label: 'Illusion of surrounding objects being bigger or smaller than they actually are',
        value: 'illusion',
        buttonInfoAttrs: { ariaLabel: 'what does it mean?' },
        iconInfoAttrs: { 'data-testid': 'info-icon' },
        textLabelAttrs: { 'data-testid': 'label-text' },
      },
    ],
    settings: {
      info: true,
      why: true,
      issue: {
        action: true,
        feedback: true,
        skip: false,
      },
    },
  },

  decorators: [ (story) => ({
    components: {
      story,
      UiControls,
    },
    template: `<UiControls
      :to-next="{path: '/next'}"
      :to-back="{path: '/back'}"
      class="max-w-195 min-h-135 w-full"
    >
      <story/>
    </UiControls>`,
  }) ],
};

export const AsSimpleQuestion = {
  render: (args) => ({
    components: {
      UiHeading,
      UiQuestion,
      UiSimpleQuestion,
    },
    setup() {
      const modelValue = ref('');
      return {
        ...args,
        modelValue,
      };
    },
    template: `<UiQuestion
      :title="title"
      :translation="translation"
      :settings="settings"
      :heading-title-attrs="headingTitleAttrs"
      :button-info-attrs="buttonInfoAttrs"
      :icon-info-attrs="iconInfoAttrs"
      :button-why-attrs="buttonWhyAttrs"
      :button-issue-attrs="buttonIssueAttrs"
      :notification-feedback-attrs="notificationFeedbackAttrs"
    >
    <template #title>
      <UiHeading id="question-heading">{{ title }}</UiHeading>
    </template>
      <UiSimpleQuestion
        v-model="modelValue"
        :items="items"
        aria-labelledby="question-heading"
      />
    </UiQuestion>`,
  }),

  args: {
    items: [
      {
        value: 'present',
        label: 'Yes',
        icon: 'yes',
      },
      {
        value: 'absent',
        label: 'Male',
        icon: 'no',
      },
      {
        value: 'unknown',
        label: "Don't know",
        icon: 'dont-know',
      },
    ],
  },

  decorators: [ (story) => ({
    components: {
      story,
      UiControls,
    },
    template: `<UiControls
      :to-next="{path: '/next'}"
      :to-back="{path: '/back'}"
      class="max-w-195 min-h-135 w-full"
    >
      <story/>
    </UiControls>`,
  }) ],
};

export const WithTitleSlot = {
  render: (args) => ({
    components: {
      UiQuestion,
      UiHeading,
    },
    setup() {
      return { ...args };
    },
    template: `<UiQuestion
      :title="title"
      :translation="translation"
      :settings="settings"
      :heading-title-attrs="headingTitleAttrs"
      :button-info-attrs="buttonInfoAttrs"
      :icon-info-attrs="iconInfoAttrs"
      :button-why-attrs="buttonWhyAttrs"
      :button-issue-attrs="buttonIssueAttrs"
      :notification-feedback-attrs="notificationFeedbackAttrs"
    >
      <template #title="{
        title,
        headingTitleAttrs,
      }">
        <UiHeading
          v-if="title"
          v-bind="headingTitleAttrs"
          class="ui-question__title"
        >
          {{ title }}
        </UiHeading>
      </template>
    </UiQuestion>`,
  }),
};

export const WithInfoSlot = {
  render: (args) => ({
    components: {
      UiQuestion,
      UiButton,
      UiIcon,
    },
    setup() {
      return { ...args };
    },
    template: `<UiQuestion
      :title="title"
      :translation="translation"
      :settings="settings"
      :heading-title-attrs="headingTitleAttrs"
      :button-info-attrs="buttonInfoAttrs"
      :icon-info-attrs="iconInfoAttrs"
      :button-why-attrs="buttonWhyAttrs"
      :button-issue-attrs="buttonIssueAttrs"
      :notification-feedback-attrs="notificationFeedbackAttrs"
    >
      <template #info="{
        buttonInfoAttrs,
        settings,
        translation,
        iconInfoAttrs,
      }">
        <UiButton
          v-if="settings.info"
          v-bind="buttonInfoAttrs"
          class="ui-question__info ui-button--text ui-button--small ui-button--has-icon"
        >
          <UiIcon
            v-bind="iconInfoAttrs"
            class="ui-button__icon"
          /> {{ translation.info }}
        </UiButton>
      </template>
    </UiQuestion>`,
  }),
};

export const WithActionsBottomSlot = {
  render: (args) => ({
    components: {
      UiQuestion,
      UiButton,
    },
    setup() {
      return { ...args };
    },
    template: `<UiQuestion
      :title="title"
      :translation="translation"
      :settings="settings"
      :heading-title-attrs="headingTitleAttrs"
      :button-info-attrs="buttonInfoAttrs"
      :icon-info-attrs="iconInfoAttrs"
      :button-why-attrs="buttonWhyAttrs"
      :button-issue-attrs="buttonIssueAttrs"
      :notification-feedback-attrs="notificationFeedbackAttrs"
    >
      <template #actions-bottom="{
        hasActionsBottom,
        buttonWhyAttrs,
        buttonIssueAttrs,
        settings,
        translation,
      }">
        <div
          v-if="hasActionsBottom"
          class="ui-question__actions-bottom"
        >
          <div
            v-if="settings.why"
            class="ui-question__action"
          >
          <UiButton
              v-bind="buttonWhyAttrs"
              class="ui-button--small ui-button--text"
            >
              {{ translation.why }}
            </UiButton>
          </div>
          <div
            v-if="settings.issue"
            class="ui-question__action"
          >
            <UiButton
              v-bind="buttonIssueAttrs"
              class="ui-button--small ui-button--text"
            >
              {{ translation.issue.action }}
            </UiButton>
          </div>
        </div>
      </template>
    </UiQuestion>`,
  }),
};

export const WithWhySlot = {
  render: (args) => ({
    components: {
      UiQuestion,
      UiButton,
    },
    setup() {
      return { ...args };
    },
    template: `<UiQuestion
      :title="title"
      :translation="translation"
      :settings="settings"
      :heading-title-attrs="headingTitleAttrs"
      :button-info-attrs="buttonInfoAttrs"
      :icon-info-attrs="iconInfoAttrs"
      :button-why-attrs="buttonWhyAttrs"
      :button-issue-attrs="buttonIssueAttrs"
      :notification-feedback-attrs="notificationFeedbackAttrs"
    >
      <template #why="{
        settings,
        translation,
        buttonWhyAttrs,
      }">
        <div
          v-if="settings.why"
          class="ui-question__action"
        >
          <UiButton
            v-bind="buttonWhyAttrs"
            class="ui-button--small ui-button--text"
          >
            {{ translation.why }}
          </UiButton>
        </div>
      </template>
    </UiQuestion>`,
  }),
};

export const WithIssueSlot = {
  render: (args) => ({
    components: {
      UiQuestion,
      UiButton,
    },
    setup() {
      return { ...args };
    },
    template: `<UiQuestion
      :title="title"
      :translation="translation"
      :settings="settings"
      :heading-title-attrs="headingTitleAttrs"
      :button-info-attrs="buttonInfoAttrs"
      :icon-info-attrs="iconInfoAttrs"
      :button-why-attrs="buttonWhyAttrs"
      :button-issue-attrs="buttonIssueAttrs"
      :notification-feedback-attrs="notificationFeedbackAttrs"
    >
      <template #issue="{
        buttonIssueAttrs,
        settings,
        translation,
      }">
        <div
          v-if="settings.issue"
          class="ui-question__action"
        >
          <UiButton
            v-bind="buttonIssueAttrs"
            class="ui-button--small ui-button--text"
          >
            {{ translation.issue.action }}
          </UiButton>
        </div>
      </template>
    </UiQuestion>`,
  }),
};
