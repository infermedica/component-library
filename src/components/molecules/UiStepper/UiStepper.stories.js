import UiStepper from '@/components/molecules/UiStepper/UiStepper.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';
import UiLink from '@/components/atoms/UiLink/UiLink.vue';

const steps = [
  { name: 'Introduction', route: { path: '#' } },
  { name: 'A multiline step', route: { path: '#' } },
  { name: 'Symptoms', route: { path: '#' } },
  { name: 'Regions', route: { path: '#' } },
  { name: 'Interview', route: { path: '#' } },
  { name: 'Results', route: { path: '#' } },
];

export default {
  title: 'Molecules/Stepper',
  component: UiStepper,
  subcomponents: {
    UiText, UiProgress, UiList, UiListItem, UiLink,
  },
  args: {
    steps,
    currentStep: steps.at(0).name,
    progressAttrs: { id: 'progress' },
  },
  argTypes: {
    currentStep: {
      control: 'select',
      options: steps.map((step) => step.name),
    },
  },
  decorators: [() => ({ template: '<div class="desktop:max-w-35"><story /></div>' })],
  parameters: {
    cssprops: {
      'stepper-progress-background': {
        value: 'var(--color-progress-indicator)',
        control: 'text',
        description: '',
      },
      'stepper-progress-border-radius': {
        value: '2px',
        control: 'text',
        description: '',
      },
      'stepper-padding': {
        value: 'var(--space-12) var(--space-20)',
        control: 'text',
        description: '',
      },
      'stepper-background': {
        value: 'var(--color-background-subtle)',
        control: 'text',
        description: '',
      },
      'stepper-text-font-font': {
        value: 'var(--font-body-2-compact)',
        control: 'text',
        description: '',
      },
      'stepper-text-font-letter-spacing': {
        value: 'var(--letter-spacing-body-2-compact)',
        control: 'text',
        description: '',
      },
      'stepper-progress-radius': {
        value: undefined,
        control: 'text',
        description: '',
      },
      'stepper-link-active-color': {
        value: 'var(--color-text-body)',
        control: 'text',
        description: '',
      },
      'stepper-item-link-font': {
        value: 'var(--font-body-1)',
        control: 'text',
        description: '',
      },
      'stepper-item-link-letter-spacing': {
        value: 'var(--letter-spacing-body-1)',
        control: 'text',
        description: '',
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
          </UiListItem>
        </template>
      </UiList>
    </template>
  </UiStepper>`,
});

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
        </UiListItem>
      </template>
    </template>
  </UiStepper>`,
});

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
      </UiListItem>
    </template>
  </UiStepper>`,
});

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
