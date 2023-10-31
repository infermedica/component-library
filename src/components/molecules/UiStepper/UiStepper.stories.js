import UiStepper from '@/components/molecules/UiStepper/UiStepper.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiStepperStep from '@/components/molecules/UiStepper/_internal/UiStepperStep.vue';

const steps = [
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

export default {
  title: 'Molecules/Stepper',
  component: UiStepper,
  args: {
    steps,
    currentStep: steps.at(2).label,
  },
  argTypes: {
    currentStep: {
      control: 'select',
      options: steps.map((step) => step.label),
    },
  },
};

export const WithCurrentStep = {
  render: (args) => ({
    components: { UiStepper },
    setup() {
      return { ...args };
    },
    template: `<UiStepper
      :steps="steps"
      :current-step="currentStep"
    />`,
  }),
};

export const WithCurrentStepSlot = {
  render: (args) => ({
    components: {
      UiStepper,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiStepper
      :steps="steps"
      :current-step="currentStep"
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

export const WithItemsSlot = {
  render: (args) => ({
    components: {
      UiStepper,
      UiStepperStep,
    },
    setup() {
      return { ...args };
    },
    template: `<UiStepper
      :steps="steps"
      :current-step="currentStep"
    >
     <template #items="{
       steps,
       indexOfActiveStep,
       stepperStepAttrs
     }">
       <template
         v-for="(step, index) in steps"
         :key="index"
       >
         <UiStepperStep
           :index="index"
           :index-of-active-step="indexOfActiveStep"
           v-bind="stepperStepAttrs(step)"
         />
       </template>
     </template>
    </UiStepper>`,
  }),
};

export const WithItemSlot = {
  render: (args) => ({
    components: {
      UiStepper,
      UiStepperStep,
    },
    setup() {
      return { ...args };
    },
    template: `<UiStepper
      :steps="steps"
      :current-step="currentStep"
    >
      <template #item="{
        step,
        index,
        indexOfActiveStep,
        stepperStepAttrs,
      }">
        <UiStepperStep
          :index="index"
          :index-of-active-step="indexOfActiveStep"
          v-bind="stepperStepAttrs(step)"
        />
      </template>
    </UiStepper>`,
  }),
};
