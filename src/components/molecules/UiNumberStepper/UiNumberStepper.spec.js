import { mount } from '@vue/test-utils';
import UiNumberStepper from '@/components/molecules/UiNumberStepper/UiNumberStepper.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';

describe('UiNumberStepper.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiNumberStepper);
    expect(wrapper.classes('ui-number-stepper')).toBe(true);
  });
  test('clicking decrement button decrement the value', async () => {
    const wrapper = mount(UiNumberStepper, {
      props: {
        modelValue: 1,
        min: 0,
        max: 10,
      },
    });
    const decrementButton = wrapper.findAllComponents(UiButton)[0];
    await decrementButton.trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(0);
  });
  test('clicking increment button increment the value', async () => {
    const wrapper = mount(UiNumberStepper, {
      props: {
        modelValue: 0,
        min: 0,
        max: 10,
      },
    });
    const incrementButton = wrapper.findAllComponents(UiButton)[1];
    await incrementButton.trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(1);
  });
  test('value can\'t be smallest than min', async () => {
    const wrapper = mount(UiNumberStepper, {
      props: {
        modelValue: 0,
        min: 0,
        max: 1,
      },
    });
    const decrementButton = wrapper.findAllComponents(UiButton)[0];
    await decrementButton.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
  test('value can\'t be bigger than max', async () => {
    const wrapper = mount(UiNumberStepper, {
      props: {
        modelValue: 1,
        min: 0,
        max: 1,
      },
    });
    const incrementButton = wrapper.findAllComponents(UiButton)[1];
    await incrementButton.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
});
