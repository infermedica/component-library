import { shallowMount } from '@vue/test-utils';
import UiContentArea from '@/components/organisms/UiContentArea/UiContentArea.vue';

describe('UiContentArea.vue', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(UiContentArea);
    expect(wrapper.classes('ui-content-area')).toBe(true);
  });
});
