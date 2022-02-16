import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import icons from '@/components/atoms/UiIcon/icons';
import { defineAsyncComponent } from 'vue';

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
        options: icons,
      },
    },
  },
  parameters: {
    cssprops: {
      'icon-size': {
        value: 'var(--icon-height, 1rem)',
        control: 'text',
        description: '',
      },
      'icon-color': {
        value: undefined,
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiIcon },
  setup() { return { ...args }; },
  template: '<UiIcon :icon="icon"/>',
});

export const IconAsName = Template.bind({});

export const IconAsImport = (args) => ({
  components: { UiIcon },
  setup() {
    // todo: broken render on Docs view
    const icon = defineAsyncComponent(() => import(
      /* webpackChunkName: "icons" */
      /* webpackMode: "eager" */
      /* webpackPreload: true */
      '../../../assets/svg/ce.svg'
    ));
    return {
      ...args,
      icon,
    };
  },
  template: '<UiIcon :icon="icon"/>',
});

export const IconAsIllustration = (args) => ({
  components: { UiIcon },
  setup() { return { ...args }; },
  template: `<UiIcon
      :icon="icon"
      style="--icon-size: 15rem;"
  />`,
});
IconAsIllustration.args = {
  icon: 'agreement',
  isIllustration: true,
};
IconAsIllustration.argTypes = {
  icon: {
    control: {
      type: 'select',
      options: ['agreement', 'boy', 'no-internet-illustration', 'podium'],
    },
  },
};

export const ListOfIcons = () => ({
  components: { UiIcon, UiText },
  setup() { return { icons }; },
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
  icon: { control: false },
  viewBox: { control: false },
};
ListOfIcons.parameters = {
  controls: { hideNoControlsWarning: true },
};
