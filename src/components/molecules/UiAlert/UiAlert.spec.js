import { mount } from '@vue/test-utils';
import UiAlert from './UiAlert.vue';

describe('UiAlert.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiAlert);
    expect(wrapper.classes('ui-alert')).toBe(true);
  });
  test('renders content via icon slot', () => {
    const slotClass = 'icon-slot';
    const wrapper = mount(UiAlert, {
      slots: {
        icon: `<div class="${slotClass}"></div>`,
      },
    });
    const iconSlot = wrapper.find(`.${slotClass}`);
    expect(iconSlot.exists()).toBe(true);
  });
  test('renders content via message slot', () => {
    const slotClass = 'message-slot';
    const wrapper = mount(UiAlert, {
      slots: {
        message: `<div class="${slotClass}"></div>`,
      },
    });
    const messageSlot = wrapper.find(`.${slotClass}`);
    expect(messageSlot.exists()).toBe(true);
  });
});
