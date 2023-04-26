import {
  inject,
  type ComputedRef,
} from 'vue';
import {
  UiButton,
  UiText,
} from '@index';
import withUseLogicalMixinCode from '@sb/decorators/withUseLogicalMixinCode';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import './css-logical-properties.stories.scss';

type ArgsType = {
  property?: string,
  element?: string,
  initValue?: string,
}
type MetaType = Meta<ArgsType>;
type StoryType = StoryObj<ArgsType>;

const meta = {
  title: 'Contributing Guide/CSS Logical Properties',
  args: {
    initValue: '12px 32px',
    property: 'padding',
    element: 'button',
  },
  argTypes: {
    initValue: { defaultValue: '' },
    property: { control: false },
    element: { control: false },
  },
  decorators: [ withUseLogicalMixinCode ],
} satisfies MetaType;
export default meta;

export const Padding: StoryType = {
  render: (args) => ({
    components: {
      UiButton,
      UiText,
    },
    props: Object.keys(args),
    setup() {
      const logicalStyle = inject<ComputedRef<string[]>>('logicalStyle');
      const physicalStyle = inject<ComputedRef<string>>('physicalStyle');
      return {
        logicalStyle,
        physicalStyle,
      };
    },
    template: `<UiText class="docs__label">
      Logical {{ property }}
    </UiText>
    <UiButton :style="logicalStyle">
      Label
    </UiButton>
    <UiText class="docs__label">
      Physical {{ property }}
    </UiText>
    <UiButton :style="physicalStyle">
      Label
    </UiButton>`,
  }),
};

export const Margin: StoryType = { ...Padding };
Margin.args = {
  property: 'margin',
  element: 'button',
  initValue: '20px 60px 20px 40px',
};

export const BorderWidth: StoryType = {
  render: (args) => ({
    components: {
      UiText,
      UiButton,
    },
    props: Object.keys(args),
    setup() {
      const logicalStyle = inject<ComputedRef<string[]>>('logicalStyle');
      const physicalStyle = inject<ComputedRef<string>>('physicalStyle');
      return {
        logicalStyle,
        physicalStyle,
      };
    },
    template: `<UiText class="docs__label">
      Logical {{ property }}
    </UiText>
    <UiButton
      class="docs__border ui-button--outlined"
      :style="logicalStyle"
    >
      Label
    </UiButton>
    <UiText class="docs__label">
      Physical {{ property }}
    </UiText>
    <UiButton
      class="docs__border ui-button--outlined"
      :style="physicalStyle"
    >
      Label
    </UiButton>`,
  }),
};
BorderWidth.args = {
  property: 'border-width',
  element: 'button',
  initValue: '1px 3px',
};

export const BorderRadius: StoryType = { ...Padding };
BorderRadius.args = {
  property: 'border-radius',
  element: 'button',
  initValue: '4px 16px',
};
