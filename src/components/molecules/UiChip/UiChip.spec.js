import { mount } from '@vue/test-utils';
import UiChip from './UiChip.vue';

describe('UiChip.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiChip);
    expect(wrapper.classes('ui-chip')).toBe(true);
  });
  test('component emit click:remove event', async () => {
    const wrapper = mount(UiChip);
    const button = wrapper.find('.ui-chip__remove');
    await button.trigger('click');
    expect(wrapper.emitted('remove')).toBeTruthy();
  });
  test('a component pass attributes for remove button', () => {
    const content = 'symptom checker';
    const wrapper = mount(UiChip, { props: { buttonAttrs: { 'aria-label': content } } });
    const button = wrapper.find('.ui-chip__remove');
    expect(button.attributes('aria-label')).toBe(content);
  });
  test('render a content via remove slot', () => {
    const wrapper = mount(UiChip, { slots: { remove: '<div class="symptom-checker"></div>' } });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
});
