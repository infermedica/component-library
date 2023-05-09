import { mountStories } from '@tests/unit/helpers';
import { UiHeading } from '@index';
import type { VueWrapper } from '@vue/test-utils';
import * as headingStoriesImports from './UiHeading.stories';

describe('UiHeading.vue', () => {
  let wrapper: VueWrapper;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const { Basic } = mountStories(UiHeading, headingStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  test('render a component', () => {
    Basic();
    expect(wrapper.classes('ui-heading')).toBe(true);
  });
  describe('props', () => {
    describe('level', () => {
      test('render correct tag', () => {
        Basic({ level: '4' });
        expect(wrapper.element.tagName).toBe('H4');
      });
      test('render correct class', () => {
        Basic({ level: 5 });
        expect(wrapper.classes('ui-heading--h5')).toBe(true);
      });
    });
    describe('tag', () => {
      test('renders correct tag', () => {
        Basic({ tag: 'span' });
        expect(wrapper.element.tagName).toBe('SPAN');
      });
      test('renders correct tag and class', () => {
        Basic({
          tag: 'h1',
          level: 3,
        });
        expect(wrapper.element.tagName).toBe('H1');
        expect(wrapper.classes('ui-heading--h3')).toBe(true);
      });
    });
  });
  describe('slots', () => {
    describe('default slot', () => {
      test('render a content via default slot', () => {
        const { args: { content } } = Basic();
        expect(wrapper.html()).toContain(content);
      });
    });
  });
});
