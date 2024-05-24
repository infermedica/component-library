import { ref } from 'vue';
import UiMenuItem from '@/components/organisms/UiMenu/_internal/UiMenuItem.vue';
import UiMenu from '@/components/organisms/UiMenu/UiMenu.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';
import './UiMenu.stories.scss';
import { modifiers } from '@sb/helpers/argTypes';

export default {
  title: 'Organisms/Menu',
  component: UiMenu,
  tags: [ '!autodocs' ],
  args: {
    modifiers: [],
    items: [
      { label: 'For business' },
      { label: 'Medical Certification' },
      { label: 'Instruction for Use' },
      { label: 'Terms of Service' },
      {
        label: 'Privacy policy',
        class: 'ui-menu-item--is-selected',
      },
      { label: 'Interview ID' },
    ],
    tag: 'ul',
  },
  argTypes: { modifiers: modifiers({ options: [ 'ui-menu--compact' ] }) },
  decorators: [ () => ({ template: '<div style="max-width: 21.875rem"><story /></div>' }) ],
  parameters: {
    cssProperties: {
      '--menu-item-button-padding-block': 'var(--space-4)',
      '--menu-item-button-padding-inline': 'var(--space-8)',
    },
  },
};

export const WithSelectedItem = {
  render: (args) => ({
    components: { UiMenu },
    setup() {
      return { ...args };
    },
    template: `<UiMenu
      :class="modifiers"
      :items="items"
    />`,
  }),
};

export const AsCompact = {
  render: (args) => ({
    components: { UiMenu },
    setup() {
      return { ...args };
    },
    template: `<UiMenu
      :class="modifiers"
      :items="items"
    />`,
  }),

  args: { modifiers: [ 'ui-menu--compact' ] },
};

export const WithItemsAsString = {
  render: (args) => ({
    components: { UiMenu },
    setup() {
      return { ...args };
    },
    template: `<UiMenu
      :class="modifiers"
      :items="items"
    />`,
  }),

  args: {
    items: [
      'For business',
      'Medical Certification',
      'Instruction for Use',
      'Privacy policy',
      'Interview ID',
    ],
  },
};

export const WithSuffix = {
  render: (args) => ({
    components: { UiMenu },
    setup() {
      return { ...args };
    },
    template: `<UiMenu
      :class="modifiers"
      :items="items"
    />`,
  }),

  args: {
    items: [
      {
        label: 'For business',
        icon: 'chevron-right',
        suffixVisible: 'always',
        suffixAttrs: {
          label: 'more info',
          iconSuffixAttrs: { 'data-testid': 'suffix-icon' },
        },
      },
      {
        label: 'Medical Certification',
        icon: 'chevron-right',
        suffixVisible: 'always',
        suffixAttrs: {
          label: 'more info',
          iconSuffixAttrs: { 'data-testid': 'suffix-icon' },
        },
      },
      {
        label: 'Instruction for Use',
        icon: 'chevron-right',
        suffixVisible: 'always',
        suffixAttrs: {
          label: 'more info',
          iconSuffixAttrs: { 'data-testid': 'suffix-icon' },
        },
      },
      {
        label: 'Privacy policy',
        icon: 'chevron-right',
        suffixVisible: 'always',
        suffixAttrs: {
          label: 'more info',
          iconSuffixAttrs: { 'data-testid': 'suffix-icon' },
        },
      },
      {
        label: 'Interview ID',
        icon: 'chevron-right',
        suffixVisible: 'always',
        suffixAttrs: {
          label: 'more info',
          iconSuffixAttrs: { 'data-testid': 'suffix-icon' },
        },
      },
    ],
  },
};

export const AsMobileMenu = {
  render: (args) => ({
    components: {
      UiMenu,
      UiText,
    },
    setup() {
      const language = [ {
        label: 'Language',
        icon: 'chevron-right',
        suffixVisible: 'always',
        suffixAttrs: { label: 'English' },
      } ];
      const other = [
        {
          label: 'For business',
          icon: 'chevron-right',
          suffixVisible: 'always',
          class: 'button--theme-secondary',
        },
        {
          label: 'Medical Certification',
          icon: 'chevron-right',
          suffixVisible: 'always',
          class: 'button--theme-secondary',
        },
        {
          label: 'Instruction for Use',
          icon: 'chevron-right',
          suffixVisible: 'always',
          class: 'button--theme-secondary',
        },
        {
          label: 'Terms of Service',
          icon: 'chevron-right',
          suffixVisible: 'always',
          class: 'button--theme-secondary',
        },
        {
          label: 'Privacy policy',
          icon: 'chevron-right',
          suffixVisible: 'always',
          class: 'button--theme-secondary',
        },
        {
          label: 'Interview ID',
          icon: 'chevron-right',
          suffixVisible: 'always',
          class: 'button--theme-secondary',
        },
      ];
      return {
        ...args,
        language,
        other,
      };
    },
    template: `<div class="menu-mobile-menu__content">
      <UiMenu
        :class="modifiers"
        :items="language"
      />
    </div>
    <div class="menu-mobile-menu__content">
      <UiMenu
        :class="modifiers"
        :items="other"
      />
    </div>
    <div class="menu-mobile-menu__footer">
      <UiText class="ui-text--theme-secondary">© 2021 Infermedica</UiText>
    </div>`,
  }),

  decorators: [ (story) => ({
    components: {
      story,
      UiSidePanel,
      UiButton,
    },
    setup() {
      const modelValue = ref(true);
      const toggleSidePanel = () => {
        modelValue.value = !modelValue.value;
      };
      return {
        modelValue,
        toggleSidePanel,
      };
    },
    template: `<div style="min-height: 680px;">
      <UiButton
        class="ui-button ui-button--text ui-button--theme-secondary"
        @click="toggleSidePanel"
      >
        Settings & Info
      </UiButton>
      <UiSidePanel
        v-model="modelValue"
        title="Settings & Info"
        class="menu-mobile-menu"
      >
        <story/>
      </UiSidePanel>
    </div>`,
  }) ],

  parameters: { viewport: { defaultViewport: 'mobile2' } },
};

export const AsPopoverContent = {
  render: (args) => ({
    components: {
      UiMenu,
      UiMenuItem,
    },
    setup() {
      const value = ref('English');
      const handleClick = (label) => {
        value.value = label;
      };
      return {
        ...args,
        value,
        handleClick,
      };
    },
    template: `<UiMenu
      :items="items"
      :class="modifiers"
    >
      <template
        v-for="({label}, key) in items"
        :key="key"
      >
        <UiMenuItem
          :class="{'ui-menu-item--is-selected': label === value}"
          @click="handleClick(label)"
        >
          {{ label }}
        </UiMenuItem>
      </template>
    </UiMenu>`,
  }),

  decorators: [ (story) => ({
    components: {
      UiPopover,
      story,
    },
    template: `<UiPopover style="--popover-content-padding-block: 0; --popover-content-padding-inline: 0; --popover-content-max-height: 20rem; max-width: 20rem">
      <story />
    </UiPopover>`,
  }) ],

  args: {
    items: [
      { label: 'Čeština' },
      { label: 'Deutsch' },
      { label: 'English' },
      { label: 'Español' },
      { label: 'Français' },
      { label: 'Italiano' },
      { label: 'Polski' },
      { label: 'Português' },
      { label: 'Русский' },
    ],
  },
};
