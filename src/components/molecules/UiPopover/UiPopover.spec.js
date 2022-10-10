import { mount } from '@vue/test-utils';
import UiPopover from './UiPopover.vue';

describe('UiPopover.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiPopover);
    expect(wrapper.classes('ui-popover')).toBe(true);
  });
  test('a component emit close event', async () => {
    const wrapper = mount(UiPopover, { props: { title: 'sc' } });
    const close = wrapper.find('.ui-popover__close');
    await close.trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
