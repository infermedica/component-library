import { shallowMount } from '@vue/test-utils';
import UiText from './UiText.vue';

describe('UiText.vue', () => {
  test('renders a component', () => {
    const wrapper = shallowMount(UiText);
    expect(wrapper.classes('ui-text')).toBe(true);
  });
});
