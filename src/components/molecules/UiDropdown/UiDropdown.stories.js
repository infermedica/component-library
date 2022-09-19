// TODO: Divide into two components. UiDropdown and UiSelect.
import UiDropdown from '@/components/molecules/UiDropdown/UiDropdown.vue';
import UiDropdownItem from '@/components/molecules/UiDropdown/_internal/UiDropdownItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiInput from '@/components/atoms/UiInput/UiInput.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiBulletPoints from '@/components/molecules/UiBulletPoints/UiBulletPoints.vue';
import UiMessage from '@/components/templates/UiMessage/UiMessage.vue';
import { actions } from '@storybook/addon-actions';
import {
  computed,
  ref,
  watch,
} from 'vue';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
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
    initModelValue: 'English',
    text: 'English',
    name: 'locale',
    closeOnClickOutside: true,
    toggleElement: null,
    enableKeyboardNavigation: true,
    items: ['English', 'Deutsch', 'Italiano', 'Polski'],
    buttonToggleAttrs: {
      'data-testid': 'toggle-button',
      class: 'ui-button--text',
    },
    popoverAttrs: {
      'data-testid': 'popover',
    },
  },
  argTypes: {
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

const Template = (args) => ({
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
      :toggle-element="toggleElement"
      :enable-keyboard-navigation="enableKeyboardNavigation"
      :items="items"
      :button-toggle-attrs="buttonToggleAttrs"
      :popover-attrs="popoverAttrs"
      style="--dropdown-popover-width: 15rem;"
      @update:modelValue="onUpdateModelValue"
      @open="onOpen"
      @close="onClose"
  />`,
});

export const AsSelect = Template.bind({});

export const WithItemsAsObjects = Template.bind({});
WithItemsAsObjects.args = {
  initModelValue: 'English',
  items: [
    {
      text: 'English',
      value: 'English',
      'data-testid': 'english-dropdown-item',
      iconAttrs: {
        'data-testid': 'english-dropdown-item-icon',
      },
    },
    {
      text: 'Deutsch',
      value: 'Deutsch',
      'data-testid': 'deutsch-dropdown-item',
      iconAttrs: {
        'data-testid': 'deutsch-dropdown-item-icon',
      },
    },
  ],
};

export const WithDefaultSlot = (args) => ({
  components: {
    UiDropdown,
    UiDropdownItem,
  },
  setup: () => {
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
      :toggle-element="toggleElement"
      :enable-keyboard-navigation="enableKeyboardNavigation"
      :button-toggle-attrs="buttonToggleAttrs"
      :popover-attrs="popoverAttrs"
      style="--dropdown-popover-width: 15rem;"
      @update:modelValue="onUpdateModelValue"
      @open="onOpen"
      @close="onClose"
  >
    <template 
      v-for="(item, key) in items"
      :key="key"
    >
      <UiDropdownItem
        :value="item.value"
        :icon-attrs="item.iconAttrs"
        v-bind="{
          'data-testid': item['data-testid'],
        }"
      >
        {{ item.text }}
      </UiDropdownItem>
    </template>
  </UiDropdown>`,
});
WithDefaultSlot.args = {
  initModelValue: 'English',
  items: [
    {
      text: 'English',
      value: 'English',
      'data-testid': 'english-dropdown-item',
      iconAttrs: {
        'data-testid': 'english-dropdown-item-icon',
      },
    },
    {
      text: 'Deutsch',
      value: 'Deutsch',
      'data-testid': 'deutsch-dropdown-item',
      iconAttrs: {
        'data-testid': 'deutsch-dropdown-item-icon',
      },
    },
  ],
};

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
    :toggle-element="toggleElement"
    :enable-keyboard-navigation="enableKeyboardNavigation"
    :items="items"
    :button-toggle-attrs="buttonToggleAttrs"
    :popover-attrs="popoverAttrs"
    style="--dropdown-popover-width: 15rem;"
    @update:modelValue="onUpdateModelValue"
    @open="onOpen"
    @close="onClose"
  >
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
    :text="text"
    :name="name"
    :close-on-click-outside="closeOnClickOutside"
    :toggle-element="toggleElement"
    :enable-keyboard-navigation="enableKeyboardNavigation"
    :items="items"
    :button-toggle-attrs="buttonToggleAttrs"
    :popover-attrs="popoverAttrs"
    style="--dropdown-popover-width: 15rem;"
    @update:modelValue="onUpdateModelValue"
    @open="onOpen"
    @close="onClose"
  >
    <template #toggle="{
      toggleHandler, 
      openHandler, 
      closeHandler, 
      isOpen, 
      text, 
      attrs
    }">
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
    const itemsToRender = computed(() => (args.items.map((item, key) => {
      if (typeof item === 'string' || typeof item === 'number') {
        return {
          name: `dropdown-item-${key}`,
          text: item,
          value: item,
        };
      }
      return {
        name: item.name || `dropdown-item-${key}`,
        value: item.value || item,
        ...item,
      };
    })));
    return {
      ...args,
      ...events,
      modelValue,
      itemsToRender,
    };
  },
  template: `<UiDropdown
    v-model="modelValue"
    :text="text"
    :name="name"
    :close-on-click-outside="closeOnClickOutside"
    :toggle-element="toggleElement"
    :enable-keyboard-navigation="enableKeyboardNavigation"
    :items="items"
    :button-toggle-attrs="buttonToggleAttrs"
    :popover-attrs="popoverAttrs"
    style="--dropdown-popover-width: 15rem;"
    @update:modelValue="onUpdateModelValue"
    @open="onOpen"
    @close="onClose"
  >
    <template #popover="{
      closeHandler, 
      isOpen, 
      attrs
    }">
      <UiPopover
        v-if="isOpen"
        v-bind="attrs"
        class="ui-dropdown__popover"
        @close="closeHandler"
      >
        <div 
          role="radiogroup"
          class="ui-dropdown__items"
        >
          <template 
            v-for="(item, key) in itemsToRender" 
            :key="key"
          >
            <UiDropdownItem
              v-bind="(()=>{const {
                name, text, ...rest
              } = item; return rest;})()"
            >
              {{ item.text }}
            </UiDropdownItem>
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
    :text="text"
    :name="name"
    :close-on-click-outside="closeOnClickOutside"
    :toggle-element="toggleElement"
    :enable-keyboard-navigation="enableKeyboardNavigation"
    :items="items"
    :button-toggle-attrs="buttonToggleAttrs"
    :popover-attrs="popoverAttrs"
    style="--dropdown-popover-width: 15rem;"
    @update:modelValue="onUpdateModelValue"
    @open="onOpen"
    @close="onClose"
  >
    <template #content="{
      closeHandler,
       isOpen
    }">
      <div 
        role="radiogroup"
        class="ui-dropdown__items"
      >
        <template 
          v-for="(item, key) in items" 
          :key="key"
        >
          <UiDropdownItem 
            :value="item"
          >
            {{item}}
          </UiDropdownItem>
        </template>
      </div>
    </template>
  </UiDropdown>`,
});

export const WithInputToggle = (args) => ({
  components: {
    UiDropdown,
    UiInput,
    UiText,
    UiMessage,
    UiBulletPoints,
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

    const noResults = computed(() => filteredItems.value.length < 1);

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
      noResults,
    };
  },
  template: `<UiDropdown
        v-model="modelValue"
        :text="text"
        :name="name"
        :close-on-click-outside="closeOnClickOutside"
        :toggle-element="toggleElement"
        :enable-keyboard-navigation="enableKeyboardNavigation"
        :items="filteredItems"
        :button-toggle-attrs="buttonToggleAttrs"
        :popover-attrs="popoverAttrs"
        :style="{
          '--dropdown-popover-width': '26.25rem',
          '--dropdown-popover-max-width': '26.25rem',
          '--dropdown-popover-padding': noResults 
            ? 'var(--space-24) var(--space-16)'
            : 'var(--space-8)',
        }"
        @update:modelValue="onUpdateModelValue"
        @open="onOpen"
        @close="onClose"
    >
      <template #toggle="{
        toggleHandler, 
        openHandler, 
        closeHandler, 
        isOpen, 
        text, 
        attrs
      }">
        <UiInput
          v-bind="attrs"
          ref="toggleElement"
          :model-value="search"
          type="search"
          @update:model-value="inputHandler($event, openHandler, closeHandler)"
        >
        </UiInput>
      </template>
      <template
        #content
      >
        <UiMessage
          v-if="noResults"
          title="No results"
          illustration="sad"
          :heading-title-attrs="{
            level: '4',
          }"
          :style="{
            '--message-flex-direction': 'row-reverse',
            '--message-tablet-flex-direction': 'row-reverse',
            '--message-aside-margin': '0 var(--space-12) 0 0',
            '--message-tablet-aside-margin': '0 var(--space-12) 0 0',
            '--message-content-align-self': 'flex-start',
            '--message-illustration-size': '1.5rem',
          }"
        >
          <UiText>Unfortunately, the languages was not found.</UiText>
          <UiBulletPoints :items="[
            'Please try to enter single words', 
            'Keep in mind, that you can only select languages from the autocomplete list'
          ]"/>
        </UiMessage>
      </template>
    </UiDropdown>`,
});
WithInputToggle.args = {};
WithInputToggle.argTypes = {
  initModelValue: {
    control: false,
  },
};
