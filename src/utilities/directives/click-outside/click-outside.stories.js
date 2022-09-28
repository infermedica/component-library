import { clickOutside } from '@/utilities/directives/index';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiSwitch from '@/components/molecules/UiSwitch/UiSwitch.vue';
import UiPopover from '@/components/molecules/UiPopover/UiPopover.vue';
import { ref } from 'vue';
import docs from './click-outside.mdx';

export default {
  title: 'Utilities/Directives/Click Outside',
  decorators: [() => ({ template: '<div style="height: 200px;"><story /></div>' })],
  parameters: { docs: { page: docs } },
};

export const WithDirective = () => ({
  components: {
    UiButton,
    UiIcon,
    UiText,
    UiPopover,
  },
  directives: { clickOutside },
  setup() {
    const isOpen = ref(true);
    const toggleHandler = () => {
      isOpen.value = !isOpen.value;
    };
    return {
      isOpen,
      toggleHandler,
    };
  },
  template: `<UiButton
    v-if="!isOpen"
    class="ui-button--theme-secondary ui-button--text"
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
        class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-popover__close"
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
    UiIcon,
    UiText,
    UiSwitch,
    UiPopover,
  },
  directives: { clickOutside },
  setup() {
    const isOpen = ref(true);
    const isDirective = ref(true);
    const toggleHandler = () => {
      isOpen.value = !isOpen.value;
    };
    return {
      isDirective,
      isOpen,
      toggleHandler,
    };
  },
  template: `<UiSwitch 
    v-model="isDirective" 
    class="mb-4" 
    style="display:flex"
  >
    Outside click event listener is {{isDirective ? 'enabled' : 'disabled'}}.
  </UiSwitch>
  <UiButton
      v-if="!isOpen"
      class="ui-button--theme-secondary ui-button--text"
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
          class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-popover__close"
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
    UiButton,
    UiIcon,
    UiPopover,
    UiText,
  },
  setup() {
    const isOpen = ref(true);
    const toggleHandler = () => {
      isOpen.value = !isOpen.value;
    };
    return {
      isOpen,
      toggleHandler,
    };
  },
  template: `
  <UiButton
    v-if="!isOpen"
    class="ui-button--theme-secondary ui-button--text"
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
        class="ui-button--has-icon ui-button--theme-secondary ui-button--text ui-popover__close"
        @click="toggleHandler"
      >
        <UiIcon icon="clear" />
      </UiButton>
    </template>
    <UiText>Popover content</UiText>
  </UiPopover>
  `,
});
