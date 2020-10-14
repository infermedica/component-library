import { shallowMount } from '@vue/test-utils';
import UiInput from './UiInput.vue';

describe('UiInput.vue', () => {
  test('render a component', () => {
    const wrapper = shallowMount(UiInput, {
      mocks: {
        $t: () => {},
      },
    });
    expect(wrapper.classes('ui-input')).toBe(true);
  });
  test('render a component with suffix', () => {
    const suffix = 'symptom checker';
    const wrapper = shallowMount(UiInput, {
      propsData: {
        suffix,
      },
      mocks: {
        $t: () => {},
      },
    });
    const aside = wrapper.find('.ui-input__aside');
    expect(aside.text()).toContain(suffix);
  });
  test('render a native attributes on input element', () => {
    const placeholder = 'symptom checker';
    const wrapper = shallowMount(UiInput, {
      propsData: {
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
    const wrapper = shallowMount(UiInput, {
      slots: {
        aside: '<div class="symptom-checker"></div>',
      },
      mocks: {
        $t: () => {},
      },
    });
    const aside = wrapper.find('.symptom-checker');
    expect(aside.exists()).toBe(true);
  });
  test('a component emits input event', async () => {
    const content = 'symptom checker';
    const wrapper = shallowMount(UiInput, {
      mocks: {
        $t: () => {},
      },
    });
    await wrapper.find('.ui-input__element').setValue(content);
    wrapper.trigger('input');
    expect(wrapper.emitted('input')[0][0]).toBe(content);
  });
});
