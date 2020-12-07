import { mount } from '@vue/test-utils';
import UiImage from './UiImage.vue';

describe('UiImage.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiImage);
    expect(wrapper.classes('ui-image')).toBe(true);
  });
});
