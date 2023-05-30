import { ref } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { useArgTypes } from '@sb/helpers';
import { content as contentArgTypes } from '@sb/helpers/argTypes';
import { withModelValue } from '@sb/decorators';
import type {
  TabsProps,
  TabsItemAttrsProps,
} from '@index';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiTabs from '@/components/organisms/UiTabs/UiTabs.vue';

type TabsArgsType = TabsProps & {
  items?: TabsProps[],
  content?: Record<string, string>,
  modifiers?: string[]
}

type TabsMetaType = Meta<TabsArgsType>;
type TabsStoryType = StoryObj<TabsArgsType>

const complexItemsData: TabsItemAttrsProps[] = [
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
];

const { argTypes } = useArgTypes(UiTabs);

const meta = {
  title: 'Organisms/Tabs2',
  component: UiTabs,
  args: {
    modelValue: 'point',
    items: complexItemsData,
    content: {
      search: 'Serum uric acid concentration',
      point: '1. Erythrocyte Sedimentation Rate',
    },
    modifiers: [],
  },
  argTypes: {
    ...argTypes,
    content: contentArgTypes,
  },
  decorators: [ withModelValue ],
  parameters: {
    cssProperties: {
      '--tabs-padding-block': 'var(--tabs-padding-block-start, 0) var(--tabs-padding-block-end, 0)',
      '--tabs-padding-inline':
        'var(--tabs-padding-inline-start, 0) var(--tabs-padding-inline-end, 0)',
    },
  },
} satisfies TabsMetaType;

export default meta;

export const Basic: TabsStoryType = {
  render: () => ({
    components: {
      UiTabs,
      UiText,
    },
    setup(props, { attrs }) {
      const {
        modelValue, content, items, modifiers, ...args
      } = attrs;
      return {
        args,
        modelValue,
        items,
        content,
        modifiers,
      };
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
        <UiText>
          {{ content[item.name] }}
        </UiText>
      </template>
    </UiTabs>`,
  }),
};
