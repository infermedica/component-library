import { mount } from '@vue/test-utils';
import UiMultipleChoices from './UiMultipleChoices.vue';
import UiMultipleChoicesItem from './_internal/UiMultipleChoicesItem.vue';

describe('UiMultipleChoices.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiMultipleChoices);
    expect(wrapper.classes('ui-multiple-choices')).toBe(true);
  });
  test('a component emits update:modelValue as array', async () => {
    const wrapper = mount(UiMultipleChoices, {
      props: {
        choices: [{
          id: 'p_8',
          name: 'I have diabetes',
        }],
      },
    });
    const emitted = [{
      choice_id: 'present', id: 'p_8', name: 'I have diabetes',
    }];
    await wrapper.find('input[type="radio"]').setChecked();
    expect(wrapper.emitted('update:modelValue')[0][0]).toStrictEqual(emitted);
  });
  test('a possible to pass custom choices by options property', () => {
    const options = [{ name: 'I think so', value: 'present' }];
    const wrapper = mount(UiMultipleChoices, {
      props: {
        choices: [{
          id: 6,
          name: 'I have diabetes',
          linked_observation: 'p_8',
        }],
        options,
      },
    });
    const choicesItemOptions = wrapper.findComponent(UiMultipleChoicesItem).vm.options;
    expect(choicesItemOptions).toStrictEqual(options);
  });
  test('a possible to valid custom choices component', async () => {
    const wrapper = mount(UiMultipleChoices, {
      props: {
        invalid: true,
        touched: false,
        choices: [{
          id: 'p_8',
          name: 'I have diabetes',
        }],
      },
    });
    wrapper.setProps({ modelValue: [{ choice_id: 'absent', id: 'p_8', source: 'initial' }] });
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:invalid')).toBeTruthy();
  });
});
