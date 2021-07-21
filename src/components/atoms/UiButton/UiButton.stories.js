import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';

export default {
  title: 'Atoms/Button',
  component: { UiButton },
  args: {
    content: 'Next',
    disabled: false,
  },
  argTypes: {
    content: { control: 'text' },
    disabled: {
      control: { type: 'boolean' },
      table: {
        category: 'HTML attributes',
      },
    },
    modifiers: {
      control: {
        type: 'multi-select',
        options: [
          'ui-button--small',
          'ui-button--is-disabled',
          'ui-button--has-icon',
          'ui-button--outlined',
          'ui-button--circled',
          'ui-button--text',
          'ui-button--secondary',
        ],
      },
      table: {
        category: 'HTML attributes',
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
    />
      {{ content }}
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
    {{ content }}
    <UiIcon
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
