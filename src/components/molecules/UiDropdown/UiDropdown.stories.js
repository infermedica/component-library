import UiDropdown from '@/components/molecules/UiDropdown/UiDropdown.vue';
import UiDropdownItem from '@/components/molecules/UiDropdown/_internal/UiDropdownItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiInput from '@/components/atoms/UiInput/UiInput.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import {
  computed, ref, watch,
} from 'vue';

export default {
  title: 'Molecules/Dropdown',
  component: UiDropdown,
  subcomponents: { UiDropdown, UiDropdownItem, UiPopover },
  args: {
    modelValue: { label: 'English' },
    items: [
      { label: 'English' },
      { label: 'Deutsch' },
      { label: 'Italiano' },
      { label: 'Polski' },
    ],
  },
  argTypes: {
  },
};

export const WithToggleSlot = (args) => ({
  components: { UiDropdown, UiDropdownItem, UiButton },
  setup() {
    const toggleElement = ref(null);
    const modelValue = ref({ label: 'English' });
    return { ...args, toggleElement, modelValue };
  },
  template: `<UiDropdown
    v-model="modelValue"
    :text="modelValue.label"
    :name="name"
    :toggle-element="toggleElement"
    style="--dropdown-popover-width: 15rem;"
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
WithToggleSlot.args = {
  text: 'English',
  name: 'locale',
};
WithToggleSlot.decorators = [() => ({ template: '<div style="min-height: 220px"><story /></div>' })];

export const WithPopoverSlot = (args) => ({
  components: {
    UiDropdown, UiDropdownItem, UiButton, UiPopover,
  },
  setup() {
    const toggleElement = ref(null);
    const modelValue = ref({ label: 'English' });
    return { ...args, toggleElement, modelValue };
  },
  template: `<UiDropdown
    v-model="modelValue"
    :text="modelValue.label"
    :name="name"
    :toggle-element="toggleElement"
    style="--dropdown-popover-width: 15rem;"
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
WithPopoverSlot.args = {
  text: 'English',
  name: 'locale',
};
WithPopoverSlot.decorators = [() => ({ template: '<div style="min-height: 220px"><story /></div>' })];

export const WithContentSlot = (args) => ({
  components: {
    UiDropdown, UiDropdownItem, UiButton,
  },
  setup() {
    const toggleElement = ref(null);
    const modelValue = ref({ label: 'English' });
    return { ...args, toggleElement, modelValue };
  },
  template: `<UiDropdown
    v-model="modelValue"
    :text="modelValue.label"
    :name="name"
    :toggle-element="toggleElement"
    style="--dropdown-popover-width: 15rem;"
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
WithContentSlot.args = {
  text: 'English',
  name: 'locale',
};
WithContentSlot.decorators = [() => ({ template: '<div style="min-height: 220px"><story /></div>' })];

export const WithInputToggle = (args) => ({
  components: {
    UiDropdown,
    UiDropdownItem,
    UiInput,
  },
  setup() {
    const toggleElement = ref(null);
    const modelValue = ref({ label: 'English' });
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
WithContentSlot.args = {
  text: 'English',
  name: 'locale',
};
WithContentSlot.decorators = [() => ({ template: '<div style="min-height: 220px"><story /></div>' })];
