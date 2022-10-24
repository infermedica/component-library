import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiListItemSuffix from '@/components/organisms/UiList/_internal/UiListItemSuffix.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';
import { modifiers } from '@sb/helpers/argTypes';
import './UiList.stories.scss';

export default {
  title: 'Organisms/List',
  component: UiList,
  subcomponents: {
    UiListItem,
    UiListItemSuffix,
  },
  args: {
    items: [
      'Painful swallowing',
      'Stuffy nose',
      'Sneeze',
      'Muscle pain',
      'Runny nose',
    ],
    tag: 'ul',
    modifiers: [],
  },
  argTypes: {
    tag: {
      options: [
        'ul',
        'ol',
      ],
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
    modifiers: modifiers({ options: [ 'ui-list--has-error' ] }),
  },
};

const Template = (args) => ({
  components: { UiList },
  setup() {
    return { ...args };
  },
  template: `<UiList 
      :class="modifiers"
      :tag="tag"
      :items="items"
  />`,
});

export const Common = Template.bind({});

export const WithListItemSlot = (args) => ({
  components: {
    UiList,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiList 
      :class="modifiers"
      :tag="tag"
      :items="items"
  >
    <template #painful-swallowing="{ item }">
      <UiText>{{ item.label }}</UiText>
    </template>
  </UiList>`,
});
WithListItemSlot.args = {
  items: [
    {
      name: 'painful-swallowing',
      label: 'Painful swallowing',
      listItemAttrs: { 'data-testid': 'painful' },
    },
    {
      name: 'stuffy-nose',
      label: 'Stuffy nose',
    },
    {
      name: 'sneeze',
      label: 'Sneeze',
    },
    {
      name: 'muscle-pain',
      label: 'Muscle pain',
    },
    {
      name: 'runny-nose',
      label: 'Runny nose',
    },
  ],
};

export const WithSuffix = (args) => ({
  components: { UiList },
  setup() {
    return { ...args };
  },
  template: `<UiList 
      :class="modifiers"
      :tag="tag"
      :items="items"
  >
  </UiList>`,
});
WithSuffix.args = {
  items: [
    {
      name: 'painful-swallowing',
      label: 'Painful swallowing',
      hasSuffix: true,
      suffixAttrs: {
        icon: 'chevron-right',
        label: 'more info',
      },
    },
    {
      name: 'stuffy-nose',
      label: 'Stuffy nose',
      hasSuffix: true,
      suffixAttrs: {
        icon: 'chevron-right',
        label: 'more info',
      },
    },
    {
      name: 'sneeze',
      label: 'Sneeze',
      hasSuffix: true,
      suffixAttrs: {
        icon: 'chevron-right',
        label: 'more info',
      },
    },
    {
      name: 'runny-nose',
      label: 'Runny nose',
      hasSuffix: true,
      suffixAttrs: {
        icon: 'chevron-right',
        label: 'more info',
      },
    },
  ],
};

export const AsCondition = (args) => ({
  components: {
    UiList,
    UiListItem,
    UiHeading,
    UiProgress,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiList
      :class="modifiers"
      :tag="tag"
      :items="items"
  >
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiListItem class="ui-list__item list-condition-item" v-bind="item">
        <UiHeading level="3" >{{item.label}}</UiHeading>
        <div class="list-condition-item__container">
          <UiProgress class="list-condition-item__progress" :value="item.evidence.value" :max="item.evidence.max"/>
          <UiText class="list-condition-item__evidence ui-text--body-2-comfortable">{{item.evidence.label}}</UiText>
        </div>
      </UiListItem>
    </template>
  </UiList>`,
});
AsCondition.args = {
  items: [
    {
      name: 'common-cold',
      label: 'Common cold',
      evidence: {
        value: 8,
        max: 10,
        label: 'Strong evidence',
      },
      hasSuffix: true,
      suffixAttrs: {
        icon: 'chevron-right',
        label: 'Show details',
      },
    },
    {
      name: 'tension-type-headaches',
      label: 'Tension-type headaches',
      evidence: {
        value: 6,
        max: 10,
        label: 'Moderate evidence',
      },
      hasSuffix: true,
      suffixAttrs: {
        icon: 'chevron-right',
        label: 'Show details',
      },
    },
    {
      name: 'migraine',
      label: 'Migraine',
      evidence: {
        value: 4,
        max: 10,
        label: 'Moderate evidence',
      },
      hasSuffix: true,
      suffixAttrs: {
        icon: 'chevron-right',
        label: 'Show details',
      },
    },
  ],
};
