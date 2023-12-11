import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import icons from '@/components/atoms/UiIcon/icons';
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
    isLoading: false,
    accessibilityAttrs: { 'aria-label': 'Add' },
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

export const Common = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>`,
  }),
};

export const Contained = {
  render: (args) => ({
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
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Small:
    </UiText>
    <UiButton 
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Disable:
    </UiText>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers
      ]"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>`,
  }),
};

export const Outlined = {
  render: (args) => ({
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
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">Small:</UiText>
    <UiButton 
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">Selected:</UiText>
    <UiButton 
      :class="[
        'ui-button--is-selected',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--is-selected',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
    <UiIcon
      :icon="icon"
      class="ui-button__icon"
    /> {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--is-selected',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
    {{ content }}<UiIcon
      :icon="icon"
      class="ui-button__icon ui-button__icon--end"
    />
    </UiButton>
    <UiText tag="span">
      Disable:
    </UiText>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      />{{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>`,
  }),

  args: { modifiers: [ 'ui-button--outlined' ] },
};

export const Text = {
  render: (args) => ({
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
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Small:
    </UiText>
    <UiButton 
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Disable:
    </UiText>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers
      ]"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>`,
  }),

  args: { modifiers: [ 'ui-button--text' ] },
};

export const Circled = {
  render: (args) => ({
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
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
      v-bind="accessibilityAttrs"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      />
    </UiButton>
    <UiText tag="span">
      Text:
    </UiText>
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      <UiText tag="span">
        1
      </UiText>
    </UiButton>
    <UiText tag="span">
      Selected:
    </UiText>
    <UiButton 
      :class="[
        'ui-button--is-selected',
        modifiers,
      ]"
      :is-loading="isLoading"
      v-bind="accessibilityAttrs"
    >
    <UiIcon
      :icon="icon"
      class="ui-button__icon"
    />
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--is-selected',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      <UiText tag="span">
        1
      </UiText>
    </UiButton>
    `,
  }),

  args: {
    modifiers: [
      'ui-button--outlined',
      'ui-button--circled',
    ],
  },
};

export const Icon = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiButton 
      class="ui-button--icon"
      :is-loading="isLoading"
      v-bind="accessibilityAttrs"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      />
    </UiButton>`,
  }),
};

export const TextSecondary = {
  render: (args) => ({
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
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Small:
    </UiText>
    <UiButton 
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Disable:
    </UiText>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers
      ]"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>`,
  }),

  args: {
    modifiers: [
      'ui-button--text',
      'ui-button--theme-secondary',
    ],
  },
};

export const IconSecondary = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiButton 
      :class="[
        'ui-button--icon',
        modifiers,
      ]"
      :is-loading="isLoading"
      v-bind="accessibilityAttrs"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      />
    </UiButton>`,
  }),

  args: { modifiers: [ 'ui-button--theme-secondary' ] },
};

export const TextOnBrand = {
  render: (args) => ({
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
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton 
      :class="modifiers"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Small:
    </UiText>
    <UiButton 
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--small',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>
    <UiText tag="span">
      Disable:
    </UiText>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers,
      ]"
      :is-loading="isLoading"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      /> {{ content }}
    </UiButton>
    <UiButton 
      :class="[
        'ui-button--is-disabled',
        modifiers
      ]"
      :is-loading="isLoading"
    >
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-button__icon ui-button__icon--end"
      />
    </UiButton>`,
  }),

  args: {
    modifiers: [
      'ui-button--text',
      'ui-button--theme-brand',
    ],
  },

  parameters: { backgrounds: { default: 'brand' } },
};

export const IconOnBrand = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiButton 
      :class="[
        'ui-button--icon',
        modifiers
      ]"
      :is-loading="isLoading"
      v-bind="accessibilityAttrs"
    >
      <UiIcon
        :icon="icon"
        class="ui-button__icon"
      />
    </UiButton>`,
  }),

  args: {
    modifiers: [
      'ui-button--text',
      'ui-button--theme-brand',
    ],
  },

  parameters: { backgrounds: { default: 'brand' } },
};
