import { mountStories } from '@tests/unit/helpers';
import { UiProgress } from '@index';
import type { VueWrapper } from '@vue/test-utils';
import * as progressStoriesImports from './UiProgress.stories';

describe('UiProgress.vue', () => {
  let wrapper: VueWrapper;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const { Basic } = mountStories(UiProgress, progressStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  const getInnerElement = () => wrapper.find('.ui-progress__inner');
  const getWidth = () => (wrapper.element as HTMLElement).style.getPropertyValue('--_progress-value');
  test('renders a component', () => {
    Basic();
    expect(wrapper.classes('ui-progress')).toBe(true);
  });
  describe('width', () => {
    test.each([
      [
        -10,
        '0',
      ],
      [
        0,
        '0',
      ],
      [
        50,
        '0.5',
      ],
      [
        100,
        '1',
      ],
      [
        130,
        '1',
      ],
    ])('has correct width for value %i', (value, expected) => {
      Basic({ value });
      expect(getWidth()).toEqual(expected);
    });
    test('doesn\'t render inner element when min and max value is equal', () => {
      Basic({
        value: 0,
        max: 0,
      });
      expect(getInnerElement().exists()).toBe(false);
    });
  });
});
