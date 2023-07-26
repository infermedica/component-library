import {
  computed,
  ref,
  provide,
  inject,
  toRefs,
} from 'vue';
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

// TODO: figure out how to don't reload page after click changing step
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

const { argTypes } = useArgTypes(UiStepper);
const meta = {
  title: 'Molecules/StepperTS',
  component: UiStepper,
  args: {
    currentStep: stepperSteps.at(3)?.label,
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
  decorators: [ (story, { id }) => {
    const [
      { currentStep },
      updateArgs,
    ] = useArgs();
    return {
      components: { story },
      setup(props, { attrs }) {
        const currentStep = computed({
          get: () => (attrs.currentStep),
          set: (newValue) => {
            updateArgs({ currentStep: newValue });
          },
        });
        provide('currentStep', currentStep);
        const args = computed(() => (Object.keys(attrs)
          .reduce(
            (object, key) => {
              if (key !== 'currentStep') {
                object[key] = attrs[key];
              }
              return object;
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
      const { steps } = toRefs(attrs);
      const currentStep = inject('currentStep');
      const args = computed(() => (attrs));
      const handleStepClick = (step, event) => {
        event.preventDefault();
        currentStep.value = step.label;
      };
      const stepsToRender = computed(() => ((steps.value as StepperStepAttrsProps[]).map((step) => ({
        ...step,
        data: 'data',
        onClick: handleStepClick.bind(event, step),
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

// export const WithMobileSlot: StepperStoryType = {
//   render: () => ({
//     components: {
//       UiStepper,
//       UiText,
//       UiProgress,
//     },
//     setup(props, { attrs }) {
//       const {
//         steps,
//         currentStep,
//         progressAttrs,
//         ...args
//       } = attrs;
//
//       return {
//         steps,
//         currentStep,
//         progressAttrs,
//         ...args,
//       };
//     },
//     template: `<UiStepper
//       :steps="steps"
//       :current-step="currentStep"
//       :progress-attrs="progressAttrs"
//     >
//       <template #mobile="{
//         currentStepDisplayText,
//         progressAttrs,
//       }">
//         <div class="ui-stepper__mobile">
//           <UiText
//             tag="span"
//             class="ui-text--body-2-comfortable ui-stepper__current-step"
//           >
//             {{ currentStepDisplayText }}
//           </UiText>
//           <UiProgress
//             v-bind="progressAttrs"
//             class="ui-stepper__progress"
//           />
//         </div>
//       </template>
//     </UiStepper>`,
//   }),
// };
//
// export const WithCurrentStepSlot: StepperStoryType = {
//   render: () => ({
//     components: {
//       UiStepper,
//       UiText,
//     },
//     setup(props, { attrs }) {
//       const {
//         steps,
//         currentStep,
//         progressAttrs,
//         ...args
//       } = attrs;
//
//       return {
//         steps,
//         currentStep,
//         progressAttrs,
//         ...args,
//       };
//     },
//     template: `<UiStepper
//     :steps="steps"
//     :current-step="currentStep"
//     :progress-attrs="progressAttrs"
//   >
//     <template #current-step="{ currentStepDisplayText }">
//       <UiText
//         tag="span"
//         class="ui-text--body-2-comfortable ui-stepper__current-step"
//       >
//         {{ currentStepDisplayText }}
//       </UiText>
//     </template>
//   </UiStepper>`,
//   }),
// };
//
// export const WithProgressSlot: StepperStoryType = {
//   render: () => ({
//     components: {
//       UiStepper,
//       UiProgress,
//     },
//     setup(props, { attrs }) {
//       const {
//         steps,
//         currentStep,
//         progressAttrs,
//         ...args
//       } = attrs;
//
//       return {
//         steps,
//         currentStep,
//         progressAttrs,
//         ...args,
//       };
//     },
//     template: `<UiStepper
//       :steps="steps"
//       :current-step="currentStep"
//       :progress-attrs="progressAttrs"
//     >
//       <template #progress="{ progressAttrs }">
//         <UiProgress
//           v-bind="progressAttrs"
//           class="ui-stepper__progress"
//         />
//       </template>
//     </UiStepper>`,
//   }),
// };
//
// export const WithDesktopSlot: StepperStoryType = {
//   render: () => ({
//     components: {
//       UiStepper,
//       UiStepperStep,
//       UiList,
//     },
//     setup(props, { attrs }) {
//       const {
//         steps,
//         currentStep,
//         progressAttrs,
//         ...args
//       } = attrs;
//
//       return {
//         steps,
//         currentStep,
//         progressAttrs,
//         ...args,
//       };
//     },
//     template: `<UiStepper
//       :steps="steps"
//       :current-step="currentStep"
//       :progress-attrs="progressAttrs"
//     >
//       <template #desktop="{
//         steps,
//         currentStep,
//         activeStepIndex,
//         stepperStepAttrs,
//       }">
//         <UiList class="ui-stepper__desktop">
//           <template
//             v-for="(step, index) in steps"
//             :key="index"
//           >
//             <UiStepperStep
//               :index="index"
//               :active-step-index="activeStepIndex"
//               v-bind="stepperStepAttrs(step)"
//             />
//           </template>
//         </UiList>
//       </template>
//     </UiStepper>`,
//   }),
// };
//
// export const WithItemsSlot: StepperStoryType = {
//   render: () => ({
//     components: {
//       UiStepper,
//       UiStepperStep,
//     },
//     setup(props, { attrs }) {
//       const {
//         steps,
//         currentStep,
//         progressAttrs,
//         ...args
//       } = attrs;
//
//       return {
//         steps,
//         currentStep,
//         progressAttrs,
//         ...args,
//       };
//     },
//     template: `<UiStepper
//       :steps="steps"
//       :current-step="currentStep"
//       :progress-attrs="progressAttrs"
//     >
//      <template #items="{
//        steps,
//        activeStepIndex,
//        stepperStepAttrs
//      }">
//        <template
//          v-for="(step, index) in steps"
//          :key="index"
//        >
//          <UiStepperStep
//            :index="index"
//            :active-step-index="activeStepIndex"
//            v-bind="stepperStepAttrs(step)"
//          />
//        </template>
//      </template>
//     </UiStepper>`,
//   }),
// };
//
// export const WithItemSlot: StepperStoryType = {
//   render: () => ({
//     components: {
//       UiStepper,
//       UiStepperStep,
//     },
//     setup(props, { attrs }) {
//       const {
//         steps,
//         currentStep,
//         progressAttrs,
//         ...args
//       } = attrs;
//
//       return {
//         steps,
//         currentStep,
//         progressAttrs,
//         ...args,
//       };
//     },
//     template: `<UiStepper
//       :steps="steps"
//       :current-step="currentStep"
//       :progress-attrs="progressAttrs"
//     >
//       <template #item="{
//         step,
//         index,
//         activeStepIndex,
//         stepperStepAttrs,
//       }">
//         <UiStepperStep
//           :index="index"
//           :active-step-index="activeStepIndex"
//           v-bind="stepperStepAttrs(step)"
//         />
//       </template>
//     </UiStepper>`,
//   }),
// };
