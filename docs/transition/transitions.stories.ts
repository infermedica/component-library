import {
  ref,
  provide,
  inject,
} from 'vue';
import { actions } from '@storybook/addon-actions';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import './transitions.stories.scss';

const events = actions({ onUpdateModelValue: 'update:modelValue' });

export default {
  title: 'Utilities/Transitions',
  args: { initModelValue: false },
  decorators: [ (story, { args }) => ({
    components: {
      story,
      UiButton,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      const toggleHandler = () => {
        modelValue.value = !modelValue.value;
      };
      provide('modelValue', modelValue);
      return { toggleHandler };
    },
    template: `<div class="min-h-80">
      <UiButton
        class="ui-button--theme-secondary ui-button--text space-bottom"
        @click='toggleHandler'
      >
        Show text
      </UiButton>
      <story/>
    </div>`,
  }) ],
};

export const Fade = {
  render: (args) => ({
    components: { UiText },
    setup() {
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<Transition name="fade">
      <UiText v-if="modelValue">
        List of possible conditions may not be complete, is provided solely for informational purposes, is not a qualified medical opinion and can not replace the medical diagnosis.
      </UiText>
    </Transition>`,
  }),
};

export const SlideFromLeft = {
  render: (args) => ({
    components: { UiText },
    setup() {
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<Transition name="slide-from-left">
      <UiText v-if="modelValue">
        List of possible conditions may not be complete, is provided solely for informational purposes, is not a qualified medical opinion and can not replace the medical diagnosis.
      </UiText>
    </Transition>`,
  }),
};

export const SlideFromRight = {
  render: (args) => ({
    components: { UiText },
    setup() {
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<Transition name="slide-from-right">
      <UiText v-if="modelValue">
        List of possible conditions may not be complete, is provided solely for informational purposes, is not a qualified medical opinion and can not replace the medical diagnosis.
      </UiText>
    </Transition>`,
  }),
};

export const SlideFromBottom = {
  render: (args) => ({
    components: { UiText },
    setup() {
      const modelValue = inject('modelValue');
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<Transition name="slide-from-bottom">
      <UiText v-if="modelValue">
        List of possible conditions may not be complete, is provided solely for informational purposes, is not a qualified medical opinion and can not replace the medical diagnosis.
      </UiText>
    </Transition>`,
  }),
};
