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
      '--progressbar-step-margin-block':
        'var(--progressbar-step-margin-block-start, 3px) var(--progressbar-step-margin-block-end, 3px)',
      '--progressbar-step-margin-inline':
        'var(--progressbar-step-margin-inline-start, 0) var(--progressbar-step-margin-inline-end, 0)',
      '--progressbar-step-border-start-start-radius': 'var(--border-radius-circle)',
      '--progressbar-step-border-start-end-radius': 'var(--border-radius-circle)',
      '--progressbar-step-border-end-start-radius': 'var(--border-radius-circle)',
      '--progressbar-step-border-end-end-radius': 'var(--border-radius-circle)',
      '--progressbar-step-background': 'var(--color-icon-on-selection)',
    },
  },
};

export const WithDots = {
  render: (args) => ({
    components: { UiProgressbar },
    setup() {
      return { ...args };
    },
    template: `<UiProgressbar
      :steps="steps"
      :current-step="currentStep"
    />`,
  }),
};

export const WithoutDots = {
  render: (args) => ({
    components: { UiProgressbar },
    setup() {
      return { ...args };
    },
    template: `<UiProgressbar
      :steps="steps"
      :current-step="currentStep"
      class="progressbar-without-dots"
    />`,
  }),
};
