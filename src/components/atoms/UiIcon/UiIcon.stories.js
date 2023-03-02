import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { defineAsyncComponent } from 'vue';
import './UiIcon.stories.scss';
import icons from '@/components/atoms/UiIcon/icons.ts';
import { AsSpan } from '@/components/atoms/UiHeading/UiHeading.stories';

export default {
  title: 'Atoms/Icon',
  component: UiIcon,
  args: { icon: 'absent' },
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: icons,
    },
  },
  parameters: { cssProperties: { '--icon-size': 'var(--icon-height, 1.5rem)' } },
};

export const IconAsName = {
  render: (args) => ({
    components: { UiIcon },
    setup() {
      return { ...args };
    },
    template: '<UiIcon :icon="icon"/>',
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};

export const IconAsImport = {
  render: (args) => ({
    components: { UiIcon },
    setup() {
      const icon = defineAsyncComponent(() => import('../../../assets/icons/ce.svg'));
      return {
        ...args,
        icon,
      };
    },
    template: '<UiIcon :icon="icon"/>',
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};

export const IconAsIllustration = {
  render: (args) => ({
    components: { UiIcon },
    setup() {
      return { ...args };
    },
    template: `<UiIcon
      :icon="icon"
      class="icon-as-illustration"
    />`,
  }),

  args: { icon: 'boy' },

  argTypes: {
    icon: {
      control: { type: 'select' },
      options: [
        'agreement',
        'agreement-rtl',
        'boy',
        'boy-rtl',
        'no-internet-illustration',
        'no-internet-illustration-rtl',
        'podium',
        'podium-rtl',
        'lock',
      ],
    },
  },

  parameters: { chromatic: { disableSnapshot: true } },
};

export const IconAsCustomIllustration = {
  render: (args) => ({
    components: { UiIcon },
    setup() {
      return { ...args };
    },
    template: `<UiIcon
      :icon="icon"
      class="icon-as-illustration icon-as-custom-illustration"
    />`,
  }),

  args: { icon: 'boy' },
  argTypes: { icon: { control: false } },
  parameters: { chromatic: { disableSnapshot: true } },
};

export const ListOfIcons = {
  render: () => ({
    components: {
      UiIcon,
      UiText,
    },
    setup() {
      return { icons };
    },
    template: `<div class="grid grid-cols-icon gap-2">
      <div
        v-for="icon in icons"
        :key="icon"
        class="grid place-items-center"
      >
        <UiIcon
          :icon="icon"
          class="place-self-center my-0.5"
        />
        <UiText class="ui-text--2-compact whitespace-nowrap">
          {{ icon }}
        </UiText>
      </div>
    </div>`,
  }),

  argTypes: {
    icon: { control: false },
    viewBox: { control: false },
  },

  parameters: {
    controls: { hideNoControlsWarning: true },
    chromatic: { disableSnapshot: true },
  },
};
