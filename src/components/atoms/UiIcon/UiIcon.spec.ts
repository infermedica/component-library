import { mountStories } from '@tests/unit/helpers';
import { UiIcon } from '@index';
import type { VueWrapper } from '@vue/test-utils';
import * as iconStoriesImports from './UiIcon.stories';

describe('UiIcon.vue', () => {
  let wrapper: VueWrapper;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const { Basic } = mountStories(UiIcon, iconStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });

  test('renders a component', async () => {
    Basic();
    expect(wrapper.classes('ui-icon')).toBe(true);
  });
});
