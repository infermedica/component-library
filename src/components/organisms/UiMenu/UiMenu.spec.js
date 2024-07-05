import { mount } from '@vue/test-utils';
import UiMenu from '@/components/organisms/UiMenu/UiMenu.vue';

describe('UiMenu.vue', () => {
  it('renders a component', () => {
    const wrapper = mount(UiMenu);
    expect(wrapper.classes('ui-menu')).toBe(true);
  });
});
