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
};

export const Common = (args) => ({
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
});

const Template = (args) => ({
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
    {{ content }} <UiIcon
        :icon="icon"
        class="ui-link__icon ui-link__icon--right"
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
    {{ content }} <UiIcon
      :icon="icon"
      class="ui-link__icon ui-link__icon--right"
  />
  </UiLink>`,
});

export const Link = Template.bind({});

export const LinkSecondary = Template.bind({});
LinkSecondary.args = { modifiers: [ 'ui-button--theme-secondary' ] };

export const LinkOnBrand = Template.bind({});
LinkOnBrand.args = { modifiers: [ 'ui-button--theme-brand' ] };
LinkOnBrand.parameters = { backgrounds: { default: 'brand' } };

export const LinkInTheLongText = (args) => ({
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
});

export const LinkInTheLongTextWithIcon = (args) => ({
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
});
