import { mount } from '@vue/test-utils';
import UiCheckbox from './UiCheckbox.vue';

describe('UiCheckbox.vue', () => {
  test('render a component', () => {
    const wrapper = mount(UiCheckbox);
    expect(wrapper.classes('ui-checkbox')).toBe(true);
  });
  test('render a content via default slot', () => {
    const wrapper = mount(UiCheckbox, {
      slots: {
        default: '<div class="symptom-checker"></div>',
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('render a content via checkbutton slot', () => {
    const wrapper = mount(UiCheckbox, {
      slots: {
        checkbutton: '<div class="symptom-checker"></div>',
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('render default id for non passed id property', () => {
    const wrapper = mount(UiCheckbox);
    const input = wrapper.find('input[type="checkbox"]');
    expect(input.attributes('id')).toContain('checkbox-');
  });
  test('a checkbox click emits change event', async () => {
    const wrapper = mount(UiCheckbox, {
      props: {
        modelValue: false,
      },
    });
    const input = wrapper.find('input[type="checkbox"]');
    await input.trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(true);
  });
  test('a component pass Object as value', async () => {
    const value = { value: 'symptom checker' };
    const wrapper = mount(UiCheckbox, {
      props: {
        modelValue: [value],
        value,
      },
      mocks: {
        $t: () => {},
      },
    });
    const input = wrapper.find('input[type="checkbox"]');
    expect(input.element.checked).toBe(true);
  });
  test('a component emits array for multiple checkboxes with object', async () => {
    const value = { value: 'symptom checker' };
    const wrapper = mount(UiCheckbox, {
      props: {
        modelValue: ['symptom checker'],
        value,
      },
      mocks: {
        $t: () => {},
      },
    });
    const input = wrapper.find('input[type="checkbox"]');
    await input.trigger('click');
    expect(JSON.stringify(wrapper.emitted('update:modelValue')[0][0])).toBe(JSON.stringify(['symptom checker', value]));
  });
});
