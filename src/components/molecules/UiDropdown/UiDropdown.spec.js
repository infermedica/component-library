import { mount } from '@vue/test-utils';
import UiDropdown from './UiDropdown.vue';

describe('UiDropdown.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiDropdown);
    expect(wrapper.classes('ui-dropdown')).toBe(true);
  });
  test('render a content from text props', () => {
    const text = 'symptom checker';
    const wrapper = mount(UiDropdown, { props: { text } });
    const toggle = wrapper.find('.ui-dropdown__toggle');
    expect(toggle.element.textContent).toContain(text);
  });
  test('render a content via default slot', async () => {
    const wrapper = mount(UiDropdown, { slots: { default: '<div class="symptom-checker"></div>' } });
    const toggle = wrapper.find('.ui-dropdown__toggle');
    await toggle.trigger('click');
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('render a content via toggle slot', () => {
    const wrapper = mount(UiDropdown, { slots: { toggle: '<div class="symptom-checker"></div>' } });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('render a content via content slot', async () => {
    const wrapper = mount(UiDropdown, { slots: { content: '<div class="symptom-checker"></div>' } });
    const toggle = wrapper.find('.ui-dropdown__toggle');
    await toggle.trigger('click');
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('a trigger button click open dropdown', async () => {
    const wrapper = mount(UiDropdown);
    const toggle = wrapper.find('.ui-dropdown__toggle');
    await toggle.trigger('click');
    expect(wrapper.vm.isOpen).toBe(true);
  });
});
