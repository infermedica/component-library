import UiNumberStepper from '@/components/molecules/UiNumberStepper/UiNumberStepper.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import {
  onMounted,
  ref,
} from 'vue';
import { actions } from '@storybook/addon-actions';
import { toMobile } from '@/styles/exports/breakpoints.module.scss';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
  onError: 'error',
});

export default {
  title: 'Molecules/NumberStepper',
  component: UiNumberStepper,
  subcomponents: {
    UiButton,
    UiIcon,
  },
  args: {
    initModelValue: 1,
    min: 0,
    max: 10,
    step: 1,
    hasControls: true,
    buttonDecrementAttrs: {
      'aria-label': 'decrement number',
    },
    buttonIncrementAttrs: {
      'aria-label': 'increment number',
    },
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: {
        category: 'stories controls',
      },
      control: 'number',
    },
    modelValue: {
      control: false,
    },
  },
};

export const WithTextValue = (args) => ({
  components: {
    UiNumberStepper,
    UiText,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      ...events,
      modelValue,
    };
  },
  template: `<UiNumberStepper 
    v-model="modelValue" 
    :min="min" 
    :max="max"
    :step="step"
    :has-controls="hasControls"
    :button-decrement-attrs="buttonDecrementAttrs"
    :button-increment-attrs="buttonIncrementAttrs"
    @update:modelValue="onUpdateModelValue"
    @error="onError"
  >
    <template #default="{value}">
      <UiText class="flex items-center justify-center h-12 flex-full tablet:flex-none w-12">
        {{ value }}
      </UiText>
    </template>
  </UiNumberStepper>`,
});

export const WithControlsOnMobile = (args) => ({
  components: {
    UiNumberStepper,
    UiText,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    const isMobile = ref(false);
    onMounted(() => {
      isMobile.value = matchMedia(toMobile).matches;
      matchMedia(toMobile).addListener(({ matches }) => { isMobile.value = matches; });
    });
    return {
      ...args,
      modelValue,
      isMobile,
    };
  },
  template: `<UiNumberStepper
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :has-controls="isMobile"
    :button-decrement-attrs="buttonDecrementAttrs"
    :button-increment-attrs="buttonIncrementAttrs"
  >
  <template #default="{change, value, min, max}">
    <input
      type="range"
      :value="value"
      :min="min"
      :max="max"
      class="m-0 mb-6 tablet:m-0 flex-full tablet:flex-1"
      @input="change(parseInt($event.target.value, 10))"
    />
  </template>
  </UiNumberStepper>`,
});
WithControlsOnMobile.args = {
  buttonDecrementAttrs: {
    'aria-label': 'decrement number',
    tabindex: -1,
  },
  buttonIncrementAttrs: {
    'aria-label': 'increment number',
    tabindex: -1,
  },
};
WithControlsOnMobile.argTypes = {
  hasControls: {
    control: false,
  },
};
WithControlsOnMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};

export const WithDecrementSlot = (args) => ({
  components: {
    UiNumberStepper,
    UiText,
    UiButton,
    UiIcon,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiNumberStepper
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :has-controls="hasControls"
    :button-decrement-attrs="buttonDecrementAttrs"
    :button-increment-attrs="buttonIncrementAttrs"
  >
    <template #decrement="{decrement, hasControls, attrs }">
      <UiButton
        v-if="hasControls"
        v-bind="attrs"
        class="ui-button--outlined ui-button--circled ui-number-stepper__decrement"
        @click="decrement"
      >
        <UiIcon 
          icon="minus"
          class="ui-button__icon"
        />
      </UiButton>
    </template>
    <template #default="{value}">
      <UiText class="flex items-center justify-center h-12 flex-full tablet:flex-none w-12">
        {{ value }}
      </UiText>
    </template>
  </UiNumberStepper>`,
});

export const WithIncrementSlot = (args) => ({
  components: {
    UiNumberStepper,
    UiText,
    UiButton,
    UiIcon,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiNumberStepper
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :has-controls="hasControls"
    :button-decrement-attrs="buttonDecrementAttrs"
    :button-increment-attrs="buttonIncrementAttrs"
  >
    <template #increment="{increment, hasControls, attrs }">
      <UiButton
        v-if="hasControls"
        v-bind="attrs"
        class="ui-button--outlined ui-button--circled ui-number-stepper__increment"
        @click="increment"
      >
        <UiIcon 
          icon="plus"
          class="ui-button__icon"
        />
      </UiButton>
    </template>
    <template #default="{value}">
      <UiText class="flex items-center justify-center h-12 flex-full tablet:flex-none w-12">
        {{ value }}
      </UiText>
    </template>
  </UiNumberStepper>`,
});

export const WithRange = (args) => ({
  components: {
    UiNumberStepper,
    UiText,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiNumberStepper
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :has-controls="hasControls"
    :button-decrement-attrs="buttonDecrementAttrs"
    :button-increment-attrs="buttonIncrementAttrs"
  >
    <template #default="{change, value, min, max}">
      <input
        type="range"
        :value="value"
        :min="min"
        :max="max"
        class="m-0 mb-6 tablet:m-0 flex-full tablet:flex-1"
        @input="change(parseInt($event.target.value, 10))"
      />
    </template>
  </UiNumberStepper>`,
});
WithRange.args = {
  buttonDecrementAttrs: {
    'aria-label': 'decrement number',
    tabindex: -1,
  },
  buttonIncrementAttrs: {
    'aria-label': 'increment number',
    tabindex: -1,
  },
};
