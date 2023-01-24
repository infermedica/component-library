import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';
import './UiProgress.stories.scss';
import docs from './UiProgress.mdx';

export default {
  title: 'Atoms/Progress',
  components: { UiProgress },
  args: {
    value: 4,
    min: 0,
    max: 100,
  },
  argTypes: {
    value: {
      table: { category: 'Props' },
      control:
        { type: 'number' },
    },
    min: {
      table: { category: 'Props' },
      control:
        { type: 'number' },
    },
    max: {
      table: { category: 'Props' },
      control:
        { type: 'number' },
    },
  },
  decorators: [ () => ({
    template: `<div class="max-w-32">
      <story/>
    </div>`,
  }) ],
  parameters: {
    docs: { page: docs },
    cssProperties: {
      '--progress-height': '0.5rem',
      '--progress-padding': 'calc(var(--_progress-height) * 0.5)',
      '--progress-border-radius': 'calc(var(--_progress-height) * 0.5)',
      '--progress-border-start-start-radius': '0',
      '--progress-border-start-end-radius': '0',
      '--progress-border-end-start-radius': '0',
      '--progress-border-end-end-radius': '0',
      '--progress-indicator-background': 'var(--color-progress-indicator)',
      '--progress-indicator-border-start-start-radius': '0',
      '--progress-indicator-border-start-end-radius': 'var(--_progress-border-radius)',
      '--progress-indicator-border-end-start-radius': '0',
      '--progress-indicator-border-end-end-radius': 'var(--_progress-border-radius)',
      '--progress-indicator-inset-block': 'var(--progress-indicator-inset-block-start, auto) var(--progress-indicator-inset-block-end, auto)',
      '--progress-indicator-inset-inline': 'var(--progress-indicator-inset-inline-start, 100%) var(--progress-indicator-inset-inline-end, auto)',
    },
  },
};

const Template = (args) => ({
  components: { UiProgress },
  setup() {
    return { ...args };
  },
  template: `<UiProgress
    :value="value"
    :min="min"
    :max="max"
  />`,
});

export const Common = Template.bind({});
Common.args = { value: 70 };

export const LowValue = Template.bind({});

export const LowValueNoRadius = (args) => ({
  components: { UiProgress },
  setup() {
    return { ...args };
  },
  template: `<UiProgress
    :value="value"
    :min="min"
    :max="max"
    class="progress-low-value-no-radius"
  />`,
});

export const LowValueButHigh = (args) => ({
  components: { UiProgress },
  setup() {
    return { ...args };
  },
  template: `<UiProgress
    :value="value"
    :min="min"
    :max="max"
    class="progress-low-value-but-height"
  />`,
});

export const WithDifferentMinimum = Template.bind({});
WithDifferentMinimum.args = {
  min: 3,
  max: 7,
};

export const WithSameValueMinAndMax = Template.bind({});
WithSameValueMinAndMax.args = {
  value: 0,
  min: 0,
  max: 0,
};
