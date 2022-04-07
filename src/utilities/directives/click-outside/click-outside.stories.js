import { ref } from 'vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { clickOutside } from '../index';
import docs from './click-outside.mdx';

export default {
  title: 'Utilities/Directives/Click Outside',
  decorators: [() => ({ template: '<div style="height: 200px;"><story /></div>' })],
  parameters: {
    docs: {
      page: docs,
    },
  },
};

export const WithDirective = () => ({
  components: {
    UiButton, UiIcon, UiPopover, UiText,
  },
  directives: {
    clickOutside,
  },
  setup() {
    const isOpen = ref(true);
    const toggleHandler = () => {
      isOpen.value = !isOpen.value;
    };
    return {
      isOpen, toggleHandler,
    };
  },
  template: `<UiButton
    v-if="!isOpen"
    class="ui-button--secondary ui-button--text"
    @click="toggleHandler"
  >
    Open popover
  </UiButton>
  <UiPopover
    v-else
    style="--popover-content-padding: var(--space-16)"
    title="Popover header"
    v-click-outside="toggleHandler"
  >
    <template #close>
      <UiButton
        v-bind="attrs"
        class="ui-button--has-icon ui-button--secondary ui-button--text ui-popover__close"
        @click="toggleHandler"
      >
        <UiIcon icon="clear" />
      </UiButton>
    </template>
    <UiText>Popover content</UiText>
  </UiPopover>`,
});

export const WithDirectiveSwitcher = () => ({
  components: {
    UiButton,
    UiCheckbox,
    UiIcon,
    UiPopover,
    UiText,
  },
  directives: {
    clickOutside,
  },
  setup() {
    const isOpen = ref(true);
    const isDirective = ref(true);
    const toggleHandler = () => {
      isOpen.value = !isOpen.value;
    };
    return {
      isDirective, isOpen, toggleHandler,
    };
  },
  template: `<UiCheckbox 
    v-model="isDirective" 
    class="mb-4" 
    style="display:flex"
  >
    Outside click event listener is added.
  </UiCheckbox> <!-- TODO: Add UiSwitch component and use it here instead UiCheckbox -->
  <UiButton
      v-if="!isOpen"
      class="ui-button--secondary ui-button--text"
      @click="toggleHandler"
  >
    Open popover
  </UiButton>
  <UiPopover
    v-else
    style="--popover-content-padding: var(--space-16)"
    title="Popover header"
    v-click-outside:[isDirective]="toggleHandler"
  >
    <template #close>
      <UiButton
          v-bind="attrs"
          class="ui-button--has-icon ui-button--secondary ui-button--text ui-popover__close"
          @click="toggleHandler"
      >
        <UiIcon icon="clear"/>
      </UiButton>
    </template>
    <UiText>Popover content</UiText>
  </UiPopover>`,
});

export const WithoutDirective = () => ({
  components: {
    UiButton, UiIcon, UiPopover, UiText,
  },
  setup() {
    const isOpen = ref(true);
    const toggleHandler = () => {
      isOpen.value = !isOpen.value;
    };
    return {
      isOpen, toggleHandler,
    };
  },
  template: `
  <UiButton
    v-if="!isOpen"
    class="ui-button--secondary ui-button--text"
    @click="toggleHandler"
  >
    Open popover
  </UiButton>
  <UiPopover
    v-else
    style="--popover-content-padding: var(--space-16)"
    title="Popover header"
  >
    <template #close>
      <UiButton
        v-bind="attrs"
        class="ui-button--has-icon ui-button--secondary ui-button--text ui-popover__close"
        @click="toggleHandler"
      >
        <UiIcon icon="clear" />
      </UiButton>
    </template>
    <UiText>Popover content</UiText>
  </UiPopover>
  `,
});
