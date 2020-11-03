import { mount } from '@vue/test-utils';
import UiRange from './UiRange.vue';

describe('UiRange.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiRange);
    expect(wrapper.classes('ui-range')).toBe(true);
  });
  test('renders a content via value slot', () => {
    const wrapper = mount(UiRange, {
      slots: {
        value: '<div class="symptom-checker"></div>',
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('renders a content via decrement slot', () => {
    const wrapper = mount(UiRange, {
      slots: {
        decrement: '<div class="symptom-checker"></div>',
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('renders a content via increment slot', () => {
    const wrapper = mount(UiRange, {
      slots: {
        increment: '<div class="symptom-checker"></div>',
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('percent position of thumb is right', () => {
    const wrapper = mount(UiRange, {
      props: {
        modelValue: '70',
        min: '18',
        max: '122',
      },
    });
    expect(wrapper.vm.trackWidth).toBe('50%');
  });
  test('pass percent position of thumb to component style', () => {
    const wrapper = mount(UiRange, {
      props: {
        modelValue: '70',
        min: '18',
        max: '122',
      },
    });
    expect(wrapper.element.style.getPropertyValue('--range-selected-track-width')).toBe('50%');
  });
  test('a increment click increment value', async () => {
    const wrapper = mount(UiRange, {
      props: {
        modelValue: '70',
        min: '18',
        max: '122',
      },
    });
    const button = wrapper.find('.ui-range__increment');
    await button.trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('71');
  });
  test('a decrement click decrement value', async () => {
    const wrapper = mount(UiRange, {
      props: {
        modelValue: '70',
        min: '18',
        max: '122',
      },
    });
    const button = wrapper.find('.ui-range__decrement');
    await button.trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('69');
  });
});
