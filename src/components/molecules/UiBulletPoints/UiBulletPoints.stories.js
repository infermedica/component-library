import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import icons from '@/components/atoms/UiIcon/icons';

export default {
  title: 'Molecules/BulletPoints',
  component: UiBulletPoints,
  subcomponents: {
    UiBulletPointsItem, UiBulletPoints, UiIcon, UiText,
  },
  args: {
    items: ['Painful swallowing', 'Stuffy nose', 'Sneeze', 'Muscle pain', 'Runny nose'],
    tag: 'ul',
    type: '1',
    icon: 'bullet-common',
  },
  argTypes: {
    tag: { control: { type: 'select', options: ['ul', 'ol'] } },
    type: { control: { type: 'select', options: ['a', 'A', 'i', 'I', '1', 'ar'] } },
    icon: {
      control: {
        type: 'select',
        options: icons,
      },
    },
  },
  parameters: {
    cssprops: [],
  },
};

const Template = (args) => ({
  components: { UiBulletPoints, UiBulletPointsItem, UiText },
  setup() {
    return { ...args };
  },
  template: `<UiBulletPoints
    :tag="tag"
    :type="type"
  >
    <template v-for="(item, key) in items" :key="key">
      <UiBulletPointsItem :icon="icon">
        <UiText>{{item}}</UiText>
      </UiBulletPointsItem>
    </template>
  </UiBulletPoints>`,
});

export const UnorderedList = Template.bind({});

export const OrderedList = Template.bind({});
OrderedList.args = {
  tag: 'ol',
};

export const NestingAList = (args) => ({
  components: { UiBulletPoints, UiBulletPointsItem, UiText },
  setup() {
    return { ...args };
  },
  template: `<UiBulletPoints
    tag="ol"
    type="1"
  >
    <template v-for="(item, key) in items" :key="key">
      <UiBulletPointsItem :icon="icon">
        <UiText>{{item}}</UiText>
        <UiBulletPoints
          tag="ol"
          type="a"
        >
          <template v-for="(item, key) in items" :key="key">
            <UiBulletPointsItem :icon="icon">
              <UiText>{{item}}</UiText>
              <UiBulletPoints
                tag="ul"
              >
                <template v-for="(item, key) in items" :key="key">
                  <UiBulletPointsItem :icon="icon">
                    <UiText>{{item}}</UiText>
                  </UiBulletPointsItem>
                </template>
              </UiBulletPoints>
            </UiBulletPointsItem>
          </template>
        </UiBulletPoints>
      </UiBulletPointsItem>
    </template>
  </UiBulletPoints>`,
});
NestingAList.args = {
  tag: 'ol',
  type: '1',
  items: ['Painful swallowing', 'Stuffy nose', 'Sneeze'],
};
NestingAList.argTypes = {
  items: { control: false },
  icon: { control: false },
  tag: { control: false },
  type: { control: false },
};
NestingAList.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const WithMarkerSlot = (args) => ({
  components: {
    UiBulletPoints, UiBulletPointsItem, UiIcon, UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiBulletPoints
    :tag="tag"
    :type="type"
  >
    <template v-for="(item, key) in items" :key="key">
      <UiBulletPointsItem :icon="icon">
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
        <UiText>{{item}}</UiText>
      </UiBulletPointsItem>
    </template>
  </UiBulletPoints>`,
});

export const WithContentSlot = (args) => ({
  components: { UiBulletPoints, UiBulletPointsItem, UiText },
  setup() {
    return { ...args };
  },
  template: `<UiBulletPoints
    :tag="tag"
    :type="type"
  >
    <template v-for="(item, key) in items" :key="key">
      <UiBulletPointsItem :icon="icon">
        <template #content>
          <div class="ui-bullet-points-item__content">
            <UiText>{{item}}</UiText>
          </div>
        </template>
      </UiBulletPointsItem>
    </template>
  </UiBulletPoints>`,
});
