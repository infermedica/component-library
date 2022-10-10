import { mount } from '@vue/test-utils';
import UiNotification from './UiNotification.vue';

describe('UiNotification.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiNotification);
    expect(wrapper.classes('ui-notification')).toBe(true);
  });
  test('component is success type', () => {
    const wrapper = mount(UiNotification, { props: { type: 'success' } });
    expect(wrapper.findAll('.ui-notification--success').length === 1).toBe(true);
  });
  test('component is info type', () => {
    const wrapper = mount(UiNotification, { props: { type: 'info' } });
    expect(wrapper.findAll('.ui-notification--info').length === 1).toBe(true);
  });
  test('component is warning type', () => {
    const wrapper = mount(UiNotification, { props: { type: 'warning' } });
    expect(wrapper.findAll('.ui-notification--warning').length === 1).toBe(true);
  });
  test('component is error type', () => {
    const wrapper = mount(UiNotification, { props: { type: 'error' } });
    expect(wrapper.findAll('.ui-notification--error').length === 1).toBe(true);
  });
});
