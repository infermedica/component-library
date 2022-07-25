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
    navigationItemsAttrs: {},
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
    :class="modifiers"
    :items="items"
    :navigationItemsAttrs="navigationItemsAttrs"
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
    :class="modifiers"
    style="--navigation-flow: column wrap; --navigation-align-items: flex-start"
    :items="items"
    :navigationItemsAttrs="navigationItemsAttrs"
  />`,
});

export const WithDefaultSlot = (args) => ({
  components: { UiNavigation, UiNavigationItem, UiIcon },
  setup() {
    return { ...args };
  },
  template: `<UiNavigation
    :class="modifiers"
    :navigationItemsAttrs="navigationItemsAttrs"
  >
    <template #default="{isSecondary, isSmall}">
      <template 
        v-for="(item, key) in items" 
        :key="key"
      >
        <UiNavigationItem
          class=" ui-navigation__item"
          :class="{'ui-button--secondary': isSecondary, 'ui-button--small': isSmall}"
          v-bind="item.navigationItemAttrs"
        >
          {{item.text}}
        </UiNavigationItem>
      </template>
    </template>  
  </UiNavigation>`,
});

export const WithCustomItemContent = (args) => ({
  components: { UiNavigation, UiNavigationItem, UiIcon },
  setup() {
    return { ...args };
  },
  template: `<UiNavigation
    :class="modifiers"
    :items="items"
    :navigationItemsAttrs="navigationItemsAttrs"
  >
    <template #medicalCertification="{item}">
      <UiIcon icon="emergency" style="--icon-color: var(--color-text-action-primary); --icon-size: 18px;"/>
    </template>
  </UiNavigation>`,
});

WithCustomItemContent.args = {
  items: [
    {
      name: 'medical-certification', text: 'Medical Certification', href: '#', navigationItemAttrs: { class: 'ui-button--has-icon' },
    },
    { name: 'instruction-for-use', text: 'Instruction for Use', href: '#' },
    { name: 'terms-of-service', text: 'Terms of Service', href: '#' },
    { name: 'privacy-policy', text: 'Privacy Policy', href: '#' },
  ],
  modifiers: [],
  navigationItemsAttrs: {},
};
