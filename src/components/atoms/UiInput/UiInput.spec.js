import { mount } from '@vue/test-utils';
import UiInput from './UiInput.vue';

describe('UiInput.vue', () => {
  test('render a component', () => {
    const wrapper = mount(UiInput);
    expect(wrapper.classes('ui-input')).toBe(true);
  });
  test('render a component with suffix', () => {
    const suffix = 'symptom checker';
    const wrapper = mount(UiInput, { props: { suffix } });
    const aside = wrapper.find('.ui-input__aside');
    expect(aside.text()).toContain(suffix);
  });
  test('render a native attributes on root element', () => {
    const wrapper = mount(UiInput, { props: { 'data-testid': 'ui-input' } });
    const input = wrapper.find('.ui-input');
    expect(input.attributes('data-testid')).toBe('ui-input');
  });
  test('render a content via aside slot', () => {
    const wrapper = mount(UiInput, { slots: { aside: '<div class="symptom-checker"></div>' } });
    const aside = wrapper.find('.symptom-checker');
    expect(aside.exists()).toBe(true);
  });
  test('a component emits input event', async () => {
    const content = 'symptom checker';
    const wrapper = mount(UiInput);
    wrapper.find('.ui-input__input').setValue(content);
    await wrapper.trigger('input');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(content);
  });
  test('a number input cant accept non-numerical value', async () => {
    const wrapper = mount(UiInput, { props: { type: 'number' } });
    const input = wrapper.find('input');
    await input.setValue('i');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('');
  });
});
