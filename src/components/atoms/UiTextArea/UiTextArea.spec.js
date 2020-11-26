import { mount } from '@vue/test-utils';
import UiTextArea from './UiTextArea.vue';

describe('UiTextArea.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiTextArea);
    const textarea = wrapper.find('textarea');
    expect(textarea.classes('ui-textarea')).toBe(true);
  });
  test('render a native attributes on input element', () => {
    const placeholder = 'symptom checker';
    const wrapper = mount(UiTextArea, {
      props: {
        placeholder,
      },
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('placeholder')).toBe(placeholder);
  });
  test('a component emits input event', async () => {
    const content = 'symptom checker';
    const wrapper = mount(UiTextArea);
    wrapper.setValue(content);
    await wrapper.trigger('input');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(content);
  });
});
