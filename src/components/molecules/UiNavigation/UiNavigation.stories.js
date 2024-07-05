import UiNavigation from '@/components/molecules/UiNavigation/UiNavigation.vue';
import UiNavigationItem from '@/components/molecules/UiNavigation/_internal/UiNavigationItem.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import { modifiers } from '@sb/helpers/argTypes';
import './UiNavigation.stories.scss';

export default {
  title: 'Molecules/Navigation',
  component: UiNavigation,
  tags: [ '!autodocs' ],
  args: {
    modifiers: [],
    items: [
      {
        label: 'Medical Certification',
        href: '#',
        'data-testid': 'medical-certification',
      },
      {
        label: 'Instruction for Use',
        href: '#',
      },
      {
        label: 'Terms of Service',
        href: '#',
      },
      {
        label: 'Privacy Policy',
        href: '#',
      },
    ],
  },
  argTypes: {
    navigationItem: {
      name: '<name>',
      description:
        'Use this slot to replace navigation item content. Require `name` in item object.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
    modifiers: modifiers({
      options: [
        'ui-navigation--small',
        'ui-navigation--theme-secondary',
        'ui-navigation--theme-brand',
      ],
    }),
  },
  parameters: {
    cssProperties: {
      '--navigation-flex-flow':
        'var(--navigation-flex-direction, row) var(--navigation-flex-wrap, wrap)',
      '--navigation-align-items': 'center',
      '--navigation-justify-content': 'flex-start',
      '--navigation-gap': 'var(--space-12) var(--space-16)',
    },
  },
};

export const Common = {
  render: (args) => ({
    components: { UiNavigation },
    setup() {
      return { ...args };
    },
    template: `<UiNavigation
      :items="items"
      :class="modifiers"
    />`,
  }),
};

export const Multiline = {
  render: (args) => ({
    components: { UiNavigation },
    setup() {
      return { ...args };
    },
    template: `<UiNavigation
      :items="items"
      :class="modifiers"
    />`,
  }),

  decorators: [ () => ({
    template: `<div class="max-w-120">
      <story />
    </div>`,
  }) ],
};

export const Secondary = {
  render: (args) => ({
    components: { UiNavigation },
    setup() {
      return { ...args };
    },
    template: `<UiNavigation
      :items="items"
      :class="modifiers"
    />`,
  }),

  args: { modifiers: [ 'ui-navigation--theme-secondary' ] },
};

export const OnBrand = {
  render: (args) => ({
    components: { UiNavigation },
    setup() {
      return { ...args };
    },
    template: `<UiNavigation
      :items="items"
      :class="modifiers"
    />`,
  }),

  args: { modifiers: [ 'ui-navigation--theme-brand' ] },
  parameters: { backgrounds: { default: 'brand' } },
};

export const Small = {
  render: (args) => ({
    components: { UiNavigation },
    setup() {
      return { ...args };
    },
    template: `<UiNavigation
      :items="items"
      :class="modifiers"
    />`,
  }),

  args: { modifiers: [ 'ui-navigation--small' ] },
};

export const Vertical = {
  render: (args) => ({
    components: { UiNavigation },
    setup() {
      return { ...args };
    },
    template: `<UiNavigation
      :items="items"
      :class="[
        'navigation-vertical',
        modifiers,
      ]"/>`,
  }),
};

export const WithNavigationItemSlot = {
  render: (args) => ({
    components: { UiNavigation },
    setup() {
      return { ...args };
    },
    template: `<UiNavigation
      :items="items"
      :class="modifiers"
    >
      <template #medical-certification="{ item }">
        {{ item.label }}
      </template>
    </UiNavigation>`,
  }),

  args: {
    items: [
      {
        name: 'medical-certification',
        label: 'Medical Certification',
        href: '#',
      },
      {
        name: 'instruction-for-use',
        label: 'Instruction for Use',
        href: '#',
      },
      {
        name: 'terms-of-service',
        label: 'Terms of Service',
        href: '#',
      },
      {
        name: 'privacy-policy',
        label: 'Privacy Policy',
        href: '#',
      },
    ],
  },
};

export const WithDefaultSlot = {
  render: (args) => ({
    components: {
      UiNavigation,
      UiNavigationItem,
    },
    setup() {
      return { ...args };
    },
    template: `<UiNavigation
      :class="modifiers"
    >
      <template
        v-for="({name, label, ...attrs}, key) in items"
        :key="key"
      >
        <UiNavigationItem
          class=" ui-navigation__item"
          v-bind="attrs"
        >
          {{ label }}
        </UiNavigationItem>
      </template>
    </UiNavigation>`,
  }),
};

export const WithIconInNavigationItemSlot = {
  render: (args) => ({
    components: {
      UiNavigation,
      UiIcon,
    },
    setup() {
      return { ...args };
    },
    template: `<UiNavigation
      :items="items"
      :class="modifiers"
    >
      <template #medical-certification="{ item }">
        <UiIcon
          icon="info-filled"
          class="ui-button__icon"
        /> {{ item.text }}
      </template>
    </UiNavigation>`,
  }),

  args: {
    items: [
      {
        name: 'medical-certification',
        label: 'Medical Certification',
        href: '#',
      },
      {
        name: 'instruction-for-use',
        label: 'Instruction for Use',
        href: '#',
      },
      {
        name: 'terms-of-service',
        label: 'Terms of Service',
        href: '#',
      },
      {
        name: 'privacy-policy',
        label: 'Privacy Policy',
        href: '#',
      },
    ],
  },
};
