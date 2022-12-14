/* eslint-disable class-methods-use-this, @typescript-eslint/no-empty-function */
import { mount } from '@vue/test-utils';
import UiHeader from '@/components/molecules/UiHeader/UiHeader.vue';

const doMockMatchMedia = (isMobile) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: isMobile,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

beforeEach(() => {
  doMockMatchMedia(false);
});

describe('UiHeader.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiHeader);
    expect(wrapper.classes('ui-header')).toBe(true);
  });
  test('hamburger should not be visible on the desktop', () => {
    const wrapper = mount(UiHeader);
    const hamburger = wrapper.find('.ui-header-hamburger');
    expect(hamburger.exists()).toBe(false);
  });
  test('hamburger should be visible on the mobile', () => {
    doMockMatchMedia(true);
    const wrapper = mount(UiHeader);
    const hamburger = wrapper.find('.ui-header__hamburger');
    expect(hamburger.exists()).toBe(true);
  });
  test('a component emits hamburger:open event', async () => {
    doMockMatchMedia(true);
    const wrapper = mount(UiHeader);
    const hamburger = wrapper.find('.ui-header__hamburger');
    await hamburger.trigger('click');
    expect(wrapper.emitted('hamburger:open')).toBeTruthy();
  });
  test('a component emits hamburger:close event', async () => {
    doMockMatchMedia(true);
    const wrapper = mount(UiHeader);
    const hamburger = wrapper.find('.ui-header__hamburger');
    await hamburger.trigger('click');
    await hamburger.trigger('click');
    expect(wrapper.emitted('hamburger:close')).toBeTruthy();
  });
});
