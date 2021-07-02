import { mount } from '@vue/test-utils';
import UiProgressbar from '@/components/molecules/UiProgressbar/UiProgressbar.vue';

describe('UiProgressbar.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiProgressbar);
    expect(wrapper.classes('ui-progressbar')).toBe(true);
  });
});
