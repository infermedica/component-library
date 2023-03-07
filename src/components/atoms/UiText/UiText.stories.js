import UiText from '@/components/atoms/UiText/UiText.vue';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';

export default {
  title: 'Atoms/Text',
  component: UiText,
  args: {
    content:
      'It looks like you are using an outdated browser that is having trouble viewing modern web pages. To proceed, download and install the latest version of your favorite browser:',
    modifiers: [],
    tag: 'p',
  },
  argTypes: {
    content,
    modifiers: modifiers({
      options: [
        ...[
          'body-1-thick',
          'body-2-comfortable',
          'body-2-compact',
          'body-2-comfortable-thick',
          'body-2-compact-thick',
          'caption',
          'button-1',
        ].map((modifier) => `ui-text--${modifier}`),
        'ui-text--theme-secondary',
        'ui-text--theme-brand',
      ],
    }),
  },
  parameters: {
    cssProperties: {
      '--text-font': 'var(--font-button-1)',
      '--text-letter-spacing': 'var(--letter-spacing-button-1)',
      '--text-margin-block': 'var(--text-margin-block-start, 0) var(--text-margin-block-end, 0)',
      '--text-margin-inline': 'var(--text-margin-inline-start, 0) var(--text-margin-inline-end, 0)',
      '--text-color': 'var(--color-text-body)',
    },
  },
};

export const TextBody1 = {
  render: (args) => ({
    components: { UiText },
    setup() {
      return { ...args };
    },
    template: `<UiText
      :tag="tag"
      :class="modifiers"
    >
      {{ content }}
    </UiText>`,
  }),
};

export const TextBody1Thick = {
  render: (args) => ({
    components: { UiText },
    setup() {
      return { ...args };
    },
    template: `<UiText
      :tag="tag"
      :class="modifiers"
    >
      {{ content }}
    </UiText>`,
  }),

  args: { modifiers: 'ui-text--body-1-thick' },
};

export const TextBody2Comfortable = {
  render: (args) => ({
    components: { UiText },
    setup() {
      return { ...args };
    },
    template: `<UiText
      :tag="tag"
      :class="modifiers"
    >
      {{ content }}
    </UiText>`,
  }),

  args: { modifiers: 'ui-text--body-2-comfortable' },
};

export const TextBody2Compact = {
  render: (args) => ({
    components: { UiText },
    setup() {
      return { ...args };
    },
    template: `<UiText
      :tag="tag"
      :class="modifiers"
    >
      {{ content }}
    </UiText>`,
  }),

  args: { modifiers: 'ui-text--body-2-compact' },
};

export const TextBody2ComfortableThick = {
  render: (args) => ({
    components: { UiText },
    setup() {
      return { ...args };
    },
    template: `<UiText
      :tag="tag"
      :class="modifiers"
    >
      {{ content }}
    </UiText>`,
  }),

  args: { modifiers: 'ui-text--body-2-comfortable-thick' },
};

export const TextBody2CompactThick = {
  render: (args) => ({
    components: { UiText },
    setup() {
      return { ...args };
    },
    template: `<UiText
      :tag="tag"
      :class="modifiers"
    >
      {{ content }}
    </UiText>`,
  }),

  args: { modifiers: 'ui-text--body-2-compact-thick' },
};

export const TextCaption = {
  render: (args) => ({
    components: { UiText },
    setup() {
      return { ...args };
    },
    template: `<UiText
      :tag="tag"
      :class="modifiers"
    >
      {{ content }}
    </UiText>`,
  }),

  args: { modifiers: 'ui-text--caption' },
};

export const TextButton1 = {
  render: (args) => ({
    components: { UiText },
    setup() {
      return { ...args };
    },
    template: `<UiText
      :tag="tag"
      :class="modifiers"
    >
      {{ content }}
    </UiText>`,
  }),

  args: { modifiers: 'ui-text--button-1' },
};
