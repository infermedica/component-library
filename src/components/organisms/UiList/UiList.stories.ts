import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiList,
  type ListProps,
  UiButton,
  UiCheckbox,
  UiRadio,
} from '@index';
import {
  getArgTypes,
  getAttrs,
} from '@sb/helpers';
import { actions } from '@storybook/addon-actions';
import {
  BasicStories,
  BasicStoriesSource,
  ConditionStories,
  ConditionStoriesSource,
  ConditionWithButtonStories,
  ConditionWithButtonStoriesSource,
  ConditionWithPrimaryButtonStories,
  ConditionWithPrimaryButtonStoriesSource,
  IconInHeadingStories,
  IconInHeadingStoriesSource,
  AnswerWithCheckboxStories,
  AnswerWithCheckboxStoriesSource,
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
  excludeStories: [ 'HasChildren' ], // TODO: Design for HasChildren
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
  items: Array.from({length: 100}, (_, i) => items[i%items.length]),
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
export const Condition: ListStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { ConditionStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<ConditionStories v-bind="{...attrs}"/>',
    };
  },
};
Condition.parameters = { docs: { source: { code: ConditionStoriesSource } } };
Condition.args = {
  items: [
    {
      name: 'common-cold',
      label: 'Common cold',
      description: 'Acute viral rhinosinusitis',
      evidence: {
        value: 8,
        label: 'Strong evidence',
      },
    },
    {
      name: 'tension-type-headaches',
      label: 'Tension-type headaches',
      description: 'Acute viral rhinosinusitis',
      evidence: {
        value: 6,
        label: 'Moderate evidence',
      },
    },
    {
      name: 'migraine',
      label: 'Migraine',
      description: 'Acute viral rhinosinusitis',
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
      'condition__content',
    ],
    hasSuffix: true,
    icon: 'chevron-right',
    ...events,
    suffixAttrs: {
      label: 'Show details',
      class: [ 'condition__suffix' ],
    },
  })),
};
export const ConditionWithButton: ListStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { ConditionWithButtonStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<ConditionWithButtonStories v-bind="{...attrs}"/>',
    };
  },
};
ConditionWithButton.parameters = { docs: { source: { code: ConditionWithButtonStoriesSource } } };
ConditionWithButton.args = {
  items: [
    {
      name: 'common-cold',
      label: 'Common cold',
      description: 'Acute viral rhinosinusitis',
      evidence: {
        value: 8,
        label: 'Strong evidence',
      },
    },
    {
      name: 'tension-type-headaches',
      label: 'Tension-type headaches',
      description: 'Acute viral rhinosinusitis',
      evidence: {
        value: 6,
        label: 'Moderate evidence',
      },
    },
    {
      name: 'migraine',
      label: 'Migraine',
      description: 'Acute viral rhinosinusitis',
      evidence: {
        value: 4,
        label: 'Moderate evidence',
      },
    },
  ].map((item) => ({
    ...item,
    hasSuffix: true,
    icon: 'chevron-right',
    class: [ 'condition-with-button__item' ],
    suffixAttrs: {
      label: 'Learn more',
      ...events,
      class: [ 'ui-button--small condition-with-button__suffix' ],
    },
  })),
};
export const ConditionWithPrimaryButton: ListStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { ConditionWithPrimaryButtonStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<ConditionWithPrimaryButtonStories v-bind="{...attrs}"/>',
    };
  },
};
ConditionWithPrimaryButton.parameters = { docs: { source: { code: ConditionWithPrimaryButtonStoriesSource } } };
ConditionWithPrimaryButton.args = {
  items: [
    {
      name: 'common-cold',
      label: 'Common cold',
      description: 'Acute viral rhinosinusitis',
      evidence: {
        value: 8,
        label: 'Strong evidence',
      },
    },
    {
      name: 'tension-type-headaches',
      label: 'Tension-type headaches',
      description: 'Acute viral rhinosinusitis',
      evidence: {
        value: 6,
        label: 'Moderate evidence',
      },
    },
    {
      name: 'migraine',
      label: 'Migraine',
      description: 'Acute viral rhinosinusitis',
      evidence: {
        value: 4,
        label: 'Moderate evidence',
      },
    },
  ].map((item) => ({
    ...item,
    hasSuffix: true,
    icon: 'chevron-right',
    class: [ 'condition-with-button__item' ],
    suffixAttrs: {
      label: 'Learn more',
      ...events,
      class: [ 'ui-button--small condition-with-button__suffix' ],
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
  items: [
    {
      label: 'Painful swallowing',
      name: 'painful-swallowing',
    },
    {
      label: 'Stuffy nose',
      name: 'stuffy-nos',
    },
    {
      label: 'Sneeze',
      name: 'sneeze',
    },
    {
      label: 'Muscle pain',
      name: 'muscle-pain',
    },
    {
      label: 'Runny nose',
      name: 'runny-nose',
    },
  ].map((item) => ({
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
export const AnswerWithCheckbox:ListStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { AnswerWithCheckboxStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<AnswerWithCheckboxStories v-bind="{...attrs}"/>',
    };
  },
};
AnswerWithCheckbox.parameters = { docs: { source: { code: AnswerWithCheckboxStoriesSource } } };
AnswerWithCheckbox.args = {
  items: items.map((item, index) => ({
    ...item,
    tag: UiCheckbox,
    class: [ {
      'ui-checkbox--has-error': index === 1,
      'ui-list-item--has-error': index === 1,
    } ],
    hasSuffix: index === 1 && true,
    icon: 'info',
    value: item,
    modelValue: index === 1 && [ item ],
    textLabelAttrs: {
      tag: 'div',
      class: 'answer-with-checkbox__label',
    },
    suffixAttrs: {
      label: 'Show more',
      class: [ 'icon-in-heading__suffix' ],
      ...events,
      labelAttrs: { class: [ 'visual-hidden' ] },
    },
  })),
};
export const AnswerWithRadio: ListStoryType = { ...AnswerWithCheckbox };
AnswerWithRadio.args = {
  items: items.map((item, index) => ({
    ...item,
    tag: UiRadio,
    class: [ {
      'ui-radio--has-error': index === 1,
      'ui-list-item--has-error': index === 1,
    } ],
    hasSuffix: index === 1 && true,
    icon: 'info',
    inputAttrs: { name: 'answer-with-radio' },
    value: item,
    modelValue: items[1],
    textLabelAttrs: {
      tag: 'div',
      class: 'answer-with-checkbox__label',
    },
    suffixAttrs: {
      label: 'Show more',
      class: [ 'icon-in-heading__suffix' ],
      ...events,
      labelAttrs: { class: [ 'visual-hidden' ] },
    },
  })),
};
