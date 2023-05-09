import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  UiButton,
  UiIcon,
  UiText,
} from '@index';
import type { IconProps } from '@index';
import {
  ref,
  defineAsyncComponent,
} from 'vue';
import './UiIcon.stories.scss';
import { useArgTypes } from '@sb/helpers';
import { icon as iconArgTypes } from '@sb/helpers/argTypes/index';
import type { IconName } from '@/types';
import icons from './icons';

type IconArgsType = IconProps & {
  illustrations?: {
    name: IconName;
    style: string;
  }[];
};
type IconMetaType = Meta<IconArgsType>;
type IconStoryType = StoryObj<IconArgsType>;

const { argTypes } = useArgTypes(UiIcon);
const meta = {
  title: 'Atoms/Icon',
  component: UiIcon,
  argTypes: {
    ...argTypes,
    icon: iconArgTypes,
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: { source: { code: null } },
  },
} satisfies IconMetaType;
export default meta;

export const Basic: IconStoryType = {
  render: () => ({
    components: { UiIcon },
    template: '<UiIcon v-bind="$attrs"/>',
  }),
};
Basic.args = { icon: 'absent' };
Basic.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
    <UiIcon :icon="icon" />
</template>

<script lang="ts">
import { UiIcon } from '@infermedica/component-library';

const icon = 'absent';
</script>`,
    },
  },
};

export const AllIcons: IconStoryType = {
  render: () => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      const iconsWithoutIllustrations = icons.filter((icon) => {
        const illustrations = [
          'agreement',
          'agreement-rtl',
          'boy',
          'boy-rtl',
          'lock',
          'no-internet-illustration',
          'no-internet-illustration-rtl',
          'podium',
          'podium-rtl',
          'error-500',
        ];
        return !illustrations.includes(icon);
      });
      const copiedIcon = ref('');
      const handleIconClick = (icon: string) => {
        navigator.clipboard.writeText(icon);
        copiedIcon.value = icon;
        setTimeout(() => {
          copiedIcon.value = '';
        }, 1000);
      };
      return {
        iconsWithoutIllustrations,
        copiedIcon,
        handleIconClick,
      };
    },
    template: `<div class="grid grid-cols-icon gap-2">
      <template
          v-for="(icon, key) in iconsWithoutIllustrations"
          :key="key"
      >
        <UiButton
          class="grid place-items-center place-content-center gap-y-4 aspect-square ui-button--outlined"
          @click="handleIconClick(icon)"
        >
          <UiIcon
            :icon="icon"
          />
          <UiText class="whitespace-nowrap text-xs">
            {{ icon }}
          </UiText>
          <UiText
            v-if="copiedIcon === icon"
            class="absolute bottom-0 right-0 p-1"
            style="font-size: 0.625rem;"
          >
            Copied!
          </UiText>
        </UiButton>
      </template>
    </div>`,
  }),
};
AllIcons.argTypes = { icon: { control: false } };

export const ImportedIcon: IconStoryType = {
  render: () => ({
    components: { UiIcon },
    setup() {
      const icon = defineAsyncComponent(() => import('../../../../public/logo.svg'));
      return { icon };
    },
    template: `<UiIcon
      :icon="icon"
      class="as-import"
    />`,
  }),
};
ImportedIcon.argTypes = { icon: { control: false } };
ImportedIcon.parameters = {
  docs: {
    source: {
      code: `<template>
  <UiIcon
    :icon="icon"
    class="as-import"
  />
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';
import { UiIcon } from '@infermedica/component-library';

const icon = defineAsyncComponent(() => import('../../../../public/logo.svg'));
</script>

<style lang="scss">
.as-import {
  --icon-width: 7.75rem;
  --icon-height: auto;
}
</style>`,
    },
  },
};

export const AllIllustrations: IconStoryType = {
  render: (args) => ({
    components: {
      UiButton,
      UiIcon,
      UiText,
    },
    setup() {
      const { illustrations } = args;
      const copiedIllustration = ref('');
      const handleIllustrationClick = (illustration: string) => {
        navigator.clipboard.writeText(illustration);
        copiedIllustration.value = illustration;
        setTimeout(() => {
          copiedIllustration.value = '';
        }, 1000);
      };
      return {
        illustrations,
        copiedIllustration,
        handleIllustrationClick,
      };
    },
    template: `<div class="grid grid-cols-illustration gap-2">
      <template
          v-for="(illustration, key) in illustrations"
          :key="key"
      >
        <UiButton
          class="grid place-items-center place-content-center gap-y-4 aspect-square ui-button--outlined"
          @click="handleIllustrationClick(illustration.name)"
        >
          <UiIcon
            :icon="illustration.name"
            :style="illustration.style"
          />
          <UiText class="whitespace-nowrap text-xs">
            {{ illustration.name }}
          </UiText>
          <UiText
            v-if="copiedIllustration === illustration.name"
            class="absolute bottom-0 right-0 p-1"
            style="font-size: 0.625rem;"
          >Copied!</UiText>
        </UiButton>
      </template>
    </div>`,
  }),
};
AllIllustrations.args = {
  illustrations: [
    {
      name: 'boy',
      style: '--icon-width: 15rem; --icon-height: auto;',
    },
    {
      name: 'podium',
      style: '--icon-width: 15rem; --icon-height: auto;',
    },
    {
      name: 'agreement',
      style: '--icon-width: 15rem; --icon-height: auto;',
    },
    {
      name: 'no-internet-illustration',
      style: '--icon-size: 10rem;',
    },
    {
      name: 'lock',
      style: '--icon-size: 10rem;',
    },
    {
      name: 'error-500',
      style: '--icon-size: 10rem;',
    },
  ],
};
AllIllustrations.argTypes = { icon: { control: false } };

export const RTLIllustrations: IconStoryType = { ...AllIllustrations };
RTLIllustrations.args = {
  illustrations: [
    {
      name: 'boy-rtl',
      style: '--icon-width: 15rem; --icon-height: auto;',
    },
    {
      name: 'podium-rtl',
      style: '--icon-width: 15rem; --icon-height: auto;',
    },
    {
      name: 'agreement-rtl',
      style: '--icon-width: 15rem; --icon-height: auto;',
    },
    {
      name: 'no-internet-illustration-rtl',
      style: '--icon-size: 10rem;',
    },
  ],
};

export const IllustrationWithCustomColors: IconStoryType = {
  render: () => ({
    components: { UiIcon },
    template: `<UiIcon
      v-bind="$attrs"
      style="--icon-width: 15rem; --icon-height: auto;"
      class="illustration-with-custom-colors"/>`,
  }),
};
IllustrationWithCustomColors.args = { icon: 'boy' };
IllustrationWithCustomColors.argTypes = { icon: { control: false } };
IllustrationWithCustomColors.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: `<template>
  <UiIcon
    :icon="icon"
  />
</template>

<script lang="ts">
import { ref } from 'vue';
import { UiIcon } from '@infermedica/component-library';

const icon = ref('boy');
</script>

<style lang="scss">
  .illustration-with-custom-colors {
    --boy-skin: #f0d7bf;
    --boy-hair: #bf9b6f;
    --boy-background: #f1eff0;
    --boy-shirt: #b2746e;
    --boy-undershirt: #7e6865;
    --boy-browser-page-header: #d9a491;
    --boy-browser-page-button-outline: #d9baba;
    --boy-browser-page-icon: #d9baba;
    --boy-browser: #ddd;
    --boy-laptop: #51636e;
    --boy-laptop-logo: #91a5b1;
  }
</style>`,
    },
  },
};
