import UiTabs from '@/components/organisms/UiTabs/UiTabs.vue';
import UiTabsItem from '@/components/organisms/UiTabs/_internal/UiTabsItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { actions } from '@storybook/addon-actions';
import { ref } from 'vue';
import { modifiers } from '@sb/helpers/argTypes';
import { WithTileSlot } from '@/components/organisms/UiSimpleQuestion/UiSimpleQuestion.stories';

const events = actions({ onUpdateModelValue: 'update:modelValue' });

export default {
  title: 'Organisms/Tabs',
  component: UiTabs,
  subcomponents: {
    UiTabsItem,
    UiButton,
  },
  args: {
    items: [
      {
        name: 'search',
        title: 'Search',
        'data-testid': 'search',
        buttonTabAttrs: { 'data-testid': 'search-button' },
        contentAttrs: { 'data-testid': 'search-content' },
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
      table: { category: 'stories controls' },
      control: 'text',
    },
    modifiers: modifiers({ options: [ 'ui-tabs--fixed' ] }),
    modelValue: { control: false },
    tabsItem: {
      name: '<name>',
      description: 'Use this slot to place tabs item content. Require `name` in item object.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
  },
  decorators: [ () => ({
    template: `<div class="min-h-30">
      <story />
    </div>`,
  }) ],
  parameters: {
    cssProperties: {
      '--tabs-padding-block': 'var(--tabs-padding-block-start, 0) var(--tabs-padding-block-end, 0)',
      '--tabs-padding-inline': 'var(--tabs-padding-inline-start, 0) var(--tabs-padding-inline-end, 0)',
    },
  },
};

const Template = (args) => ({
  components: {
    UiTabs,
    UiText,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiTabs 
    v-model="modelValue"
    :items="items"
    :class="modifiers"
    @update:modelValue="onUpdateModelValue"
  >
    <template 
      v-for="(item, key) in items"
      #[item.name]="{item}"
      :key="key"
    >
      <UiText>
        {{ content[item.name] }}
      </UiText>
    </template>
  </UiTabs>`,
});

export const Common = Template.bind({});

export const Fixed = Template.bind({});
Fixed.args = { modifiers: [ 'ui-tabs--fixed' ] };

export const WithDefaultSlot = (args) => ({
  components: {
    UiTabs,
    UiTabsItem,
    UiText,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
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
        :button-attrs="item.buttonTabAttrs"
        :content-attrs="item.contentAttrs"
        v-bind="{
          'data-testid': item['data-testid'],
        }"
      >
        <UiText>
          {{ content[item.name] }}
        </UiText>
      </UiTabsItem>
    </template>
  </UiTabs>`,
});
WithDefaultSlot.parameters = { chromatic: { disableSnapshot: true } };
