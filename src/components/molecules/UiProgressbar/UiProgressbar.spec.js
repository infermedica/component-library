import { mount } from '@vue/test-utils';
import UiProgressbar from '@/components/molecules/UiProgressbar/UiProgressbar.vue';

describe('UiProgressbar.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiProgressbar, {
      props: {
        steps: 5,
      },
    });
    expect(wrapper.classes('ui-progressbar')).toBe(true);
  });
});
