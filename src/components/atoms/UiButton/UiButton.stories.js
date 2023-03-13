import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import icons from '@/components/atoms/UiIcon/icons';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';

export default {
  title: 'Atoms/Button',
  component: UiButton,
  args: {
    content: 'Next',
    icon: 'plus-circled-filled',
    modifiers: [],
  },
  argTypes: {
    content,
    icon: {
      description: 'Use this control to set the icon.',
      table: { category: 'stories controls' },
      control: 'select',
      options: icons,
    },
    modifiers: modifiers({
      options: [
        'ui-button--small',
        'ui-button--outlined',
        'ui-button--text',
        'ui-button--circled',
        'ui-button--icon',
        'ui-button--is-disabled',
        'ui-button--theme-secondary',
        'ui-button--theme-brand',
      ],
    }),
  },
  decorators: [ () => ({
    template: `<div class="flex flex-wrap items-center gap-10">
      <story />
    </div>`,
  }) ],
  parameters: {
    cssProperties: {
      '--button-padding-block':
        'var(--button-padding-block-start, var(--space-12)) var(--button-padding-block-end, var(--space-12))',
      '--button-padding-inline':
        'var(--button-padding-inline-start, var(--space-12)) var(--button-padding-inline-end, var(--space-12))',
      '--button-border-start-start-radius': 'var(--border-radius-circle)',
      '--button-border-start-end-radius': 'var(--border-radius-circle)',
      '--button-border-end-start-radius': 'var(--border-radius-circle)',
      '--button-border-end-end-radius': 'var(--border-radius-circle)',
      '--button-transition': 'border-color 150ms ease-in-out',
      '--button-font': 'var(--font-body-2-comfortable)',
      '--button-letter-spacing': 'var(--letter-spacing-2-comfortable)',
      '--button-background': 'var(--color-background-disabled)',
      '--button-color': 'var(--color-text-disabled)',
      '--button-gap': 'var(--space-4)',
      '--button-border-block':
        'var(--button-border-block-start, var(--button-border)) var(--button-border-block-end, var(--button-border))',
      '--button-border-inline':
        'var(--button-border-inline-start, var(--button-border)) var(--button-border-inline-end, var(--button-border))',
      '--button-border-block-style':
        'var(--button-border-block-start-style, solid) var(--button-border-block-end-style, solid)',
      '--button-border-inline-style':
        'var(--button-border-inline-start-style, solid) var(--button-border-inline-end-style, solid)',
      '--button-border-block-color':
        'var(--button-border-block-start-color, var(--color-border-subtle)) var(--button-border-block-end-color, var(--color-border-subtle))',
      '--button-border-inline-color':
        'var(--button-border-inline-start-color, var(--color-border-subtle)) var(--button-border-inline-end-color, var(--color-border-subtle))',
      '--button-border-block-width':
        'var(--button-border-block-start-width, 1px) var(--button-border-block-end-width, 1px)',
      '--button-border-inline-width':
        'var(--button-border-inline-start-width, 1px) var(--button-border-inline-end-width, 1px)',
      '--button-hover-background': 'transparent',
      '--button-hover-color': 'var(--color-text-disabled)',
      '--button-hover-border-block-color':
        'var(--button-hover-border-block-start-color, var(--color-background-selection-hover)) var(--button-hover-border-block-end-color, var(--color-background-selection-hover))',
      '--button-hover-border-inline-color':
        'var(--button-hover-border-inline-start-color, var(--color-background-selection-hover)) var(--button-hover-border-inline-end-color, var(--color-background-selection-hover))',
      '--button-hover-icon-color': 'var(--color-icon-disabled)',
      '--button-active-background': 'var(--color-background-selection-active)',
      '--button-active-color': 'var(--color-text-disabled)',
      '--button-active-border-block-color':
        'var(--button-active-border-block-start-color, var(--color-background-selection-active)) var(--button-active-border-block-end-color, var(--color-background-selection-active))',
      '--button-active-border-inline-color':
        'var(--button-active-border-inline-start-color, var(--color-background-selection-active)) var(--button-active-border-inline-end-color, var(--color-background-selection-active))',
      '--button-active-icon-color': 'var(--color-icon-disabled)',
      '--button-icon-color': 'var(--color-icon-disabled)',
      '--button-icon-margin-block':
        'var(--button-icon-margin-block-start, 0) var(--button-icon-margin-block-end, 0)',
      '--button-icon-margin-inline':
        'var(--button-icon-margin-inline-start, 0) var(--button-icon-margin-inline-end, calc(var(--space-8) * -1))',
    },
  },
};

export const Common = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiButton :class="modifiers">
      {{ content }}
    </UiButton>`,
  }),
};

export const Contained = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiText tag="span">
      Large:
    </UiText>
    <UiButton :class="modifiers">
      {{ content }}
    </UiButton>
    <UiButton :class="modifiers">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton :class="modifiers">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Small:
    </UiText>
    <UiButton :class="[
      'ui-button--small',
      modifiers,
    ]">
      {{ content }}
    </UiButton>
    <UiButton
      :class="[
        'ui-button--small',
        modifiers,
      ]"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--small',
      modifiers,
    ]">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Disable:
    </UiText>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers,
    ]">
      {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers,
    ]">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers
    ]">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>`,
  }),
};

export const Outlined = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiText tag="span">
      Large:
    </UiText>
    <UiButton :class="modifiers">
      {{ content }}
    </UiButton>
    <UiButton :class="modifiers">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton :class="modifiers">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">Small:</UiText>
    <UiButton :class="[
      'ui-button--small',
      modifiers,
    ]">
      {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--small',
      modifiers,
    ]">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--small',
      modifiers,
    ]">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">Selected:</UiText>
    <UiButton :class="[
      'ui-button--is-selected',
      modifiers,
    ]">
      {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--is-selected',
      modifiers,
    ]">
    <UiIcon
      :icon="icon"
      class="ui-button__icon"
    /> {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--is-selected',
      modifiers,
    ]">
    {{ content }}<UiIcon
      :icon="icon"
      class="ui-button__icon ui-button__icon--end"
    />
    </UiButton>
    <UiText tag="span">
      Disable:
    </UiText>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers,
    ]">
      {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers,
    ]">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      />{{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers,
    ]">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>`,
  }),

  args: { modifiers: [ 'ui-button--outlined' ] },
};

export const Text = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiText tag="span">
      Large:
    </UiText>
    <UiButton :class="modifiers">
      {{ content }}
    </UiButton>
    <UiButton :class="modifiers">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton :class="modifiers">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Small:
    </UiText>
    <UiButton :class="[
      'ui-button--small',
      modifiers,
    ]">
      {{ content }}
    </UiButton>
    <UiButton
      :class="[
        'ui-button--small',
        modifiers,
      ]"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--small',
      modifiers,
    ]">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Disable:
    </UiText>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers,
    ]">
      {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers,
    ]">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers
    ]">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>`,
  }),

  args: { modifiers: [ 'ui-button--text' ] },
};

export const Circled = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiText tag="span">
      Icon:
    </UiText>
    <UiButton :class="modifiers">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      />
    </UiButton>
    <UiText tag="span">
      Text:
    </UiText>
    <UiButton :class="modifiers">
      <UiText tag="span">
        1
      </UiText>
    </UiButton>
    <UiText tag="span">
      Selected:
    </UiText>
    <UiButton :class="[
      'ui-button--is-selected',
      modifiers,
    ]">
    <UiIcon
      :icon="icon"
      class="ui-button__icon"
    />
    </UiButton>
    <UiButton :class="[
      'ui-button--is-selected',
      modifiers,
    ]">
      <UiText tag="span">
        1
      </UiText>
    </UiButton>
    `,
  }),

  args: {
    modifiers: [
      'ui-button--outlined',
      'ui-button--circled',
    ],
  },
};

export const Icon = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiButton class="ui-button--icon">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      />
    </UiButton>`,
  }),
};

export const TextSecondary = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiText tag="span">
      Large:
    </UiText>
    <UiButton :class="modifiers">
      {{ content }}
    </UiButton>
    <UiButton :class="modifiers">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton :class="modifiers">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Small:
    </UiText>
    <UiButton :class="[
      'ui-button--small',
      modifiers,
    ]">
      {{ content }}
    </UiButton>
    <UiButton
      :class="[
        'ui-button--small',
        modifiers,
      ]"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--small',
      modifiers,
    ]">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Disable:
    </UiText>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers,
    ]">
      {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers,
    ]">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers
    ]">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>`,
  }),

  args: {
    modifiers: [
      'ui-button--text',
      'ui-button--theme-secondary',
    ],
  },
};

export const IconSecondary = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiButton :class="[
      'ui-button--icon',
      modifiers,
    ]">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      />
    </UiButton>`,
  }),

  args: { modifiers: [ 'ui-button--theme-secondary' ] },
};

export const TextOnBrand = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiText tag="span">
      Large:
    </UiText>
    <UiButton :class="modifiers">
      {{ content }}
    </UiButton>
    <UiButton :class="modifiers">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton :class="modifiers">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Small:
    </UiText>
    <UiButton :class="[
      'ui-button--small',
      modifiers,
    ]">
      {{ content }}
    </UiButton>
    <UiButton
      :class="[
        'ui-button--small',
        modifiers,
      ]"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--small',
      modifiers,
    ]">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Disable:
    </UiText>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers,
    ]">
      {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers,
    ]">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton :class="[
      'ui-button--is-disabled',
      modifiers
    ]">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>`,
  }),

  args: {
    modifiers: [
      'ui-button--text',
      'ui-button--theme-brand',
    ],
  },

  parameters: { backgrounds: { default: 'brand' } },
};

export const IconOnBrand = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiButton :class="[
      'ui-button--icon',
      modifiers
    ]">
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      />
    </UiButton>`,
  }),

  args: {
    modifiers: [
      'ui-button--text',
      'ui-button--theme-brand',
    ],
  },

  parameters: { backgrounds: { default: 'brand' } },
};
