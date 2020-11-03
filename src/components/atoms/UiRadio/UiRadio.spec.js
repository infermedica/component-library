import { mount } from '@vue/test-utils';
import UiRadio from './UiRadio.vue';

describe('UiRadio.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiRadio);
    expect(wrapper.classes('ui-radio')).toBe(true);
  });
  test('render a content via default slot', () => {
    const wrapper = mount(UiRadio, {
      slots: {
        default: '<div class="symptom-checker"></div>',
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('render a content via radiobutton slot', () => {
    const wrapper = mount(UiRadio, {
      slots: {
        radiobutton: '<div class="symptom-checker"></div>',
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('render default id for non passed id property', () => {
    const wrapper = mount(UiRadio);
    const input = wrapper.find('input[type="radio"]');
    expect(input.attributes('id')).toContain('radio-');
  });
  test('a radio click emits change event', async () => {
    const value = 'symptom checker';
    const wrapper = mount(UiRadio, {
      props: {
        modelValue: '',
        value,
      },
    });
    const input = wrapper.find('input[type="radio"]');
    await input.trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(value);
  });
  test('a component pass Object as value', () => {
    const value = { value: 'symptom checker' };
    const wrapper = mount(UiRadio, {
      props: {
        modelValue: value,
        value,
      },
    });
    const input = wrapper.find('input[type="radio"]');
    expect(input.element.checked).toBe(true);
  });
});
