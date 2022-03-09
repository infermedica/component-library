import UiMessage from '@/components/templates/UiMessage/UiMessage.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import './UiMessage.stories.scss';

export default {
  title: 'Templates/Message',
  component: UiMessage,
  subcomponents: { UiHeading, UiIcon },
  args: {
    title: 'Hello!',
    illustration: 'boy',
    content: 'You’re about to use a short (3 min), safe and anonymous health checkup. Your answers will be carefully analyzed and you’ll learn about possible causes of your symptoms.',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Use this props to set message title.',
      table: {
        category: 'props',
      },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Use this props to set message subtitle.',
      table: {
        category: 'props',
      },
    },
    content: {
      control: { type: 'text' },
      description: '',
      table: {
        category: 'props',
      },
    },
    illustration: {
      control: {
        type: 'select',
      },
      options: ['agreement', 'boy', 'no-internet-illustration', 'podium', 'lock', 'agreement-rtl', 'boy-rtl', 'no-internet-illustration-rtl', 'podium-rtl'],
      table: {
        category: 'props',
      },
    },
  },
  decorators: [() => ({ template: '<div class="tablet:flex tablet:max-w-171 tablet:min-h-115"><story /></div>' })],
  parameters: {
    cssprops: {
      'message-flex-direction': {
        value: 'column-reverse',
        control: 'text',
        description: '',
      },
      'message-tablet-flex-direction': {
        value: 'row',
        control: 'text',
        description: '',
      },
      'message-content-align-slef': {
        value: 'flex-end',
        control: 'text',
        description: '',
      },
      'message-content-margin': {
        value: '0',
        control: 'text',
        description: '',
      },
      'message-content-tablet-margin': {
        value: 'var(--space-16) 0 0 0',
        control: 'text',
        description: '',
      },
      'message-title-margin': {
        value: '0 0 var(--space-8) 0',
        control: 'text',
        description: '',
      },
      'message-title-tablet-margin': {
        value: '0 0 var(--space-4) 0',
        control: 'text',
        description: '',
      },
      'message-aside-margin': {
        value: '0 auto var(--space-24) auto',
        control: 'text',
        description: '',
      },
      'message-aside-tablet-margin': {
        value: '0 var(--space-40) 0 0',
        control: 'text',
        description: '',
      },
      'message-illustration-size': {
        value: 'var(--message-illustration-height, 15rem)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiMessage, UiText },
  setup() {
    return { ...args };
  },
  template: `<UiMessage
    :title="title"
    :illustration="illustration"
  >
    <UiText>{{content}}</UiText>
  </UiMessage>`,
});

export const AsIntroduction = Template.bind({});

export const WithContentSlot = (args) => ({
  components: { UiMessage, UiText, UiHeading },
  setup() {
    return { ...args };
  },
  template: `<UiMessage
    :title="title"
    :illustration="illustration"
  >
    <template #content="{title}">
      <div class="ui-message__content">
        <UiHeading
          v-if="title"
          class="ui-message__title"
        >
          {{ title }}
        </UiHeading>
        <UiText>{{content}}</UiText>
      </div>
    </template>
  </UiMessage>`,
});

export const WithAsideSlot = (args) => ({
  components: { UiMessage, UiText, UiIcon },
  setup() {
    return { ...args };
  },
  template: `<UiMessage
    :title="title"
    :illustration="illustration"
  >
    <template #aside="{illustration}">
      <div
        v-if="illustration"
        class="ui-message__aside"
      >
        <UiIcon
          :icon="illustration"
          class="ui-message__illustration"
        />
      </div>
    </template>
    <UiText>{{content}}</UiText>
  </UiMessage>`,
});

export const WithIllustrationSlot = (args) => ({
  components: { UiMessage, UiText, UiIcon },
  setup() {
    return { ...args };
  },
  template: `<UiMessage
    :title="title"
    :illustration="illustration"
  >
    <template #illustration="{illustration}">
      <UiIcon
        :icon="illustration"
        class="ui-message__illustration"
      />
    </template>
    <UiText>{{content}}</UiText>
  </UiMessage>`,
});

export const AsNotAuthorized = (args) => ({
  components: { UiMessage, UiText },
  setup() {
    return { ...args };
  },
  template: `<UiMessage
    class="ui-message--error-rtl"
    :title="title"
    :subtitle="subtitle"
    :illustration="illustration"
    :style="{
      '--message-tablet-flex-direction': 'row-reverse',
      '--message-aside-tablet-margin': '0 var(--space-40) 0 0',
      '--message-content-align-slef': 'flex-start',
      '--message-illustration-size': '10rem',
    }"
  >
  <UiText>If you are an administrator of this website, then check your integration settings.</UiText>
  </UiMessage>`,
});
AsNotAuthorized.args = {
  subtitle: 'Error 401',
  title: 'Sorry, you are not allowed to see this page',
  illustration: 'lock',
};

export const AsOffline = (args) => ({
  components: { UiMessage, UiText, UiButton },
  setup() {
    return { ...args };
  },
  template: `<UiMessage
    class="ui-message--error-rtl"
    :title="title"
    :subtitle="subtitle"
    :illustration="illustration"
    :style="{
      '--message-tablet-flex-direction': 'row-reverse',
      '--message-aside-tablet-margin': '0 var(--space-40) 0 0',
      '--message-content-align-slef': 'flex-start',
      '--message-illustration-size': '10rem',
    }"
  >
  <UiText>If you are an administrator of this website, then check your integration settings.</UiText>
  <UiButton 
    class="ui-button--text" 
    style="margin: var(--space-16) 0 0 0;"
  >Try again</UiButton>
  </UiMessage>`,
});
AsOffline.args = {
  title: 'No internet connection',
  illustration: 'no-internet-illustration',
};

export const AsOfflinePopover = (args) => ({
  components: { UiMessage, UiText, UiButton },
  setup() {
    return { ...args };
  },
  template: `<UiMessage
    class="ui-message--error-condensed-rtl"
    :title="title"
    :subtitle="subtitle"
    :illustration="illustration"
    :heading-title-attrs="headingTitleAttrs"
    :style="{
      '--message-tablet-flex-direction': 'row-reverse',
      '--message-content-tablet-margin': '0',
      '--message-aside-tablet-margin': '0 var(--space-12) 0 0',
      '--message-content-align-slef': 'flex-start',
      '--message-illustration-size': '1.5rem',
    }"
  >
  <UiText>If you are an administrator of this website, then check your integration settings.</UiText>
  <UiButton 
    class="ui-button--text" 
    style="margin: var(--space-16) 0 0 0;"
  >Try again</UiButton>
  </UiMessage>`,
});
AsOfflinePopover.args = {
  title: 'No internet connection',
  illustration: 'no-internet',
  headingTitleAttrs: {
    level: '4',
  },
};
