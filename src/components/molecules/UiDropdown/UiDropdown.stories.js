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
import { modifiers } from '@sb/helpers/argTypes';
import {
  computed,
  ref,
  watch,
} from 'vue';
import './UiDropdown.stories.scss';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onOpen: 'open',
  onClose: 'close',
});

export default {
  title: 'Molecules/Dropdown',
  component: UiDropdown,
  tags: [ '!autodocs' ],
  args: {
    initModelValue: 'English',
    text: 'English',
    name: 'locale',
    closeOnClickOutside: true,
    toggleElement: null,
    enableKeyboardNavigation: true,
    items: [
      'English',
      'Deutsch',
      'Italiano',
      'Polski',
    ],
    buttonToggleAttrs: {
      'data-testid': 'toggle-button',
      class: 'ui-button--text',
    },
    popoverAttrs: { 'data-testid': 'popover' },
    modifiers: [],
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set the initial value.',
      table: { category: 'stories controls' },
      control: 'object',
    },
    modelValue: { control: false },
    toggleElement: { control: false },
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
    dropdownItem: {
      name: '<name>',
      description: 'Use this slot to replace dropdown item content. Require `name` in item object.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
    buttonToggleAttrs: { table: { subcategory: 'Attrs props' } },
    popoverAttrs: { table: { subcategory: 'Attrs props' } },
    modifiers: modifiers({ options: [ 'ui-dropdown--compact' ] }),
  },
  decorators: [ () => ({
    template: `<div class="min-h-55">
        <story />
    </div>`,
  }) ],
  parameters: {
    cssProperties: {
      '--dropdown-popover-padding-block':
        'var(--dropdown-popover-padding-block-start, var(--space-8)) var(--dropdown-popover-padding-block-end, var(--space-8))',
      '--dropdown-popover-padding-inline':
        'var(--dropdown-popover-padding-inline-start, var(--space-8)) var(--dropdown-popover-padding-inline-end, var(--space-8))',
      '--dropdown-popover-margin-block':
        'var(--dropdown-popover-margin-block-start, var(--space-8)) var(--dropdown-popover-margin-block-end, 0)',
      '--dropdown-popover-margin-inline':
        'var(--dropdown-popover-margin-inline-start, 0) var(--dropdown-popover-margin-inline-end, 0)',
      '--dropdown-popover-inset-block':
        'var(--dropdown-popover-inset-block-start, 100%) var(--dropdown-popover-inset-block-end, auto)',
      '--dropdown-popover-inset-inline':
        'var(--dropdown-popover-inset-inline-start, 0) var(--dropdown-popover-inset-inline-end, auto)',
      '--dropdown-popover-width': '100%',
      '--dropdown-popover-max-width': '15rem',
      '--dropdown-popover-min-height': '0',
    },
  },
};

export const AsSelect = {
  render: (args) => ({
    components: { UiDropdown },
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
      class="dropdown-with-popover-width"
      @update:modelValue="onUpdateModelValue"
      @open="onOpen"
      @close="onClose"
    />`,
  }),
};

export const WithItemsAsObjects = {
  render: (args) => ({
    components: { UiDropdown },
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
      class="dropdown-with-popover-width"
      @update:modelValue="onUpdateModelValue"
      @open="onOpen"
      @close="onClose"
    />`,
  }),

  args: {
    initModelValue: 'English',
    items: [
      {
        text: 'English',
        value: 'English',
        'data-testid': 'english-dropdown-item',
        iconItemAttrs: { 'data-testid': 'english-dropdown-item-icon' },
      },
      {
        text: 'Deutsch',
        value: 'Deutsch',
        'data-testid': 'deutsch-dropdown-item',
        iconItemAttrs: { 'data-testid': 'deutsch-dropdown-item-icon' },
      },
    ],
  },
};

export const WithInputToggle = {
  render: (args) => ({
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

      watch(
        () => modelValue.value,
        () => {
          search.value = modelValue.value;
        },
      );

      const filteredItems = computed(
        () => args.items.filter(
          (item) => item.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()),
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
      class="dropdown-with-input-toggle"
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
          buttonToggleAttrs
        }">
          <UiInput
            v-bind="buttonToggleAttrs"
            ref="toggleElement"
            :model-value="search"
            type="search"
            class="dropdown-with-input-toggle__input"
            placeholder="Search, e.g. English"
            @update:model-value="inputHandler($event, openHandler, closeHandler)"
          >
          </UiInput>
        </template>
        <template #content>
          <UiMessage
            v-if="noResults"
            title="No results"
            illustration="sad"
            :heading-title-attrs="{
              level: '4',
            }"
            class="dropdown-with-input-toggle__no-results"
          >
            <UiText>
              Unfortunately, the languages was not found.
            </UiText>
            <UiBulletPoints :items="[
              'Please try to enter single words',
              'Keep in mind, that you can only select languages from the autocomplete list'
            ]"/>
          </UiMessage>
        </template>
      </UiDropdown>`,
  }),

  args: {},
  argTypes: { initModelValue: { control: false } },
};

export const WithDefaultSlot = {
  render: (args) => ({
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
      class="dropdown-with-popover-width"
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
          :icon-attrs="item.iconItemAttrs"
          v-bind="{
            'data-testid': item['data-testid'],
          }"
        >
          {{ item.text }}
        </UiDropdownItem>
      </template>
    </UiDropdown>`,
  }),

  args: {
    initModelValue: 'English',
    items: [
      {
        text: 'English',
        value: 'English',
        'data-testid': 'english-dropdown-item',
        iconItemAttrs: { 'data-testid': 'english-dropdown-item-icon' },
      },
      {
        text: 'Deutsch',
        value: 'Deutsch',
        'data-testid': 'deutsch-dropdown-item',
        iconItemAttrs: { 'data-testid': 'deutsch-dropdown-item-icon' },
      },
    ],
  },
};

export const WithDropdownItemSlot = {
  render: (args) => ({
    components: { UiDropdown },
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
      :class="modifiers"
      :text="modelValue.text"
      :name="name"
      :close-on-click-outside="closeOnClickOutside"
      :toggle-element="toggleElement"
      :enable-keyboard-navigation="enableKeyboardNavigation"
      :items="items"
      :button-toggle-attrs="buttonToggleAttrs"
      :popover-attrs="popoverAttrs"
      class="dropdown-with-popover-width"
      @update:modelValue="onUpdateModelValue"
      @open="onOpen"
      @close="onClose"
    />`,
  }),

  args: {
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
  },
};

export const WithToggleSlot = {
  render: (args) => ({
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
      :class="modifiers"
      v-model="modelValue"
      :text="text"
      :name="name"
      :close-on-click-outside="closeOnClickOutside"
      :toggle-element="toggleElement"
      :enable-keyboard-navigation="enableKeyboardNavigation"
      :items="items"
      :button-toggle-attrs="buttonToggleAttrs"
      :popover-attrs="popoverAttrs"
      class="dropdown-with-popover-width"
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
        buttonToggleAttrs
      }">
        <UiButton
          v-bind="buttonToggleAttrs"
          ref="toggleElement"
          class="ui-dropdown__toggle"
          :aria-expanded="isOpen.toString()"
          @click="toggleHandler"
        >
          {{ text }}
        </UiButton>
      </template>
    </UiDropdown>`,
  }),

  argTypes: {
    text: { control: false },
    name: { control: false },
  },
};

export const WithPopoverSlot = {
  render: (args) => ({
    components: {
      UiDropdown,
      UiDropdownItem,
      UiButton,
      UiPopover,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      const itemsToRender = computed(() => args.items.map((item, key) => {
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
      }));
      return {
        ...args,
        ...events,
        modelValue,
        itemsToRender,
      };
    },
    template: `<UiDropdown
      v-model="modelValue"
      :class="modifiers"
      :text="text"
      :name="name"
      :close-on-click-outside="closeOnClickOutside"
      :toggle-element="toggleElement"
      :enable-keyboard-navigation="enableKeyboardNavigation"
      :items="items"
      :button-toggle-attrs="buttonToggleAttrs"
      :popover-attrs="popoverAttrs"
      class="dropdown-with-popover-width"
      @update:modelValue="onUpdateModelValue"
      @open="onOpen"
      @close="onClose"
    >
      <template #popover="{
        closeHandler,
        isOpen,
        popoverAttrs
      }">
        <UiPopover
          v-if="isOpen"
          v-bind="popoverAttrs"
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
  }),
};

export const WithContentSlot = {
  render: (args) => ({
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
      :class="modifiers"
      :text="text"
      :name="name"
      :close-on-click-outside="closeOnClickOutside"
      :toggle-element="toggleElement"
      :enable-keyboard-navigation="enableKeyboardNavigation"
      :items="items"
      :button-toggle-attrs="buttonToggleAttrs"
      :popover-attrs="popoverAttrs"
      class="dropdown-with-popover-width"
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
              {{ item }}
            </UiDropdownItem>
          </template>
        </div>
      </template>
    </UiDropdown>`,
  }),
};
