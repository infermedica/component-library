import { mount } from '@vue/test-utils';
import UiLoader from './UiLoader.vue';

describe('UiLoader.vue', () => {
  // Problem: dynamic, lazy loaded components are not testable
  test('renders a component', () => {
    const wrapper = mount(UiLoader, {
      props: {
        isLoading: true,
      },
    });
    const loader = wrapper.find('.ui-loader');
    expect(loader.exists()).toBe(true);
  });
});
