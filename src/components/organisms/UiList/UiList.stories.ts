import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiList,
  type ListProps,
  UiButton,
} from '@index';
import {
  getArgTypes,
  getAttrs,
} from '@sb/helpers';
import { actions } from '@storybook/addon-actions';
import {
  BasicStories,
  BasicStoriesSource,
  AsConditionStories,
  AsConditionStoriesSource,
  IconInHeadingStories,
  IconInHeadingStoriesSource,
} from './stories';

type ListArgsType = ListProps;
type ListMetaType = Meta<ListArgsType>;
type ListStoryType = StoryObj<ListArgsType>;

const {
  argTypes,
  args,
} = getArgTypes(UiList);

const items = [
  'Painful swallowing',
  'Stuffy nose',
  'Sneeze',
  'Muscle pain',
  'Runny nose',
].map((item) => ({
  label: item,
  hasSuffix: false,
}));

const meta = {
  title: 'Organisms/List',
  component: UiList,
  args: {
    ...args,
    items,
  },
  argTypes: {
    ...argTypes,
    items: { control: 'object' },
  },
  // excludeStories: [ 'HasChildren' ],
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies ListMetaType;
export default meta;

export const Basic: ListStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<BasicStories v-bind="{...attrs}"/>',
    };
  },
};
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };
export const LargeList: ListStoryType = { ...Basic };
LargeList.args = {
  items: [
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
  ],
};
export const HasChildren: ListStoryType = { ...Basic };
HasChildren.args = {
  items: items.map((item) => ({
    ...item,
    children: { items },
  })),
};
export const HasError: ListStoryType = { ...Basic };
HasError.args = {
  items: items.map((item) => ({
    ...item,
    class: 'ui-list-item--has-error',
  })),
};
export const HasTextSuffix: ListStoryType = { ...Basic };
HasTextSuffix.args = {
  items: items.map((item) => ({
    ...item,
    hasSuffix: true,
    suffixAttrs: { label: 'more info' },
  })),
};
const events = actions({ onClick: 'click' });
export const HasButtonSuffix: ListStoryType = { ...Basic };
HasButtonSuffix.args = {
  items: items.map((item) => ({
    ...item,
    hasSuffix: true,
    suffixAttrs: {
      icon: 'chevron-right',
      label: 'more info',
      ...events,
      iconAttrs: { class: 'ui-button__icon' },
    },
  })),
};
export const AsCondition: ListStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { AsConditionStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<AsConditionStories v-bind="{...attrs}"/>',
    };
  },
};
AsCondition.parameters = { docs: { source: { code: AsConditionStoriesSource } } };
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
  ].map((item) => ({
    ...item,
    tag: UiButton,
    class: [
      'ui-button--outlined',
      'as-condition__content',
    ],
    hasSuffix: true,
    icon: 'chevron-right',
    ...events,
    suffixAttrs: {
      label: 'Show details',
      class: [ 'as-condition__suffix' ],
    },
  })),
};
export const IconInHeading: ListStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { IconInHeadingStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<IconInHeadingStories v-bind="{...attrs}"/>',
    };
  },
};
IconInHeading.parameters = { docs: { source: { code: IconInHeadingStoriesSource } } };
IconInHeading.args = {
  items: items.map((item) => ({
    ...item,
    tag: UiButton,
    class: [
      'ui-button--outlined',
      'icon-in-heading__content',
    ],
    hasSuffix: true,
    icon: 'arrow-right',
    ...events,
    suffixAttrs: { class: [ 'icon-in-heading__suffix' ] },
  })),
};
