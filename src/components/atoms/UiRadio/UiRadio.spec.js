import { shallowMount } from '@vue/test-utils';
import UiRadio from './UiRadio.vue';

describe('UiRadio.vue', () => {
  test('renders a component', () => {
    const wrapper = shallowMount(UiRadio, {
      mocks: {
        $t: () => {},
      },
    });
    expect(wrapper.classes('ui-radio')).toBe(true);
  });
  test('render a content via default slot', () => {
    const wrapper = shallowMount(UiRadio, {
      slots: {
        default: '<div class="symptom-checker"></div>',
      },
      mocks: {
        $t: () => {},
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('render a content via radiobutton slot', () => {
    const wrapper = shallowMount(UiRadio, {
      slots: {
        radiobutton: '<div class="symptom-checker"></div>',
      },
      mocks: {
        $t: () => {},
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('render default id for non passed id property', () => {
    const wrapper = shallowMount(UiRadio, {
      mocks: {
        $t: () => {},
      },
    });
    // eslint-disable-next-line no-underscore-dangle
    const id = `radio-${wrapper.vm._uid}`;
    const input = wrapper.find('input[type="radio"]');
    expect(input.attributes('id')).toBe(id);
  });
  test('a radio click emits change event', async () => {
    const value = 'symptom checker';
    const wrapper = shallowMount(UiRadio, {
      propsData: {
        checked: '',
        value,
      },
      mocks: {
        $t: () => {},
      },
    });
    const input = wrapper.find('input[type="radio"]');
    await input.trigger('click');
    expect(wrapper.emitted('change')[0][0]).toBe(value);
  });
  test('a component pass Object as value', () => {
    const value = { value: 'symptom checker' };
    const wrapper = shallowMount(UiRadio, {
      propsData: {
        checked: value,
        value,
      },
      mocks: {
        $t: () => {},
      },
    });
    const input = wrapper.find('input[type="radio"]');
    expect(input.element.checked).toBe(true);
  });
});
