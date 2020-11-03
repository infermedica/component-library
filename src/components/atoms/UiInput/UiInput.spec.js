import { mount } from '@vue/test-utils';
import UiInput from './UiInput.vue';

describe('UiInput.vue', () => {
  test('render a component', () => {
    const wrapper = mount(UiInput);
    expect(wrapper.classes('ui-input')).toBe(true);
  });
  test('render a component with suffix', () => {
    const suffix = 'symptom checker';
    const wrapper = mount(UiInput, {
      props: {
        suffix,
      },
    });
    const aside = wrapper.find('.ui-input__aside');
    expect(aside.text()).toContain(suffix);
  });
  test('render a native attributes on input element', () => {
    const placeholder = 'symptom checker';
    const wrapper = mount(UiInput, {
      props: {
        placeholder,
      },
      mocks: {
        $t: () => {},
      },
    });
    const input = wrapper.find('.ui-input__element');
    expect(input.attributes('placeholder')).toBe(placeholder);
  });
  test('render a content via aside slot', () => {
    const wrapper = mount(UiInput, {
      slots: {
        aside: '<div class="symptom-checker"></div>',
      },
    });
    const aside = wrapper.find('.symptom-checker');
    expect(aside.exists()).toBe(true);
  });
  test('a component emits input event', async () => {
    const content = 'symptom checker';
    const wrapper = mount(UiInput);
    wrapper.find('.ui-input__element').setValue(content);
    await wrapper.trigger('input');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(content);
  });
});
