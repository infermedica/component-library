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
        tabsItemAttrs: {
          'data-testid': 'search',
        },
      },
      {
        name: 'point',
        title: 'Point on the body',
      },
      {
        name: 'drop',
        title: 'Drop body point',
      },
    ],
    content: {
      search: 'Serum uric acid concentration',
      point: '1. Erythrocyte Sedimentation Rate',
    },
    initModelValue: 'point',
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
      description: 'Use this slot to place tabs item content. Require `name` in item object.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
  },
  decorators: [() => ({ template: '<div style="min-height: 120px"><story /></div>' })],
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

export const WithDefaultSlot = (args) => ({
  components: { UiTabs, UiTabsItem, UiText },
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
          :title="item.title" 
          :name="item.name"
      >
        <UiText>{{content[item.name]}}</UiText>
      </UiTabsItem>
    </template>
  </UiTabs>`,
});
