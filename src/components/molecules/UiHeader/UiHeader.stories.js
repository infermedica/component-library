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
  onClickBrandButton: 'click:brand-button',
  onHamburgerOpen: 'hamburger:open',
  onHamburgerClose: 'hamburger:close',
});

export default {
  title: 'Molecules/Header',
  component: UiHeader,
  tags: [ '!autodocs' ],
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
      onClick: events.onClickBrandButton,
    },
    buttonHamburgerAttrs: { id: 'hamburger-button' },
    iconHamburgerAttrs: { 'data-testid': 'hamburger-icon' },
    iconLogoAttrs: {
      'data-testid': 'logo-icon',
      style: '--icon-color: var(--color-icon-on-brand)',
    },
    navigationAttrs: { 'data-testid': 'navigation' },
  },
  argTypes: {
    modifiers: modifiers({ options: [ 'ui-header--full-width' ] }),
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
    buttonBrandAttrs: { table: { subcategory: 'Attrs props' } },
    buttonHamburgerAttrs: { table: { subcategory: 'Attrs props' } },
    iconHamburgerAttrs: { table: { subcategory: 'Attrs props' } },
    iconLogoAttrs: { table: { subcategory: 'Attrs props' } },
    navigationAttrs: { table: { subcategory: 'Attrs props' } },
  },
  parameters: {
    cssProperties: {
      '--header-background': 'var(--color-background-brand)',
      '--header-padding-block':
        'var(--header-padding-block-start, var(--space-20)) var(--header-padding-block-end, var(--space-20))',
      '--header-padding-inline':
        'var(--header-padding-inline-start, var(--space-20)) var(--header-padding-inline-end, var(--space-20))',
      '--header-margin-block':
        'var(--header-margin-block-start, auto) var(--header-margin-block-end, auto)',
      '--header-margin-inline':
        'var(--header-margin-inline-start, auto) var(--header-margin-inline-end, auto)',
      '--header-max-width': '61.25rem',
      '--header-gap': 'var(--space-16)',
      '--header-logo-width': 'fit-content',
      '--header-logo-height': '1.5rem',
    },
  },
};

export const Common = {
  render: (args) => ({
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
      :button-brand-attrs="buttonBrandAttrs"
      :button-hamburger-attrs="buttonHamburgerAttrs"
      :icon-hamburger-attrs="iconHamburgerAttrs"
      :icon-logo-attrs="iconLogoAttrs"
      :navigation-attrs="navigationAttrs"
      :class="modifiers"
      @hamburger:close="onHamburgerClose"
      @hamburger:open="onHamburgerOpen"
    />`,
  }),
};

export const Simple = {
  render: (args) => ({
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
      :button-brand-attrs="buttonBrandAttrs"
      :button-hamburger-attrs="buttonHamburgerAttrs"
      :icon-hamburger-attrs="iconHamburgerAttrs"
      :icon-logo-attrs="iconLogoAttrs"
      :navigation-attrs="navigationAttrs"
      :class="modifiers"
      @hamburger:close="onHamburgerClose"
      @hamburger:open="onHamburgerOpen"
    />`,
  }),
};
Simple.args = {
  modifiers: [ 'ui-header--simple' ],
  iconLogoAttrs: { style: '--icon-color: var(--color-icon-secondary);' },
};

export const SimpleWithoutLogo = {
  render: (args) => ({
    components: { UiHeader },
    setup() {
      const logo = false;
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
      :button-brand-attrs="buttonBrandAttrs"
      :button-hamburger-attrs="buttonHamburgerAttrs"
      :icon-hamburger-attrs="iconHamburgerAttrs"
      :icon-logo-attrs="iconLogoAttrs"
      :navigation-attrs="navigationAttrs"
      :class="modifiers"
      @hamburger:close="onHamburgerClose"
      @hamburger:open="onHamburgerOpen"
    />`,
  }),
};
SimpleWithoutLogo.args = {
  modifiers: [ 'ui-header--simple' ],
  iconLogoAttrs: { style: '--icon-color: var(--color-icon-secondary);' },
};

export const HamburgerMenuAlwaysDisplay = {
  render: (args) => ({
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
      :button-brand-attrs="buttonBrandAttrs"
      :button-hamburger-attrs="buttonHamburgerAttrs"
      :icon-hamburger-attrs="iconHamburgerAttrs"
      :icon-logo-attrs="iconLogoAttrs"
      :navigation-attrs="navigationAttrs"
      :class="modifiers"
      @hamburger:close="onHamburgerClose"
      @hamburger:open="onHamburgerOpen"
    />`,
  }),

  args: { hamburgerMatchMedia: '(min-width: 0px)' },
};

export const WithoutHamburgerMenu = {
  render: (args) => ({
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
      :button-brand-attrs="buttonBrandAttrs"
      :button-hamburger-attrs="buttonHamburgerAttrs"
      :icon-hamburger-attrs="iconHamburgerAttrs"
      :icon-logo-attrs="iconLogoAttrs"
      :navigation-attrs="navigationAttrs"
      :class="modifiers"
      @hamburger:close="onHamburgerClose"
      @hamburger:open="onHamburgerOpen"
    />`,
  }),

  args: { hamburgerMatchMedia: '(max-width: 0px)' },
};

export const WithCustomBrand = {
  render: (args) => ({
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
    template: `<UiHeader
      :title="title"
      :logo="logo"
      :hamburgerMatchMedia="hamburgerMatchMedia"
      :navigation="navigation"
      :button-brand-attrs="buttonBrandAttrs"
      :button-hamburger-attrs="buttonHamburgerAttrs"
      :icon-hamburger-attrs="iconHamburgerAttrs"
      :icon-logo-attrs="iconLogoAttrs"
      :navigation-attrs="navigationAttrs"
      :class="[
        'header-custom-brand',
        modifiers,
      ]"
      @hamburger:close="onHamburgerClose"
      @hamburger:open="onHamburgerOpen"
    />`,
  }),
};

export const WithBrandSlot = {
  render: (args) => ({
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
      :button-brand-attrs="buttonBrandAttrs"
      :button-hamburger-attrs="buttonHamburgerAttrs"
      :icon-hamburger-attrs="iconHamburgerAttrs"
      :icon-logo-attrs="iconLogoAttrs"
      :navigation-attrs="navigationAttrs"
      :class="modifiers"
      @hamburger:close="onHamburgerClose"
      @hamburger:open="onHamburgerOpen"
    >
      <template #brand="{
        buttonBrandAttrs,
        iconLogoAttrs
      }">
        <UiButton
          v-bind="buttonBrandAttrs"
          class="ui-button--icon ui-header__brand"
        >
          <UiIcon
            v-bind="iconLogoAttrs"
            class="ui-icon--theme-brand ui-header__logo"
          />
        </UiButton>
      </template>
    </UiHeader>`,
  }),
};

export const WithLogoSlot = {
  render: (args) => ({
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
      :button-brand-attrs="buttonBrandAttrs"
      :button-hamburger-attrs="buttonHamburgerAttrs"
      :icon-hamburger-attrs="iconHamburgerAttrs"
      :icon-logo-attrs="iconLogoAttrs"
      :navigation-attrs="navigationAttrs"
      :class="modifiers"
      @hamburger:close="onHamburgerClose"
      @hamburger:open="onHamburgerOpen"
    >
      <template #logo="{ iconLogoAttrs }">
        <UiIcon
          v-bind="iconLogoAttrs"
          class="ui-header__logo"
        />
      </template>
    </UiHeader>`,
  }),
};

export const WithHamburgerSlot = {
  render: (args) => ({
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
      :button-brand-attrs="buttonBrandAttrs"
      :button-hamburger-attrs="buttonHamburgerAttrs"
      :icon-hamburger-attrs="iconHamburgerAttrs"
      :icon-logo-attrs="iconLogoAttrs"
      :navigation-attrs="navigationAttrs"
      :class="modifiers"
      @hamburger:close="onHamburgerClose"
      @hamburger:open="onHamburgerOpen"
    >
      <template #hamburger="{
        buttonHamburgerAttrs,
        iconHamburgerAttrs,
        handleHamburger
      }">
        <UiButton
          v-bind="buttonHamburgerAttrs"
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
  }),
};

export const WithNavigationSlot = {
  render: (args) => ({
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
      :button-brand-attrs="buttonBrandAttrs"
      :button-hamburger-attrs="buttonHamburgerAttrs"
      :icon-hamburger-attrs="iconHamburgerAttrs"
      :icon-logo-attrs="iconLogoAttrs"
      :navigation-attrs="navigationAttrs"
      :class="modifiers"
      @hamburger:close="onHamburgerClose"
      @hamburger:open="onHamburgerOpen"
    >
      <template #navigation="{
        navigationAttrs,
        navigation
      }">
        <UiNavigation
          v-bind="navigationAttrs"
          :items="navigation"
          class="ui-header__navigation"
        />
      </template>
    </UiHeader>`,
  }),
};
