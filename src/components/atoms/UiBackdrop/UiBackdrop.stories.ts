import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiBackdrop,
  type BackdropProps,
} from '@index';
import {
  getArgTypes,
  getAttrs,
} from '@sb/helpers';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

type BackdropArgsType = BackdropProps;
type BackdropMetaType = Meta<BackdropArgsType>;
type BackdropStoryType = StoryObj<BackdropArgsType>;

const {
  argTypes,
  args,
} = getArgTypes(UiBackdrop);

const meta = {
  title: 'Atoms/Backdrop',
  component: UiBackdrop,
  args,
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
} satisfies BackdropMetaType;
export default meta;

export const Basic: BackdropStoryType = {
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
