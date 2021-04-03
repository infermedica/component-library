import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';

export default {
  title: 'Organisms/List',
  component: UiList,
  subcomponents: { UiListItem },
};

const Template = (args) => ({
  components: { UiList, UiListItem, UiText },
  setup() {
    return { ...args };
  },
  template: `<UiList>
  <template 
    v-for="(item, key) in ['Painful swallowing', 'Stuffy nose', 'Sneeze', 'Muscle pain', 'Runny nose']" 
    :key="key"
  >
    <UiListItem>
      <UiText>{{item}}</UiText>
    </UiListItem>
  </template>
  </UiList>`,
});

export const Common = Template.bind({});
