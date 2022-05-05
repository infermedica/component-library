import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';

export default {
  title: 'Atoms/Progress',
  components: { UiProgress },
  args: {
    value: 75,
    min: 0,
    max: 100,
  },
  argTypes: {
    value: {
      table: {
        category: 'Props',
      },
      control:
        {
          type: 'number',
        },
    },
    min: {
      table: {
        category: 'Props',
      },
      control:
        {
          type: 'number',
        },
    },
    max: {
      table: {
        category: 'Props',
      },
      control:
        {
          type: 'number',
        },
    },
  },
  parameters: {
    cssprops: {
      'progress-height': {
        value: '0.5rem',
        control: 'text',
        description: '',
      },
      'progress-bar-padding': {
        value: 'calc(var(--height) * 0.5)',
        control: 'text',
        description: '',
      },
      'progress-radius-pill': {
        value: 'calc(var(--height) * 0.5)',
        control: 'text',
        description: '',
      },
      'progress-width': {
        value: '100%',
        control: 'text',
        description: '',
      },
      'progress-padding': {
        value: '0 var(--bar-padding)',
        control: 'text',
        description: '',
      },
      'progress-border': {
        value: '0',
        control: 'text',
        description: '',
      },
      'progress-background': {
        value: 'var(--color-progress-track)',
        control: 'text',
        description: '',
      },
      'progress-value-background': {
        value: 'var(--color-progress-indicator)',
        control: 'text',
        description: '',
      },
      'progress-value-radius': {
        value: '0',
        control: 'text',
        description: '',
      },
    },
  },
};

export const Common = (args) => ({
  components: { UiProgress },
  setup() { return { ...args }; },
  template: `<div class="max-w-32">
    <UiProgress
      :value="value"
      :min="min"
      :max="max"
    />
  </div>`,
});

export const LowValue = (args) => ({
  components: { UiProgress },
  setup() { return { ...args }; },
  template: `<div class="max-w-32">
    <UiProgress
      :value="3"
    />
  </div>`,
});

export const LowRealValue = (args) => ({
  components: { UiProgress },
  setup() { return { ...args }; },
  template: `<div class="max-w-32" style="--progress-bar-padding: 0;">
    <UiProgress
      :value="3"
    />
  </div>`,
});

export const LowValueNoRadius = (args) => ({
  components: { UiProgress },
  setup() { return { ...args }; },
  template: `<div class="max-w-32"  style="--progress-bar-padding: 0; --progress-radius-pill: 0;">
    <UiProgress
      :value="3"
    />
  </div>`,
});

export const LowValueButHigh = (args) => ({
  components: { UiProgress },
  setup() { return { ...args }; },
  template: `<div class="max-w-32" style="--progress-height: 3rem;">
    <UiProgress
      :value="4"
    />
  </div>`,
});

export const WithDifferentMinimum = (args) => ({
  components: { UiProgress },
  setup() { return { ...args }; },
  template: `<div class="max-w-32">
    <UiProgress
      :value="4"
      :min="3"
      :max="7"
    />
  </div>`,
});

export const WithSameValueMinAndMax = (args) => ({
  components: { UiProgress },
  setup() { return { ...args }; },
  template: `<div class="max-w-32">
    <UiProgress
      :value="0"
      :min="0"
      :max="0"
    />
  </div>`,
});
