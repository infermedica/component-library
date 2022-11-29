import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import icons from '@/components/atoms/UiIcon/icons.ts';
import {
  content,
  modifiers,
} from '@sb/helpers/argTypes';

export default {
  title: 'Atoms/Button',
  component: UiButton,
  args: {
    content: 'Next',
    icon: 'plus-circled-filled',
    modifiers: [],
  },
  argTypes: {
    content,
    icon: {
      description: 'Use this control to set the icon.',
      table: { category: 'stories controls' },
      control: 'select',
      options: icons,
    },
    modifiers: modifiers({
      options: [
        'ui-button--small',
        'ui-button--outlined',
        'ui-button--text',
        'ui-button--circled',
        'ui-button--icon',
        'ui-button--is-disabled',
        'ui-button--theme-secondary',
        'ui-button--theme-brand',
      ],
    }),
  },
  decorators: [ () => ({
    template: `<div class="flex flex-wrap items-center gap-10">
      <story />
    </div>`,
  }) ],
};

export const Common = (args) => ({
  components: {
    UiButton,
    UiIcon,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiButton :class="modifiers">
    {{ content }}
  </UiButton>`,
});

const Template = (args) => ({
  components: {
    UiButton,
    UiIcon,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiText tag="span">
    Large:
  </UiText>
  <UiButton :class="modifiers">
    {{ content }}
  </UiButton>
  <UiButton :class="modifiers">
    <UiIcon 
      :icon="icon" 
      class="ui-button__icon"
    /> {{ content }}
  </UiButton>
  <UiButton :class="modifiers">
    {{ content }} <UiIcon
      :icon="icon"
      class="ui-button__icon ui-button__icon--right"
    />
  </UiButton>
  <UiText tag="span">
    Small:
  </UiText>
  <UiButton :class="[ 
    'ui-button--small', 
    modifiers,
  ]">
    {{ content }}
  </UiButton>
  <UiButton
    :class="[
      'ui-button--small', 
      modifiers, 
    ]"
  >
    <UiIcon 
      :icon="icon" 
      class="ui-button__icon"
    /> {{ content }}
  </UiButton>
  <UiButton :class="[ 
    'ui-button--small', 
    modifiers, 
  ]">
    {{ content }} <UiIcon
      :icon="icon"
      class="ui-button__icon ui-button__icon--right"
    />
  </UiButton>
  <UiText tag="span">
    Disable:
  </UiText>
  <UiButton :class="[ 
    'ui-button--is-disabled',
     modifiers,
   ]">
    {{ content }}
  </UiButton>
  <UiButton :class="[ 
    'ui-button--is-disabled', 
    modifiers,
  ]">
    <UiIcon 
      :icon="icon" 
      class="ui-button__icon"
    /> {{ content }}
  </UiButton>
  <UiButton :class="[ 
    'ui-button--is-disabled', 
    modifiers
  ]">
    {{ content }} <UiIcon
      :icon="icon"
      class="ui-button__icon ui-button__icon--right"
    />
  </UiButton>`,
});

export const Contained = Template.bind({});

export const Outlined = (args) => ({
  components: {
    UiButton,
    UiIcon,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiText tag="span">
    Large:
  </UiText>
  <UiButton :class="modifiers">
    {{ content }}
  </UiButton>
  <UiButton :class="modifiers">
    <UiIcon 
      :icon="icon" 
      class="ui-button__icon"
    /> {{ content }}
  </UiButton>
  <UiButton :class="modifiers">
    {{ content }} <UiIcon
      :icon="icon"
      class="ui-button__icon ui-button__icon--right"
    />
  </UiButton>
  <UiText tag="span">Small:</UiText>
  <UiButton :class="[
    'ui-button--small', 
    modifiers, 
  ]">
    {{ content }}
  </UiButton>
  <UiButton :class="[ 
    'ui-button--small', 
    modifiers,
  ]">
    <UiIcon 
      :icon="icon" 
      class="ui-button__icon"
    /> {{ content }}
  </UiButton>
  <UiButton :class="[ 
    'ui-button--small', 
    modifiers, 
  ]">
    {{ content }} <UiIcon
      :icon="icon"
      class="ui-button__icon ui-button__icon--right"
    />
  </UiButton>
  <UiText tag="span">Selected:</UiText>
  <UiButton :class="[ 
    'ui-button--is-selected', 
    modifiers,
  ]">
    {{ content }}
  </UiButton>
  <UiButton :class="[ 
    'ui-button--is-selected', 
    modifiers,
  ]">
  <UiIcon
    :icon="icon"
    class="ui-button__icon"
  /> {{ content }}
  </UiButton>
  <UiButton :class="[ 
    'ui-button--is-selected',
    modifiers,
  ]">
  {{ content }} <UiIcon
    :icon="icon"
    class="ui-button__icon ui-button__icon--right"
  />
  </UiButton>
  <UiText tag="span">
    Disable:
  </UiText>
  <UiButton :class="[
    'ui-button--is-disabled', 
    modifiers,
  ]">
    {{ content }}
  </UiButton>
  <UiButton :class="[
    'ui-button--is-disabled',
    modifiers,
  ]">
    <UiIcon 
      :icon="icon" 
      class="ui-button__icon"
    />{{ content }}
  </UiButton>
  <UiButton :class="[
    'ui-button--is-disabled',
    modifiers,
  ]">
    {{ content }} <UiIcon
      :icon="icon"
      class="ui-button__icon ui-button__icon--right"
    />
  </UiButton>`,
});
Outlined.args = { modifiers: [ 'ui-button--outlined' ] };

export const Text = Template.bind({});
Text.args = { modifiers: [ 'ui-button--text' ] };

export const Circled = (args) => ({
  components: {
    UiButton,
    UiIcon,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiText tag="span">
    Icon: 
  </UiText>
  <UiButton :class="modifiers">
    <UiIcon
      :icon="icon"
      class="ui-button__icon"
    />
  </UiButton>
  <UiText tag="span">
    Text: 
  </UiText>
  <UiButton :class="modifiers">
    <UiText tag="span">
      1
    </UiText>
  </UiButton>
  <UiText tag="span">
    Selected: 
  </UiText>
  <UiButton :class="[
    'ui-button--is-selected',
    modifiers,
  ]">
  <UiIcon
    :icon="icon"
    class="ui-button__icon"
  />
  </UiButton>
  <UiButton :class="[
    'ui-button--is-selected',
    modifiers,
  ]">
    <UiText tag="span">
      1
    </UiText>
  </UiButton>
  `,
});
Circled.args = {
  modifiers: [
    'ui-button--outlined',
    'ui-button--circled',
  ],
};

export const Icon = (args) => ({
  components: {
    UiButton,
    UiIcon,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiButton class="ui-button--icon">
    <UiIcon
      :icon="icon"
      class="ui-button__icon"
    />
  </UiButton>`,
});

export const TextSecondary = Template.bind({});
TextSecondary.args = {
  modifiers: [
    'ui-button--text',
    'ui-button--theme-secondary',
  ],
};

export const IconSecondary = (args) => ({
  components: {
    UiButton,
    UiIcon,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiButton :class="[
    'ui-button--icon', 
    modifiers, 
  ]">
    <UiIcon
      :icon="icon"
      class="ui-button__icon"
    />
  </UiButton>`,
});
IconSecondary.args = { modifiers: [ 'ui-button--theme-secondary' ] };

export const TextOnBrand = Template.bind({});
TextOnBrand.args = {
  modifiers: [
    'ui-button--text',
    'ui-button--theme-brand',
  ],
};
TextOnBrand.parameters = { backgrounds: { default: 'brand' } };

export const IconOnBrand = (args) => ({
  components: {
    UiButton,
    UiIcon,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiButton :class="[
    'ui-button--icon',
    modifiers
  ]">
    <UiIcon
      :icon="icon"
      class="ui-button__icon"
    />
  </UiButton>`,
});
IconOnBrand.args = {
  modifiers: [
    'ui-button--text',
    'ui-button--theme-brand',
  ],
};
IconOnBrand.parameters = { backgrounds: { default: 'brand' } };
