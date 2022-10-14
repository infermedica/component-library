import { mount } from '@vue/test-utils';
import UiTextarea from './UiTextarea.vue';

describe('UiTextarea.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiTextarea);
    expect(wrapper.classes('ui-textarea')).toBe(true);
  });
  test('render a native attributes on root element', () => {
    const placeholder = 'symptom checker';
    const wrapper = mount(UiTextarea, { props: { 'data-testid': 'ui-textarea' } });
    const textarea = wrapper.find('.ui-textarea');
    expect(textarea.attributes('data-testid')).toBe('ui-textarea');
  });
  test('a component emits input event', async () => {
    const content = 'symptom checker';
    const wrapper = mount(UiTextarea);
    wrapper.setValue(content);
    await wrapper.trigger('input');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(content);
  });
});
