import { ref } from 'vue';
import UiMenu from '@/components/organisms/UiMenu/UiMenu.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';
import UiMenuItem from '@/components/organisms/UiMenu/_internal/UiMenuItem.vue';
import UiMenuItemSuffix from '@/components/organisms/UiMenu/_internal/UiMenuItemSuffix.vue';
import { clickOutside } from '@/utilities/directives/index';
import docs from './UiMenu.mdx';
import './UiMenu.stories.scss';

export default {
  title: 'Organisms/Menu',
  component: UiMenu,
  subcomponents: {
    UiMenuItem,
    UiMenuItemSuffix,
  },
  args: {
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
  template: '<UiMenu :items="items"/>',
});

export const Common = Template.bind({
});

export const WithItemsAsString = Template.bind({
});
WithItemsAsString.args = {
  items: [
    'For business',
    'Medical Certification',
    'Instruction for Use',
    'Privacy policy',
    'Interview ID',
  ],
};

export const WithSuffix = Template.bind({
});
WithSuffix.args = {
  items: [{
    label: 'For business',
    iconVisible: 'always',
    icon: 'chevron-right',
    iconLabel: 'more info',
    suffixIconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Medical Certification',
    iconVisible: 'always',
    icon: 'chevron-right',
    iconLabel: 'more info',
    suffixIconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Instruction for Use',
    iconVisible: 'always',
    icon: 'chevron-right',
    iconLabel: 'more info',
    suffixIconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Privacy policy',
    iconVisible: 'always',
    icon: 'chevron-right',
    iconLabel: 'more info',
    suffixIconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Interview ID',
    iconVisible: 'always',
    icon: 'chevron-right',
    iconLabel: 'more info',
    suffixIconAttrs: {
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
    <UiMenu :items="items"/>
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
    class: 'ui-button--text menu-side-panel__list-item--divider',
    suffixAttrs: {
      class: 'menu-side-panel__suffix',
    },
    suffixIconAttrs: {
      class: 'menu-side-panel__icon',
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
    class: 'ui-button--text menu-side-panel__list-item--divider',
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
  template: `<UiPopover title="" class="max-w-80" style="--popover-content-padding: 4px 0px;">
  <UiMenu :items="items">
    <template v-for="(item, key) in items" :key="key">
      <UiMenuItem
        :class="[{'ui-menu-item--is-selected': value === item.label}]"
        @click="clickHandler(item.label)"
        v-bind="(() => {const {label, ...rest} = item; return rest;})()"
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
    suffixIconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Deutsch',
    suffixIconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'English',
    suffixIconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Español',
    suffixIconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Français',
    suffixIconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Italiano',
    suffixIconAttrs: {
      class: 'ui-button__icon',
    },
  }, {
    label: 'Polski',
    suffixIconAttrs: {
      class: 'ui-button__icon',
    },
  }],
};
