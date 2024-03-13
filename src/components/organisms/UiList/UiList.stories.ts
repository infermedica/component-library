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
  argTypes,
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

// export const Long: ListStoryType = { ...Basic };
// Long.args = {
//   items: [
//     ...items,
//     ...items,
//     ...items,
//     ...items,
//     ...items,
//     ...items,
//     ...items,
//     ...items,
//     ...items,
//     ...items,
//
//   ],
// };

export const HasError: ListStoryType = { ...Basic };
HasError.args = {
  items: items.map((item) => ({
    ...item,
    class: 'ui-list-item--has-error',
  })),
};

export const TextSuffix: ListStoryType = { ...Basic };
TextSuffix.args = {
  items: items.map((item) => ({
    ...item,
    hasSuffix: true,
    suffixAttrs: { label: 'more info' },
  })),
};

export const ButtonSuffix: ListStoryType = { ...Basic };
ButtonSuffix.args = {
  items: items.map((item) => ({
    ...item,
    hasSuffix: true,
    suffixAttrs: {
      icon: 'chevron-right',
      label: 'more info',
      onClick: () => ({}),
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
    // hasSuffix: true,
    // icon: 'chevron-right',
    // suffixAttrs: { label: 'Show details' },
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
  })),
};
