import { ref } from 'vue';
import UiQuestion from '@/components/templates/UiQuestion/UiQuestion.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import UiMultipleAnswer from '@/components/organisms/UiMultipleAnswer/UiMultipleAnswer.vue';
import UiSimpleQuestion from '@/components/organisms/UiSimpleQuestion/UiSimpleQuestion.vue';
import { actions } from '@storybook/addon-actions';
import scss from './UiQuestion.stories.scss';
import docs from './UiQuestion.mdx';

const events = actions({
  onClickInfoButton: 'click:info-button',
  onClickWhyButton: 'click:why-button',
  onClickIssueButton: 'click:issue-button',
  onClickFeedbackButton: 'click:feedback-button',
});

export default {
  title: 'Templates/Question',
  component: UiQuestion,
  subcomponents: {
    UiButton,
    UiIcon,
    UiHeading,
  },
  args: {
    items: [],
    title: 'Do you have a sore throat?',
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
  parameters: { docs: { page: docs } },
};

export const AsMultipleAnswer = (args) => ({
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
});
AsMultipleAnswer.args = {
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
};
AsMultipleAnswer.decorators = [ (story) => ({
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
}) ];

export const WithoutSkipThisQuestion = (args) => ({
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
});
WithoutSkipThisQuestion.args = {
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
};
WithoutSkipThisQuestion.decorators = [ (story) => ({
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
}) ];

export const AsSimpleQuestion = (args) => ({
  components: {
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
    <UiSimpleQuestion
      v-model="modelValue"
      :items="items"
    />
  </UiQuestion>`,
});
AsSimpleQuestion.args = {
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
      label: 'Don\'t know',
      icon: 'dont-know',
    },
  ],
};
AsSimpleQuestion.decorators = [ (story) => ({
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
}) ];

export const WithTitleSlot = (args) => ({
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
});

export const WithInfoSlot = (args) => ({
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
});

export const WithActionsBottomSlot = (args) => ({
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
});

export const WithWhySlot = (args) => ({
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
});

export const WithIssueSlot = (args) => ({
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
});
