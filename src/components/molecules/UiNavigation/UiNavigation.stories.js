import UiNavigation from '@/components/molecules/UiNavigation/UiNavigation.vue';
import UiNavigationItem from '@/components/molecules/UiNavigation/_internal/UiNavigationItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import { modifiers } from '@sb/helpers/argTypes';

export default {
  title: 'Molecules/Navigation',
  component: UiNavigation,
  subcomponents: {
    UiNavigationItem,
    UiButton,
  },
  args: {
    modifiers: [],
    items: [
      {
        text: 'Medical Certification',
        href: '#',
      },
      {
        text: 'Instruction for Use',
        href: '#',
      },
      {
        text: 'Terms of Service',
        href: '#',
      },
      {
        text: 'Privacy Policy',
        href: '#',
      },
    ],
  },
  argTypes: {
    navigationItem: {
      name: '<name>',
      description: 'Use this slot to replace navigation item content. Require `name` in item object.',
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
};

const Template = (args) => ({
  components: { UiNavigation },
  setup() {
    return { ...args };
  },
  template: `<UiNavigation
    :items="items"
    :class="modifiers"
  >
  </UiNavigation>`,
});

export const Common = Template.bind({});

export const Multiline = Template.bind({});
Multiline.decorators = [() => ({ template: '<div style="max-width: 480px;"><story /></div>' })];

export const Secondary = Template.bind({});
Secondary.args = { modifiers: ['ui-navigation--theme-secondary'] };

export const OnBrand = Template.bind({});
OnBrand.args = { modifiers: ['ui-navigation--theme-brand'] };
OnBrand.parameters = { backgrounds: { default: 'brand' } };

export const Small = Template.bind({});
Small.args = { modifiers: 'ui-navigation--small' };

export const Vertical = (args) => ({
  components: { UiNavigation },
  setup() {
    return { ...args };
  },
  template: `<UiNavigation
    :items="items"
    :class="modifiers"
    style="--navigation-flex-direction: column; --navigation-align-items: flex-start;"
  />`,
});

export const WithNavigationItemSlot = (args) => ({
  components: { UiNavigation },
  setup() {
    return { ...args };
  },
  template: `<UiNavigation
    :items="items"
    :class="modifiers"
  >
    <template #medical-certification="{item}">
      {{ item.text }}
    </template>
  </UiNavigation>`,
});
WithNavigationItemSlot.args = {
  items: [
    {
      name: 'medical-certification',
      text: 'Medical Certification',
      href: '#',
    },
    {
      name: 'instruction-for-use',
      text: 'Instruction for Use',
      href: '#',
    },
    {
      name: 'terms-of-service',
      text: 'Terms of Service',
      href: '#',
    },
    {
      name: 'privacy-policy',
      text: 'Privacy Policy',
      href: '#',
    },
  ],
};

export const WithDefaultSlot = (args) => ({
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
      v-for="(item, key) in items"
      :key="key"
    >
      <UiNavigationItem
        class=" ui-navigation__item"
        v-bind="item.navigationItemAttrs"
      >
        {{ item.text }}
      </UiNavigationItem>
    </template>
  </UiNavigation>`,
});

export const WithIconInNavigationItemSlot = (args) => ({
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
    <template #medical-certification="{item}">
      <UiIcon 
        icon="info-filled" 
        class="ui-button__icon"
      /> {{ item.text }}
    </template>
  </UiNavigation>`,
});
WithIconInNavigationItemSlot.args = {
  items: [
    {
      name: 'medical-certification',
      text: 'Medical Certification',
      href: '#',
    },
    {
      name: 'instruction-for-use',
      text: 'Instruction for Use',
      href: '#',
    },
    {
      name: 'terms-of-service',
      text: 'Terms of Service',
      href: '#',
    },
    {
      name: 'privacy-policy',
      text: 'Privacy Policy',
      href: '#',
    },
  ],
};
