
import UiButton from '../../../src/components/atoms/UiButton/UiButton.vue';
import UiText from '../../../src/components/atoms/UiText/UiText.vue';
import withUseLogicalMixinCode from '../../../.storybook/decorators/withUseLogicalMixinCode';
import docs from './css-logical-properties.mdx';
import './css-logical-properties.stories.scss';

export default {
  title: 'Contributing Guide/Css Logical Properties',
  args: {
    property: 'padding',
    element: 'button',
    initValue: '12px 32px',
  },
  parameters: { docs: { page: docs } },
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
  template: `<UiText class="docs__label">Logical {{property}}</UiText>
    <UiButton :style="logicalStyle">Label</UiButton>
    <UiText class="docs__label">Physical {{property}}</UiText>
    <UiButton :style="physicalStyle">Label</UiButton>`,
});

export const Padding = Template.bind({});
export const Margin = Template.bind({});
Margin.args = {
  property: 'margin',
  element: 'button',
  initValue: '20px 60px 20px 40px',
};
