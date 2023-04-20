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
    WithDecrementSlot,
    WithIncrementSlot,
  } = mountStories(UiRange, rangeStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  const getInput = (story = wrapper) => story.find('input');
  const getHeading = (story = wrapper) => story.findComponent(UiHeading);
  const getDecreaseBtn = (story = wrapper) => story.find('.ui-number-stepper__decrement');
  const getIncreaseBtn = (story = wrapper) => story.find('.ui-number-stepper__increment');
  const clickDecreaseBtn = (story = wrapper) => getDecreaseBtn(story).trigger('click');
  const clickIncreaseBtn = (story = wrapper) => getIncreaseBtn(story).trigger('click');
  const getThumbWidth = () => (wrapper.element as HTMLElement).style.getPropertyValue('--_range-runnable-track-width');
  const dragInput = (story = wrapper, value = 100) => getInput(story).setValue(value);
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
          name: 'dragging range input should emit updated vale',
          story: Basic(),
          action: dragInput,
          expected: 100,
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
      {
        slot: 'decrement',
        story: WithDecrementSlot({
          buttonDecrementAttrs: {
            'aria-hidden': true,
            tabindex: -1,
            id: 'decrement-testid',
            'data-testid': 'decrement-element',
            class: 'decrement-test-class',
          },
        }),
        content: getDecreaseBtn,
        expectedBinding: ({ buttonDecrementAttrs }) => buttonDecrementAttrs,
      },
      {
        slot: 'increment',
        story: WithIncrementSlot({
          buttonIncrementAttrs: {
            'aria-hidden': true,
            tabindex: -1,
            id: 'increment-testid',
            'data-testid': 'increment-element',
            class: 'increment-test-class',
          },
        }),
        content: getIncreaseBtn,
        expectedBinding: ({ buttonIncrementAttrs }) => buttonIncrementAttrs,
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
      expect(getThumbWidth()).toEqual(expected);
    });
    test('should have 0% width when max value is smaller than min value', () => {
      Basic({ max: 17 });
      expect(getThumbWidth()).toEqual('0%');
    });
  });
});
