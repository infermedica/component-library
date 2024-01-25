import { mount } from '@vue/test-utils';
import UiDropdown from './UiDropdown.vue';

describe('UiDropdown.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiDropdown);
    expect(wrapper.classes('ui-dropdown')).toBe(true);
  });
});
