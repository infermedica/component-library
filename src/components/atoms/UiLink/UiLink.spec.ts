import { mountStories } from '@tests/unit/helpers';
import { UiLink } from '@index';
import type { VueWrapper } from '@vue/test-utils';
import * as linkStoriesImports from './UiLink.stories';

describe('UiLink.vue', () => {
  let wrapper: VueWrapper;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const { Basic } = mountStories(UiLink, linkStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  test('render a component', () => {
    Basic();
    expect(wrapper.classes('ui-link')).toBe(true);
  });
  describe('props', () => {
    describe('href', () => {
      test('render "a" element when passed "href" prop', () => {
        Basic({
          tag: 'p',
          to: 'test-to-props',
        });
        expect(wrapper.element.tagName).toBe('A');
      });
    });
    describe('to', () => {
      test('render "router-link" element when passed "to" prop', () => {
        Basic({
          href: '',
          to: 'test-to-props',
          tag: 'p',
        });
        expect(wrapper.element.tagName).toBe('ROUTER-LINK');
      });
    });
    describe('tag', () => {
      test('render correct tag when passed "tag" prop', () => {
        Basic({
          href: '',
          to: '',
          tag: 'p',
        });
        expect(wrapper.element.tagName).toBe('P');
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
