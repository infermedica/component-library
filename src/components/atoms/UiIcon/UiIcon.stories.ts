import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiIcon,
  type IconProps,
} from '@index';
import {
  getArgTypes,
  getAttrs,
} from '@sb/helpers';
import { icon } from '@sb/helpers/argTypes/index';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

type IconArgsType = IconProps
type IconMetaType = Meta<IconArgsType>;
type IconStoryType = StoryObj<IconArgsType>;

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
} satisfies IconMetaType;
export default meta;

export const Basic: IconStoryType = {
  render(args, {
    name, argTypes,
  }) {
    return {
      name,
      components: { BasicStories },
      setup() {
        const { attrs } = getAttrs(args, argTypes);
        return { attrs };
      },
      template: '<BasicStories v-bind="{ ...attrs }"/>',
    };
  },
};
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };

// export const IconSets: IconStoryType = { ...Basic };
// IconSets.decorators = [ () => ({
//   name: 'DIconSets',
//   inheritAttrs: false,
//   components: { UiText },
//   setup() {
//     const { decoratorAttrs: attrs } = useAttrs();
//     const { options } = icon;
//     return {
//       attrs,
//       options: options.slice(1),
//     };
//   },
//   template: `<div style="display: grid; grid-template-columns: repeat(auto-fill, 6rem); place-items: center;">
//       <template v-for="option in options" :key="option">
//         <div class="flex flex-col items-center justify-start">
//           <story :icon="option"/>
//           <UiText style="--text-color: fill rgb(0, 0, 0);">{{ option.replace(/-/mg, ' ') }}</UiText>
//         </div>
//       </template>
//     </div>`,
// }) ];
