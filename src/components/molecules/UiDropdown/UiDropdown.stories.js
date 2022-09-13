// TODO: Divide into two components. UiDropdown and UiSelect.
import UiDropdown from '@/components/molecules/UiDropdown/UiDropdown.vue';
import UiDropdownItem from '@/components/molecules/UiDropdown/_internal/UiDropdownItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiInput from '@/components/atoms/UiInput/UiInput.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import {
  computed,
  ref,
  watch,
} from 'vue';
import { actions } from '@storybook/addon-actions';

const events = actions({
  onOpen: 'open',
  onClose: 'close',
});

export default {
  title: 'Molecules/Dropdown',
  component: UiDropdown,
  subcomponents: {
    UiDropdownItem,
    UiPopover,
  },
  args: {
    items: ['English', 'Deutsch', 'Italiano', 'Polski'],
    initModelValue: 'English',
    closeOnClickOutside: true,
    enableKeyboardNavigation: true,
    text: 'English',
    name: 'locale',
    buttonAttrs: {
      id: 'language-button',
      class: ['ui-button--text'],
    },
    popoverAttrs: {
      id: 'language-popover',
    },
  },
  argTypes: {
    items: {
      description: 'Use this control to set the items.',
      table: {
        category: 'stories controls',
      },
      control: 'object',
    },
    initModelValue: {
      description: 'Use this control to set the initial value.',
      table: {
        category: 'stories controls',
      },
      control: 'object',
    },
    modelValue: {
      control: false,
    },
    toggleElement: {
      control: false,
    },
    open: {
      name: 'open',
      description: 'Use this event to detect when dropdown is opening.',
      table: {
        category: 'events',
      },
    },
    close: {
      name: 'close',
      description: 'Use this event to detect when dropdown is closing.',
      table: {
        category: 'events',
      },
    },
    dropdownItem: {
      name: '<name>',
      description: 'Use this slot to replace dropdown item content. Require `name` in item object.',
      table: {
        category: 'slots',
        type: {
          summary: 'unknown',
        },
      },
    },
  },
  decorators: [() => ({
    template: '<div style="min-height: 220px"><story /></div>',
  })],
};

export const AsSelect = (args) => ({
  components: {
    UiDropdown,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiDropdown
      v-model="modelValue"
      :text="modelValue"
      :name="name"
      :close-on-click-outside="closeOnClickOutside"
      :enable-keyboard-navigation="enableKeyboardNavigation"
      :button-attrs="buttonAttrs"
      :popover-attrs="popoverAttrs"
      :items="items"
      style="--dropdown-popover-width: 15rem;"
      @open="onOpen"
      @close="onClose"
  />`,
});

export const WithDropdownItemSlot = (args) => ({
  components: {
    UiDropdown,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiDropdown
      v-model="modelValue"
      :text="modelValue.text"
      :name="name"
      :close-on-click-outside="closeOnClickOutside"
      :enable-keyboard-navigation="enableKeyboardNavigation"
      :button-attrs="buttonAttrs"
      :popover-attrs="popoverAttrs"
      :items="items"
      style="--dropdown-popover-width: 15rem;"
      @open="onOpen"
      @close="onClose"
  >
    <template #english="{item}">
      {{item.text}}
    </template>
  </UiDropdown>`,
});
WithDropdownItemSlot.args = {
  initModelValue: {
    name: 'english',
    text: 'English',
  },
  items: [
    {
      name: 'english',
      text: 'English',
    },
    {
      name: 'deutsch',
      text: 'Deutsch',
    },
    {
      name: 'italiano',
      text: 'Italiano',
    },
    {
      name: 'polski',
      text: 'Polski',
    },
  ],
};

export const WithToggleSlot = (args) => ({
  components: {
    UiDropdown,
    UiButton,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    const toggleElement = ref(null);
    return {
      ...args,
      ...events,
      toggleElement,
      modelValue,
    };
  },
  template: `<UiDropdown
    v-model="modelValue"
    :text="modelValue"
    :name="name"
    :toggle-element="toggleElement"
    :close-on-click-outside="closeOnClickOutside"
    :enable-keyboard-navigation="enableKeyboardNavigation"
    :button-attrs="buttonAttrs"
    :popover-attrs="popoverAttrs"
    :items="items"
    style="--dropdown-popover-width: 15rem;"
    @open="onOpen"
    @close="onClose"
  >
    <template #toggle="{toggleHandler, openHandler, closeHandler, isOpen, text, attrs}">
      <UiButton
        v-bind="attrs"
        ref="toggleElement"
        class="ui-dropdown__toggle"
        :aria-expanded="isOpen.toString()"
        @click="toggleHandler"
      >
        {{ text }}
      </UiButton>
    </template>
  </UiDropdown>`,
});
WithToggleSlot.argTypes = {
  text: {
    control: false,
  },
  name: {
    control: false,
  },
};

export const WithPopoverSlot = (args) => ({
  components: {
    UiDropdown,
    UiDropdownItem,
    UiButton,
    UiPopover,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiDropdown
    v-model="modelValue"
    :text="modelValue"
    :name="name"
    :close-on-click-outside="closeOnClickOutside"
    :enable-keyboard-navigation="enableKeyboardNavigation"
    :button-attrs="buttonAttrs"
    :popover-attrs="popoverAttrs"
    style="--dropdown-popover-width: 15rem;"
    @open="onOpen"
    @close="onClose"
  >
    <template #popover="{closeHandler, isOpen, attrs}">
      <UiPopover
        v-if="isOpen"
        v-bind="attrs"
        class="ui-dropdown__popover"
        @close="closeHandler"
      >
        <div role="radiogroup">
          <template v-for="(item, key) in items" :key="key">
            <UiDropdownItem :value="item">{{item}}</UiDropdownItem>
          </template>
        </div>
      </UiPopover>
    </template>
  </UiDropdown>`,
});

export const WithContentSlot = (args) => ({
  components: {
    UiDropdown,
    UiDropdownItem,
    UiButton,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiDropdown
    v-model="modelValue"
    :text="modelValue"
    :name="name"
    :close-on-click-outside="closeOnClickOutside"
    :enable-keyboard-navigation="enableKeyboardNavigation"
    :button-attrs="buttonAttrs"
    :popover-attrs="popoverAttrs"
    style="--dropdown-popover-width: 15rem;"
    @open="onOpen"
    @close="onClose"
  >
    <template #content="{closeHandler, isOpen}">
      <div role="radiogroup">
        <template v-for="(item, key) in items" :key="key">
          <UiDropdownItem :value="item">{{item}}</UiDropdownItem>
        </template>
      </div>
    </template>
  </UiDropdown>`,
});

export const WithInputToggle = (args) => ({
  components: {
    UiDropdown,
    UiInput,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    const toggleElement = ref(null);
    const search = ref('');

    watch(() => modelValue.value, () => {
      search.value = modelValue.value;
    });

    const filteredItems = computed(
      () => args.items.filter(
        (item) => item.toLocaleLowerCase()
          .includes(search.value.toLocaleLowerCase()),
      ),
    );

    const inputHandler = (value, open, close) => {
      search.value = value;
      if (value.length > 0) {
        open();
      } else if (value.length < 1) {
        close();
      }
    };

    return {
      ...args,
      ...events,
      toggleElement,
      modelValue,
      search,
      inputHandler,
      filteredItems,
    };
  },
  template: `<UiDropdown
      v-model="modelValue"
      :text="modelValue"
      :toggle-element="toggleElement"
      :close-on-click-outside="closeOnClickOutside"
      :enable-keyboard-navigation="enableKeyboardNavigation"
      :button-attrs="buttonAttrs"
      :popover-attrs="popoverAttrs"
      :items="filteredItems"
      style="--dropdown-popover-width: 15rem;"
      @open="onOpen"
      @close="onClose"
    >
    <template #toggle="{toggleHandler, openHandler, closeHandler, isOpen, text, attrs}">
      <UiInput
        v-bind="attrs"
        ref="toggleElement"
        :model-value="search"
        type="search"
        @update:model-value="inputHandler($event, openHandler, closeHandler)"
      >
      </UiInput>
    </template>
  </UiDropdown>`,
});
WithInputToggle.args = {
};
WithInputToggle.argTypes = {
  initModelValue: {
    control: false,
  },
};
