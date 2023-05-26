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
  name: 'fade' | 'slide-from-left' | 'slide-from-right' | 'slide-from-bottom',
}
type TransitionMetaType = Meta<TransitionArgsType>;
type TransitionStoryType = StoryObj<TransitionArgsType>

const transitionDecorator = (story) => ({
  components: { story, UiButton },
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
  </div>`
});

const meta = {
  title: 'Utilities/Transition',
  component: Transition,
  args: { name: 'fade' },
  argTypes: {
    name: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [transitionDecorator],
} satisfies TransitionMetaType;

export default meta;

export const Fade: TransitionStoryType = {
  render: () => ({
    components: {
      UiButton,
      UiText,
    },
    setup(props, { attrs }) {
      const isVisible = inject('isVisible');
     
      return {
        args: attrs,
        isVisible,
      }
    },
    template: `<Transition v-bind="args">
      <UiText v-if="isVisible">
        List of possible conditions may not be complete, is provided solely for informational purposes, is not a qualified medical opinion and can not replace the medical diagnosis.
      </UiText>
    </Transition>`,
  })
}

export const SlideFromLeft: TransitionStoryType = { ...Fade };
SlideFromLeft.args = { name: 'slide-from-left' };

export const SlideFromRight: TransitionStoryType = { ...Fade };
SlideFromRight.args = { name: 'slide-from-right' };

export const SlideFromBottom: TransitionStoryType = { ...Fade };
SlideFromBottom.args = { name: 'slide-from-bottom' };
