import UiProgressbar from '@/components/molecules/UiProgressbar/UiProgressbar.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';
import './UiProgressbar.stories.scss';

export default {
  title: 'Molecules/Progressbar',
  component: UiProgressbar,
  args: {
    label: '',
    steps: 6,
    currentStep: 3,
    progressAttrs: { id: 'stepper-progress' },
  },
  argTypes: { progressAttrs: { table: { subcategory: 'Attrs props' } } },
  parameters: {
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
      :label="label"
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
      :label="label"
      :steps="steps"
      :current-step="currentStep"
      class="progressbar-without-dots"
    />`,
  }),
};
export const WithLabel = {
  render: (args) => ({
    components: { UiProgressbar },
    setup() {
      return { ...args };
    },
    template: `<UiProgressbar
      :steps="steps"
      :current-step="currentStep"
      :label="label"
    />`,
  }),
};
WithLabel.args = { label: 'Introduction' };

export const WithStepCounter = {
  render: (args) => ({
    components: {
      UiProgressbar,
      UiProgress,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiProgressbar
      :label="label"
      :steps="steps"
      :current-step="currentStep"
      class="progressbar-with-step-counter"
    >
      <template #label="{
        label,
        steps,
        currentStep,
      }">
        <UiText>{{currentStep}}/{{steps}} {{ label }}</UiText>
      </template>
    </UiProgressbar>`,
  }),
};
WithStepCounter.args = { label: 'Introduction' };

export const WithLabelSlot = {
  render: (args) => ({
    components: {
      UiProgressbar,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiProgressbar
      :label="label"
      :steps="steps"
      :current-step="currentStep"
    >
      <template #label="{
        label,
        steps,
        currentStep,
       }">
        <UiText class="ui-progressbar__label">
          {{ label }}
        </UiText>
      </template>
    </UiProgressbar>`,
  }),
};
WithLabelSlot.args = { label: 'Introduction' };

export const WithProgressSlot = {
  render: (args) => ({
    components: {
      UiProgressbar,
      UiProgress,
    },
    setup() {
      return { ...args };
    },
    template: `<UiProgressbar
      :label="label"
      :steps="steps"
      :current-step="currentStep"
    >
      <template #progress="{
        value,
        stepsDots,
        steps,
        currentStep,
        progressAttrs,
      }">
        <UiProgress
          v-bind="progressAttrs"
          :value="value"
          :max="100"
          class="ui-progressbar__progress"
        />
        <div class="ui-progressbar__steps">
          <template
            v-for="dot in stepsDots"
            :key="dot"
          >
            <div
               class="ui-progressbar__step"
              :style="{ '--_progressbar-step-left': ( 100 / steps * dot ) + '%' }"
            />
          </template>
        </div>
      </template>
    </UiProgressbar>`,
  }),
};
