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
    Basic, RouterButton, LinkButton,
  } = mountStories(UiButton, buttonStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  test('render a component', () => {
    const { component } = Basic();
    expect(component.classes('ui-button')).toBe(true);
  });
  describe('props', () => {
    test('component is a button without "to" and "href" props', () => {
      const { component } = Basic();
      expect(component.element.tagName).toBe('BUTTON');
    });
    test('component is router-link when you pass it a "to" prop', () => {
      const { component } = RouterButton();
      expect(component.element.tagName).toBe('ROUTER-LINK');
    });
    test('component is link when you pass it a "href" prop', () => {
      const { component } = LinkButton();
      expect(component.element.tagName).toBe('A');
    });
  });
  describe('slots', () => {
    test('render a content via default slot', () => {
      const { args: { content } } = Basic();
      expect(wrapper.html()).toContain(content);
    });
  });
});
