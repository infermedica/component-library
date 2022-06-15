import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import icons from '@/components/atoms/UiIcon/icons';

export default {
  title: 'Molecules/BulletPoints',
  component: UiBulletPoints,
  subcomponents: {
    UiBulletPointsItem, UiIcon, UiText,
  },
  args: {
    items: ['Painful swallowing', 'Stuffy nose', 'Sneeze', 'Muscle pain', 'Runny nose'],
    tag: 'ul',
    type: '1',
    icon: 'bullet-common',
  },
  argTypes: {
    tag: {
      control: 'select',
      options: ['ul', 'ol'],
    },
    type: {
      control: 'select',
      options: ['a', 'A', 'i', 'I', '1', 'ar'],
    },
    icon: {
      control: 'select',
      options: icons,
    },
    bulletPoint: {
      name: '<name>',
      description: 'Use this slot to replace bullet point item content. Require `name` in item object.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
  },
};

const Template = (args) => ({
  components: { UiBulletPoints },
  setup() {
    return { ...args };
  },
  template: `<UiBulletPoints 
      :tag="tag"
      :type="type"
      :items="items"
  />`,
});
export const UnorderedList = Template.bind({});

export const OrderedList = Template.bind({});
OrderedList.args = {
  tag: 'ol',
};

export const NestingList = Template.bind({});
NestingList.args = {
  items: [
    { name: 'painful-swallowing', text: 'Painful swallowing', bulletPointsItemAttrs: { 'data-testid': 'painful', icon: 'bullet-common' } },
    {
      name: 'stuffy-nose',
      text: 'Stuffy nose',
      children: [
        { name: 'painful-swallowing', text: 'Painful swallowing' },
        { name: 'stuffy-nose', text: 'Stuffy nose' },
      ],
    },
    { name: 'sneeze', text: 'Sneeze' },
    { name: 'muscle-pain', text: 'Muscle pain' },
    {
      name: 'runny-nose',
      text: 'Runny nose',
      children: {
        bulletPointAttrs: {
          tag: 'ol',
        },
        items: [
          { name: 'painful-swallowing', text: 'Painful swallowing' },
          { name: 'stuffy-nose', text: 'Stuffy nose' },
        ],
      },
    },
  ],
};

export const WithBulletPointItemSlot = (args) => ({
  components: { UiBulletPoints, UiText },
  setup() {
    return { ...args };
  },
  template: `<UiBulletPoints
      :tag="tag"
      :type="type"
      :items="items"
  >
    <template #sneeze="{item}">
      <UiText>{{item.text}}</UiText>
    </template>
  </UiBulletPoints>`,
});
WithBulletPointItemSlot.args = {
  items: [
    { name: 'painful-swallowing', text: 'Painful swallowing' },
    { name: 'stuffy-nose', text: 'Stuffy nose' },
    { name: 'sneeze', text: 'Sneeze' },
    { name: 'muscle-pain', text: 'Muscle pain' },
    { name: 'runny-nose', text: 'Runny nose' },
  ],
};

export const WithDefaultSlot = (args) => ({
  components: { UiBulletPoints, UiBulletPointsItem, UiText },
  setup() {
    return { ...args };
  },
  template: `<UiBulletPoints
    :tag="tag"
    :type="type"
  >
  <template v-for="(item, key) in items" :key="key">
    <UiBulletPointsItem>
      <UiText>{{item}}</UiText>
    </UiBulletPointsItem>
  </template>
  </UiBulletPoints>`,
});

export const WithMarkerSlot = (args) => ({
  components: {
    UiBulletPoints, UiBulletPointsItem, UiText, UiIcon,
  },
  setup() {
    return { ...args };
  },
  template: `<UiBulletPoints
    :tag="tag"
    :type="type"
    :items="items"
  >
  <template v-for="(item, key) in items" :key="key">
    <UiBulletPointsItem>
      <UiText>{{item}}</UiText>
      <template #marker="{isUnordered, icon}">
        <UiIcon
            v-if="isUnordered"
            :icon="icon"
            class="ui-bullet-points-item__marker"
        />
        <UiText
            v-else
            tag="span"
            class="ui-bullet-points-item__marker"
        />
      </template>
    </UiBulletPointsItem>
  </template>
  </UiBulletPoints>`,
});

export const WithContentSlot = (args) => ({
  components: {
    UiBulletPoints, UiBulletPointsItem, UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiBulletPoints
    :tag="tag"
    :type="type"
    :items="items"
  >
  <template v-for="(item, key) in items" :key="key">
    <UiBulletPointsItem>
      <template #content>
        <div class="ui-bullet-points-item__content">
          <UiText>{{item}}</UiText>
        </div>
      </template>
    </UiBulletPointsItem>
  </template>
  </UiBulletPoints>`,
});
