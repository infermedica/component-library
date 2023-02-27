import { ref } from 'vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiListItemSuffixAsButton from '@/components/organisms/UiList/_internal/UiListItemSuffixAsButton.vue';
import UiListItemSuffixAsText from '@/components/organisms/UiList/_internal/UiListItemSuffixAsText.vue';
import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { actions } from '@storybook/addon-actions';
import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiRadio from '@/components/atoms/UiRadio/UiRadio.vue';
import './UiList.stories.scss';
import { AsMultilevel } from '@/components/organisms/UiHorizontalPaging/UiHorizontalPaging.stories';
import docs from './UiList.mdx';

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
  parameters: { docs: { page: docs } },
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
        :class="[
          'list-condition-item',
          item.class,
        ]"
        @click="clickShowDetails"
      >
        <UiHeading level="3">
          {{ item.label }}
        </UiHeading>
        <div class="list-condition-item__probability">
          <UiProgress
            :value="item.evidence.value" 
            :max="10"
            class="list-condition-item__progress"
          />
          <UiText class="ui-text--body-2-comfortable list-condition-item__label">
            {{ item.evidence.label }}
          </UiText>
        </div>
        <template #suffix>
          <div class="list-condition-item__suffix">
            Show details <UiIcon
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
        :class="[
          'list-with-icon-item',
          item.class,
        ]"
        @click="clickShowDetails"
      >
        <UiIcon
          icon="calendar"
          class="ui-button__icon list-with-icon-item__prefix-icon"
        />
        <div class="list-with-icon-item__content">
          <UiHeading level="4">
            {{ item.label }}
          </UiHeading>
          <UiText class="list-with-icon-item__description">
            {{ item.label }}
          </UiText>
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

const handleExplicationFocus = (event) => {
  const {
    key, target,
  } = event;
  if (key !== 'ArrowRight') return;
  const explicationButton = target.parentElement.querySelector('button');
  if (explicationButton) {
    event.preventDefault();
    explicationButton.focus();
  }
};
const handleExplicationUnfocus = (event) => {
  const {
    key, target,
  } = event;
  if (key !== 'ArrowLeft') return;
  const input = target.parentElement.parentElement.querySelector('input');
  if (input) {
    event.preventDefault();
    input.focus();
  }
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
      handleExplicationFocus,
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
        :class="[
          'list-checkbox-item',
          item.class,
        ]"
        @keydown="handleExplicationFocus"
      >
       {{ item.label }}
      </UiListItem>
    </template>
  </UiList>`,
});
const checkboxWithError = {
  class: [
    'ui-list-item--has-error',
    'ui-checkbox--has-error',
  ],
};
const checkboxWithInfo = {
  hasSuffix: true,
  textLabelAttrs: { class: [ 'list-checkbox-item__checkbox-label' ] },
  suffixAttrs: {
    icon: 'info',
    iconSuffixAttrs: { class: [ 'list-checkbox-item__suffix-icon' ] },
    label: 'More info',
    labelSuffixAttrs: { class: [ 'visual-hidden' ] },
    class: [ 'list-checkbox-item__suffix' ],
    tabindex: -1,
    onClick: events.onClickInfoButton,
    onKeydown: handleExplicationUnfocus,
  },
};
WithCheckbox.args = {
  items: items.map((item, index) => {
    if (index === 1) {
      return {
        label: item,
        value: item,
        tag: UiCheckbox,
        ...checkboxWithInfo,
        ...checkboxWithError,
      };
    }
    if (index === 2) {
      return {
        label: item,
        value: item,
        tag: UiCheckbox,
        ...checkboxWithError,
      };
    }
    return {
      label: item,
      value: item,
      tag: UiCheckbox,
    };
  }),
};

export const WithRadio = (args) => ({
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
      handleExplicationFocus,
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
        :class="[
          'list-radio-item',
          item.class,
        ]"
        @keydown="handleExplicationFocus"
      >
       {{ item.label }}
      </UiListItem>
    </template>
  </UiList>`,
});
const radioWithError = {
  class: [
    'ui-list-item--has-error',
    'ui-radio--has-error',
  ],
};
const radioWithInfo = {
  hasSuffix: true,
  textLabelAttrs: { class: [ 'list-radio-item__radio-label' ] },
  suffixAttrs: {
    icon: 'info',
    iconSuffixAttrs: { class: [ 'list-radio-item__suffix-icon' ] },
    label: 'More info',
    labelSuffixAttrs: { class: [ 'visual-hidden' ] },
    class: [ 'list-radio-item__suffix' ],
    tabindex: -1,
    onClick: events.onClickInfoButton,
    onKeydown: handleExplicationUnfocus,
  },
};
WithRadio.args = {
  items: items.map((item, index) => {
    if (index === 1) {
      return {
        label: item,
        value: item,
        tag: UiRadio,
        ...radioWithInfo,
        ...radioWithError,
      };
    }
    if (index === 2) {
      return {
        label: item,
        value: item,
        tag: UiRadio,
        ...radioWithError,
      };
    }
    return {
      label: item,
      value: item,
      tag: UiRadio,
    };
  }),
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
      <UiText>
        {{ item }}
      </UiText>
    </template>
  </UiList>`,
});
WithListItemSlot.parameters = { chromatic: { disableSnapshot: true } };
