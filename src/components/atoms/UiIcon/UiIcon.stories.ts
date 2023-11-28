import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiIcon,
  UiText,
} from '@index';
import { getArgTypes } from '@sb/helpers';
import { useAttrs } from '@sb/composable';
import { icon } from '@sb/helpers/argTypes/index';
import type { Icon as IconType } from '@/types';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

const {
  argTypes,
  args,
} = getArgTypes(UiIcon);

const meta = {
  title: 'Atoms/Icon',
  component: UiIcon,
  args: {
    ...args,
    icon: 'plus-circled-filled',
  },
  argTypes: {
    ...argTypes,
    icon,
  },
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Meta;
export default meta;

export const Basic: StoryObj = {
  render(args, { name }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        const { storyAttrs: attrs } = useAttrs();
        return {
          args,
          attrs,
        };
      },
      template: '<BasicStories v-bind="{...args, ...attrs}"/>',
    };
  },
};
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };

export const IconSets: StoryObj = { ...Basic };
IconSets.decorators = [ () => ({
  name: 'DIconSets',
  inheritAttrs: false,
  components: { UiText },
  setup() {
    const { decoratorAttrs: attrs } = useAttrs();
    const { options } = icon;
    console.log(options);
    return {
      attrs,
      options: options.slice(1),
    };
  },
  template: `<div style="display: grid; grid-template-columns: repeat(auto-fill, 6rem); place-items: center;">
      <template v-for="option in options" :key="option">
        <div class="flex flex-col items-center justify-start">
          <story :icon="option"/>
          <UiText style="--text-color: fill rgb(0, 0, 0);">{{ option.replace(/-/mg, ' ') }}</UiText>
        </div>
      </template>
    </div>`,
}) ];
