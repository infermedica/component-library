import UiStepper from '@/components/molecules/UiStepper/UiStepper.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';

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
    UiText,
    UiProgress,
    UiList,
    UiListItem,
    UiButton,
  },
  args: {
    steps,
    currentStep: steps.at(2).label,
    progressAttrs: { id: 'progress' },
  },
  argTypes: {
    currentStep: {
      control: 'select',
      options: steps.map((step) => step.label),
    },
    progressAttrs: { table: { subcategory: 'Attrs props' } },
  },
  decorators: [ () => ({ template: '<div class="desktop:max-w-35"><story /></div>' }) ],
};

const Template = (args) => ({
  components: { UiStepper },
  setup() {
    return { ...args };
  },
  template: `<UiStepper
    :steps="steps"
    :current-step="currentStep"
    :progress-attrs="progressAttrs"
  />`,
});

export const WithCurrentStep = Template.bind({});

export const WithCurrentStepSlot = (args) => ({
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
    :progress-attrs="progressAttrs"
  >
    <template #current-step="{currentStepDisplayText}">
      <UiText
        tag="span"
        class="ui-stepper__text"
      >
        {{ currentStepDisplayText }}
      </UiText>
    </template>
  </UiStepper>`,
});

export const WithProgressSlot = (args) => ({
  components: {
    UiStepper,
    UiProgress,
  },
  setup() {
    return { ...args };
  },
  template: `<UiStepper
    :steps="steps"
    :current-step="currentStep"
    :progress-attrs="progressAttrs"
  >
    <template #progress="{stepsProgress}">
      <UiProgress
        :min="0"
        :max="100"
        :value="stepsProgress"
      />
    </template>
  </UiStepper>`,
});

export const WithDesktopSlot = (args) => ({
  components: {
    UiStepper,
    UiList,
    UiListItem,
    UiButton,
  },
  setup() {
    return { ...args };
  },
  template: `<UiStepper
    :steps="steps"
    :current-step="currentStep"
    :progress-attrs="progressAttrs"
  >
    <template #desktop="{steps, indexOfActiveStep, determineStep}">
      <UiList class="ui-stepper__desktop">
        <template
          v-for="(step, index) in steps"
          :key="index"
        >
          <UiListItem
            :list-item-attrs="{
              class: [
                'ui-stepper__step',
                { 'ui-stepper__step--visited': indexOfActiveStep >= index },
                { 'ui-stepper__step--current': indexOfActiveStep === index },
              ]
            }"
            v-bind="determineStep(index, step)"
            class="ui-button--text ui-button--theme-secondary ui-stepper__item"
          >
            {{ step.label }}
          </UiListItem>
        </template>
      </UiList>
    </template>
  </UiStepper>`,
});

export const WithItemsSlot = (args) => ({
  components: {
    UiStepper,
    UiListItem,
    UiButton,
  },
  setup() {
    return { ...args };
  },
  template: `<UiStepper
    :steps="steps"
    :current-step="currentStep"
    :progress-attrs="progressAttrs"
  >
    <template #items="{steps, indexOfActiveStep, determineStep}">
      <template
        v-for="(step, index) in steps"
        :key="index"
      >
        <UiListItem
          :list-item-attrs="{
            class: [
              'ui-stepper__step',
              { 'ui-stepper__step--visited': indexOfActiveStep >= index },
              { 'ui-stepper__step--current': indexOfActiveStep === index },
            ]
          }"
          v-bind="determineStep(index, step)"
          class="ui-button--text ui-button--theme-secondary ui-stepper__item"
        >
          {{ step.label }}
      </UiListItem>
      </template>
    </template>
  </UiStepper>`,
});

export const WithItemSlot = (args) => ({
  components: {
    UiStepper,
    UiListItem,
    UiButton,
  },
  setup() {
    return { ...args };
  },
  template: `<UiStepper
    :steps="steps"
    :current-step="currentStep"
    :progress-attrs="progressAttrs"
  >
    <template #item="{step, index, indexOfActiveStep, determineStep}">
      <UiListItem
        :list-item-attrs="{
          class: [
            'ui-stepper__step',
            { 'ui-stepper__step--visited': indexOfActiveStep >= index },
            { 'ui-stepper__step--current': indexOfActiveStep === index },
          ]
        }"
        v-bind="determineStep(index, step)"
        class="ui-button--text ui-button--theme-secondary ui-stepper__item"
      >
        {{ step.label }}
      </UiListItem>
    </template>
  </UiStepper>`,
});

export const WithItemLinkSlot = (args) => ({
  components: {
    UiStepper,
    UiListItem,
    UiButton,
  },
  setup() {
    return { ...args };
  },
  template: `<UiStepper
    :steps="steps"
    :current-step="currentStep"
    :progress-attrs="progressAttrs"
  >
    <template #item-link="{index, step, determineStep}">
      <UiButton
        v-bind="determineStep(index, step)"
        class="ui-button--text ui-button--theme-secondary ui-stepper__item"
      >
        {{ step.label }}
      </UiButton>
    </template>
  </UiStepper>`,
});

export const WithMobileSlot = (args) => ({
  components: {
    UiStepper,
    UiText,
    UiProgress,
  },
  setup() {
    return { ...args };
  },
  template: `<UiStepper
    :steps="steps"
    :current-step="currentStep"
    :progress-attrs="progressAttrs"
  >
    <template #mobile="{currentSteps, currentStepDisplayText, stepsProgress}">
      <div class="ui-stepper__mobile">
          <UiText
            tag="span"
            class="ui-stepper__text"
          >
            {{ currentStepDisplayText }}
          </UiText>
          <UiProgress
            :min="0"
            :max="100"
            :value="stepsProgress"
          />
      </div>
    </template>
  </UiStepper>`,
});
WithMobileSlot.parameters = { viewport: { defaultViewport: 'mobile2' } };
