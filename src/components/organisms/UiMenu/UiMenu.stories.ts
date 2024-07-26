import { ref } from 'vue';
import { action } from '@storybook/addon-actions';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiMenu,
  type MenuProps,
  UiButton,
  UiCheckbox,
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
  decorators: [ () => ({
    name: 'LMaxWidth',
    template: '<div><story /></div>',
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
      template: '<BasicStories v-bind="{...attrs}" style="max-width: 21.875rem"/>',
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
      template: '<ItemsViaSlotStories v-bind="{...attrs}" style="max-width: 21.875rem"/>',
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
      template: '<HasOutsideElementsStories v-bind="{...attrs}" style="max-width: 21.875rem"/>',
    };
  },
};
export const HasButton:MenuStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { HasButtonStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes, name);
        const hasButton = ref(args.hasButton);

        setTimeout(() => {
          hasButton.value = true;
        }, 3000);
        return { attrs, hasButton };
      },
      template: `
      <HasButtonStories v-bind="{...attrs}" :hasButton="hasButton"/>
      `,
    };
  },
};
HasButton.parameters = { docs: { source: { code: HasButtonStoriesSource } } };

HasButton.args = {
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
  ].map((item, index) => ({
    label: item,
    hasSuffix: false,
    tag: UiCheckbox,
    icon: 'info',
    value: item,
    hasCustomOption: false,
    modelValue: index === 1 && [ item ],
    role: 'option',
  })),
  hasButton: false,
};

