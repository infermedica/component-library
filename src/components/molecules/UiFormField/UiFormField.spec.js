import { mount } from '@vue/test-utils';
import UiFormField from './UiFormField.vue';

describe('UiFormField.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiFormField, {
    });
    expect(wrapper.classes('ui-form-field')).toBe(true);
  });
  test('renders component with custom label from slot', () => {
    const customerrorMessage = 'custom alert text';
    const wrapper = mount(UiFormField, {
      slots: {
        alert: `<div class="alert-class">${customerrorMessage}</div>`,
      },
    });
    expect(wrapper.find('.alert-class').text()).toContain(customerrorMessage);
  });
  test('renders component with custom label from slot and has only one label', () => {
    const customLabel = 'custom label text';
    const wrapper = mount(UiFormField, {
      slots: {
        default: `<label class="label-class">${customLabel}</label>`,
      },
    });
    expect(wrapper.find('.label-class').text()).toContain(customLabel);
    expect(wrapper.findAll('label').length).toBe(1);
  });
  test('renders a label when passed a label prop', () => {
    const labelText = 'custom label text';
    const wrapper = mount(UiFormField, {
      props: {
        label: labelText,
      },
    });

    const label = wrapper.findAll('label');
    expect(label.length).toBe(1);
    expect(label[0].text()).toContain(labelText);
  });
  test('renders an alert when passed an errorMessage prop', () => {
    const errorMessage = 'custom label text';
    const wrapper = mount(UiFormField, {
      props: {
        errorMessage,
      },
    });

    const alert = wrapper.find('.ui-alert');
    expect(alert.text()).toContain(errorMessage);
  });
  test('renders a hint alert when passed a label and hint props', () => {
    const hintText = 'Required';
    const wrapper = mount(UiFormField, {
      props: {
        label: 'label present',
        hint: hintText,
      },
    });

    const hint = wrapper.find('.ui-form-field__hint');
    expect(hint.text()).toContain(hintText);
  });
  test('does not render a hint alert when passed hint prop without label', () => {
    const hintText = 'Required';
    const wrapper = mount(UiFormField, {
      props: {
        hint: hintText,
      },
    });

    expect(wrapper.find('.ui-form-field__label-tag').exists()).toBe(false);
  });
});
