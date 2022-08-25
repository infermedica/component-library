import { ref } from 'vue';
import UiQuestion from '@/components/templates/UiQuestion/UiQuestion.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import UiMultipleAnswer from '@/components/organisms/UiMultipleAnswer/UiMultipleAnswer.vue';
import UiSimpleQuestion from '@/components/organisms/UiSimpleQuestion/UiSimpleQuestion.vue';

export default {
  title: 'Templates/Question',
  component: UiQuestion,
  subcomponents: { UiButton, UiIcon, UiHeading },
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
    options: {
      info: true,
      why: true,
      issue: {
        feedback: true,
      },
    },
    buttonSkipAttrs: {
      to: { path: '/' },
      translation: {
        action: 'Skip this question',
      },
    },
    buttonInfoAttrs: {
      to: { path: '/' },
    },
    buttonWhyAttrs: {
      to: { path: '/' },
    },
    buttonIssueAttrs: {
      to: { path: '/' },
    },
    titleSlot: null,
  },
  argTypes: {
    items: {
      description: 'Use this control to set the items.',
      table: {
        category: 'stories controls',
      },
      control: 'array',
    },
    title: {
      description: 'Use this props to set question title.',
      table: {
        category: 'props',
      },
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
};

export const AsMultipleAnswer = (args) => ({
  components: { UiQuestion, UiMultipleAnswer },
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
    :options="options"
    :button-skip-attrs="buttonSkipAttrs"
    :button-info-attrs="buttonInfoAttrs"
    :button-why-attrs="buttonWhyAttrs"
    :button-issue-attrs="buttonIssueAttrs"
    :style="{
      '--question-tablet-content-margin': 'var(--space-32) 0 0 0',
      '--question-tablet-actions-bottom-margin': 'var(--space-32) 0 0 0',
    }"
  >
    <UiMultipleAnswer
      v-model="modelValue"
      name="group-single"
      :choices="items"
    />
  </UiQuestion>`,
});
AsMultipleAnswer.args = {
  items: [
    {
      id: 's_1907',
      name: 'Seconds to minutes',
      buttonInfoAttrs: null,
    },
    {
      id: 's_1868',
      name: 'A few minutes to 4 hours',
      buttonInfoAttrs: {
        'aria-label': 'what does it mean?',
      },
    },
    {
      id: 's_1870',
      name: '4 hours to 3 days',
      buttonInfoAttrs: null,
    },
  ],
  translation: {
    info: 'What does it mean?',
    why: 'Why am I being asked this?',
    issue: {
      action: 'Report an issue with this question',
      feedback: 'Thank you. We’ll review this question as soon as possible.',
      skip: 'Skip this question',
    },
    back: 'Back',
    next: 'Next',
  },
};
AsMultipleAnswer.decorators = [(story) => ({
  components: { story, UiControls },
  template: `<UiControls
      :to-next="{path: '/next'}"
      :to-back="{path: '/back'}"
      :style="{
      width: '100%',
      'max-width': '780px',
      'min-height': '540px',
    }"
  >
    <story/>
  </UiControls>`,
})];

export const AsSimpleQuestion = (args) => ({
  components: { UiQuestion, UiSimpleQuestion },
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
    :options="options"
    :button-skip-attrs="buttonSkipAttrs"
    :button-info-attrs="buttonInfoAttrs"
    :button-why-attrs="buttonWhyAttrs"
    :button-issue-attrs="buttonIssueAttrs"
  >
    <UiSimpleQuestion
      v-model="modelValue"
      :options="items"
    />
  </UiQuestion>`,
});
AsSimpleQuestion.args = {
  items: [
    {
      value: 'present',
      label: 'Yes',
      iconAttrs: {
        icon: 'yes',
      },
    },
    {
      value: 'absent',
      label: 'Male',
      iconAttrs: {
        icon: 'no',
      },
    },
    {
      value: 'unknown',
      label: 'Don\'t know',
      iconAttrs: {
        icon: 'dont-know',
      },
    },
  ],
  translation: {
    info: 'What does it mean?',
    why: 'Why am I being asked this?',
    issue: {
      action: 'Report an issue with this question',
      feedback: 'Thank you. We’ll review this question as soon as possible.',
      skip: 'Skip this question',
    },
    back: 'Back',
    next: 'Next',
    action: 'Skip this question',
  },
};
AsSimpleQuestion.decorators = [(story) => ({
  components: { story, UiControls },
  template: `<UiControls
      :to-next="{path: '/next'}"
      :to-back="{path: '/back'}"
      :style="{
      width: '100%',
      'max-width': '780px',
      'min-height': '540px',
    }"
  >
    <story/>
  </UiControls>`,
})];

export const WithTitleSlot = (args) => ({
  components: { UiQuestion, UiHeading },
  setup() {
    return { ...args };
  },
  template: `<UiQuestion
    :title="title"
    :translation="translation"
    :options="options"
    :buttons-skip-attrs="buttonSkipAttrs"
    :button-info-attrs="buttonInfoAttrs"
    :button-why-attrs="buttonWhyAttrs"
    :button-issue-attrs="buttonIssueAttrs"
  >
    <template #title="{title}">
      <UiHeading
        v-if="title"
        class="ui-question__title"
      >
        {{ title }}
      </UiHeading>
    </template>
  </UiQuestion>`,
});

export const WithInfoSlot = (args) => ({
  components: { UiQuestion, UiButton, UiIcon },
  setup() {
    return { ...args };
  },
  template: `<UiQuestion
    :title="title"
    :translation="translation"
    :options="options"
    :buttons-skip-attrs="buttonSkipAttrs"
    :button-info-attrs="buttonInfoAttrs"
    :button-why-attrs="buttonWhyAttrs"
    :button-issue-attrs="buttonIssueAttrs"
  >
    <template #info="{options, translation}">
      <UiButton
        v-if="options.info"
        v-bind="buttonInfoAttrs"
        class="ui-question__info ui-button--text ui-button--small ui-button--small ui-button--has-icon"
      >
        <UiIcon
          icon="info"
          class="ui-button__icon"
        />
        {{ translation.info }}
      </UiButton>
    </template>
  </UiQuestion>`,
});

export const WithActionsBottomSlot = (args) => ({
  components: { UiQuestion, UiButton },
  setup() {
    return { ...args };
  },
  template: `<UiQuestion
    :title="title"
    :translation="translation"
    :options="options"
  >
    <template #actions-bottom="{options, translation}">
      <div
        v-if="options.why || options.issue"
        class="ui-question__actions-bottom"
      >
        <div
          v-if="options.why"
          class="ui-question__action"
        >
          <UiButton class="ui-button--text ui-button--small">
            {{ translation.why }}
          </UiButton>
        </div>
        <div
          v-if="options.issue"
          class="ui-question__action"
        >
          <UiButton class="ui-question__action ui-button--text ui-button--small">
            {{ translation.issue.action }}
          </UiButton>
        </div>
      </div>
    </template>
  </UiQuestion>`,
});

export const WithWhySlot = (args) => ({
  components: { UiQuestion, UiButton },
  setup() {
    return { ...args };
  },
  template: `<UiQuestion
    :title="title"
    :translation="translation"
    :options="options"
  >
    <template #why="{options, translation}">
      <div
        v-if="options.why"
        class="ui-question__action"
      >
        <UiButton class="ui-button--text ui-button--small">
          {{ translation.why }}
        </UiButton>
      </div>
    </template>
  </UiQuestion>`,
});

export const WithIssueSlot = (args) => ({
  components: { UiQuestion, UiButton },
  setup() {
    return { ...args };
  },
  template: `<UiQuestion
    :title="title"
    :translation="translation"
    :options="options"
  >
    <template #issue="{options, translation}">
      <div
        v-if="options.issue"
        class="ui-question__action"
      >
        <UiButton class="ui-question__action ui-button--text ui-button--small">
          {{ translation.issue.action }}
        </UiButton>
      </div>
    </template>
  </UiQuestion>`,
});
