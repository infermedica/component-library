import UiStepper from '@/components/molecules/UiStepper/UiStepper.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
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
  subcomponents: {
    UiStepperStep,
    UiButton,
    UiProgress,
    UiText,
    UiList,
  },
  args: {
    steps,
    currentStep: steps.at(2).label,
    progressAttrs: {
      id: 'progress',
    },
  },
  argTypes: {
    currentStep: {
      control: 'select',
      options: steps.map((step) => step.label),
    },
    progressAttrs: {
      table: {
        subcategory: 'Attrs props',
      },
    },
  },
  decorators: [
    () => ({
      template: `<div class="desktop:max-w-35">
      <story />
    </div>`,
    }),
  ],
};
export const WithCurrentStep = {
  render: (args) => ({
    components: {
      UiStepper,
    },
    setup() {
      return {
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
export const WithMobileSlot = {
  render: (args) => ({
    components: {
      UiStepper,
      UiText,
      UiProgress,
    },
    setup() {
      return {
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
export const WithCurrentStepSlot = {
  render: (args) => ({
    components: {
      UiStepper,
      UiText,
    },
    setup() {
      return {
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
export const WithProgressSlot = {
  render: (args) => ({
    components: {
      UiStepper,
      UiProgress,
    },
    setup() {
      return {
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
export const WithDesktopSlot = {
  render: (args) => ({
    components: {
      UiStepper,
      UiStepperStep,
      UiList,
    },
    setup() {
      return {
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
      indexOfActiveStep,
      stepperStepAttrs,
    }">
      <UiList class="ui-stepper__desktop">
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
      </UiList>
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
      return {
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
      return {
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
export const WithItemLinkSlot = {
  render: (args) => ({
    components: {
      UiStepper,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: `<UiStepper
    :steps="steps"
    :current-step="currentStep"
    :progress-attrs="progressAttrs"
  >
    <template #link-slot="{
      itemAttrs,
      itemTag,
      itemClass,
      label,
    }">
      <component
        v-bind="itemAttrs"
        :is="itemTag"
        :class="[
          'ui-stepper-step__content', 
          itemClass,
        ]"
      >
        {{ label }}
      </component>
    </template>
  </UiStepper>`,
  }),
};
