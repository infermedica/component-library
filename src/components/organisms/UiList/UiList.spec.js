import { mount } from '@vue/test-utils';
import UiList from './UiList.vue';

describe('UiList.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiList);
    expect(wrapper.classes('ui-list')).toBe(true);
  });
});
