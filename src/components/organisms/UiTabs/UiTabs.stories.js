import UiTabs from '@/components/organisms/UiTabs/UiTabs.vue';
import UiTabsItem from '@/components/organisms/UiTabs/_internal/UiTabsItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { ref } from 'vue';
import { modifiers } from '@sb/helpers/argTypes';

export default {
  title: 'Organisms/Tabs',
  component: UiTabs,
  subcomponents: { UiTabsItem, UiButton },
  args: {
    items: [
      {
        name: 'search',
        title: 'Search',
      },
      {
        name: 'point',
        title: 'Point on the body',
      },
    ],
    content: {
      search: 'Serum uric acid concentration',
      point: '1. Erythrocyte Sedimentation Rate',
    },
    initModelValue: 'search',
    modifiers: [],
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: {
        category: 'stories controls',
      },
      control: 'text',
    },
    modifiers: modifiers({ options: ['ui-tabs--fixed'] }),
    modelValue: {
      control: false,
    },
    tabsItem: {
      name: '<name>',
      description: 'Use this slot to replace tabs item content. Require `name` in item object.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
  },
  decorators: [() => ({ template: '<div style="min-height: 120px"><story /></div>' })],
  parameters: {
    cssprops: {
      'tabs-padding': {
        value: '0',
        control: 'text',
        description: '',
      },
      'tabs-divider-gap-y': {
        value: '55px',
        control: 'text',
        description: '',
      },
      'tabs-underline-border': {
        value: 'var(--color-border-divider)',
        control: 'text',
        description: '',
      },
      'tabs-underline-width': {
        value: '100%',
        control: 'text',
        description: '',
      },
      'tabs-underline-color': {
        value: 'var(--color-border-selection)',
        control: 'text',
        description: '',
      },
      'tabs-item-tab-fixed-margin': {
        value: '0',
        control: 'text',
        description: '',
      },
      'tabs-item-tab-fixed-padding': {
        value: 'var(--space-16) var(--space-8)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiTabs, UiText },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiTabs 
    v-model="modelValue"
    :items="items"
    :class="modifiers"
  >
    <template 
      v-for="(item, key) in items"
      #[item.name]="{item}"
      :key="key"
    >
      <UiText>{{content[item.name]}}</UiText>
    </template>
  </UiTabs>`,
});

export const Common = Template.bind({});

export const Fixed = Template.bind({});
Fixed.args = {
  modifiers: ['ui-tabs--fixed'],
};

export const AsInTheDesign = (args) => ({
  components: { UiTabs, UiTabsItem, UiText },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiTabs 
    v-model="modelValue"
    :items="items"
    :class="modifiers"
    style="--tabs-padding: 0 var(--space-20); --tabs-underline-x-default: var(--space-20);"
  >
    <template 
      v-for="(item, key) in items"
      #[item.name]="{item}"
      :key="key"
    >
      <UiText>{{content[item.name]}}</UiText>
    </template>
  </UiTabs>`,
});
AsInTheDesign.parameters = {
  layout: 'fullscreen',
};

export const WithContentSlot = (args) => ({
  components: {
    UiTabs, UiTabsItem, UiText, UiButton,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiTabs
    v-model="modelValue"
    :class="modifiers"
  >
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiTabsItem
        :name="item.name"
        :title="item.title"
      >
        <template #content="{isOpen, name, attrs}">
          <div
            v-show="isOpen"
            :id="name"
            role="region"
            :aria-labelledby="'toggler-' + name"
            class="ui-tabs-item__content"
            v-bind="attrs"
          >
            <UiText>{{content[name]}}</UiText>
          </div>
        </template>
      </UiTabsItem>
    </template>
  </UiTabs>`,
});
