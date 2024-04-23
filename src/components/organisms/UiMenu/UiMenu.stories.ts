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
} from './stories';

type MenuArgsType = MenuProps;
type MenuMetaType = Meta<MenuArgsType>;
type MenuStoryType = StoryObj<MenuArgsType>;

const {
  argTypes,
  args,
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
    ...args,
    items,
  },
  argTypes,
  decorators: [ () => ({
    name: 'LMaxWidth',
    template: '<div style="max-width: 21.875rem"><story /></div>',
  }) ],
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

