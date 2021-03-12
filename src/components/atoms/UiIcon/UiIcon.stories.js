import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import icons from '@/components/atoms/UiIcon/icons';

export default {
  title: 'Atoms/Icon',
  component: UiIcon,
  args: {
    icon: 'bulletAlarming',
    viewBox: '0 0 48 48',
  },
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: Object.keys(icons),
      },
    },
  },
};

const Template = (args) => ({
  components: { UiIcon },
  setup() { return { ...args }; },
  template: `<UiIcon 
    :icon="icon"
    :view-box="viewBox"
  />`,
});

export const IconAsName = Template.bind({});

export const IconAsPaths = Template.bind({});
IconAsPaths.args = {
  icon: [{ d: 'M40 22c0 1-.453 2.402-3.648 4-1.301.652-2.692 1.117-4.352 1.434v3.957c7.848-1.336 12-4.77 12-9.391 0-6-8.953-10-20-10S4 16 4 22c0 5.43 5.73 9.219 16.45 9.895l-3.762 3.761 2.828 2.828L28 30l-8.484-8.484-2.828 2.828 3.566 3.57c-3.79-.203-6.332-.777-8.606-1.914C8.453 24.402 8 23 8 22s.453-2.402 3.648-4c2.954-1.477 7.317-2 12.352-2s9.398.523 12.352 2C39.547 19.598 40 21 40 22zm0 0' }],
};
IconAsPaths.argTypes = {
  icon: { control: false },
};

export const WithPathSlot = (args) => ({
  components: { UiIcon },
  setup() { return { ...args }; },
  template: `<UiIcon>
    <template #path>
      <path d="M31.418 15.14L24 0l-7.418 15.14L0 17.57l12 11.785L9.168 46 24 38.14 38.832 46 36 29.355 48 17.57zm8.031 5.22L28.75 18.792 24 9.093l-4.75 9.7-10.7 1.566 7.743 7.61-1.82 10.695L24 33.617l9.527 5.047-1.82-10.695zm0 0" fill-rule="evenodd"></path>
    </template>
  </UiIcon>`,
});
WithPathSlot.argTypes = {
  icon: { control: false },
  viewBox: { control: false },
};
WithPathSlot.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const ListOfIcons = () => ({
  components: { UiIcon },
  setup() { return { icons }; },
  template: `<div class="grid grid-cols-icon">
    <div
      v-for="(value, name) in icons"
      :key="icon"
      class="flex flex-col justify-center items-center h-24"
    >
      <UiIcon :icon="name"/>
      <div class="my-2">{{ name }}</div>
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
