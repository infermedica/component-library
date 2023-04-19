import {
  mountStories,
  getEmitTests,
  getSlotTests,
} from '@tests/unit/helpers';
import {
  UiHeading,
  UiRange,
} from '@index';
import type { VueWrapper } from '@vue/test-utils';
import * as rangeStoriesImports from './UiRange.stories';

describe('UiRange.vue', () => {
  let wrapper: VueWrapper;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const {
    Basic,
    Min,
    Max,
    WithValueSlot,
    WithRangeSlot,
  } = mountStories(UiRange, rangeStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  const getInput = (story = wrapper) => story.find('input');
  const getHeading = (story = wrapper) => story.findComponent(UiHeading);
  const clickDecreaseBtn = (story = wrapper) => story.find('.ui-number-stepper__decrement').trigger('click');
  const clickIncreaseBtn = (story = wrapper) => story.find('.ui-number-stepper__increment').trigger('click');
  const getWidth = () => (wrapper.element as HTMLElement).style.getPropertyValue('--_range-runnable-track-width');
  test('renders a component', () => {
    Basic();
    expect(wrapper.classes('ui-range')).toBe(true);
  });
  describe('emits', () => {
    getEmitTests(
      'update:modelValue',
      [
        {
          name: 'clicking increment button increases the value',
          story: Basic(),
          action: clickIncreaseBtn,
          expected: ({ modelValue = 0 }) => modelValue + 1,
        },
        {
          name: 'clicking decrement button decreases the value',
          story: Basic(),
          action: clickDecreaseBtn,
          expected: ({ modelValue = 0 }) => modelValue - 1,
        },
        {
          name: 'clicking decrement button doesn\'t emit a value smaller than the min value.',
          story: Min(),
          action: clickDecreaseBtn,
          expected: undefined,
        },
        {
          name: 'clicking increment button doesn\'t emit a value bigger than the max value.',
          story: Max(),
          action: clickIncreaseBtn,
          expected: undefined,
        },
        {
          name: 'with disabled attribute shouldn\'t emit value',
          story: Basic({ disabled: true }),
          action: clickIncreaseBtn,
          expected: undefined,
        },
      ],
    );
  });
  describe('slots', () => {
    getSlotTests([
      {
        slot: 'value',
        story: WithValueSlot({
          headingValueAttrs: {
            id: 'heading-testid',
            'data-testid': 'heading-element',
            class: 'heading-test-class',
            level: 1,
            tag: 'span',
          },
        }),
        content: getHeading,
        expectedBinding: ({ headingValueAttrs }) => headingValueAttrs,
      },
      {
        slot: 'range',
        story: WithRangeSlot({
          inputAttrs: {
            id: 'input-testid',
            'data-testid': 'input-element',
            class: 'input-test-class',
          },
        }),
        content: getInput,
        expectedBinding: ({ inputAttrs }) => inputAttrs,
      },
    ]);
  });
  describe('thumb', () => {
    test.each([
      [
        10,
        '0%',
      ],
      [
        18,
        '0%',
      ],
      [
        70,
        '50%',
      ],
      [
        122,
        '100%',
      ],
      [
        130,
        '100%',
      ],
    ])('has correct width for value %i', (modelValue, expected) => {
      Basic({ modelValue });
      expect(getWidth()).toEqual(expected);
    });
    test('should have 0% width when max value is smaller than min value', () => {
      Basic({ max: 17 });
      expect(getWidth()).toEqual('0%');
    });
  });
});
