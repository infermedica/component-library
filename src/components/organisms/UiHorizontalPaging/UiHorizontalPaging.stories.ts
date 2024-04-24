import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiHorizontalPaging,
  type HorizontalPagingProps,
} from '@index';
import { withVModel } from '@sb/decorators';
import {
  getArgTypes,
  getAttrs,
} from '@sb/helpers';
import {
  BasicStories,
  BasicStoriesSource,
} from './stories';

type HorizontalPagingArgsType = HorizontalPagingProps;
type HorizontalPagingMetaType = Meta<HorizontalPagingArgsType>;
type HorizontalPagingStoryType = StoryObj<HorizontalPagingArgsType>;

// const {
//   argTypes: metaArgTypes,
//   args: metaArgs,
// } = getArgTypes(UiHorizontalPaging);

const items = [
  {
    label: 'Medical Certification',
    title: 'Medical certification and compliance',
    name: 'medical-certification',
  },
  {
    label: 'Instruction for Use',
    title: 'Instruction for Use',
    name: 'instruction-for-use',
  },
  {
    label: 'Terms of Service',
    title: 'Terms of Service',
    name: 'terms-of-service',
  },
  {
    label: 'Privacy Policy',
    title: 'Privacy Policy',
    name: 'privacy-policy',
  },
  {
    label: 'Interview ID',
    title: 'Interview ID',
    name: 'interview-id',
  },
];

const meta = {
  title: 'Organisms/HorizontalPaging',
  component: UiHorizontalPaging,
  args: {
    // ...metaArgs,
    modelValue: [],
    items,
    title: 'Settings & Info',
  },
  // argTypes: metaArgTypes,
  decorators: [ () => ({
    name: 'LMaxWidth',
    template: '<div style="max-width: 21.875rem"><story /></div>',
  }) ],
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies HorizontalPagingMetaType;
export default meta;

export const Basic: HorizontalPagingStoryType = {
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
Basic.decorators = [ withVModel ];
Basic.parameters = { docs: { source: { code: BasicStoriesSource } } };