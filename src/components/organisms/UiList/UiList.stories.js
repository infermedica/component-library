import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';

export default {
  title: 'Organisms/List',
  component: UiList,
  subcomponents: { UiListItem },
  args: {
    items: ['Painful swallowing', 'Stuffy nose', 'Sneeze', 'Muscle pain', 'Runny nose'],
    tag: 'ul',
  },
  argTypes: {
    items: {
      description: 'Use this control to set the items.',
      table: {
        category: 'stories controls',
      },
      control: 'array',
    },
    tag: {
      options: ['ul', 'ol'],
      control: 'select',
    },
  },
  parameters: {
    cssprops: [],
  },
};

const Template = (args) => ({
  components: { UiList, UiListItem, UiText },
  setup() {
    return { ...args };
  },
  template: `<UiList :tag="tag">
  <template 
    v-for="(item, key) in items" 
    :key="key"
  >
    <UiListItem>
      <UiText>{{item}}</UiText>
    </UiListItem>
  </template>
  </UiList>`,
});

export const Common = Template.bind({});
