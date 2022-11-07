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
import './UiList.stories.scss';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onUpdateInvalid: 'update:invalid',
  onClickSuffix: 'click:suffix',
  onClickInfoButton: 'click:info-button',
  clickShowDetails: 'click:show-details',
});

export default {
  title: 'Organisms/List',
  component: UiList,
  subcomponents: {
    UiListItem,
    UiListItemSuffixAsButton,
    UiListItemSuffixAsText,
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

export const NestingList = Template.bind({});
NestingList.args = {
  items: [
    {
      name: 'muscle-pain',
      label: 'Muscle pain',
    },
    {
      name: 'runny-nose',
      label: 'Runny nose',
      children: {
        items: [
          {
            name: 'stuffy-nose',
            label: 'Stuffy nose',
          },
          {
            name: 'sneeze',
            label: 'Sneeze',
          },
          {
            name: 'runny-nose',
            label: 'Runny nose',
          },
        ],
      },
    },
    {
      name: 'painful-swallowing',
      label: 'Painful swallowing',
    },
  ],
};

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

export const AsMultipleChoicesItem = (args) => ({
  components: {
    UiListItem,
    UiMultipleChoices,
    UiMultipleChoicesItem,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    const invalid = ref(args.initInvalid);

    return {
      ...args,
      ...events,
      modelValue,
      invalid,
    };
  },
  template: `<UiMultipleChoices
    v-model="modelValue"
    v-model:invalid="invalid"
    :hint="hint"
    :touched="touched"
    :items="items"
    :options="options"
    @update:modelValue="onUpdateModelValue"
    @update:invalid="onUpdateInvalid"
  >
    <template #list-item="{ item, index, value, options, hasError, updateHandler }">
      <UiListItem :class="['ui-multiple-choices__list-item', {'ui-list-item--has-error': hasError(index)}]">
        <UiMultipleChoicesItem
          :model-value="value[index]"
          v-bind="item"
          :options="options"
          :invalid="hasError(index)"
          class="ui-multiple-choices__choice"
          @update:model-value="updateHandler($event, index)"
        />
      </UiListItem>
    </template>
  </UiMultipleChoices>`,
});
AsMultipleChoicesItem.args = {
  touched: false,
  initInvalid: true,
  initModelValue: [],
  values: [
    'Yes',
    'No',
    'Don\'t know',
  ],
  hint: 'Select one answer in each row',
  items: [
    {
      label: 'I have diabetes',
      hint: 'Please select one answer',
      hasSuffix: true,

    },
    {
      label: 'I have hypertension',
      hint: 'Please select one answer',
      buttonInfoAttrs: { onClick: events.onClickInfoButton },
      translation: { info: 'How to check it?' },
    },
    {
      label: 'I have high cholesterol',
      hint: 'Please select one answer',
      translation: { info: 'How to check it?' },
    },
  ],
  options: [
    {
      label: 'Yes',
      value: 'present',
    },
    {
      label: 'No',
      value: 'absent',
    },
    {
      label: 'Don\'t know',
      value: 'unknown',
    },
  ],
};

export const AsCondition = (args) => ({
  components: {
    UiButton,
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
    :tag="tag"
    :items="items"
    listItemType="button"
  >
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiListItem class="list-condition-item" v-bind="item">
        <UiButton class="ui-button--text ui-button--small list-condition-item__button" @click="clickShowDetails">
          <UiHeading level="3">
            {{item.label}}
          </UiHeading>
          <div class="list-condition-item__container">
            <UiProgress class="list-condition-item__progress" :value="item.evidence.value" :max="10"/>
            <UiText class="ui-text--body-2-comfortable">
              {{item.evidence.label}}
            </UiText>
          </div>
          <div class="list-condition-item__suffix">
            Show details
            <UiIcon
              icon="chevron-right"
              class="ui-list-item-suffix__icon ui-button__icon "
            />
          </div>
        </UiButton>
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
        label: 'Strong evidence',
      },
    },
    {
      name: 'tension-type-headaches',
      label: 'Tension-type headaches',
      evidence: {
        value: 6,
        label: 'Moderate evidence',
      },
    },
    {
      name: 'migraine',
      label: 'Migraine',
      evidence: {
        value: 4,
        label: 'Moderate evidence',
      },
    },
  ],
};
