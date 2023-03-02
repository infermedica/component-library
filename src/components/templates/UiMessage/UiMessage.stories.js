import UiMessage from '@/components/templates/UiMessage/UiMessage.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import { content } from '@sb/helpers/argTypes';
import './UiMessage.stories.scss';
import { WithDefaultSlot } from '@/components/organisms/UiTabs/UiTabs.stories';

export default {
  title: 'Templates/Message',
  component: UiMessage,
  subcomponents: {
    UiHeading,
    UiIcon,
  },
  args: {
    content:
      'You’re about to use a short (3 min), safe and anonymous health checkup. Your answers will be carefully analyzed and you’ll learn about possible causes of your symptoms.',
    title: 'Hello!',
    subtitle: '',
    illustration: 'boy',
    textSubtitleAttrs: { 'data-testid': 'subtitle-text' },
    headingTitleAttrs: { 'data-testid': 'title-heading' },
    iconIllustrationAttrs: { 'data-testid': 'illustration-icon' },
  },
  argTypes: {
    content,
    contentSlot: {
      name: 'content',
      description: 'Use this slot to replace content template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
      control: 'object',
    },
    title: {
      description: 'Use this props to set message title.',
      table: { category: 'props' },
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
    subtitle: {
      description: 'Use this props to set message subtitle.',
      table: { category: 'props' },
    },
    subtitleSlot: {
      name: 'subtitle',
      description: 'Use this slot to replace subtitle template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
      control: 'object',
    },
    illustration: {
      description: 'Use this props to set message illustration.',
      table: { category: 'props' },
      type: 'select',
      options: [
        'agreement',
        'boy',
        'no-internet-illustration',
        'podium',
        'lock',
        'agreement-rtl',
        'boy-rtl',
        'no-internet-illustration-rtl',
        'podium-rtl',
      ],
    },
    illustrationSlot: {
      name: 'illustration',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
      control: 'object',
    },
  },
  parameters: {
    cssProperties: {
      '--message-flex-direction': 'column-reverse',
      '--message-tablet-flex-direction': 'row',
      '--message-content-align-self': 'flex-end',
      '--message-title-margin-block':
        'var(--message-title-margin-block-start, 0) var(--message-title-margin-block-end, var(--space-8))',
      '--message-title-margin-inline':
        'var(--message-title-margin-inline-start, 0) var(--message-title-margin-inline-end, 0)',
      '--message-aside-margin-block':
        'var(--message-aside-margin-block-start, 0) var(--message-aside-margin-block-end, var(--space-24))',
      '--message-aside-margin-inline':
        'var(--message-aside-margin-inline-start, 0) var(--message-aside-margin-inline-end, 0)',
      '--message-tablet-aside-margin-block':
        'var(--message-tablet-aside-margin-block-start, 0) var(--message-tablet-aside-margin-block-end, 0)',
      '--message-tablet-aside-margin-inline':
        'var(--message-tablet-aside-margin-inline-start, var(--space-40)) var(--message-tablet-aside-margin-inline-end, 0)',
      '--message-illustration-size': '15rem',
    },
  },
};

export const AsIntroduction = {
  render: (args) => ({
    components: {
      UiMessage,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiMessage
      :title="title"
      :subtitle="subtitle"
      :illustration="illustration"
      :text-subtitle-attrs="textSubtitleAttrs"
      :heading-title-attrs="headingTitleAttrs"
      :icon-illustration-attrs="iconIllustrationAttrs"
    >
      <UiText>
        {{ content }}
      </UiText>
    </UiMessage>`,
  }),
};

export const AsNotAuthorized = {
  render: (args) => ({
    components: {
      UiMessage,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiMessage
      :title="title"
      :subtitle="subtitle"
      :illustration="illustration"
      :text-subtitle-attrs="textSubtitleAttrs"
      :heading-title-attrs="headingTitleAttrs"
      :icon-illustration-attrs="iconIllustrationAttrs"
      class="message-not-authorized"
    >
      <UiText>
        If you are an administrator of this website, then check your integration settings.
      </UiText>
    </UiMessage>`,
  }),

  args: {
    subtitle: 'Error 401',
    title: 'Sorry, you are not allowed to see this page',
    illustration: 'lock',
  },

  decorators: [ (story) => ({
    components: {
      story,
      UiControls,
    },
    template: `<UiControls
      :to-next="{path: '/next'}"
      :to-back="{path: '/back'}"
      :style="{
        width: '100%',
        'max-width': '780px',
        height: '540px',
      }"
    >
      <story/>
    </UiControls>`,
  }) ],
};

export const AsOffline = {
  render: (args) => ({
    components: {
      UiMessage,
      UiText,
      UiButton,
    },
    setup() {
      return { ...args };
    },
    template: `<UiMessage
      :title="title"
      :subtitle="subtitle"
      :illustration="illustration"
      :text-subtitle-attrs="textSubtitleAttrs"
      :heading-title-attrs="headingTitleAttrs"
      :icon-illustration-attrs="iconIllustrationAttrs"
      class="message-offline"
    >
      <UiText>
        If you are an administrator of this website, then check your integration settings.
      </UiText>
      <UiButton class="ui-button--text message-offline__button">
        Try again
      </UiButton>
    </UiMessage>`,
  }),

  args: {
    title: 'No internet connection',
    illustration: 'no-internet-illustration',
  },

  decorators: [ (story) => ({
    components: {
      story,
      UiControls,
    },
    template: `<UiControls
      :to-next="{path: '/next'}"
      :to-back="{path: '/back'}"
      :style="{
        width: '100%',
        'max-width': '780px',
        height: '540px',
      }"
    >
      <story/>
    </UiControls>`,
  }) ],
};

export const AsOfflinePopover = {
  render: (args) => ({
    components: {
      UiMessage,
      UiText,
      UiButton,
    },
    setup() {
      return { ...args };
    },
    template: `<UiMessage
      title="No internet connection"
      :subtitle="subtitle"
      :illustration="illustration"
      :text-subtitle-attrs="textSubtitleAttrs"
      :heading-title-attrs="headingTitleAttrs"
      :icon-illustration-attrs="iconIllustrationAttrs"
      class="message-offline-popover"
    >
      <UiText>
        It seems you’re offline right now. Please check your connection and try again.
      </UiText>
      <UiButton class="ui-button--text message-offline-popover__button">
        Try again
      </UiButton>
    </UiMessage>`,
  }),

  args: {
    title: null,
    illustration: 'no-internet',
    headingTitleAttrs: { level: '4' },
  },

  decorators: [ (story) => ({
    components: {
      story,
      UiPopover,
    },
    template: `<UiPopover
      class="max-w-80"
    >
      <story/>
    </UiPopover>`,
  }) ],
};

export const WithContentSlot = {
  render: (args) => ({
    components: {
      UiMessage,
      UiText,
      UiHeading,
    },
    setup() {
      return { ...args };
    },
    template: `<UiMessage
      :title="title"
      :subtitle="subtitle"
      :illustration="illustration"
      :text-subtitle-attrs="textSubtitleAttrs"
      :heading-title-attrs="headingTitleAttrs"
      :icon-illustration-attrs="iconIllustrationAttrs"
    >
      <template #content="{
        subtitle,
        title,
        textSubtitleAttrs,
        headingTitleAttrs
      }">
        <div class="ui-message__content">
          <UiText
            v-if="subtitle"
            v-bind="textSubtitleAttrs"
            class="ui-message__subtitle"
          >
            {{ subtitle }}
          </UiText>
          <UiHeading
            v-if="title"
            v-bind="headingTitleAttrs"
            class="ui-message__title"
          >
            {{ title }}
          </UiHeading>
          <UiText>
            {{ content }}
          </UiText>
        </div>
      </template>
    </UiMessage>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithAsideSlot = {
  render: (args) => ({
    components: {
      UiMessage,
      UiText,
      UiIcon,
    },
    setup() {
      return { ...args };
    },
    template: `<UiMessage
      :title="title"
      :subtitle="subtitle"
      :illustration="illustration"
      :text-subtitle-attrs="textSubtitleAttrs"
      :heading-title-attrs="headingTitleAttrs"
      :icon-illustration-attrs="iconIllustrationAttrs"
    >
      <template #aside="{
        illustration,
        iconIllustrationAttrs
      }">
        <div
          v-if="illustration"
          class="ui-message__aside"
        >
          <UiIcon
            v-bind="iconIllustrationAttrs"
            class="ui-message__illustration"
          />
        </div>
      </template>
      <UiText>
        {{ content }}
      </UiText>
    </UiMessage>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithIllustrationSlot = {
  render: (args) => ({
    components: {
      UiMessage,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiMessage
      :title="title"
      :subtitle="subtitle"
      :illustration="illustration"
      :text-subtitle-attrs="textSubtitleAttrs"
      :heading-title-attrs="headingTitleAttrs"
      :icon-illustration-attrs="iconIllustrationAttrs"
    >
      <template #illustration="{ iconIllustrationAttrs }">
        <UiIcon
          v-bind="iconIllustrationAttrs"
          class="ui-message__illustration"
        />
      </template>
      <UiText>
        {{ content }}
      </UiText>
    </UiMessage>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};
