import UiProgress from '@/components/atoms/UiProgress/UiProgress.vue';
import './UiProgress.stories.scss';
import docs from './UiProgress.mdx';
export default {
  title: 'Atoms/Progress',
  components: {
    UiProgress,
  },
  args: {
    value: 4,
    min: 0,
    max: 100,
  },
  argTypes: {
    value: {
      table: {
        category: 'Props',
      },
      control: {
        type: 'number',
      },
    },
    min: {
      table: {
        category: 'Props',
      },
      control: {
        type: 'number',
      },
    },
    max: {
      table: {
        category: 'Props',
      },
      control: {
        type: 'number',
      },
    },
  },
  decorators: [
    () => ({
      template: `<div class="max-w-32">
      <story/>
    </div>`,
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
  },
};
export const Common = {
  render: (args) => ({
    components: {
      UiProgress,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: `<UiProgress
    :value="value"
    :min="min"
    :max="max"
  />`,
  }),
  args: {
    value: 70,
  },
};
export const LowValue = {
  render: (args) => ({
    components: {
      UiProgress,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: `<UiProgress
    :value="value"
    :min="min"
    :max="max"
  />`,
  }),
};
export const LowValueNoRadius = {
  render: (args) => ({
    components: {
      UiProgress,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: `<UiProgress
    :value="value"
    :min="min"
    :max="max"
    class="progress-low-value-no-radius"
  />`,
  }),
};
export const LowValueButHigh = {
  render: (args) => ({
    components: {
      UiProgress,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: `<UiProgress
    :value="value"
    :min="min"
    :max="max"
    class="progress-low-value-but-height"
  />`,
  }),
};
export const WithDifferentMinimum = {
  render: (args) => ({
    components: {
      UiProgress,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: `<UiProgress
    :value="value"
    :min="min"
    :max="max"
  />`,
  }),
  args: {
    min: 3,
    max: 7,
  },
};
export const WithSameValueMinAndMax = {
  render: (args) => ({
    components: {
      UiProgress,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: `<UiProgress
    :value="value"
    :min="min"
    :max="max"
  />`,
  }),
  args: {
    value: 0,
    min: 0,
    max: 0,
  },
};
