import UiHeader from '@/components/molecules/UiHeader/UiHeader.vue';
import './UiHeader.stories.scss';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiNavigation from '@/components/molecules/UiNavigation/UiNavigation.vue';
import { defineAsyncComponent } from 'vue';
import { actions } from '@storybook/addon-actions';
import { modifiers } from '@sb/helpers/argTypes';
import { toMobile } from '../../../styles/exports/breakpoints.module.scss';

const events = actions({
  onHamburgerOpen: 'hamburger:open',
  onHamburgerClose: 'hamburger:close',
});

export default {
  title: 'Molecules/Header',
  component: UiHeader,
  subcomponents: {
    UiIcon,
    UiButton,
    UiNavigation,
  },
  args: {
    modifiers: [],
    title: 'Infermedica',
    hamburgerMatchMedia: toMobile,
    navigation: [
      {
        text: 'Terms of Service',
        href: '#',
      },
      {
        text: 'Privacy Policy',
        href: '#',
      },
    ],
    buttonBrandAttrs: {
      id: 'brand-button',
      href: '#',
    },
    buttonHamburgerAttrs: { id: 'hamburger-button' },
    iconHamburgerAttrs: { 'data-testid': 'hamburger-icon' },
    iconLogoAttrs: {
      'data-testid': 'logo-icon',
      style: { '--icon-color': 'var(--color-icon-on-brand)' },
    },
    navigationAttrs: { 'data-testid': 'navigation' },
  },
  argTypes: {
    modifiers: modifiers({
      options: [
        'ui-header--full',
      ],
    }),
    logo: {
      description: 'Use this prop to set the logo.',
      control: false,
      table: { category: 'props' },
    },
    slotLogo: {
      name: 'logo',
      description: 'Use this slot to replace logo template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
    hamburgerMatchMedia: { table: { defaultValue: { summary: toMobile } } },
    navigation: {
      description: 'Use this props to pass list of navigation items.',
      table: { category: 'props' },
    },
    slotNavigation: {
      name: 'navigation',
      description: 'Use this slot to replace navigation template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
  },
};

const Template = (args) => ({
  components: { UiHeader },
  setup() {
    const logo = defineAsyncComponent(() => import('../../../assets/logo.svg'));
    return {
      ...args,
      ...events,
      logo,
    };
  },
  template: `<UiHeader
    :title="title"
    :logo="logo"
    :hamburgerMatchMedia="hamburgerMatchMedia"
    :navigation="navigation"
    :button-brand-Attrs="buttonBrandAttrs"
    :button-hamburger-attrs="buttonHamburgerAttrs"
    :icon-hamburger-attrs="iconHamburgerAttrs"
    :icon-logo-attrs="iconLogoAttrs"
    :navigation-attrs="navigationAttrs"
    :class="modifiers"
    @hamburger:close="onHamburgerClose"
    @hamburger:open="onHamburgerOpen"
  />`,
});

export const Common = Template.bind({});

export const HamburgerMenuAlwaysDisplay = Template.bind({});
HamburgerMenuAlwaysDisplay.args = { hamburgerMatchMedia: '(min-width: 0px)' };

export const WithoutHamburgerMenu = Template.bind({});
WithoutHamburgerMenu.args = { hamburgerMatchMedia: '(max-width: 0px)' };

export const WithBrandSlot = (args) => ({
  components: {
    UiHeader,
    UiButton,
    UiIcon,
  },
  setup() {
    const logo = defineAsyncComponent(() => import('../../../assets/logo.svg'));
    return {
      ...args,
      ...events,
      logo,
    };
  },
  template: `<UiHeader
    :title="title"
    :logo="logo"
    :hamburgerMatchMedia="hamburgerMatchMedia"
    :navigation="navigation"
    :button-brand-Attrs="buttonBrandAttrs"
    :button-hamburger-attrs="buttonHamburgerAttrs"
    :icon-hamburger-attrs="iconHamburgerAttrs"
    :icon-logo-attrs="iconLogoAttrs"
    :navigation-attrs="navigationAttrs"
    :class="modifiers"
    @hamburger:close="onHamburgerClose"
    @hamburger:open="onHamburgerOpen"
  >
    <template #brand="{ 
      attrs, 
      iconLogoAttrs 
    }">
      <UiButton
        v-bind="attrs"
        class="ui-button--icon ui-header__brand"
      >
        <UiIcon
          v-bind="iconLogoAttrs"
          class="ui-icon--theme-brand ui-header__logo"
        />
      </UiButton>
    </template>
  </UiHeader>`,
});

export const WithLogoSlot = (args) => ({
  components: {
    UiHeader,
    UiIcon,
  },
  setup() {
    const logo = defineAsyncComponent(() => import('../../../assets/logo.svg'));
    return {
      ...args,
      ...events,
      logo,
    };
  },
  template: `<UiHeader
    :title="title"
    :logo="logo"
    :hamburgerMatchMedia="hamburgerMatchMedia"
    :navigation="navigation"
    :button-brand-Attrs="buttonBrandAttrs"
    :button-hamburger-attrs="buttonHamburgerAttrs"
    :icon-hamburger-attrs="iconHamburgerAttrs"
    :icon-logo-attrs="iconLogoAttrs"
    :navigation-attrs="navigationAttrs"
    :class="modifiers"
    @hamburger:close="onHamburgerClose"
    @hamburger:open="onHamburgerOpen"
  >
    <template #logo="{ attrs }">
      <UiIcon
        v-bind="attrs"
        class="ui-header__logo"
      />
    </template>
  </UiHeader>`,
});

export const WithHamburgerSlot = (args) => ({
  components: {
    UiHeader,
    UiButton,
    UiIcon,
  },
  setup() {
    const logo = defineAsyncComponent(() => import('../../../assets/logo.svg'));
    return {
      ...args,
      ...events,
      logo,
    };
  },
  template: `<UiHeader
    :title="title"
    :logo="logo"
    :hamburgerMatchMedia="hamburgerMatchMedia"
    :navigation="navigation"
    :button-brand-Attrs="buttonBrandAttrs"
    :button-hamburger-attrs="buttonHamburgerAttrs"
    :icon-hamburger-attrs="iconHamburgerAttrs"
    :icon-logo-attrs="iconLogoAttrs"
    :navigation-attrs="navigationAttrs"
    :class="modifiers"
    @hamburger:close="onHamburgerClose"
    @hamburger:open="onHamburgerOpen"
  >
    <template #hamburger="{ 
      attrs,
      iconHamburgerAttrs, 
      handleHamburger 
    }">
      <UiButton
        v-bind="attrs"
        class="ui-button--icon ui-button--theme-brand ui-header__hamburger"
        @click="handleHamburger"
      >
        <UiIcon
          v-bind="iconHamburgerAttrs"
          class="ui-button__icon"
        />
      </UiButton>
    </template>
  </UiHeader>`,
});

export const WithNavigationSlot = (args) => ({
  components: {
    UiHeader,
    UiNavigation,
  },
  setup() {
    const logo = defineAsyncComponent(() => import('../../../assets/logo.svg'));
    return {
      ...args,
      ...events,
      logo,
    };
  },
  template: `<UiHeader
    :title="title"
    :logo="logo"
    :hamburgerMatchMedia="hamburgerMatchMedia"
    :navigation="navigation"
    :button-brand-Attrs="buttonBrandAttrs"
    :button-hamburger-attrs="buttonHamburgerAttrs"
    :icon-hamburger-attrs="iconHamburgerAttrs"
    :icon-logo-attrs="iconLogoAttrs"
    :navigation-attrs="navigationAttrs"
    :class="modifiers"
    @hamburger:close="onHamburgerClose"
    @hamburger:open="onHamburgerOpen"
  >
    <template #navigation="{ 
      attrs, 
      navigation
    }">
      <UiNavigation
        v-bind="attrs"
        :items="navigation"
        class="ui-navigation--theme-brand ui-header__navigation"
      />
    </template>
  </UiHeader>`,
});

export const WithCustomBrand = (args) => ({
  components: {
    UiHeader,
    UiNavigation,
  },
  setup() {
    const logo = defineAsyncComponent(() => import(
      /* webpackChunkName: "header" */
      /* webpackMode: "eager" */
      /* webpackPreload: true */
      '../../../assets/logo.svg'
    ));

    return {
      ...args,
      ...events,
      logo,
    };
  },
  template: `<div :style="{
    '--color-background-brand': '#FFF', 
    '--color-icon-on-brand': '#1F262C', 
    '--color-icon-on-brand-hover': '#1F262C',
    '--color-icon-on-brand-active': '#1F262C',
    '--color-text-on-brand': '#1F262C',
    '--color-text-on-brand-hover': '#1F262C', 
    '--color-text-on-brand-active': '#1F262C'
  }">
    <UiHeader
      :title="title"
      :logo="logo"
      :hamburgerMatchMedia="hamburgerMatchMedia"
      :navigation="navigation"
      :button-brand-Attrs="buttonBrandAttrs"
      :button-hamburger-attrs="buttonHamburgerAttrs"
      :icon-hamburger-attrs="iconHamburgerAttrs"
      :icon-logo-attrs="iconLogoAttrs"
      :navigation-attrs="navigationAttrs"
      :class="modifiers"
      @hamburger:close="onHamburgerClose"
      @hamburger:open="onHamburgerOpen"
    />
  </div>`,
});
