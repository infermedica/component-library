import { mountStories } from '@tests/unit/helpers';
import { UiText } from '@index';
import type { VueWrapper } from '@vue/test-utils';
import * as textStoriesImports from './UiText.stories';

describe('UiText.vue', () => {
  let wrapper: VueWrapper;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const { Basic } = mountStories(UiText, textStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  test('renders a component', () => {
    Basic();
    expect(wrapper.classes('ui-text')).toBe(true);
  });
  describe('props', () => {
    describe('tag', () => {
      test('render correct tag when pass a "tag" prop', () => {
        Basic({ tag: 'span' });
        expect(wrapper.element.tagName).toBe('SPAN');
      });
    });
  });
  describe('slots', () => {
    describe('default', () => {
      test('render a content via default slot', () => {
        const { args: { content } } = Basic();
        expect(wrapper.html()).toContain(content);
      });
    });
  });
});
