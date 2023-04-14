import { mountStories } from '@tests/unit/helpers';
import { UiButton } from '@index';
import type { VueWrapper } from '@vue/test-utils';
import * as buttonStoriesImports from './UiButton.stories';

describe('UiButton.vue', () => {
  let wrapper: VueWrapper;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const {
    Basic,
    RouterButton,
    LinkButton,
  } = mountStories(UiButton, buttonStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  test('render a component', () => {
    Basic();
    expect(wrapper.classes('ui-button')).toBe(true);
  });
  describe('props', () => {
    describe('tag', () => {
      test('render correct tag when pass a "tag" prop', () => {
        Basic({ tag: 'span' });
        expect(wrapper.element.tagName).toBe('SPAN');
      });
    });
    describe('to', () => {
      test('render router-link when pass a "to" prop', () => {
        RouterButton();
        expect(wrapper.element.tagName).toBe('ROUTER-LINK');
      });
    });
    describe('href', () => {
      test('render link when pass a "href" prop', () => {
        LinkButton();
        expect(wrapper.element.tagName).toBe('A');
      });
    });
  });
  describe('slots', () => {
    describe('default slots', () => {
      test('render a content via default slot', () => {
        const { args: { content } } = Basic();
        expect(wrapper.html()).toContain(content);
      });
    });
  });
});
