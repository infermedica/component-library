import { action } from '@storybook/addon-actions';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiMenu,
  type MenuProps,
} from '@index';
import {
  getArgTypes,
  getAttrs,
} from '@sb/helpers';
import {
  BasicStories,
  BasicStoriesSource,
  ItemsViaSlotStories,
  HasOutsideElementsStories,
  HasButtonStories,
  HasButtonStoriesSource,
} from './stories';
import { withVModel } from '../../../../.storybook/decorators';

type MenuArgsType = MenuProps;
type MenuMetaType = Meta<MenuArgsType>;
type MenuStoryType = StoryObj<MenuArgsType>;

const {
  argTypes: metaArgTypes,
  args: metaArgs,
} = getArgTypes(UiMenu);

const items = [
  { label: 'Medical Certification' },
  { label: 'Instruction for Use' },
  { label: 'Terms of Service' },
  { label: 'Privacy policy' },
  { label: 'Interview ID' },
].map((item) => ({
  ...item,
  onClick: action('onClick'),
}));

const meta = {
  title: 'Organisms/Menu',
  component: UiMenu,
  args: {
    ...metaArgs,
    items,
  },
  argTypes: { ...metaArgTypes },
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies MenuMetaType;
export default meta;

export const Basic: MenuStoryType = {
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
Basic.decorators = [ () => ({
  name: 'LMaxWidth',
  template: '<div style="max-width: 21.875rem"><story /></div>',
}) ];

export const Compact: MenuStoryType = { ...Basic };
Compact.args = { class: 'ui-menu--compact' };

export const HasSelectedItem: MenuStoryType = { ...Basic };
HasSelectedItem.args = {
  items: items.map((item, index) => ({
    ...item,
    class: [ { 'ui-menu-item--is-selected': index === 1 } ],
  })),
};

export const HasSuffix: MenuStoryType = { ...Basic };
HasSuffix.args = {
  items: [
    {
      label: 'Language',
      hasSuffix: true,
      suffixAttrs: {
        label: 'English',
        icon: 'chevron-right',
      },
      onClick: action('onClick'),
    },
    ...items.map((item) => ({
      ...item,
      hasSuffix: true,
      suffixAttrs: {
        icon: 'chevron-right',
        class: 'ui-menu-item-suffix--theme-secondary',
      },
    })),
  ],
};

export const HasPrefix: MenuStoryType = { ...Basic };
HasPrefix.args = {
  items: items.map((item) => ({
    ...item,
    hasPrefix: true,
    prefixAttrs: { icon: 'calendar' },
  })),
};

export const ItemsViaSlot: MenuStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { ItemsViaSlotStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<ItemsViaSlotStories v-bind="{...attrs}"/>',
    };
  },
};
ItemsViaSlot.decorators = [ () => ({
  name: 'LMaxWidth',
  template: '<div style="max-width: 21.875rem"><story /></div>',
}) ];

export const HasOutsideElements: MenuStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { HasOutsideElementsStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        return { attrs };
      },
      template: '<HasOutsideElementsStories v-bind="{...attrs}"/>',
    };
  },
};
HasOutsideElements.decorators = [ () => ({
  name: 'LMaxWidth',
  template: '<div style="max-width: 21.875rem"><story /></div>',
}) ];

export const HasButton:MenuStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { HasButtonStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);

        return { attrs };
      },
      template: `
      <HasButtonStories v-bind="{...attrs}"/>
      `,
    };
  },
};
HasButton.args = {
  modelValue: [ 'ADHD — hyperactive type' ],
  items: [
    'ADHD — hyperactive type',
    'ADHD — inattentive type',
    'Abdominal aortic aneurysm',
    'Achalasia',
    'Acne',
    'Acoustic neuroma',
    'Painful swallowing',
    'Stuffy nose',
    'Sneeze',
    'Muscle pain',
    'Runny nose',
    'Wernicke`s encephalopathy',
    'Whipworm infection',
    'Wilson`s disease',
    'Zollinger-Ellison syndrome',
  ],
};
HasButton.decorators = [
  () => ({
    name: 'LMaxWidth',
    template: '<div style="max-width: 41.25rem"><story /></div>',
  }),
  withVModel,
];
HasButton.parameters = { docs: { source: { code: HasButtonStoriesSource } } };

