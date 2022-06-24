import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiHeader from '@/components/molecules/UiHeader/UiHeader.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiNavigation from '@/components/molecules/UiNavigation/UiNavigation.vue';
import { actions } from '@storybook/addon-actions';
import { defineAsyncComponent } from 'vue';
import { toMobile } from '../../../styles/exports/breakpoints.scss';
import './UiHeader.stories.scss';

const events = actions({
  handleClose: 'hamburger:close',
  handleOpen: 'hamburger:open',
});

export default {
  title: 'Molecules/Header',
  component: UiHeader,
  subcomponents: { UiButton, UiIcon, UiNavigation },
  args: {
    title: 'Infermedica',
    buttonBrandAttrs: {
      id: 'brand-button',
      href: '#',
    },
    navigation: [
      { text: 'Terms of Service', href: '#' },
      { text: 'Privacy Policy', href: '#' },
    ],
    navigationAttrs: {
      class: 'navigation--theme-on-brand',
    },
    iconLogoAttrs: {
      id: 'logo-icon',
    },
    buttonHamburgerAttrs: {
      id: 'hamburger-button',
    },
    hamburgerMatchMedia: toMobile,
  },
  argTypes: {
    logo: {
      description: 'Use this prop to set the logo.',
      control: false,
      table: {
        category: 'props',
      },
    },
    slotLogo: {
      name: 'logo',
      description: 'Use this slot to replace logo template.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
    hamburgerMatchMedia: {
      table: {
        defaultValue: { summary: toMobile },
      },
    },
    navigation: {
      description: 'Use this props to pass list of navigation items.',
      table: {
        category: 'props',
      },
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
  parameters: {
    layout: 'fullscreen',
    cssprops: {
      'header-background': {
        value: 'var(--color-background-brand)',
        control: 'text',
        description: '',
      },
      'header-max-width': {
        value: '61.25rem',
        control: 'text',
        description: '',
      },
      'header-justify-content': {
        value: 'space-between',
        control: 'text',
        description: '',
      },
      'header-padding': {
        value: '0 var(--space-20)',
        control: 'text',
        description: '',
      },
      'header-margin': {
        value: 'auto',
        control: 'text',
        description: '',
      },
      'header-brand-margin': {
        value: 'var(--space-20) 0',
        control: 'text',
        description: '',
      },
      'header-logo-width': {
        value: 'fit-content',
        control: 'text',
        description: '',
      },
      'header-logo-height': {
        value: '1.5rem',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiHeader, UiNavigation },
  setup() {
    const logo = defineAsyncComponent(() => import(
      /* webpackChunkName: "header" */
      /* webpackMode: "eager" */
      /* webpackPreload: true */
      '../../../assets/logo.svg'
    ));

    return {
      ...args,
      logo,
      ...events,
    };
  },
  template: `<UiHeader
    :title="title"
    :logo="logo"
    :navigation="navigation"
    :navigation-attrs="navigationAttrs"
    :buttonBrandAttrs="buttonBrandAttrs"
    :iconLogoAttrs="iconLogoAttrs"
    :buttonHamburgerAttrs="buttonHamburgerAttrs"
    :hamburgerMatchMedia="hamburgerMatchMedia"
    @hamburger:close="handleClose"
    @hamburger:open="handleOpen"
  />`,
});

export const Common = Template.bind({});

export const HamburgerMenuAlwaysDisplay = Template.bind({});
HamburgerMenuAlwaysDisplay.args = {
  hamburgerMatchMedia: '(min-width: 0px)',
};

export const WithoutHamburgerMenu = Template.bind({});
WithoutHamburgerMenu.args = {
  hamburgerMatchMedia: '(max-width: 0px)',
};

export const WithBrandSlot = (args) => ({
  components: { UiHeader, UiButton, UiIcon },
  setup() {
    const logo = defineAsyncComponent(() => import(
      /* webpackChunkName: "header" */
      /* webpackMode: "eager" */
      /* webpackPreload: true */
      '../../../assets/logo.svg'
    ));

    return {
      ...args,
      logo,
      ...events,
    };
  },
  template: `<UiHeader
    :logo="logo"
    :title="title"
    :iconLogoAttrs="iconLogoAttrs"
    :buttonBrandAttrs="buttonBrandAttrs"
    :buttonHamburgerAttrs="buttonHamburgerAttrs"
    :hamburgerMatchMedia="hamburgerMatchMedia"
    @hamburger:close="handleClose"
    @hamburger:open="handleOpen"
  >
    <template #brand="{ attrs, logoAttrs }">
      <UiButton
        class="ui-button--text ui-header__brand"
        v-bind="attrs"
      >
        <UiIcon
          class="ui-header__logo"
          v-bind="logoAttrs"
        />
      </UiButton>
    </template>
  </UiHeader>`,
});

export const WithLogoSlot = (args) => ({
  components: { UiHeader, UiIcon },
  setup() {
    const logo = defineAsyncComponent(() => import(
      /* webpackChunkName: "header" */
      /* webpackMode: "eager" */
      /* webpackPreload: true */
      '../../../assets/logo.svg'
    ));

    return {
      ...args,
      logo,
      ...events,
    };
  },
  template: `<UiHeader
    :logo="logo"
    :title="title"
    :navigation="navigation"
    :navigation-attrs="navigationAttrs"
    :iconLogoAttrs="iconLogoAttrs"
    :buttonBrandAttrs="buttonBrandAttrs"
    :buttonHamburgerAttrs="buttonHamburgerAttrs"
    :hamburgerMatchMedia="hamburgerMatchMedia"
    @hamburger:close="handleClose"
    @hamburger:open="handleOpen"
  >
    <template #logo="{ attrs }">
      <UiIcon
        class="ui-header__logo"
        v-bind="attrs"
      />
    </template>
  </UiHeader>`,
});

export const WithHamburgerSlot = (args) => ({
  components: { UiHeader, UiButton, UiIcon },
  setup() {
    const logo = defineAsyncComponent(() => import(
      /* webpackChunkName: "header" */
      /* webpackMode: "eager" */
      /* webpackPreload: true */
      '../../../assets/logo.svg'
    ));

    return {
      ...args,
      logo,
      ...events,
    };
  },
  template: `<UiHeader
    :logo="logo"
    :title="title"
    :navigation="navigation"
    :navigation-attrs="navigationAttrs"
    :iconLogoAttrs="iconLogoAttrs"
    :buttonBrandAttrs="buttonBrandAttrs"
    :buttonHamburgerAttrs="buttonHamburgerAttrs"
    :hamburgerMatchMedia="hamburgerMatchMedia"
    @hamburger:close="handleClose"
    @hamburger:open="handleOpen"
  >
    <template #hamburger="{ attrs, hamburgerHandler }">
      <UiButton
        class="ui-button--text ui-button--has-icon ui-header__hamburger"
        v-bind="attrs"
        @click="handleHamburger"
      >
        <UiIcon icon="menu" />
      </UiButton>
    </template>
  </UiHeader>`,
});

export const WithNavigationSlot = (args) => ({
  components: { UiHeader, UiNavigation },
  setup() {
    const logo = defineAsyncComponent(() => import(
      /* webpackChunkName: "header" */
      /* webpackMode: "eager" */
      /* webpackPreload: true */
      '../../../assets/logo.svg'
    ));

    return {
      ...args,
      logo,
      ...events,
    };
  },
  template: `<UiHeader
    :logo="logo"
    :title="title"
    :navigation="navigation"
    :navigation-attrs="navigationAttrs"
    :iconLogoAttrs="iconLogoAttrs"
    :buttonBrandAttrs="buttonBrandAttrs"
    :buttonHamburgerAttrs="buttonHamburgerAttrs"
    :hamburgerMatchMedia="hamburgerMatchMedia"
    @hamburger:close="handleClose"
    @hamburger:open="handleOpen"
  >
    <template #navigation="{ attrs, navigation }">
      <UiNavigation
          :items="navigation"
          v-bind="navigationAttrs"
      />
    </template>
  </UiHeader>`,
});
