import { shallowMount } from '@vue/test-utils';
import UiContainer from './UiContainer.vue';

describe('UiContainer.vue', () => {
  test('renders a component', () => {
    const wrapper = shallowMount(UiContainer, {
      mocks: {
        $t: () => {},
      },
    });
    expect(wrapper.classes('ui-container')).toBe(true);
  });
});
