import { mount } from '@vue/test-utils';
import UiMultipleChoices from './UiMultipleChoices.vue';
import UiMultipleChoicesItem from './_internal/UiMultipleChoicesItem.vue';

describe('UiMultipleChoices.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiMultipleChoices);
    expect(wrapper.classes('ui-multiple-choices')).toBe(true);
  });
  test('a component emits update:modelValue as array', async () => {
    const options = [
      {
        label: 'Yes',
        value: 'present',
      },
      {
        label: 'No',
        value: 'absent',
      },
      {
        label: 'Don\'t know',
        value: 'unknown',
      },
    ];
    const wrapper = mount(UiMultipleChoices, {
      props: {
        items: [ {
          id: 'diabetes',
          name: 'I have diabetes',
        } ],
        options,
      },
    });
    const emitted = [ 'present' ];
    await wrapper.find('input[type="radio"]').setChecked();
    expect(wrapper.emitted('update:modelValue')[0][0]).toStrictEqual(emitted);
  });
  test('a possible to pass custom choices by options property', () => {
    const options = [ {
      name: 'I think so',
      value: 'i-think-so',
    } ];
    const wrapper = mount(UiMultipleChoices, {
      props: {
        items: [ {
          id: 'diabetes',
          name: 'I have diabetes',
        } ],
        options,
      },
    });
    const choicesItemOptions = wrapper.findComponent(UiMultipleChoicesItem).vm.options;
    expect(choicesItemOptions).toStrictEqual(options);
  });
  test('a possible to valid custom choices component', async () => {
    const options = [
      {
        label: 'Yes',
        value: 'present',
      },
      {
        label: 'No',
        value: 'absent',
      },
      {
        label: 'Don\'t know',
        value: 'unknown',
      },
    ];
    const wrapper = mount(UiMultipleChoices, {
      props: {
        invalid: true,
        touched: false,
        items: [ {
          id: 'diabetes',
          name: 'I have diabetes',
        } ],
        options,
      },
    });
    wrapper.setProps({ modelValue: [ 'present' ] });
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:invalid')).toBeTruthy();
  });
});
