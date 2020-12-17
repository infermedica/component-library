import { mount } from '@vue/test-utils';
import UiBackdrop from './UiBackdrop.vue';

describe('UiBackdrop.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiBackdrop);
    expect(wrapper.classes('ui-backdrop')).toBe(true);
  });
});
