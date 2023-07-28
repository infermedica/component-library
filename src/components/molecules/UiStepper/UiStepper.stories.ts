import {
  computed,
  provide,
  inject,
} from 'vue';
import type { WritableComputedRef } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api';
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

const stepperSteps: StepperStepAttrsProps[] = [
  {
    label: 'Introduction',
    'data-testid': 'introduction',
    href: '#',
  },
  {
    label: 'A really long step label',
    'data-testid': 'long-step-label',
    href: '#',
  },
  {
    label: 'Symptoms',
    'data-testid': 'symptoms',
    href: '#',
  },
  {
    label: 'Regions',
    'data-testid': 'regions',
    href: '#',
  },
  {
    label: 'Interview',
    'data-testid': 'interview',
    href: '#',
  },
  {
    label: 'Results',
    'data-testid': 'results',
    href: '#',
  },
];

type StepperArgsType = StepperProps;
type StepperMetaType = Meta<StepperArgsType>;
type StepperStoryType = StoryObj<StepperArgsType>;
type StepperSteps = { steps: StepperStepAttrsProps[] };

const { argTypes } = useArgTypes(UiStepper);

const meta = {
  title: 'Molecules/Stepper',
  component: UiStepper,
  args: {
    currentStep: stepperSteps.at(3)?.label,
    steps: stepperSteps,
  },
  argTypes: {
    ...argTypes,
    currentStep: {
      control: 'select',
      options: stepperSteps.map((step) => step.label),
    },
    steps: { control: 'object' },
  },
  decorators: [ (story, { id }) => {
    const [
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { currentStep },
      updateArgs,
    ] = useArgs();
    return {
      components: { story },
      setup(props, { attrs }) {
        const currentStepAttrs = computed({
          get: () => (attrs.currentStep),
          set: (newValue) => {
            updateArgs({ currentStep: newValue });
          },
        });
        provide('currentStep', currentStepAttrs);
        const args = computed(() => (Object.keys(attrs)
          .reduce(
            (object, key) => {
              const storyAttrs: Partial<StepperSteps> | StepperSteps = { ...object };
              if (key !== 'currentStep') {
                (storyAttrs as StepperStepAttrsProps)[key] = attrs[key];
              }
              return storyAttrs;
            },
            {},
          )));

        return {
          args,
          id,
        };
      },
      template: '<story v-bind="args" :key="id"/>',
    };
  } ],
  parameters: {
    chromatic: {
      disableSnapshot: false,
      viewports: [
        320,
        1200,
      ],
    },
  },
} satisfies StepperMetaType;
export default meta;

export const Basic: StepperStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: { UiStepper },
    setup(props, { attrs }) {
      const { steps } = attrs;
      const currentStep = inject('currentStep') as WritableComputedRef<unknown>;
      const args = computed(() => (attrs));
      const handleStepClick = (step: StepperStepAttrsProps, event: Event) => {
        event.preventDefault();
        currentStep.value = step.label;
      };
      const stepsToRender = computed(() => ((steps as StepperStepAttrsProps[]).map((step) => ({
        ...step,
        onClick: handleStepClick.bind(this, step),
      }))));

      return {
        currentStep,
        stepsToRender,
        args,
      };
    },
    template: `<UiStepper
      v-bind="args"
      :current-step="currentStep"
      :steps="stepsToRender"
    />`,
  }),
};

export const WithMobileSlot: StepperStoryType = {
  render: () => ({
    inheritAttrs: false,
    components: {
      UiStepper,
      UiText,
      UiProgress,
    },
    setup(props, { attrs }) {
      const { steps } = attrs;
      const currentStep = inject('currentStep') as WritableComputedRef<unknown>;
      const args = computed(() => (attrs));
      const handleStepClick = (step: StepperStepAttrsProps, event: Event) => {
        event.preventDefault();
        currentStep.value = step.label;
      };
      const stepsToRender = computed(() => ((steps as StepperStepAttrsProps[]).map((step) => ({
        ...step,
        onClick: handleStepClick.bind(this, step),
      }))));

      return {
        currentStep,
        stepsToRender,
        args,
      };
    },
    template: `<UiStepper
      v-bind="args"
      :current-step="currentStep"
      :steps="stepsToRender"
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
    inheritAttrs: false,
    components: {
      UiStepper,
      UiText,
    },
    setup(props, { attrs }) {
      const { steps } = attrs;
      const currentStep = inject('currentStep') as WritableComputedRef<unknown>;
      const args = computed(() => (attrs));
      const handleStepClick = (step: StepperStepAttrsProps, event: Event) => {
        event.preventDefault();
        currentStep.value = step.label;
      };
      const stepsToRender = computed(() => ((steps as StepperStepAttrsProps[]).map((step) => ({
        ...step,
        onClick: handleStepClick.bind(this, step),
      }))));

      return {
        currentStep,
        stepsToRender,
        args,
      };
    },
    template: `<UiStepper
      v-bind="args"
      :current-step="currentStep"
      :steps="stepsToRender"
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
    inheritAttrs: false,
    components: {
      UiStepper,
      UiProgress,
    },
    setup(props, { attrs }) {
      const { steps } = attrs;
      const currentStep = inject('currentStep') as WritableComputedRef<unknown>;
      const args = computed(() => (attrs));
      const handleStepClick = (step: StepperStepAttrsProps, event: Event) => {
        event.preventDefault();
        currentStep.value = step.label;
      };
      const stepsToRender = computed(() => ((steps as StepperStepAttrsProps[]).map((step) => ({
        ...step,
        onClick: handleStepClick.bind(this, step),
      }))));

      return {
        currentStep,
        stepsToRender,
        args,
      };
    },
    template: `<UiStepper
      v-bind="args"
      :current-step="currentStep"
      :steps="stepsToRender"
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
    inheritAttrs: false,
    components: {
      UiStepper,
      UiStepperStep,
      UiList,
    },
    setup(props, { attrs }) {
      const { steps } = attrs;
      const currentStep = inject('currentStep') as WritableComputedRef<unknown>;
      const args = computed(() => (attrs));
      const handleStepClick = (step: StepperStepAttrsProps, event: Event) => {
        event.preventDefault();
        currentStep.value = step.label;
      };
      const stepsToRender = computed(() => ((steps as StepperStepAttrsProps[]).map((step) => ({
        ...step,
        onClick: handleStepClick.bind(this, step),
      }))));

      return {
        currentStep,
        stepsToRender,
        args,
      };
    },
    template: `<UiStepper
      v-bind="args"
      :current-step="currentStep"
      :steps="stepsToRender"
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
    inheritAttrs: false,
    components: {
      UiStepper,
      UiStepperStep,
    },
    setup(props, { attrs }) {
      const { steps } = attrs;
      const currentStep = inject('currentStep') as WritableComputedRef<unknown>;
      const args = computed(() => (attrs));
      const handleStepClick = (step: StepperStepAttrsProps, event: Event) => {
        event.preventDefault();
        currentStep.value = step.label;
      };
      const stepsToRender = computed(() => ((steps as StepperStepAttrsProps[]).map((step) => ({
        ...step,
        onClick: handleStepClick.bind(this, step),
      }))));

      return {
        currentStep,
        stepsToRender,
        args,
      };
    },
    template: `<UiStepper
      v-bind="args"
      :current-step="currentStep"
      :steps="stepsToRender"
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
    inheritAttrs: false,
    components: {
      UiStepper,
      UiStepperStep,
    },
    setup(props, { attrs }) {
      const { steps } = attrs;
      const currentStep = inject('currentStep') as WritableComputedRef<unknown>;
      const args = computed(() => (attrs));
      const handleStepClick = (step: StepperStepAttrsProps, event: Event) => {
        event.preventDefault();
        currentStep.value = step.label;
      };
      const stepsToRender = computed(() => ((steps as StepperStepAttrsProps[]).map((step) => ({
        ...step,
        onClick: handleStepClick.bind(this, step),
      }))));

      return {
        currentStep,
        stepsToRender,
        args,
      };
    },
    template: `<UiStepper
      v-bind="args"
      :current-step="currentStep"
      :steps="stepsToRender"
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
