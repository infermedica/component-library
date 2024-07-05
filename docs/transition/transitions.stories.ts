import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import {
  computed,
  ref,
  Transition,
  inject,
  provide,
} from 'vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';

type TransitionArgsType = {
  name: 'fade' | 'slide-from-start' | 'slide-from-end' | 'slide-from-bottom',
}
type TransitionMetaType = Meta<TransitionArgsType>;
type TransitionStoryType = StoryObj<TransitionArgsType>

const transitionDecorator = (story) => ({
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
});

const meta = {
  title: 'Utilities/Transition',
  component: Transition,
  tags: [ '!autodocs' ],
  args: { name: 'fade' },
  argTypes: { name: { table: { disable: true } } },
  decorators: [ transitionDecorator ],
} satisfies TransitionMetaType;

export default meta;

export const Fade: TransitionStoryType = {
  render: () => ({
    components: {
      UiButton,
      UiText,
    },
    setup(props, { attrs: args }) {
      const isVisible = inject('isVisible');

      return {
        args,
        isVisible,
      };
    },
    template: `<Transition v-bind="args">
      <UiText v-if="isVisible">
        List of possible conditions may not be complete, is provided solely for informational purposes, is not a qualified medical opinion and can not replace the medical diagnosis.
      </UiText>
    </Transition>`,
  }),
};

export const SlideFromStart: TransitionStoryType = { ...Fade };
SlideFromStart.args = { name: 'slide-from-start' };

export const SlideFromEnd: TransitionStoryType = { ...Fade };
SlideFromEnd.args = { name: 'slide-from-end' };

export const SlideFromBottom: TransitionStoryType = { ...Fade };
SlideFromBottom.args = { name: 'slide-from-bottom' };
