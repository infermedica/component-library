import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiBulletPointsItem from '@/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import icons from '@/components/atoms/UiIcon/icons.ts';
import './UiBulletPoints.stories.scss';

export default {
  title: 'Molecules/BulletPoints',
  component: UiBulletPoints,
  args: {
    items: [
      'Painful swallowing',
      'Stuffy nose',
      'Sneeze',
      'Muscle pain',
      'Runny nose',
    ],
    tag: 'ul',
    type: '1',
    icon: 'bullet-common',
  },
  argTypes: {
    tag: {
      control: 'select',
      options: [
        'ul',
        'ol',
      ],
    },
    type: {
      control: 'select',
      options: [
        'a',
        'A',
        'i',
        'I',
        '1',
        'ar',
      ],
    },
    icon: {
      control: 'select',
      options: icons,
    },
    bulletPoint: {
      name: '<name>',
      description:
        'Use this slot to replace bullet point item content. Require `name` in item object.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
  },
  parameters: { cssProperties: { '--bullet-points-gap': 'var(--space-4)' } },
};

export const UnorderedList = {
  render: (args) => ({
    components: { UiBulletPoints },
    setup() {
      return { ...args };
    },
    template: `<UiBulletPoints
      :tag="tag"
      :type="type"
      :items="items"
    />`,
  }),
};

export const OrderedList = {
  render: (args) => ({
    components: { UiBulletPoints },
    setup() {
      return { ...args };
    },
    template: `<UiBulletPoints
      :tag="tag"
      :type="type"
      :items="items"
    />`,
  }),

  args: { tag: 'ol' },
};

export const NestingList = {
  render: (args) => ({
    components: { UiBulletPoints },
    setup() {
      return { ...args };
    },
    template: `<UiBulletPoints
      :tag="tag"
      :type="type"
      :items="items"
    />`,
  }),

  args: {
    items: [
      {
        name: 'painful-swallowing',
        text: 'Painful swallowing',
        'data-testid': 'painful',
        icon: 'bullet-common',
      },
      {
        name: 'stuffy-nose',
        text: 'Stuffy nose',
        children: [
          {
            name: 'painful-swallowing',
            text: 'Painful swallowing',
          },
          {
            name: 'stuffy-nose',
            text: 'Stuffy nose',
          },
        ],
      },
      {
        name: 'sneeze',
        text: 'Sneeze',
      },
      {
        name: 'muscle-pain',
        text: 'Muscle pain',
      },
      {
        name: 'runny-nose',
        text: 'Runny nose',
        children: {
          tag: 'ol',
          items: [
            {
              name: 'painful-swallowing',
              text: 'Painful swallowing',
            },
            {
              name: 'stuffy-nose',
              text: 'Stuffy nose',
            },
          ],
        },
      },
    ],
  },
};

export const WithCustomMarker = {
  render: (args) => ({
    components: { UiBulletPoints },
    setup() {
      return { ...args };
    },
    template: `<UiBulletPoints
      :tag="tag"
      :type="type"
      :items="items"
      class="bullet-points-custom-marker"
    />`,
  }),

  args: {
    items: [
      {
        name: 'painful-swallowing',
        text: 'Painful swallowing',
        bulletPointsItemAttrs: { icon: 'arrow-thin-up' },
      },
      {
        name: 'stuffy-nose',
        text: 'Stuffy nose',
        bulletPointsItemAttrs: { icon: 'arrow-thin-up' },
      },
      {
        name: 'sneeze',
        text: 'Sneeze',
        bulletPointsItemAttrs: { icon: 'arrow-thin-up' },
      },
      {
        name: 'muscle-pain',
        text: 'Muscle pain',
        bulletPointsItemAttrs: { icon: 'arrow-thin-up' },
      },
    ],
  },
};

export const WithBulletPointItemSlot = {
  render: (args) => ({
    components: {
      UiBulletPoints,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiBulletPoints
      :tag="tag"
      :type="type"
      :items="items"
    >
      <template #sneeze="{item}">
        {{ item.text }}
      </template>
    </UiBulletPoints>`,
  }),

  args: {
    items: [
      {
        name: 'painful-swallowing',
        text: 'Painful swallowing',
      },
      {
        name: 'stuffy-nose',
        text: 'Stuffy nose',
      },
      {
        name: 'sneeze',
        text: 'Sneeze',
      },
      {
        name: 'muscle-pain',
        text: 'Muscle pain',
      },
      {
        name: 'runny-nose',
        text: 'Runny nose',
      },
    ],
  },

  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithDefaultSlot = {
  render: (args) => ({
    components: {
      UiBulletPoints,
      UiBulletPointsItem,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiBulletPoints
      :tag="tag"
      :type="type"
    >
      <template
        v-for="(item, key) in items"
        :key="key"
      >
        <UiBulletPointsItem
          :icon="item.icon"
          :icon-marker-attrs="item.iconMarkerAttrs"
          :text-marker-attrs="item.textMarkerAttrs"
          :text-content-attrs="item.textContentAttrs"
        >
          {{ item }}
        </UiBulletPointsItem>
      </template>
    </UiBulletPoints>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithMarkerSlot = {
  render: (args) => ({
    components: {
      UiBulletPoints,
      UiBulletPointsItem,
      UiText,
      UiIcon,
    },
    setup() {
      return { ...args };
    },
    template: `<UiBulletPoints
      :tag="tag"
      :type="type"
      :items="items"
    >
      <template
        v-for="(item, key) in items"
        :key="key"
      >
        <UiBulletPointsItem
          :icon="item.icon"
          :icon-marker-attrs="item.iconMarkerAttrs"
          :text-marker-attrs="item.textMarkerAttrs"
          :text-content-attrs="item.textContentAttrs"
        >
          <template #marker="{
            isUnordered,
            icon,
            iconMarkerAttrs,
            textMarkerAttrs,
          }">
            <UiIcon
              v-if="isUnordered"
              v-bind="iconMarkerAttrs"
              class="ui-bullet-points-item__marker"
            />
            <UiText
              v-else
              v-bind="textMarkerAttrs"
              tag="span"
              class="ui-bullet-points-item__marker"
            />
          </template>
          {{ item }}
        </UiBulletPointsItem>
      </template>
    </UiBulletPoints>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithContentSlot = {
  render: (args) => ({
    components: {
      UiBulletPoints,
      UiBulletPointsItem,
      UiText,
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
        <UiBulletPointsItem
          :icon="item.icon"
          :icon-marker-attrs="item.iconMarkerAttrs"
          :text-marker-attrs="item.textMarkerAttrs"
          :text-content-attrs="item.textContentAttrs"
        >
          <template #content="{ textContentAttrs }">
            <div class="ui-bullet-points-item__content">
              <UiText v-bind="textContentAttrs">
                {{ item }}
              </UiText>
            </div>
          </template>
        </UiBulletPointsItem>
      </template>
    </UiBulletPoints>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};
