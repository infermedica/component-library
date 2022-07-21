import { content, modifiers } from '@sb/helpers/argTypes';
import UiLink from '@/components/atoms/UiLink/UiLink.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';

export default {
  title: 'Atoms/Link',
  component: UiLink,
  args: {
    content: 'Back',
    modifiers: [],
    href: '#',
    tag: 'span',
    to: '',
  },
  argTypes: {
    content,
    modifiers: modifiers({
      options: [
        'ui-link--small',
        'ui-link--is-disabled',
        'ui-link--has-icon',
        'ui-link--secondary',
      ],
    }),
  },
  parameters: {
    cssprops: {
      'link-font': {
        value: 'var(--font-body-1)',
        control: 'text',
        description: '',
      },
      'link-letter-spacing': {
        value: 'var(--letter-spacing-body-1)',
        control: 'text',
        description: '',
      },
      'link-display': {
        value: 'inline',
        control: 'text',
        description: '',
      },
      'link-color': {
        value: 'var(--color-text-action-primary)',
        control: 'text',
        description: '',
      },
      'link-text-decoration': {
        value: 'none',
        control: 'text',
        description: '',
      },
      'link-vertical-align': {
        value: 'top',
        control: 'text',
        description: '',
      },
      'link-word-break': {
        value: 'break-all',
        control: 'text',
        description: '',
      },
      'link-overflow-wrap': {
        value: 'anywhere',
        control: 'text',
        description: '',
      },
      'link-hover-color': {
        value: 'var(--color-text-action-primary-hover)',
        control: 'text',
        description: '',
      },
      'link-icon-hover-color': {
        value: 'var(--color-icon-primary-hover)',
        control: 'text',
        description: '',
      },
      'link-active-color': {
        value: 'var(--color-text-action-primary-active)',
        control: 'text',
        description: '',
      },
      'link-icon-active-color': {
        value: 'var(--color-text-action-primary-active)',
        control: 'text',
        description: '',
      },
      'link-icon-size': {
        value: 'var(--space-24)',
        control: 'text',
        description: '',
      },
      'link-icon-margin': {
        value: '0 0 0 var(--space-4)',
        control: 'text',
        description: '',
      },
      'link-icon-vertical-align': {
        value: 'top',
        control: 'text',
        description: '',
      },
      'link-icon-color': {
        value: 'var(--color-icon-primary)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiLink },
  setup() { return { ...args }; },
  template: `<UiLink
    :href="href"
    :class="modifiers"
    :disabled="disabled"
    @click="onClick"
  >
    {{content}}  
  </UiLink>`,
});

export const Large = Template.bind({});

export const LargeWithIcon = (args) => ({
  components: { UiLink, UiIcon },
  setup() { return { ...args }; },
  template: `<UiLink
    :href="href"
    :class="modifiers"
    :disabled="disabled"
    @click="onClick"
  >
    <UiIcon
      icon="plus-circled-filled"
      class="ui-link__icon"
    />{{content}}  
  </UiLink>`,
});
LargeWithIcon.args = {
  modifiers: ['ui-link--has-icon'],
};

export const LargeSecondary = Template.bind({});
LargeSecondary.args = {
  modifiers: ['ui-link--secondary'],
};

export const LargeSecondaryWithIcon = LargeWithIcon.bind({});
LargeSecondaryWithIcon.args = {
  modifiers: ['ui-link--has-icon', 'ui-link--secondary'],
};

export const Small = Large.bind({});
Small.args = {
  modifiers: ['ui-link--small'],
};

export const SmallWithIcon = LargeWithIcon.bind({});
SmallWithIcon.args = {
  modifiers: ['ui-link--has-icon', 'ui-link--small'],
};

export const SmallSecondary = Large.bind({});
SmallSecondary.args = {
  modifiers: ['ui-link--small', 'ui-link--secondary'],
};

export const SmallSecondaryWithIcon = LargeWithIcon.bind({});
SmallSecondaryWithIcon.args = {
  modifiers: ['ui-link--has-icon', 'ui-link--small', 'ui-link--secondary'],
};

export const LargeAsRouterLink = (args) => ({
  components: { UiLink },
  setup() { return { ...args }; },
  template: `<UiLink
    :to="to"
    :class="modifiers"
    :disabled="disabled"
  >
    {{content}}  
  </UiLink>`,
});
LargeAsRouterLink.args = {
  to: '/back',
};
LargeAsRouterLink.argTypes = {
  to: { control: 'text' },
};

export const LargeAsLink = (args) => ({
  components: { UiLink },
  setup() { return { ...args }; },
  template: `<UiLink
    :href="href"
    :class="modifiers"
    :disabled="disabled"
  >
    {{content}}  
  </UiLink>`,
});
LargeAsLink.args = {
  href: 'https://infermedica.com/',
};
LargeAsLink.argTypes = {
  href: { control: 'text' },
};
