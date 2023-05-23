import {
  computed,
  ref,
  provide,
  inject,
} from 'vue';
import { actions } from '@storybook/addon-actions';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';

const events = actions({ onUpdateModelValue: 'update:isVisible' });

export default {
  title: 'Utilities/Transitions',
  args: { name: 'fade' },
  decorators: [ (story) => ({
    components: {
      story,
      UiButton,
    },
    setup() {
      const isVisible = ref(true);
      const toggleHandler = () => {
        isVisible.value = !isVisible.value;
      };
      const toggleButtonText = computed(() => (isVisible.value ? 'Hide' : 'Show'));
      provide('isVisible', isVisible);
      return {
        toggleHandler,
        toggleButtonText,
      };
    },
    template: `<div class="min-h-30">
      <UiButton
        class="ui-button--theme-secondary ui-button--text mb-4"
        @click='toggleHandler'
      >
        {{ toggleButtonText }}
      </UiButton>
      <story/>
    </div>`,
  }) ],
};

export const Fade = {
  render: (args) => ({
    components: { UiText },
    setup() {
      const isVisible = inject('isVisible');
      return {
        ...args,
        ...events,
        isVisible,
      };
    },
    template: `<Transition name="args.name">
      <UiText v-if="isVisible">
        List of possible conditions may not be complete, is provided solely for informational purposes, is not a qualified medical opinion and can not replace the medical diagnosis.
      </UiText>
    </Transition>`,
  }),
};

export const SlideFromLeft = {
  render: (args) => ({
    components: { UiText },
    setup() {
      const isVisible = inject('isVisible');
      return {
        ...args,
        ...events,
        isVisible,
      };
    },
    template: `<Transition name="slide-from-left">
      <UiText v-if="isVisible">
        List of possible conditions may not be complete, is provided solely for informational purposes, is not a qualified medical opinion and can not replace the medical diagnosis.
      </UiText>
    </Transition>`,
  }),
};

export const SlideFromRight = {
  render: (args) => ({
    components: { UiText },
    setup() {
      const isVisible = inject('isVisible');
      return {
        ...args,
        ...events,
        isVisible,
      };
    },
    template: `<Transition name="slide-from-right">
      <UiText v-if="isVisible">
        List of possible conditions may not be complete, is provided solely for informational purposes, is not a qualified medical opinion and can not replace the medical diagnosis.
      </UiText>
    </Transition>`,
  }),
};

export const SlideFromBottom = {
  render: (args) => ({
    components: { UiText },
    setup() {
      const isVisible = inject('isVisible');
      return {
        ...args,
        ...events,
        isVisible,
      };
    },
    template: `<Transition name="slide-from-bottom">
      <UiText v-if="isVisible">
        List of possible conditions may not be complete, is provided solely for informational purposes, is not a qualified medical opinion and can not replace the medical diagnosis.
      </UiText>
    </Transition>`,
  }),
};
