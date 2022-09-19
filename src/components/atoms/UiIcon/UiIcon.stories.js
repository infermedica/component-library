import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { defineAsyncComponent } from 'vue';
import icons from '@/components/atoms/UiIcon/icons.ts';

export default {
  title: 'Atoms/Icon',
  component: UiIcon,
  args: {
    icon: 'absent',
  },
  argTypes: {
    icon: {
      control: {
        type: 'select',
      },
      options: icons,
    },
  },
};

const Template = (args) => ({
  components: {
    UiIcon,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: '<UiIcon :icon="icon"/>',
});

export const IconAsName = Template.bind({});

export const IconAsImport = (args) => ({
  components: {
    UiIcon,
  },
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
  components: {
    UiIcon,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: `<UiIcon
      :icon="icon"
      style="--icon-size: 15rem;"
  />`,
});
IconAsIllustration.args = {
  icon: 'agreement',
};
IconAsIllustration.argTypes = {
  icon: {
    control: {
      type: 'select',
    },
    options: ['agreement', 'boy', 'no-internet-illustration', 'podium'],
  },
};

export const ListOfIcons = () => ({
  components: {
    UiIcon,
    UiText,
  },
  setup() {
    return {
      icons,
    };
  },
  template: `<div class="grid grid-cols-icon gap-2">
    <div
      v-for="icon in icons"
      :key="icon"
      class="flex flex-col justify-center items-center"
    >
      <div class="flex justify-center items-center h-10">
        <UiIcon 
          :icon="icon"
        />
      </div>
      <UiText 
        class="ui-text--2-compact"
        style="white-space: nowrap"
      >{{ icon }}</UiText>
    </div>
  </div>`,
});
ListOfIcons.argTypes = {
  icon: {
    control: false,
  },
  viewBox: {
    control: false,
  },
};
ListOfIcons.parameters = {
  controls: {
    hideNoControlsWarning: true,
  },
};
