import { shallowMount } from '@vue/test-utils';
import UiInsidePages from '@/components/organisms/UiInsidePages/UiInsidePages.vue';

describe('UiInsidePages.vue', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(UiInsidePages);
    expect(wrapper.classes('ui-inside-pages')).toBe(true);
  });
});
