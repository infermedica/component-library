import UiDropdown from '@/components/molecules/UiDropdown/UiDropdown.vue';
import UiDropdownItem from '@/components/molecules/UiDropdown/_internal/UiDropdownItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiInput from '@/components/atoms/UiInput/UiInput.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import { actions } from '@storybook/addon-actions';
import { computed, ref, watch } from 'vue';

const events = actions({
  onOpen: 'open',
  onClose: 'close',
});

export default {
  title: 'Molecules/Dropdown',
  component: UiDropdown,
  subcomponents: { UiDropdownItem, UiPopover },
  args: {
    items: [
      { label: 'English' },
      { label: 'Deutsch' },
      { label: 'Italiano' },
      { label: 'Polski' },
    ],
    initModelValue: { label: 'English' },
    closeOnClickOutside: true,
    enableKeyboardNavigation: true,
    text: 'English',
    name: 'locale',
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
      table: { category: 'events' },
    },
    close: {
      name: 'close',
      description: 'Use this event to detect when dropdown is closing.',
      table: { category: 'events' },
    },
  },
  decorators: [() => ({ template: '<div style="min-height: 220px"><story /></div>' })],
  parameters: {
    cssprops: {
      'dropdown-toggle-width': {
        value: '100%',
        control: 'text',
        description: '',
      },
      'dropdown-popover-top': {
        value: '100%',
        control: 'text',
        description: '',
      },
      'dropdown-popover-left': {
        value: 'unset',
        control: 'text',
        description: '',
      },
      'dropdown-popover-width': {
        value: '100%',
        control: 'text',
        description: '',
      },
      'dropdown-popover-max-width': {
        value: 'unset',
        control: 'text',
        description: '',
      },
      'dropdown-popover-min-height': {
        value: '0',
        control: 'text',
        description: '',
      },
      'dropdown-popover-transform': {
        value: 'translateY(var(--space-8))',
        control: 'text',
        description: '',
      },
    },
  },
};

export const WithToggleSlot = (args) => ({
  components: { UiDropdown, UiDropdownItem, UiButton },
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
    :text="modelValue.label"
    :name="name"
    :toggle-element="toggleElement"
    :close-on-click-outside="closeOnClickOutside"
    :enable-keyboard-navigation="enableKeyboardNavigation"
    style="--dropdown-popover-width: 15rem;"
    @open="onOpen"
    @close="onClose"
  >
    <template #toggle="{toggleHandler, openHandler, closeHandler, isOpen, text}">
      <UiButton
        ref="toggleElement"
        class="ui-dropdown__toggle ui-button--text"
        :aria-expanded="isOpen.toString()"
        @click="toggleHandler"
      >
        {{ text }}
      </UiButton>
    </template>
    <template v-for="(item, key) in items" :key="key">
      <UiDropdownItem :value="item">{{item.label}}</UiDropdownItem>
    </template>
  </UiDropdown>`,
});
WithToggleSlot.argTypes = {
  text: { control: false },
  name: { control: false },
};

export const WithPopoverSlot = (args) => ({
  components: {
    UiDropdown, UiDropdownItem, UiButton, UiPopover,
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
    :text="modelValue.label"
    :name="name"
    :toggle-element="toggleElement"
    :close-on-click-outside="closeOnClickOutside"
    :enable-keyboard-navigation="enableKeyboardNavigation"
    style="--dropdown-popover-width: 15rem;"
    @open="onOpen"
    @close="onClose"
  >
    <template #toggle="{toggleHandler, openHandler, closeHandler, isOpen, text}">
      <UiButton
        ref="toggleElement"
        class="ui-dropdown__toggle ui-button--text"
        :aria-expanded="isOpen.toString()"
        @click="toggleHandler"
      >
        {{ text }}
      </UiButton>
    </template>
    <template #popover="{closeHandler, isOpen}">
      <UiPopover
        v-if="isOpen"
        class="ui-dropdown__popover"
        @close="closeHandler"
      >
        <div role="radiogroup">
          <template v-for="(item, key) in items" :key="key">
            <UiDropdownItem :value="item">{{item.label}}</UiDropdownItem>
          </template>
        </div>
      </UiPopover>
    </template>
  </UiDropdown>`,
});

export const WithContentSlot = (args) => ({
  components: {
    UiDropdown, UiDropdownItem, UiButton,
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
    :text="modelValue.label"
    :name="name"
    :toggle-element="toggleElement"
    :close-on-click-outside="closeOnClickOutside"
    :enable-keyboard-navigation="enableKeyboardNavigation"
    style="--dropdown-popover-width: 15rem;"
    @open="onOpen"
    @close="onClose"
  >
    <template #toggle="{toggleHandler, openHandler, closeHandler, isOpen, text}">
      <UiButton
        ref="toggleElement"
        class="ui-dropdown__toggle ui-button--text"
        :aria-expanded="isOpen.toString()"
        @click="toggleHandler"
      >
        {{ text }}
      </UiButton>
    </template>
    <template #content="{closeHandler, isOpen}">
      <div role="radiogroup">
        <template v-for="(item, key) in items" :key="key">
          <UiDropdownItem :value="item">{{item.label}}</UiDropdownItem>
        </template>
      </div>
    </template>
  </UiDropdown>`,
});

export const WithInputToggle = (args) => ({
  components: {
    UiDropdown,
    UiDropdownItem,
    UiInput,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    const toggleElement = ref(null);
    const searchQuery = ref('');

    watch(() => modelValue.value, () => {
      searchQuery.value = modelValue.value.label;
    });

    const filteredItems = computed(
      () => args.items.filter(
        (item) => item.label.toLocaleLowerCase()
          .includes(searchQuery.value.toLocaleLowerCase()),
      ),
    );

    const inputHandler = (value, open, close) => {
      searchQuery.value = value;
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
      searchQuery,
      inputHandler,
      filteredItems,
    };
  },
  template: `
    <UiDropdown
        v-model="modelValue"
        :text="modelValue.label"
        :toggle-element="toggleElement"
        style="--dropdown-popover-width: 15rem;"
        @open="onOpen"
        @close="onClose"
    >
    <template #toggle="provideData">
      <UiInput
          ref="toggleElement"
          :model-value="searchQuery"
          type="search"
          @update:model-value="inputHandler($event, provideData.openHandler, provideData.closeHandler)"
      >
      </UiInput>
    </template>
    <template #content="{closeHandler, isOpen}">
      <div role="radiogroup">
        <template v-for="(item, key) in filteredItems" :key="key">
          <UiDropdownItem :value="item">{{ item.label }}</UiDropdownItem>
        </template>
        <template v-if="filteredItems.length === 0">
          no elements matching criteria
        </template>
      </div>
    </template>
    </UiDropdown>`,
});
WithInputToggle.args = {};
WithInputToggle.argTypes = {
  initModelValue: { control: false },
};
