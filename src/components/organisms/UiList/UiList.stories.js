import { ref } from 'vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiListItemSuffixAsButton from '@/components/organisms/UiList/_internal/UiListItemSuffixAsButton.vue';
import UiListItemSuffixAsText from '@/components/organisms/UiList/_internal/UiListItemSuffixAsText.vue';
import UiMultipleChoices from '@/components/organisms/UiMultipleChoices/UiMultipleChoices.vue';
import UiMultipleChoicesItem from '@/components/organisms/UiMultipleChoices/_internal/UiMultipleChoicesItem.vue';
import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { actions } from '@storybook/addon-actions';
import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import './UiList.stories.scss';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onUpdateInvalid: 'update:invalid',
  onClickSuffix: 'click:suffix',
  onClickInfoButton: 'click:info-button',
  clickShowDetails: 'click:show-details',
});

const items = [
  'Painful swallowing',
  'Stuffy nose',
  'Sneeze',
  'Muscle pain',
  'Runny nose',
];

export default {
  title: 'Organisms/List',
  component: UiList,
  subcomponents: {
    UiListItem,
    UiListItemSuffixAsButton,
    UiListItemSuffixAsText,
  },
  args: {
    items,
    tag: 'ul',
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

export const Common = Template.bind({});

export const WithError = Template.bind({});
WithError.args = {
  items: items.map((item) => ({
    label: item,
    class: 'ui-list-item--has-error',
  })),
};

export const WithListItemSlot = (args) => ({
  components: {
    UiList,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiList
    :tag="tag"
    :items="items"
  >
    <template #painful-swallowing="{ item }">
      <UiText>{{ item }}</UiText>
    </template>
  </UiList>`,
});

export const WithSuffixAsText = (args) => ({
  components: { UiList },
  setup() {
    return { ...args };
  },
  template: `<UiList
    :tag="tag"
    :items="items"
  />`,
});
WithSuffixAsText.args = {
  items: [
    {
      name: 'painful-swallowing',
      label: 'Painful swallowing',
      hasSuffix: true,
      suffixAttrs: { label: 'more info' },
    },
    {
      name: 'stuffy-nose',
      label: 'Stuffy nose',
      hasSuffix: true,
      suffixAttrs: { label: 'more info' },
    },
    {
      name: 'sneeze',
      label: 'Sneeze',
      hasSuffix: true,
      suffixAttrs: { label: 'more info' },
    },
    {
      name: 'runny-nose',
      label: 'Runny nose',
      hasSuffix: true,
      suffixAttrs: { label: 'more info' },
    },
  ],
};

export const WithSuffixAsButton = WithSuffixAsText.bind({});
WithSuffixAsButton.args = {
  items: [
    {
      name: 'painful-swallowing',
      label: 'Painful swallowing',
      hasSuffix: true,
      suffixAttrs: {
        icon: 'chevron-right',
        label: 'more info',
        onClick: events.onClickSuffix,
      },
    },
    {
      name: 'stuffy-nose',
      label: 'Stuffy nose',
      hasSuffix: true,
      suffixAttrs: {
        icon: 'chevron-right',
        label: 'more info',
        onClick: events.onClickSuffix,
      },
    },
    {
      name: 'sneeze',
      label: 'Sneeze',
      hasSuffix: true,
      suffixAttrs: {
        icon: 'chevron-right',
        label: 'more info',
        onClick: events.onClickSuffix,
      },
    },
    {
      name: 'runny-nose',
      label: 'Runny nose',
      hasSuffix: true,
      suffixAttrs: {
        icon: 'chevron-right',
        label: 'more info',
        onClick: events.onClickSuffix,
      },
    },
  ],
};

export const AsCondition = (args) => ({
  components: {
    UiHeading,
    UiIcon,
    UiList,
    UiListItem,
    UiProgress,
    UiText,
  },
  setup() {
    return {
      ...args,
      ...events,
    };
  },
  template: `<UiList
    listItemType="button"
  >
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiListItem
        :tag="item.tag"
        :class="['list-condition-item', item.class]"
        @click="clickShowDetails"
      >
        <UiHeading level="3">{{ item.label }}</UiHeading>
        <div class="list-condition-item__probability">
          <UiProgress
            :value="item.evidence.value" 
            :max="10"
            class="list-condition-item__progress"
          />
          <UiText class="ui-text--body-2-comfortable">
            {{ item.evidence.label }}
          </UiText>
        </div>
        <template #suffix>
          <div class="list-condition-item__suffix">
            Show details
            <UiIcon
              icon="chevron-right"
              class="ui-button__icon list-condition-item__suffix-icon"
            />
          </div>
        </template>
      </UiListItem>
    </template>
  </UiList>`,
});
AsCondition.args = {
  items: [
    {
      name: 'common-cold',
      label: 'Common cold',
      tag: UiButton,
      class: [ 'ui-button--outlined' ],
      evidence: {
        value: 8,
        label: 'Strong evidence',
      },
    },
    {
      name: 'tension-type-headaches',
      label: 'Tension-type headaches',
      tag: UiButton,
      class: [ 'ui-button--outlined' ],
      evidence: {
        value: 6,
        label: 'Moderate evidence',
      },
    },
    {
      name: 'migraine',
      label: 'Migraine',
      tag: UiButton,
      class: [ 'ui-button--outlined' ],
      evidence: {
        value: 4,
        label: 'Moderate evidence',
      },
    },
  ],
};

export const WithIconInHeading = (args) => ({
  components: {
    UiHeading,
    UiIcon,
    UiList,
    UiListItem,
    UiText,
  },
  setup() {
    return {
      ...args,
      ...events,
    };
  },
  template: `<UiList
    :tag="tag"
    listItemType="button"
  >
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiListItem
        :tag="item.tag"
        :class="['list-with-icon-item', item.class]"
        @click="clickShowDetails"
      >
        <UiIcon
            icon="calendar"
            class="ui-button__icon list-with-icon-item__prefix-icon"
        />
        <div class="list-with-icon-item__content">
          <UiHeading level="4">{{ item.label }}</UiHeading>
          <UiText class="list-with-icon-item__description">{{ item.label }}</UiText>
        </div>
        <template #suffix>
          <UiIcon
              icon="arrow-right"
              class="ui-button__icon list-with-icon-item__suffix"
          />
        </template>
      </UiListItem>
    </template>
  </UiList>`,
});
WithIconInHeading.args = {
  items: items.map((item) => ({
    label: item,
    tag: UiButton,
    class: [ 'ui-button--outlined' ],
  })),
};

export const WithCheckbox = (args) => ({
  components: {
    UiHeading,
    UiIcon,
    UiList,
    UiListItem,
    UiText,
  },
  setup() {
    const modelValue = ref([]);

    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiList
    :tag="tag"
    listItemType="button"
  >
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiListItem
        v-model="modelValue"
        :value="item.value"
        :tag="item.tag"
        :has-suffix="item.hasSuffix"
        :suffix-attrs="item.suffixAttrs"
        :text-label-attrs="item.textLabelAttrs"
        :class="['list-checkbox-item', item.class]"
      >
       {{ item.label }}
      </UiListItem>
    </template>
  </UiList>`,
});
const withError = {
  class: [
    'ui-list-item--has-error',
    'ui-checkbox--has-error',
  ],
};
const withInfo = {
  hasSuffix: true,
  textLabelAttrs: { class: [ 'list-checkbox-item__checkbox-label' ] },
  suffixAttrs: {
    icon: 'info',
    iconSuffixAttrs: { class: [ 'list-checkbox-item__suffix-icon' ] },
    label: 'More info',
    labelAttrs: { class: [ 'visual-hidden' ] },
    class: [ 'list-checkbox-item__suffix' ],
    tabindex: -1,
    onClick: events.onClickInfoButton,
  },
};
WithCheckbox.args = {
  items: items.map((item, index) => {
    if (index === 1) {
      return {
        label: item,
        value: item,
        tag: UiCheckbox,
        ...withInfo,
        ...withError,
      };
    }
    if (index === 2) {
      return {
        label: item,
        value: item,
        tag: UiCheckbox,
        ...withError,
      };
    }
    return {
      label: item,
      value: item,
      tag: UiCheckbox,
    };
  }),
};
