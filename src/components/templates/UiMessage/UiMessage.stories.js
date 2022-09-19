import UiMessage from '@/components/templates/UiMessage/UiMessage.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import { content } from '@sb/helpers/argTypes';

export default {
  title: 'Templates/Message',
  component: UiMessage,
  subcomponents: {
    UiHeading,
    UiIcon,
  },
  args: {
    content: 'You’re about to use a short (3 min), safe and anonymous health checkup. Your answers will be carefully analyzed and you’ll learn about possible causes of your symptoms.',
    title: 'Hello!',
    subtitle: '',
    illustration: 'boy',
    headingTitleAttrs: {},
  },
  argTypes: {
    content,
    contentSlot: {
      name: 'content',
      description: 'Use this slot to replace content template.',
      table: {
        category: 'slots',
        type: {
          summary: 'unknown',
        },
      },
      control: 'object',
    },
    title: {
      description: 'Use this props to set message title.',
      table: {
        category: 'props',
      },
    },
    titleSlot: {
      name: 'title',
      description: 'Use this slot to replace title template.',
      table: {
        category: 'slots',
        type: {
          summary: 'unknown',
        },
      },
      control: 'object',
    },
    subtitle: {
      description: 'Use this props to set message subtitle.',
      table: {
        category: 'props',
      },
    },
    subtitleSlot: {
      name: 'subtitle',
      description: 'Use this slot to replace subtitle template.',
      table: {
        category: 'slots',
        type: {
          summary: 'unknown',
        },
      },
      control: 'object',
    },
    illustration: {
      description: 'Use this props to set message illustration.',
      table: {
        category: 'props',
      },
      type: 'select',
      options: ['agreement', 'boy', 'no-internet-illustration', 'podium', 'lock', 'agreement-rtl', 'boy-rtl', 'no-internet-illustration-rtl', 'podium-rtl'],
    },
    illustrationSlot: {
      name: 'illustration',
      table: {
        category: 'slots',
        type: {
          summary: 'unknown',
        },
      },
      control: 'object',
    },
  },
};

const Template = (args) => ({
  components: {
    UiMessage,
    UiText,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: `<UiMessage
    :title="title"
    :subtitle="subtitle"
    :illustration="illustration"
    :heading-title-attrs="headingTitleAttrs"
  >
    <UiText>{{content}}</UiText>
  </UiMessage>`,
});

export const AsIntroduction = Template.bind({});

export const WithContentSlot = (args) => ({
  components: {
    UiMessage,
    UiText,
    UiHeading,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: `<UiMessage
    :title="title"
    :subtitle="subtitle"
    :illustration="illustration"
    :heading-title-attrs="headingTitleAttrs"
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
  components: {
    UiMessage,
    UiText,
    UiIcon,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: `<UiMessage
    :title="title"
    :subtitle="subtitle"
    :illustration="illustration"
    :heading-title-attrs="headingTitleAttrs"
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
  components: {
    UiMessage,
    UiText,
    UiIcon,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: `<UiMessage
    :title="title"
    :subtitle="subtitle"
    :illustration="illustration"
    :heading-title-attrs="headingTitleAttrs"
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
  components: {
    UiMessage,
    UiText,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: `<UiMessage
    :title="title"
    :subtitle="subtitle"
    :illustration="illustration"
    :heading-title-attrs="headingTitleAttrs"
    :style="{
      '--message-tablet-flex-direction': 'row-reverse',
      '--message-tablet-aside-margin': '0 var(--space-40) 0 0',
      '--message-content-align-self': 'flex-start',
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
AsNotAuthorized.decorators = [(story) => ({
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
})];

export const AsOffline = (args) => ({
  components: {
    UiMessage,
    UiText,
    UiButton,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: `<UiMessage
    :title="title"
    :subtitle="subtitle"
    :illustration="illustration"
    :heading-title-attrs="headingTitleAttrs"
    :style="{
      '--message-tablet-flex-direction': 'row-reverse',
      '--message-tablet-aside-margin': '0 var(--space-40) 0 0',
      '--message-content-align-self': 'flex-start',
      '--message-illustration-size': '10rem',
    }"
  >
    <UiText>If you are an administrator of this website, then check your integration settings.</UiText>
    <UiButton
      class="ui-button--text"
      style="margin: var(--space-16) 0 0 0;"
    >
      Try again
    </UiButton>
  </UiMessage>`,
});
AsOffline.args = {
  title: 'No internet connection',
  illustration: 'no-internet-illustration',
};
AsOffline.decorators = [(story) => ({
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
})];

export const AsOfflinePopover = (args) => ({
  components: {
    UiMessage,
    UiText,
    UiButton,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: `<UiMessage
    title="No internet connection"
    :subtitle="subtitle"
    :illustration="illustration"
    :heading-title-attrs="headingTitleAttrs"
    :style="{
      '--message-flex-direction': 'row-reverse',
      '--message-tablet-flex-direction': 'row-reverse',
      '--message-aside-margin': '0 var(--space-12) 0 0',
      '--message-tablet-aside-margin': '0 var(--space-12) 0 0',
      '--message-content-align-self': 'flex-start',
      '--message-illustration-size': '1.5rem',
    }"
  >
  <UiText>It seems you’re offline right now. Please check your connection and try again.</UiText>
  <UiButton
    class="ui-button--text"
    style="margin: var(--space-16) 0 0 0;"
  >Try again</UiButton>
  </UiMessage>`,
});
AsOfflinePopover.args = {
  title: '', // hack: prevent to provide title to popover
  illustration: 'no-internet',
  headingTitleAttrs: {
    level: '4',
  },
};
AsOfflinePopover.decorators = [(story) => ({
  components: {
    story,
    UiPopover,
  },
  template: `<UiPopover
    :style="{
      '--popover-padding': 'var(--space-24) var(--space-16)',
      width: '320px',
      height: '192px',
    }"
  >
    <story/>
  </UiPopover>`,
})];
