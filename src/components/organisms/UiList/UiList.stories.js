import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { NestingList } from '@/components/molecules/UiBulletPoints/UiBulletPoints.stories';

export default {
  title: 'Organisms/List',
  component: UiList,
  subcomponents: { UiListItem },
  args: {
    items: ['Painful swallowing', 'Stuffy nose', 'Sneeze', 'Muscle pain', 'Runny nose'],
    tag: 'ul',
  },
  argTypes: {
    tag: {
      options: ['ul', 'ol'],
      control: 'select',
    },
    listItem: {
      name: '<name>',
      description: 'Use this slot to replace list item content. Require `name` in item object.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
  },
};

const Template = (args) => ({
  components: { UiList },
  setup() {
    return { ...args };
  },
  template: `<UiList 
      :tag="tag"
      :items="items"
  />`,
});

export const UnorderedList = Template.bind({});

export const WithListItemSlot = (args) => ({
  components: { UiList, UiText },
  setup() {
    return { ...args };
  },
  template: `<UiList 
      :tag="tag"
      :items="items"
  >
    <template #painful-swallowing="{ item }">
      <UiText>{{ item.text }}</UiText>
    </template>
  </UiList>`,
});
WithListItemSlot.args = {
  items: [
    { name: 'painful-swallowing', text: 'Painful swallowing' },
    { name: 'stuffy-nose', text: 'Stuffy nose' },
    { name: 'sneeze', text: 'Sneeze' },
    { name: 'muscle-pain', text: 'Muscle pain' },
    { name: 'runny-nose', text: 'Runny nose' },
  ],
};
