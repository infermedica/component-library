import { shallowMount } from '@vue/test-utils';
import UiCheckbox from './UiCheckbox.vue';

describe('UiCheckbox.vue', () => {
  test('render a component', () => {
    const wrapper = shallowMount(UiCheckbox, {
      mocks: {
        $t: () => {},
      },
    });
    expect(wrapper.classes('ui-checkbox')).toBe(true);
  });
  test('render a content via default slot', () => {
    const wrapper = shallowMount(UiCheckbox, {
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
  test('render a content via checkbutton slot', () => {
    const wrapper = shallowMount(UiCheckbox, {
      slots: {
        checkbutton: '<div class="symptom-checker"></div>',
      },
      mocks: {
        $t: () => {},
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('render default id for non passed id property', () => {
    const wrapper = shallowMount(UiCheckbox, {
      mocks: {
        $t: () => {},
      },
    });
    // eslint-disable-next-line no-underscore-dangle
    const id = `checkbox-${wrapper.vm._uid}`;
    const input = wrapper.find('input[type="checkbox"]');
    expect(input.attributes('id')).toBe(id);
  });
  test('a checkbox click emits change event', async () => {
    const wrapper = shallowMount(UiCheckbox, {
      propsData: {
        checked: false,
      },
      mocks: {
        $t: () => {},
      },
    });
    const input = wrapper.find('input[type="checkbox"]');
    await input.trigger('click');
    expect(wrapper.emitted('change')[0][0]).toBe(true);
  });
  test('a component pass Object as value', async () => {
    const value = { value: 'symptom checker' };
    const wrapper = shallowMount(UiCheckbox, {
      propsData: {
        checked: [value],
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
    const wrapper = shallowMount(UiCheckbox, {
      propsData: {
        checked: ['symptom checker'],
        value,
      },
      mocks: {
        $t: () => {},
      },
    });
    const input = wrapper.find('input[type="checkbox"]');
    await input.trigger('click');
    expect(JSON.stringify(wrapper.emitted('change')[0][0])).toBe(JSON.stringify(['symptom checker', value]));
  });
});
