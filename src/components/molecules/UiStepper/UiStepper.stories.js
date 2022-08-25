import UiStepper from '@/components/molecules/UiStepper/UiStepper.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';

const steps = [
  { name: 'Introduction', href: '#' },
  { name: 'A really long step name', href: '#' },
  { name: 'Symptoms', href: '#' },
  { name: 'Regions', href: '#' },
  { name: 'Interview', href: '#' },
  { name: 'Results', href: '#' },
];

export default {
  title: 'Molecules/Stepper',
  component: UiStepper,
  subcomponents: {
    UiText, UiProgress, UiList, UiListItem, UiButton,
  },
  args: {
    steps,
    currentStep: steps.at(2).name,
    progressAttrs: { id: 'progress' },
  },
  argTypes: {
    currentStep: {
      control: 'select',
      options: steps.map((step) => step.name),
    },
  },
  decorators: [() => ({ template: '<div class="desktop:max-w-35"><story /></div>' })],
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
  components: { UiStepper, UiText },
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
  components: { UiStepper, UiProgress },
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
    UiStepper, UiList, UiListItem, UiButton,
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
            class="ui-stepper__step"
            :class="{
              'ui-stepper__step--visited': indexOfActiveStep >= index,
              'ui-stepper__step--current': indexOfActiveStep === index,
            }"
          >
            <UiButton
              v-bind="determineStep(index, step)"
              class="ui-button--text ui-button--theme-secondary ui-stepper__item"
            >
              {{ step.name }}
            </UiButton>
          </UiListItem>
        </template>
      </UiList>
    </template>
  </UiStepper>`,
});

export const WithItemsSlot = (args) => ({
  components: { UiStepper, UiListItem, UiButton },
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
          class="ui-stepper__step"
          :class="{
                'ui-stepper__step--visited': indexOfActiveStep >= index,
                'ui-stepper__step--current': indexOfActiveStep === index,
              }"
        >
          <UiButton
            v-bind="determineStep(index, step)"
            class="ui-button--text ui-button--theme-secondary ui-stepper__item"
          >
            {{ step.name }}
          </UiButton>
        </UiListItem>
      </template>
    </template>
  </UiStepper>`,
});

export const WithItemSlot = (args) => ({
  components: { UiStepper, UiListItem, UiButton },
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
        class="ui-stepper__step"
        :class="{
          'ui-stepper__step--visited': indexOfActiveStep >= index,
          'ui-stepper__step--current': indexOfActiveStep === index,
        }"
      >
        <UiButton
          v-bind="determineStep(index, step)"
          class="ui-button--text ui-button--theme-secondary ui-stepper__item"
        >
          {{ step.name }}
        </UiButton>
      </UiListItem>
    </template>
  </UiStepper>`,
});

export const WithItemLinkSlot = (args) => ({
  components: { UiStepper, UiListItem, UiButton },
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
        class="ui-button--text ui-button--theme-secondary ui-stepper__item-link"
      >
        {{ step.name }}
      </UiButton>
    </template>
  </UiStepper>`,
});

export const WithMobileSlot = (args) => ({
  components: { UiStepper, UiText, UiProgress },
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
WithMobileSlot.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};
