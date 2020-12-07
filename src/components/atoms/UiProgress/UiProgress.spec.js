import { shallowMount } from '@vue/test-utils';
import UiProgress from './UiProgress.vue';

describe('UiProgress.vue', () => {
  test('renders a component', () => {
    const wrapper = shallowMount(UiProgress);
    expect(wrapper.classes('ui-progress')).toBe(true);
  });
});
