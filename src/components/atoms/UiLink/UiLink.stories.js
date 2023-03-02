import UiLink from '@/components/atoms/UiLink/UiLink.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';
import icons from '@/components/atoms/UiIcon/icons.ts';

export default {
  title: 'Atoms/Link',
  component: UiLink,
  args: {
    content: 'Back',
    icon: 'plus-circled-filled',
    modifiers: [],
    tag: 'span',
    to: '',
    href: '#',
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
        'ui-link--small',
        'ui-link--is-disabled',
        'ui-link--theme-secondary',
        'ui-link--theme-brand',
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
      '--link-border-start-start-radius': 'var(--border-radius-button)',
      '--link-border-start-end-radius': 'var(--border-radius-button)',
      '--link-border-end-start-radius': 'var(--border-radius-button)',
      '--link-border-end-end-radius': 'var(--border-radius-button)',
      '--link-transition': 'border-color 150ms ease-in-out',
      '--link-font': 'var(--font-body-1)',
      '--link-letter-spacing': 'var(--letter-spacing-body-1)',
      '--link-color': 'var(--color-text-action-primary)',
      '--link-gap': 'var(--space-4)',
      '--link-border-block':
        'var(--link-border-block-start, var(--link-border)) var(--link-border-block-end, var(--link-border))',
      '--link-border-inline':
        'var(--link-border-inline-start, var(--link-border)) var(--link-border-inline-end, var(--link-border))',
      '--link-border-block-style':
        'var(--link-border-block-start-style, solid) var(--link-border-block-end-style, solid)',
      '--link-border-inline-style':
        'var(--link-border-inline-start-style, solid) var(--link-border-inline-end-style, solid)',
      '--link-border-block-color':
        'var(--link-border-block-start-color, transparent) var(--link-border-block-end-color, transparent)',
      '--link-border-inline-color':
        'var(--link-border-inline-start-color, transparent) var(--link-border-inline-end-color, transparent)',
      '--link-border-block-width':
        'var(--link-border-block-start-width, 0) var(--link-border-block-end-width, 0)',
      '--link-border-inline-width':
        'var(--link-border-inline-start-width, 0) var(--link-border-inline-end-width, 0)',
      '--link-hover-color': 'var(--color-text-action-primary-hover)',
      '--link-hover-icon-color': 'var(--color-icon-primary-hover)',
      '--link-active-color': 'var(--color-text-action-primary-active)',
      '--link-active-icon-color': 'var(--color-icon-primary-active)',
      '--link-icon-color': 'var(--color-icon-primary)',
    },
  },
};

export const Common = {
  render: (args) => ({
    components: { UiLink },
    setup() {
      return { ...args };
    },
    template: `<UiLink
      :to="to"
      :href="href"
      :class="modifiers"
    >
      {{ content }}
    </UiLink>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};

export const Link = {
  render: (args) => ({
    components: {
      UiLink,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiText tag="span">
    Large:
    </UiText>
    <UiLink
      :to="to"
      :href="href"
      :class="modifiers"
    >
      {{ content }}
    </UiLink>
    <UiLink
      :to="to"
      :href="href"
      :class="modifiers"
    >
      <UiIcon
        :icon="icon"
        class="ui-link__icon"
      />{{ content }}
    </UiLink>
    <UiLink
      :to="to"
      :href="href"
      :class="modifiers"
    >
      {{ content }}<UiIcon
          :icon="icon"
          class="ui-link__icon"
      />
    </UiLink>
    <UiText tag="span">
      Small:
    </UiText>
    <UiLink
      :to="to"
      :href="href"
      :class="[
        'ui-link--small',
        modifiers,
      ]"
    >
      {{ content }}
    </UiLink>
    <UiLink
      :to="to"
      :href="href"
      :class="[
        'ui-link--small',
        modifiers,
      ]"
    >
      <UiIcon
        :icon="icon"
        class="ui-link__icon"
      />{{ content }}
    </UiLink>
    <UiLink
      :to="to"
      :href="href"
      :class="[
        'ui-link--small',
        modifiers,
      ]"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-link__icon"
    />
    </UiLink>`,
  }),
};

export const LinkSecondary = {
  render: (args) => ({
    components: {
      UiLink,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiText tag="span">
    Large:
    </UiText>
    <UiLink
      :to="to"
      :href="href"
      :class="modifiers"
    >
      {{ content }}
    </UiLink>
    <UiLink
      :to="to"
      :href="href"
      :class="modifiers"
    >
      <UiIcon
        :icon="icon"
        class="ui-link__icon"
      />{{ content }}
    </UiLink>
    <UiLink
      :to="to"
      :href="href"
      :class="modifiers"
    >
      {{ content }}<UiIcon
          :icon="icon"
          class="ui-link__icon"
      />
    </UiLink>
    <UiText tag="span">
      Small:
    </UiText>
    <UiLink
      :to="to"
      :href="href"
      :class="[
        'ui-link--small',
        modifiers,
      ]"
    >
      {{ content }}
    </UiLink>
    <UiLink
      :to="to"
      :href="href"
      :class="[
        'ui-link--small',
        modifiers,
      ]"
    >
      <UiIcon
        :icon="icon"
        class="ui-link__icon"
      />{{ content }}
    </UiLink>
    <UiLink
      :to="to"
      :href="href"
      :class="[
        'ui-link--small',
        modifiers,
      ]"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-link__icon"
    />
    </UiLink>`,
  }),

  args: { modifiers: [ 'ui-button--theme-secondary' ] },
};

export const LinkOnBrand = {
  render: (args) => ({
    components: {
      UiLink,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiText tag="span">
    Large:
    </UiText>
    <UiLink
      :to="to"
      :href="href"
      :class="modifiers"
    >
      {{ content }}
    </UiLink>
    <UiLink
      :to="to"
      :href="href"
      :class="modifiers"
    >
      <UiIcon
        :icon="icon"
        class="ui-link__icon"
      />{{ content }}
    </UiLink>
    <UiLink
      :to="to"
      :href="href"
      :class="modifiers"
    >
      {{ content }}<UiIcon
          :icon="icon"
          class="ui-link__icon"
      />
    </UiLink>
    <UiText tag="span">
      Small:
    </UiText>
    <UiLink
      :to="to"
      :href="href"
      :class="[
        'ui-link--small',
        modifiers,
      ]"
    >
      {{ content }}
    </UiLink>
    <UiLink
      :to="to"
      :href="href"
      :class="[
        'ui-link--small',
        modifiers,
      ]"
    >
      <UiIcon
        :icon="icon"
        class="ui-link__icon"
      />{{ content }}
    </UiLink>
    <UiLink
      :to="to"
      :href="href"
      :class="[
        'ui-link--small',
        modifiers,
      ]"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-link__icon"
    />
    </UiLink>`,
  }),

  args: { modifiers: [ 'ui-button--theme-brand' ] },
  parameters: { backgrounds: { default: 'brand' } },
};

export const LinkInTheLongText = {
  render: (args) => ({
    components: {
      UiLink,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiText style="max-width: 600px">
      Infermedica Component Library is a highly configurable UI components library. To configure components to your needs, you can use a lot of global CSS variables and adjust styles to your requirements. More details you can find in "<UiLink href="http://localhost:6006/iframe.html?path=/docs/getting-started-development-guide-theme-configuration--page">Theme Configuration</UiLink>" 
      guideline.
    </UiText>`,
  }),
};

export const LinkInTheLongTextWithIcon = {
  render: (args) => ({
    components: {
      UiLink,
      UiText,
      UiIcon,
    },
    setup() {
      return { ...args };
    },
    template: `<UiText style="max-width: 600px">
      Infermedica Component Library is a highly configurable UI components library. To configure components to your needs, you can use a lot of global CSS variables and adjust styles to your requirements. More details you can find in "<UiLink href="http://localhost:6006/iframe.html?path=/docs/getting-started-development-guide-theme-configuration--page">
        <UiIcon icon="plus-circled-filled" class="ui-link__icon"/>Theme Configuration
      </UiLink>"
      guideline.
    </UiText>`,
  }),
};
