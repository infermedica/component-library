import { mount } from '@vue/test-utils';
import UiRange from './UiRange.vue';
import UiButton from '../UiButton/UiButton.vue';

const props = {
  modelValue: 70,
  min: 18,
  max: 122,
};

describe('UiRange.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiRange);
    expect(wrapper.classes('ui-range')).toBe(true);
  });
  test('renders a content via value slot', () => {
    const wrapper = mount(UiRange, { slots: { value: '<div class="symptom-checker"></div>' } });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('renders a content via decrement slot', () => {
    const wrapper = mount(UiRange, { slots: { decrement: '<div class="symptom-checker"></div>' } });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('renders a content via increment slot', () => {
    const wrapper = mount(UiRange, { slots: { increment: '<div class="symptom-checker"></div>' } });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('percent position of thumb is right', () => {
    const wrapper = mount(UiRange, { props });
    expect(wrapper.element.style.getPropertyValue('--_range-runnable-track-width')).toBe('50%');
  });
  test('pass percent position of thumb to component style', () => {
    const wrapper = mount(UiRange, { props });
    expect(wrapper.element.style.getPropertyValue('--_range-runnable-track-width')).toBe('50%');
  });
  test('clicking increment button increments the value', async () => {
    const wrapper = mount(UiRange, { props });
    const incrementButton = wrapper.findAllComponents(UiButton)[1];
    await incrementButton.trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(71);
  });
  test('clicking decrement button decrements the value', async () => {
    const wrapper = mount(UiRange, { props });
    const decrementButton = wrapper.findAllComponents(UiButton)[0];
    await decrementButton.trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(69);
  });
  test('component passes attributes to child button components', async () => {
    const initialModelValue = 70;
    const wrapper = mount(UiRange, {
      props: {
        ...props,
        modelValue: initialModelValue,
        buttonIncrementAttrs: { disabled: true },
        buttonDecrementAttrs: { disabled: true },
      },
    });
    const buttons = wrapper.findAllComponents(UiButton);
    const decrementButton = buttons[0];
    const incrementButton = buttons[1];

    await incrementButton.trigger('click');
    expect(wrapper.emitted()['update:modelValue']).not.toBeTruthy();
    expect(wrapper.props().modelValue).toBe(initialModelValue);

    await decrementButton.trigger('click');
    expect(wrapper.emitted()['update:modelValue']).not.toBeTruthy();
    expect(wrapper.props().modelValue).toBe(initialModelValue);
  });
});
