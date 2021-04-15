import { mount } from '@vue/test-utils';
import UiDatepicker from './UiDatepicker.vue';

describe('UiDatepicker.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiDatepicker);
    expect(wrapper.classes('ui-datepicker')).toBe(true);
  });
});
