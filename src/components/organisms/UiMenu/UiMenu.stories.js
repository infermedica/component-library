import { ref } from 'vue';
import UiMenu from '@/components/organisms/UiMenu/UiMenu.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';
import { modifiers } from '@sb/helpers/argTypes';
import UiMenuItem from '@/components/organisms/UiMenu/_internal/UiMenuItem.vue';
import { clickOutside } from '@/utilities/directives/index';
import docs from './UiMenu.mdx';
import './UiMenu.stories.scss';

export default {
  title: 'Organisms/Menu',
  component: UiMenu,
  subcomponents: {
    UiMenuItem,
  },
  args: {
    modifiers: [],
    items: [{
      label: 'For business',
      iconVisible: 'never',
    }, {
      label: 'Medical Certification',
      iconVisible: 'never',
    }, {
      label: 'Instruction for Use',
      iconVisible: 'never',
    }, {
      label: 'Terms of Service',
      iconVisible: 'never',
    }, {
      label: 'Privacy policy',
      iconVisible: 'never',
    }, {
      label: 'Interview ID',
      iconVisible: 'never',
    }],
  },
  argTypes: {
    modifiers: modifiers({
      options: [
        'ui-menu--theme-secondary',
        'ui-menu--on-brand',
      ],
    }),
  },
  parameters: {
    docs: {
      page: docs,
    },
  },
};

const Template = (args) => ({
  components: {
    UiMenu,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: '<UiMenu :items="items" :class="modifiers"/>',
});

export const Common = Template.bind({
});

export const Secondary = Template.bind({
});
Secondary.args = {
  modifiers: ['ui-menu--theme-secondary'],
};

export const OnBrand = Template.bind({
});
OnBrand.parameters = {
  backgrounds: {
    default: 'brand',
  },
};
OnBrand.args = {
  modifiers: ['ui-menu--theme-brand'],
};

export const WithSuffix = Template.bind({
});
WithSuffix.args = {
  items: [{
    label: 'For business',
    iconVisible: 'always',
    icon: 'chevron-right',
    iconLabel: 'more info',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Medical Certification',
    iconVisible: 'always',
    icon: 'chevron-right',
    iconLabel: 'more info',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Instruction for Use',
    iconVisible: 'always',
    icon: 'chevron-right',
    iconLabel: 'more info',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Privacy policy',
    iconVisible: 'always',
    icon: 'chevron-right',
    iconLabel: 'more info',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Interview ID',
    iconVisible: 'always',
    icon: 'chevron-right',
    iconLabel: 'more info',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }],
};

export const WithIconSlot = (args) => ({
  components: {
    UiMenu,
    UiIcon,
  },
  setup() {
    return {
      ...args,
    };
  },
  template: `<UiMenu :class="modifiers">
    <template #icon="{isIcon}">
      <UiIcon
        v-if="isIcon"
        icon="info"
        :class="['ui-button__icon', 'ui-menu-item__icon']"
      />
    </template>
  </UiMenu>`,
});
WithIconSlot.args = {
  items: [{
    label: 'For business',
    iconVisible: 'always',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Medical Certification',
    iconVisible: 'always',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Instruction for Use',
    iconVisible: 'always',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Terms of Service',
    iconVisible: 'always',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Privacy policy',
    iconVisible: 'always',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Interview ID',
    iconVisible: 'always',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }],
};

export const AsSidePanelContent = (args) => ({
  components: {
    UiButton,
    UiMenu,
    UiSidePanel,
  },
  setup() {
    const modelValue = ref(true);
    const language = ref('English');
    return {
      ...args,
      modelValue,
      language,
    };
  },
  template: `<UiButton
    class="ui-button--text ui-button--theme-secondary"
    @click="modelValue = true;"
  >
    Settings & Info
  </UiButton>
  <UiSidePanel 
    v-model="modelValue"
    title="Settings & Info"
    transition="slide"
    class="menu-side-panel"
  >
    <UiMenu :class="modifiers" :items="items"/>
  </UiSidePanel>`,
});
AsSidePanelContent.decorators = [() => ({
  template: '<div style="min-height: 350px"><story /></div>',
})];
AsSidePanelContent.args = {
  items: [{
    label: 'Language',
    iconVisible: 'always',
    icon: 'chevron-right',
    iconLabel: 'English',
    class: 'ui-button--text',
    listItemAttrs: {
      class: 'menu-side-panel__list-item--divider',
    },
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'For business',
    iconVisible: 'always',
    icon: 'chevron-right',
    class: 'ui-button--text',
  }, {
    label: 'Medical Certification',
    iconVisible: 'always',
    icon: 'chevron-right',
    class: 'ui-button--text',
  }, {
    label: 'Instruction for Use',
    iconVisible: 'always',
    icon: 'chevron-right',
    class: 'ui-button--text',
  }, {
    label: 'Privacy policy',
    iconVisible: 'always',
    icon: 'chevron-right',
    class: 'ui-button--text',
  }, {
    label: 'Interview ID',
    iconVisible: 'always',
    icon: 'chevron-right',
    class: 'ui-button--text',
    iconAttrs: {
      class: 'menu-side-panel__icon',
    },
    listItemAttrs: {
      class: 'menu-side-panel__list-item--divider',
    },
  }],
};

export const Selectable = (args) => ({
  components: {
    UiPopover,
    UiMenu,
    UiButton,
    UiMenuItem,
  },
  directives: {
    clickOutside,
  },
  setup() {
    const value = ref('English');
    const clickHandler = (label) => {
      value.value = label;
    };
    return {
      ...args,
      value,
      clickHandler,
    };
  },
  template: `<UiPopover title="" class="max-w-80" style="--popover-content-padding: 8px;">
  <UiMenu :items="items" :class="modifiers">
    <template v-for="(item, key) in items" :key="key">
      <UiMenuItem 
        :class="[{'ui-button--is-selected': value === item.label}]"
        @click="clickHandler(item.label)"
        v-bind="item"
      >
        {{item.label}}
      </UiMenuItem>
    </template>
  </UiMenu>
  </UiPopover>`,
});
Selectable.args = {
  items: [{
    label: 'Čeština',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Deutsch',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'English',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Español',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Français',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Italiano',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Polski',
    iconAttrs: {
      class: 'ui-button__icon',
    },
  }],
};
