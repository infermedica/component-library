import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { defineAsyncComponent } from 'vue';
import './UiIcon.stories.scss';
import icons from '@/components/atoms/UiIcon/icons.ts';
import docs from './UiIcon.mdx';

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
  parameters: { docs: { page: docs } },
};

const Template = (args) => ({
  components: { UiIcon },
  setup() {
    return { ...args };
  },
  template: '<UiIcon :icon="icon"/>',
});

export const IconAsName = Template.bind({});

export const IconAsImport = (args) => ({
  components: { UiIcon },
  setup() {
    const icon = defineAsyncComponent(() => import('../../../assets/icons/ce.svg'));
    return {
      ...args,
      icon,
    };
  },
  template: '<UiIcon :icon="icon"/>',
});

export const IconAsIllustration = (args) => ({
  components: { UiIcon },
  setup() {
    return { ...args };
  },
  template: `<UiIcon
    :icon="icon"
    class="icon-as-illustration"
  />`,
});
IconAsIllustration.args = { icon: 'agreement' };
IconAsIllustration.argTypes = {
  icon: {
    control: { type: 'select' },
    options: [
      'agreement',
      'boy',
      'no-internet-illustration',
      'podium',
    ],
  },
};

// TODO: add copy to clipboard
// TODO: group icons by usage (illustration, ui, triage, etc.)
export const ListOfIcons = () => ({
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
});
ListOfIcons.argTypes = {
  icon: { control: false },
  viewBox: { control: false },
};
ListOfIcons.parameters = { controls: { hideNoControlsWarning: true } };
