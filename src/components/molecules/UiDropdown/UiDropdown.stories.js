import UiDropdown from '@/components/molecules/UiDropdown/UiDropdown.vue';
import UiDropdownItem from '@/components/molecules/UiDropdown/_internal/UiDropdownItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import { ref } from 'vue';

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
        ref="toggle"
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
        ref="toggle"
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
        ref="toggle"
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
