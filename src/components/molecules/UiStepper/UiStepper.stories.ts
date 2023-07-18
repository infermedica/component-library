import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { useArgTypes } from '@sb/helpers';
import {
  UiStepper,
  UiProgress,
  UiText,
  UiList,
} from '@index';
import type { StepperProps } from '@index';
import UiStepperStep from './_internal/UiStepperStep.vue';
import type { StepperStepAttrsProps } from './_internal/UiStepperStep.vue';

// TODO: figure out how to don't reload page after click changing step
const stepperSteps: StepperStepAttrsProps[] = [
  {
    label: 'Introduction',
    href: '#',
    'data-testid': 'introduction',
  },
  {
    label: 'A really long step label',
    href: '#',
    'data-testid': 'long-step-label',
  },
  {
    label: 'Symptoms',
    href: '#',
    'data-testid': 'symptoms',
  },
  {
    label: 'Regions',
    href: '#',
    'data-testid': 'regions',
  },
  {
    label: 'Interview',
    href: '#',
    'data-testid': 'interview',
  },
  {
    label: 'Results',
    href: '#',
    'data-testid': 'results',
  },
];

type StepperArgsType = StepperProps;
type StepperMetaType = Meta<StepperArgsType>;
type StepperStoryType = StoryObj<StepperArgsType>;

const { argTypes } = useArgTypes(UiStepper);

const meta = {
  title: 'Molecules/StepperTS',
  component: UiStepper,
  args: {
    currentStep: stepperSteps.at(2)?.label,
    steps: stepperSteps,
    progressAttrs: { id: 'progress' },
  },
  argTypes: {
    ...argTypes,
    currentStep: {
      control: 'select',
      options: stepperSteps.map((step) => step.label),
    },
    steps: { control: 'object' },
    progressAttrs: {
      table: { subcategory: 'Attrs props' },
      control: 'object',
    },
  },
} satisfies StepperMetaType;
export default meta;

export const WithCurrentStep: StepperStoryType = {
  render: () => ({
    components: { UiStepper },
    setup(props, { attrs }) {
      const {
        steps,
        currentStep,
        progressAttrs,
        ...args
      } = attrs;

      console.log('attrs', attrs);
      return {
        steps,
        currentStep,
        progressAttrs,
        ...args,
      };
    },
    template: `<UiStepper
      :steps="steps"
      :current-step="currentStep"
      :progress-attrs="progressAttrs"
    />`,
  }),
};

export const WithMobileSlot: StepperStoryType = {
  render: () => ({
    components: {
      UiStepper,
      UiText,
      UiProgress,
    },
    setup(props, { attrs }) {
      const {
        steps,
        currentStep,
        progressAttrs,
        ...args
      } = attrs;

      return {
        steps,
        currentStep,
        progressAttrs,
        ...args,
      };
    },
    template: `<UiStepper
      :steps="steps"
      :current-step="currentStep"
      :progress-attrs="progressAttrs"
    >
      <template #mobile="{
        currentStepDisplayText,
        progressAttrs,
      }">
        <div class="ui-stepper__mobile">
          <UiText
            tag="span"
            class="ui-text--body-2-comfortable ui-stepper__current-step"
          >
            {{ currentStepDisplayText }}
          </UiText>
          <UiProgress
            v-bind="progressAttrs"
            class="ui-stepper__progress"
          />
        </div>
      </template>
    </UiStepper>`,
  }),
};

export const WithCurrentStepSlot: StepperStoryType = {
  render: () => ({
    components: {
      UiStepper,
      UiText,
    },
    setup(props, { attrs }) {
      const {
        steps,
        currentStep,
        progressAttrs,
        ...args
      } = attrs;

      return {
        steps,
        currentStep,
        progressAttrs,
        ...args,
      };
    },
    template: `<UiStepper
    :steps="steps"
    :current-step="currentStep"
    :progress-attrs="progressAttrs"
  >
    <template #current-step="{ currentStepDisplayText }">
      <UiText
        tag="span"
        class="ui-text--body-2-comfortable ui-stepper__current-step"
      >
        {{ currentStepDisplayText }}
      </UiText>
    </template>
  </UiStepper>`,
  }),
};

export const WithProgressSlot: StepperStoryType = {
  render: () => ({
    components: {
      UiStepper,
      UiProgress,
    },
    setup(props, { attrs }) {
      const {
        steps,
        currentStep,
        progressAttrs,
        ...args
      } = attrs;

      return {
        steps,
        currentStep,
        progressAttrs,
        ...args,
      };
    },
    template: `<UiStepper
      :steps="steps"
      :current-step="currentStep"
      :progress-attrs="progressAttrs"
    >
      <template #progress="{ progressAttrs }">
        <UiProgress
          v-bind="progressAttrs"
          class="ui-stepper__progress"
        />
      </template>
    </UiStepper>`,
  }),
};

export const WithDesktopSlot: StepperStoryType = {
  render: () => ({
    components: {
      UiStepper,
      UiStepperStep,
      UiList,
    },
    setup(props, { attrs }) {
      const {
        steps,
        currentStep,
        progressAttrs,
        ...args
      } = attrs;

      return {
        steps,
        currentStep,
        progressAttrs,
        ...args,
      };
    },
    template: `<UiStepper
      :steps="steps"
      :current-step="currentStep"
      :progress-attrs="progressAttrs"
    >
      <template #desktop="{
        steps,
        currentStep,
        activeStepIndex,
        stepperStepAttrs,
      }">
        <UiList class="ui-stepper__desktop">
          <template 
            v-for="(step, index) in steps"
            :key="index"
          >
            <UiStepperStep
              :index="index"
              :active-step-index="activeStepIndex"
              v-bind="stepperStepAttrs(step)"
            />
          </template>
        </UiList>
      </template>
    </UiStepper>`,
  }),
};

export const WithItemsSlot: StepperStoryType = {
  render: () => ({
    components: {
      UiStepper,
      UiStepperStep,
    },
    setup(props, { attrs }) {
      const {
        steps,
        currentStep,
        progressAttrs,
        ...args
      } = attrs;

      return {
        steps,
        currentStep,
        progressAttrs,
        ...args,
      };
    },
    template: `<UiStepper
      :steps="steps"
      :current-step="currentStep"
      :progress-attrs="progressAttrs"
    >
     <template #items="{
       steps,
       activeStepIndex,
       stepperStepAttrs
     }">
       <template
         v-for="(step, index) in steps"
         :key="index"
       >
         <UiStepperStep
           :index="index"
           :active-step-index="activeStepIndex"
           v-bind="stepperStepAttrs(step)"
         />
       </template>
     </template>
    </UiStepper>`,
  }),
};

export const WithItemSlot: StepperStoryType = {
  render: () => ({
    components: {
      UiStepper,
      UiStepperStep,
    },
    setup(props, { attrs }) {
      const {
        steps,
        currentStep,
        progressAttrs,
        ...args
      } = attrs;

      return {
        steps,
        currentStep,
        progressAttrs,
        ...args,
      };
    },
    template: `<UiStepper
      :steps="steps"
      :current-step="currentStep"
      :progress-attrs="progressAttrs"
    >
      <template #item="{
        step,
        index,
        activeStepIndex,
        stepperStepAttrs,
      }">
        <UiStepperStep
          :index="index"
          :active-step-index="activeStepIndex"
          v-bind="stepperStepAttrs(step)"
        />
      </template>
    </UiStepper>`,
  }),
};
