import UiMessage from '@/components/templates/UiMessage/UiMessage.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiImage from '@/components/atoms/UiImage/UiImage.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';

export default {
  title: 'Templates/Message',
  component: UiMessage,
  subcomponents: { UiHeading, UiImage },
  args: {
    title: 'Hello!',
    illustration: 'message',
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
    content: {
      control: { type: 'text' },
      description: '',
      table: {
        category: 'props',
      },
    },
    illustration: {
      control: { type: 'multi-select', options: ['instruction', 'message', 'terms-of-service'] },
      table: {
        category: 'props',
      },
    },
  },
  decorators: [() => ({ template: '<div class="tablet:flex tablet:max-w-171 tablet:min-h-115"><story /></div>' })],
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
  components: { UiMessage, UiText, UiImage },
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
        <UiImage
          class="ui-message__illustration"
          :src="'/assets/illustrations/' + illustration + '.svg'"
        />
      </div>
    </template>
    <UiText>{{content}}</UiText>
  </UiMessage>`,
});

export const WithIllustrationSlot = (args) => ({
  components: { UiMessage, UiText, UiImage },
  setup() {
    return { ...args };
  },
  template: `<UiMessage
    :title="title"
    :illustration="illustration"
  >
    <template #illustration="{illustration}">
      <UiImage
        class="ui-message__illustration"
        :src="'/assets/illustrations/' + illustration + '.svg'"
      />
    </template>
    <UiText>{{content}}</UiText>
  </UiMessage>`,
});
