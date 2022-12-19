import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import withUseLogicalMixinCode from '../../../.storybook/decorators/withUseLogicalMixinCode';
import docs from './css-logical-properties.mdx';
import './css-logical-properties.stories.scss';
export default {
  title: 'Contributing Guide/CSS Logical Properties',
  args: {
    property: 'padding',
    element: 'button',
    initValue: '12px 32px',
  },
  parameters: {
    docs: {
      page: docs,
    },
  },
  decorators: [withUseLogicalMixinCode],
};
export const Padding = {
  render: (args) => ({
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
  }),
};
export const Margin = {
  render: (args) => ({
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
  }),
  args: {
    property: 'margin',
    element: 'button',
    initValue: '20px 60px 20px 40px',
  },
};
export const BorderWidth = {
  render: (args) => ({
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
  }),
  template: {},
  args: {
    property: 'border-width',
    element: 'button',
    initValue: '1px 3px',
  },
};
export const BorderRadius = {
  render: (args) => ({
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
  }),
  args: {
    property: 'border-radius',
    element: 'button',
    initValue: '4px 16px',
  },
};
