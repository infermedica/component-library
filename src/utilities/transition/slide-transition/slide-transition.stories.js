import {
  ref,
  provide,
  inject,
} from 'vue';
import { actions } from '@storybook/addon-actions';
import UiSidePanel from '@/components/organisms/UiSidePanel/UiSidePanel.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import {
  scrollTabindex,
  keyboardFocus,
} from '@/utilities/directives';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onAfterEnter: 'after-enter',
});

export default {
  title: 'Utilities/Transitions/Slide',
  component: UiSidePanel,
  args: {
    initModelValue: true,
    title: 'For business',
    subtitle: '',
    transitionBackdropAttrs: { 'data-testid': 'backdrop-transition' },
    backdropAttrs: { 'data-testid': 'backdrop' },
    dialogAttrs: { 'data-testid': 'dialog-element' },
    transitionDialogAttrs: { 'data-testid': 'dialog-transition' },
    headingTitleAttrs: { 'data-testid': 'title-heading' },
    textSubtitleAttrs: { 'data-testid': 'subtitle-text' },
    buttonCloseAttrs: {
      'data-testid': 'close-button',
      ariaLabel: 'close modal',
    },
    iconCloseAttrs: { 'data-testid': 'close-icon' },
    contentAttrs: { 'data-testid': 'content-element' },
  },
  decorators: [ (story, { args }) => ({
    components: {
      story,
      UiButton,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      const toggleSidePanel = () => {
        modelValue.value = !modelValue.value;
      };
      provide('modelValue', modelValue);
      return {
        toggleSidePanel,
        title: args.title,
      };
    },
    template: `<div class="max-w-32 min-h-80">
      <UiButton
        class="ui-button--text ui-button--theme-secondary"
        @click="toggleSidePanel"
      >
        {{ title }}
      </UiButton>
      <story/>
    </div>`,
  }) ],
};

export const Slide = {
  render: (args) => ({
    components: {
      UiSidePanel,
      UiButton,
      UiText,
    },
    directives: {
      scrollTabindex,
      keyboardFocus,
    },
    setup() {
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiSidePanel
      v-model="modelValue"
      :title="title"
      :subtitle="subtitle"
      :transition-backdrop-attrs="transitionBackdropAttrs"
      :backdrop-attrs="backdropAttrs"
      :transition-dialog-attrs="transitionDialogAttrs"
      :heading-title-attrs="headingTitleAttrs"
      :text-subtitle-attrs="textSubtitleAttrs"
      :button-close-attrs="buttonCloseAttrs"
      :icon-close-attrs="iconCloseAttrs"
      :dialog-attrs="dialogAttrs"
      :content-attrs="contentAttrs"
      @update:modelValue="onUpdateModelValue"
      @after-enter="onAfterEnter"
    >
      <template #content="{ contentAttrs }">
        <div
          v-scroll-tabindex
          v-keyboard-focus
          v-bind="contentAttrs"
          class="ui-side-panel__content"
        >
          <UiText>
            Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:
          </UiText>
        </div>
      </template>
    </UiSidePanel>`,
  }),
};
