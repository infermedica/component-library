import UiProgressbar from '@/components/molecules/UiProgressbar/UiProgressbar.vue';
import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';
import './UiProgressbar.stories.scss';
import docs from './UiProgressbar.mdx';

export default {
  title: 'Molecules/Progressbar',
  component: UiProgressbar,
  subcomponents: { UiProgress },
  args: {
    steps: 6,
    currentStep: 3,
    progressAttrs: { id: 'stepper-progress' },
  },
  argTypes: { progressAttrs: { table: { subcategory: 'Attrs props' } } },
  parameters: {
    docs: { page: docs },
    cssProperties: {
      '--progressbar-height': '1rem',
      '--progressbar-step-size': '0.625rem',
      '--progressbar-step-margin': '3px 0',
      '--progressbar-step-background': 'var(--color-icon-on-selection)',
      '--progressbar-step-border-radius': 'var(--border-radius-circle)',
    },
  },
};

export const WithDots = (args) => ({
  components: { UiProgressbar },
  setup() {
    return { ...args };
  },
  template: `<UiProgressbar 
    :steps="steps" 
    :current-step="currentStep" 
  />`,
});

export const WithoutDots = (args) => ({
  components: { UiProgressbar },
  setup() {
    return { ...args };
  },
  template: `<UiProgressbar 
    :steps="steps" 
    :current-step="currentStep" 
    class="progressbar-without-dots"
  />`,
});

