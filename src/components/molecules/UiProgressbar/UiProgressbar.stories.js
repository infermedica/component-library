import UiProgressbar from '@/components/molecules/UiProgressbar/UiProgressbar.vue';
import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';

export default {
  title: 'Molecules/Progressbar',
  component: UiProgressbar,
  subcomponents: { UiProgress },
  args: {
    steps: 6,
    currentStep: 1,
  },
};

const Template = (args) => ({
  components: { UiProgressbar },
  setup() {
    return { ...args };
  },
  template: `<UiProgressbar 
    :steps="steps" 
    :current-step="currentStep" 
  />`,
});

export const Common = Template.bind({});
