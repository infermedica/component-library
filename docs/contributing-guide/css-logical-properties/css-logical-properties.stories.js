import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import withUseLogicalMixinCode from '../../../.storybook/decorators/withUseLogicalMixinCode';
import './css-logical-properties.stories.scss';

export default {
  title: 'Contributing Guide/CSS Logical Properties',
  args: {
    property: 'padding',
    element: 'button',
    initValue: '12px 32px',
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [ withUseLogicalMixinCode ],
};

const Template = (args) => ({
  components: {
    UiButton,
    UiText,
  },
  props: {
    logicalStyle: String,
    physicalStyle: String,
    property: String,
  },
  setup(props) {
    return {
      ...args,
      ...props.value,
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
});

export const Padding = Template.bind({});

export const Margin = Template.bind({});
Margin.args = {
  property: 'margin',
  element: 'button',
  initValue: '20px 60px 20px 40px',
};

export const BorderWidth = (args) => ({
  components: {
    UiText,
    UiButton,
  },
  props: {
    logicalStyle: String,
    physicalStyle: String,
    property: String,
  },
  setup(props) {
    return {
      ...args,
      ...props.value,
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
});
BorderWidth.template = {};
BorderWidth.args = {
  property: 'border-width',
  element: 'button',
  initValue: '1px 3px',
};

export const BorderRadius = Template.bind({});
BorderRadius.args = {
  property: 'border-radius',
  element: 'button',
  initValue: '4px 16px',
};
