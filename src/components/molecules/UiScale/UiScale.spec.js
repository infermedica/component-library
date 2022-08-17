import { mount } from '@vue/test-utils';
import UiScale from './UiScale.vue';
import UiRadio from '../../atoms/UiRadio/UiRadio.vue';

describe('UiScale.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiScale);
    expect(wrapper.classes('ui-scale')).toBe(true);
  });
  test('renders a content via decrement slot', () => {
    const wrapper = mount(UiScale, {
      slots: {
        decrement: '<div class="symptom-checker"></div>',
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('renders a content via increment slot', () => {
    const wrapper = mount(UiScale, {
      slots: {
        increment: '<div class="symptom-checker"></div>',
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('rendes certein number of options', () => {
    const wrapper = mount(UiScale, {
      props: {
        steps: 20,
      },
    });
    expect(wrapper.findAllComponents(UiRadio).length).toBe(20);
  });
  test('pain value pass to component', () => {
    const wrapper = mount(UiScale, {
      props: {
        modelValue: 7,
      },
    });
    expect(wrapper.findAll('.ui-scale__square--is-checked').length).toBe(8);
  });
  test('clicking increment button increments scale value', async () => {
    const wrapper = mount(UiScale, {
      props: {
        modelValue: 7,
      },
    });
    const incrementButton = wrapper.find('.ui-number-stepper__increment');
    await incrementButton.trigger('click');
    expect(parseInt(wrapper.emitted('update:modelValue')[0][0], 10)).toBe(8);
  });
  test('clicking decrement button decrements scale value', async () => {
    const wrapper = mount(UiScale, {
      props: {
        modelValue: 7,
      },
    });
    const decrementButton = wrapper.find('.ui-number-stepper__decrement');
    await decrementButton.trigger('click');
    expect(parseInt(wrapper.emitted('update:modelValue')[0][0], 10)).toBe(6);
  });
  test('incrementing by button dont get value out of scale bounds', async () => {
    const wrapper = mount(UiScale, {
      props: {
        modelValue: 9,
      },
    });
    const incrementButton = wrapper.find('.ui-number-stepper__increment');
    await incrementButton.trigger('click');
    expect(wrapper.emitted()['update:modelValue']).not.toBeTruthy();
  });
  test('decrementing by button dont get value out of scale bounds', async () => {
    const wrapper = mount(UiScale, {
      props: {
        modelValue: 0,
      },
    });
    const decrementButton = wrapper.find('.ui-number-stepper__decrement');
    await decrementButton.trigger('click');
    expect(wrapper.emitted()['update:modelValue']).not.toBeTruthy();
  });
});
