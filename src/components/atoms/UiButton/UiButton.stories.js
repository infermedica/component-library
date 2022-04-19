import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import { content, modifiers, disabled } from '@sb/helpers/argTypes';

export default {
  title: 'Atoms/Button',
  component: UiButton,
  args: {
    content: 'Next',
    modifiers: [],
    disabled: false,
  },
  argTypes: {
    content,
    modifiers: modifiers({
      options: [
        'ui-button--small',
        'ui-button--is-disabled',
        'ui-button--has-icon',
        'ui-button--outlined',
        'ui-button--circled',
        'ui-button--text',
        'ui-button--secondary',
      ],
    }),
    disabled,
  },
  parameters: {
    cssprops: {
      'button-border-radius': {
        value: 'var(--border-radius-button)',
        control: 'text',
        description: '',
      },
      'button-display': {
        value: 'inline-flex',
        control: 'text',
        description: '',
      },
      'button-align-items': {
        value: 'center',
        control: 'text',
        description: '',
      },
      'button-justify-content': {
        value: 'center',
        control: 'text',
        description: '',
      },
      'button-width': {
        value: undefined,
        control: 'text',
        description: '',
      },
      'button-height': {
        value: undefined,
        control: 'text',
        description: '',
      },
      'button-padding': {
        value: 'var(--space-12) var(--space-32)',
        control: 'text',
        description: '',
      },
      'button-color': {
        value: 'var(--color-text-on-action)',
        control: 'text',
        description: '',
      },
      'button-text-align': {
        value: 'center',
        control: 'text',
        description: '',
      },
      'button-text-decoration': {
        value: 'none',
        control: 'text',
        description: '',
      },
      'button-text-transform': {
        value: undefined,
        control: 'text',
        description: '',
      },
      'button-white-space': {
        value: 'nowrap',
        control: 'text',
        description: '',
      },
      'button-vertical-align': {
        value: 'middle',
        control: 'text',
        description: '',
      },
      'button-cursor': {
        value: 'pointer',
        control: 'text',
        description: '',
      },
      'button-background': {
        value: 'var(--color-background-action)',
        control: 'text',
        description: '',
      },
      'button-border': {
        value: 'var(--button-border-style, solid) var(--button-border-color, transpatent)',
        control: 'text',
        description: '',
      },
      'button-border-width': {
        value: '0',
        control: 'text',
        description: '',
      },
      'button-hover-color': {
        value: 'var(--color-text-on-action)',
        control: 'text',
        description: '',
      },
      'button-hover-background': {
        value: 'var(--color-background-action-hover)',
        control: 'text',
        description: '',
      },
      'button-hover-border': {
        value: 'var(--button-hover-border-style, solid) var(--button-hover-border-color, transparent)',
        control: 'text',
        description: '',
      },
      'button-icon-color-hover': {
        value: 'var(--color-icon-primary-hover)',
        control: 'text',
        description: '',
      },
      'button-active-color': {
        value: 'var(--color-text-on-action)',
        control: 'text',
        description: '',
      },
      'button-active-background': {
        value: 'var(--color-background-action-active)',
        control: 'text',
        description: '',
      },
      'button-active-border': {
        value: 'var(--button-active-border-style, solid) var(--button-active-border-color, transparent)',
        control: 'text',
        description: '',
      },
      'button-icon-color-active': {
        value: 'var(--color-icon-primary-active)',
        control: 'text',
        description: '',
      },
      'button-focus-z-index': {
        value: '1',
        control: 'text',
        description: '',
      },
      'button-icon-size': {
        value: '1.5rem',
        control: 'text',
        description: '',
      },
      'button-icon-margin': {
        value: '0 calc(var(--space-8) * -1) 0 var(--space-4)',
        control: 'text',
        description: '',
      },
      'button-icon-color': {
        value: 'var(--color-icon-primary)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiButton },
  setup() {
    return { ...args };
  },
  template: `<UiButton
    :class="modifiers"
    :disabled="disabled"
  >
    {{content}}  
  </UiButton>`,
});

export const ContainedLarge = Template.bind({});

export const ContainedSmall = Template.bind({});
ContainedSmall.args = {
  modifiers: ['ui-button--small'],
};

export const OutlinedLarge = Template.bind({});
OutlinedLarge.args = {
  modifiers: ['ui-button--outlined'],
};

export const OutlinedLargeWithIcon = (args) => ({
  components: { UiButton, UiIcon },
  setup() { return { ...args }; },
  template: `<UiButton 
    :class="modifiers"
    :disabled="disabled"
  >
    <UiIcon 
      icon="plus-circled-filled" 
      class="ui-button__icon"
    />{{ content }}
  </UiButton>`,
});
OutlinedLargeWithIcon.args = {
  modifiers: ['ui-button--outlined', 'ui-button--has-icon'],
};

export const OutlinedSmall = Template.bind({});
OutlinedSmall.args = {
  modifiers: ['ui-button--outlined', 'ui-button--small'],
};

export const Circled = (args) => ({
  components: { UiButton, UiIcon },
  setup() { return { ...args }; },
  template: `<UiButton 
    :class="modifiers"
    :disabled="disabled"
  >
    <UiIcon icon="plus"/>
  </UiButton>`,
});
Circled.args = {
  modifiers: ['ui-button--circled', 'ui-button--outlined', 'ui-button--has-icon'],
};

export const TextLarge = Template.bind({});
TextLarge.args = {
  modifiers: ['ui-button--text'],
};

export const TextLargeWithIcon = OutlinedLargeWithIcon.bind({});
TextLargeWithIcon.args = {
  modifiers: ['ui-button--text', 'ui-button--has-icon'],
};

export const OutlinedLargeWithIconOnRight = (args) => ({
  components: { UiButton, UiIcon },
  setup() { return { ...args }; },
  template: `<UiButton 
    :class="modifiers"
    :disabled="disabled"
  >
    {{ content }}<UiIcon
      icon="plus-circled-filled"
      class="ui-button__icon ui-button__icon--right"
    />
  </UiButton>`,
});
OutlinedLargeWithIconOnRight.args = {
  modifiers: ['ui-button--outlined', 'ui-button--has-icon'],
};

export const TextLargeSecondary = Template.bind({});
TextLargeSecondary.args = {
  modifiers: ['ui-button--text', 'ui-button--secondary'],
};

export const TextLargeSecondaryWithIcon = OutlinedLargeWithIcon.bind({});
TextLargeSecondaryWithIcon.args = {
  modifiers: ['ui-button--text', 'ui-button--has-icon', 'ui-button--secondary'],
};

// todo: add TextLargeOnDark
export const TextLargeOnDark = () => ({
  template: 'Oops! Not found!',
});

export const TextSmall = Template.bind({});
TextSmall.args = {
  modifiers: ['ui-button--text', 'ui-button--small'],
};

export const TextSmallWithIcon = OutlinedLargeWithIcon.bind({});
TextSmallWithIcon.args = {
  modifiers: ['ui-button--text', 'ui-button--has-icon', 'ui-button--small'],
};

export const TextSmallSecondary = Template.bind({});
TextSmallSecondary.args = {
  modifiers: ['ui-button--text', 'ui-button--secondary', 'ui-button--small'],
};

export const TextSmallSecondaryWithIcon = OutlinedLargeWithIcon.bind({});
TextSmallSecondaryWithIcon.args = {
  modifiers: ['ui-button--text', 'ui-button--has-icon', 'ui-button--small', 'ui-button--secondary'],
};

export const ContainedLargeAsRouterLink = (args) => ({
  components: { UiButton },
  setup() { return { ...args }; },
  template: `<UiButton 
    :class="modifiers"
    :disabled="disabled"
    :to="to"
  >
    {{content}}  
  </UiButton>`,
});
ContainedLargeAsRouterLink.args = {
  to: '/privacy-policy',
};
ContainedLargeAsRouterLink.argTypes = {
  to: { control: 'text' },
};

export const ContainedLargeAsLink = (args) => ({
  components: { UiButton },
  setup() { return { ...args }; },
  template: `<UiButton 
    :class="modifiers"
    :disabled="disabled"
    :href="href"
  >
    {{content}}  
  </UiButton>`,
});
ContainedLargeAsLink.args = {
  href: 'https://infermedica.com/',
};
ContainedLargeAsRouterLink.argTypes = {
  href: { control: 'text' },
};
