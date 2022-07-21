import { modifiers } from '@sb/helpers/argTypes';
import UiNavigation from '@/components/molecules/UiNavigation/UiNavigation.vue';
import UiNavigationItem from './_internal/UiNavigationItem.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';

export default {
  title: 'Molecules/Navigation',
  component: UiNavigation,
  subcomponents: { UiNavigationItem, UiButton },
  args: {
    modifiers: [],
    items: [
      { text: 'Medical Certification', href: '#' },
      { text: 'Instruction for Use', href: '#' },
      { text: 'Terms of Service', href: '#' },
      { text: 'Privacy Policy', href: '#' },
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
        'ui-navigation--secondary',
        'ui-navigation--small',
      ],
    }),
  },
  parameters: {
    cssprops: {
      'navigation-display': {
        value: 'inline-flex',
        control: 'text',
        description: '',
      },
      'navigation-flow': {
        value: 'row wrap',
        control: 'text',
        description: '',
      },
      'navigation-align-items': {
        value: 'center',
        control: 'text',
        description: '',
      },
      'navigation-justify-content': {
        value: 'center',
        control: 'text',
        description: '',
      },
      'navigation-margin': {
        value: '0 calc(var(--space-8) * -1)',
        control: 'text',
        description: '',
      },
      'navigation-multiline-margin': {
        value: '0 calc(var(--space-8) * -1) calc(var(--space-12) * -1)',
        control: 'text',
        description: '',
      },
      'navigation-item-multiline-margin': {
        value: '0 var(--space-8) var(--space-12)',
        control: 'text',
        description: '',
      },
    },
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

export const Secondary = Template.bind({});
Secondary.args = {
  modifiers: 'ui-navigation--secondary',
};

export const Small = Template.bind({});
Small.args = {
  modifiers: 'ui-navigation--small',
};

export const Vertical = (args) => ({
  components: { UiNavigation },
  setup() {
    return { ...args };
  },
  template: `<UiNavigation
    :items="items"
    :class="modifiers"
    style="--navigation-flow: column wrap; --navigation-align-items: flex-start"
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
    { name: 'medical-certification', text: 'Medical Certification', href: '#' },
    { name: 'instruction-for-use', text: 'Instruction for Use', href: '#' },
    { name: 'terms-of-service', text: 'Terms of Service', href: '#' },
    { name: 'privacy-policy', text: 'Privacy Policy', href: '#' },
  ],
};

export const WithDefaultSlot = (args) => ({
  components: { UiNavigation, UiNavigationItem },
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
  components: { UiNavigation, UiIcon },
  setup() {
    return { ...args };
  },
  template: `<UiNavigation
    :items="items"
    :class="modifiers"
  >
    <template #medical-certification="{item}">
      <UiIcon 
        icon="emergency" 
        class="ui-button__icon"
      /> {{ item.text }}
    </template>
  </UiNavigation>`,
});
WithIconInNavigationItemSlot.args = {
  items: [
    {
      name: 'medical-certification', text: 'Medical Certification', href: '#', navigationItemAttrs: { class: 'ui-button--has-icon' },
    },
    { name: 'instruction-for-use', text: 'Instruction for Use', href: '#' },
    { name: 'terms-of-service', text: 'Terms of Service', href: '#' },
    { name: 'privacy-policy', text: 'Privacy Policy', href: '#' },
  ],
};
