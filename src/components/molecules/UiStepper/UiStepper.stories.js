import UiStepper from '@/components/molecules/UiStepper/UiStepper.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiLink from '@/components/atoms/UiLink/UiLink.vue';

const steps = [
  { name: 'Introduction', route: '#' },
  { name: 'A multiline step', route: '#' },
  { name: 'Symptoms', route: '#' },
  { name: 'Regions', route: '#' },
  { name: 'Interview', route: '#' },
  { name: 'Results', route: '#' },
];

export default {
  title: 'Molecules/Stepper',
  component: UiStepper,
  subcomponents: {
    UiText, UiProgress, UiList, UiListItem, UiLink,
  },
  args: {
    steps,
    currentStep: steps[0].name,
    progressAttrs: { id: 'progress' },
  },
  argTypes: {
    currentStep: {
      control: {
        type: 'select',
        options: steps.map((option) => (option.name)),
      },
    },
  },
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
WithCurrentStep.decorators = [() => ({ template: '<div class="desktop:max-w-35"><story /></div>' })];

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
WithCurrentStepSlot.decorators = [() => ({ template: '<div class="desktop:max-w-35"><story /></div>' })];

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
WithProgressSlot.decorators = [() => ({ template: '<div class="desktop:max-w-35"><story /></div>' })];

export const WithDesktopSlot = (args) => ({
  components: {
    UiStepper, UiList, UiListItem, UiLink,
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
            class="ui-stepper__item"
            :class="{
              'ui-stepper__item--visited': indexOfActiveStep >= index,
              'ui-stepper__item--active': indexOfActiveStep === index,
            }"
          >
            <UiLink
              v-bind="determineStep(index, step.route)"
              class="ui-link--secondary ui-stepper__item-link"
            >
              {{ step.name }}
            </UiLink>
          </Uilistitem>
        </template>
      </Uilist>
    </template>
  </UiStepper>`,
});
WithDesktopSlot.decorators = [() => ({ template: '<div class="desktop:max-w-35"><story /></div>' })];

export const WithItemsSlot = (args) => ({
  components: { UiStepper, UiListItem, UiLink },
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
          class="ui-stepper__item"
          :class="{
                'ui-stepper__item--visited': indexOfActiveStep >= index,
                'ui-stepper__item--active': indexOfActiveStep === index,
              }"
        >
          <UiLink
            v-bind="determineStep(index, step.route)"
            class="ui-link--secondary ui-stepper__item-link"
          >
            {{ step.name }}
          </UiLink>
        </Uilistitem>
      </template>
    </template>
  </UiStepper>`,
});
WithItemsSlot.decorators = [() => ({ template: '<div class="desktop:max-w-35"><story /></div>' })];

export const WithItemSlot = (args) => ({
  components: { UiStepper, UiListItem, UiLink },
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
        class="ui-stepper__item"
        :class="{
          'ui-stepper__item--visited': indexOfActiveStep >= index,
          'ui-stepper__item--active': indexOfActiveStep === index,
        }"
      >
        <UiLink
          v-bind="determineStep(index, step.route)"
          class="ui-link--secondary ui-stepper__item-link"
        >
          {{ step.name }}
        </UiLink>
      </Uilistitem>
    </template>
  </UiStepper>`,
});
WithItemSlot.decorators = [() => ({ template: '<div class="desktop:max-w-35"><story /></div>' })];

export const WithItemLinkSlot = (args) => ({
  components: { UiStepper, UiListItem, UiLink },
  setup() {
    return { ...args };
  },
  template: `<UiStepper
    :steps="steps"
    :current-step="currentStep"
    :progress-attrs="progressAttrs"
  >
    <template #item-link="{index, step, determineStep}">
      <UiLink
        v-bind="determineStep(index, step.route)"
        class="ui-link--secondary ui-stepper__item-link"
      >
        {{ step.name }}
      </UiLink>
    </template>
  </UiStepper>`,
});
WithItemLinkSlot.decorators = [() => ({ template: '<div class="desktop:max-w-35"><story /></div>' })];

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
WithMobileSlot.decorators = [() => ({ template: '<div class="desktop:max-w-35"><story /></div>' })];
