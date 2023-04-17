import { mountStories } from '@tests/unit/helpers';
import { UiIcon } from '@index';
import type { VueWrapper } from '@vue/test-utils';
import * as iconStoriesImports from './UiIcon.stories';

describe('UiIcon.vue', () => {
  let wrapper: VueWrapper;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const {
    Basic,
    ImportedIcon,
  } = mountStories(UiIcon, iconStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });

  test('renders a component', async () => {
    Basic();
    expect(wrapper.classes('ui-icon')).toBe(true);
  });
  describe('props', () => {
    describe('icon', () => {
      test('render an empty svg with passed undefined as "icon" prop', async () => {
        ImportedIcon({ icon: undefined });
        expect(wrapper.classes('ui-icon')).toBe(true);
        expect(wrapper.element.tagName).toBe('svg');
      });
      test('render an icon with passed string as "icon" prop', async () => {
        Basic();
        expect(wrapper.classes('ui-icon')).toBe(true);
        expect(wrapper.element.tagName).toBe('svg');
      });
      test('render an icon with passed import as "icon" prop', async () => {
        Basic({ icon: await import('../../../assets/icons/yes.svg') });
        expect(wrapper.classes('ui-icon')).toBe(true);
        expect(wrapper.element.tagName).toBe('svg');
      });
    });
  });
});
