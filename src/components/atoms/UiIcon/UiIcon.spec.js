import { mount, flushPromises } from '@vue/test-utils';
import UiIcon from './UiIcon.vue';

describe('UiIcon.vue', () => {
  test('renders a component', async () => {
    const wrapper = mount(UiIcon, { props: { icon: 'present' } });
    await flushPromises();
    expect(wrapper.classes('ui-icon')).toBe(true);
  });
});
