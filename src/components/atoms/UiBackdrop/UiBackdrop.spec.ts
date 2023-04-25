import { mountStories } from '@tests/unit/helpers';
import { UiBackdrop } from '@index';
import type { VueWrapper } from '@vue/test-utils';
import * as backdropStoriesImports from './UiBackdrop.stories';

describe('UiBackdrop.vue', () => {
  let wrapper: VueWrapper;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const { Basic } = mountStories(UiBackdrop, backdropStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  test('renders a component', () => {
    Basic();
    expect(wrapper.classes('ui-backdrop')).toBe(true);
  });
});
