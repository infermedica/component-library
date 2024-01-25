import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
// type UiDropdownProps,
import { UiDropdown } from '@index';
import {
  getArgTypes,
  getAttrs,
} from '@sb/helpers';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

// type BackdropArgsType = BackdropProps;
// type BackdropMetaType = Meta<BackdropArgsType>;
// type BackdropStoryType = StoryObj<BackdropArgsType>;

const {
  argTypes,
  args,
} = getArgTypes(UiDropdown);

const meta = {
  title: 'Molecules/Dropdown',
  component: UiDropdown,
  args: {
    ...args,
    text: 'English',
    items: [
      {
        text: 'Čeština',
        value: 'Čeština',
      },
      {
        text: 'English',
        value: 'English',
        class: 'ui-menu-item--is-selected',
      },
      {
        text: 'Deutsch',
        value: 'Deutsch',
      },
      {
        text: 'Polski',
        value: 'Polski',
      },
      {
        text: 'Українська',
        value: 'Українська',
      },
    ].map(({ text }) => (text)),
    toggleElement: null,
  },
  argTypes,
  decorators: [ () => ({
    name: 'LMinHeight',
    inheritAttrs: false,
    template: `<div class="min-h-80">
      <story />
    </div>`,
  }
  ) ],
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Meta;
export default meta;

export const Basic: StoryObj = {
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
