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
} from './stories';

type MenuArgsType = MenuProps;
type MenuMetaType = Meta<MenuArgsType>;
type MenuStoryType = StoryObj<MenuArgsType>;

const {
  argTypes,
  args,
} = getArgTypes(UiMenu);

const meta = {
  title: 'Organisms/Menu',
  component: UiMenu,
  args: {
    ...args,
    items: [
      { label: 'For business' },
      { label: 'Medical Certification' },
      { label: 'Instruction for Use' },
      { label: 'Terms of Service' },
      {
        label: 'Privacy policy',
        class: 'ui-menu-item--is-selected',
      },
      { label: 'Interview ID' },
    ],
  },
  argTypes,
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
