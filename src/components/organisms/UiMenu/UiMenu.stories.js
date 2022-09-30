import { ref } from 'vue';
import UiMenu from '@/components/organisms/UiMenu/UiMenu.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';

export default {
  title: 'Organisms/Menu',
  component: UiMenu,
  args: {
    initModelValue: '',
    items: [{
      value: 'Čeština',
    },
    {
      value: 'Deutsch',
    },
    {
      value: 'English',
    },
    {
      value: 'Español',
    },
    {
      value: 'Français',
    },
    {
      value: 'Italiano',
    },
    {
      value: 'Polski',
    }],
  },
  argTypes: {
  },
};

const Template = (args) => ({
  components: {
    UiMenu,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: '<UiMenu v-model="modelValue"/>',
});

export const Common = Template.bind({
});

export const WithLabel = Template.bind({
});
WithLabel.args = {
  items: [{
    value: 'Head',
    icon: 'chevron-right',
    iconLabel: 'more info',
    iconVisible: 'always',
  }, {
    value: 'Leg',
    icon: 'chevron-right',
    iconLabel: 'more info',
    iconVisible: 'always',
  }],
};

export const WithIconSlot = (args) => ({
  components: {
    UiMenu,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiMenu v-model="modelValue">
    <template #icon="{isIcon}">
      <UiIcon 
        v-if="isIcon"
        icon="info-filled"
        class="ui-button__icon"
      />
  </template>
  </UiMenu>`,
});
WithIconSlot.args = {
  items: [{
    value: 'Head',
    iconVisible: 'always',
  }, {
    value: 'Leg',
    iconVisible: 'always',
  }],
};

export const AsPopoverContent = (args) => ({
  components: {
    UiMenu,
    UiPopover,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiPopover title="" class="max-w-80" style="--popover-content-padding: 8px;">
    <UiMenu v-model="modelValue" :items="items"/>
  </UiPopover>`,
});
