import { mount } from '@vue/test-utils';
import UiDatepicker from './UiDatepicker.vue';

const mountDatepicker = () => {
  const wrapper = mount(UiDatepicker, {
    global: {
      // TODO handle it globally, without stub jest throws error on svg mounting
      stubs: {
        UiIcon: { template: '<svg />' },
      },
    },
  });

  return wrapper;
};

describe('UiDatepicker.vue', () => {
  test('renders a component', () => {
    const wrapper = mountDatepicker(UiDatepicker);
    expect(wrapper.classes('ui-datepicker')).toBe(true);
  });

  test('opens calendar with day tab when all fields are filled', async () => {
    const wrapper = mountDatepicker();

    await wrapper.find('#day').setValue('12');
    await wrapper.find('#month').setValue('12');
    await wrapper.find('#year').setValue('1990');

    await wrapper.find('.ui-datepicker-calendar__toggler').trigger('click');
    const activeTab = wrapper.find('.ui-tabs-item__tab-button--active');

    expect(activeTab.text()).toBe('Day');
  });

  test('opens calendar with month tab when day and year fields are filled', async () => {
    const wrapper = mountDatepicker();

    await wrapper.find('#day').setValue('12');
    await wrapper.find('#year').setValue('1990');

    await wrapper.find('.ui-datepicker-calendar__toggler').trigger('click');
    const activeTab = wrapper.find('.ui-tabs-item__tab-button--active');

    expect(activeTab.text()).toBe('Month');
  });

  test('opens calendar with day tab when none of fields are filled', async () => {
    const wrapper = mountDatepicker();

    await wrapper.find('.ui-datepicker-calendar__toggler').trigger('click');
    const activeTab = wrapper.find('.ui-tabs-item__tab-button--active');

    expect(activeTab.text()).toBe('Day');
  });

  test('closes calendar when all fields are filled', async () => {
    const wrapper = mountDatepicker();

    await wrapper.find('.ui-datepicker-calendar__toggler').trigger('click');

    const dayField = wrapper.find('#day');
    const monthField = wrapper.find('#month');
    const yearField = wrapper.find('#year');

    await dayField.trigger('focus');
    await dayField.setValue('12');
    await monthField.trigger('focus');
    await monthField.setValue('12');
    await yearField.trigger('focus');
    await yearField.setValue('1990');

    const calendarPopover = await wrapper.find('.ui-popover');
    expect(calendarPopover.exists()).toBe(false);
  });

  test('calendar is still open after focus on any input', async () => {
    const wrapper = mountDatepicker();

    await wrapper.find('.ui-datepicker-calendar__toggler').trigger('click');

    const dayField = wrapper.find('#day');
    const monthField = wrapper.find('#month');
    const yearField = wrapper.find('#year');

    await dayField.trigger('focus');
    await monthField.trigger('focus');
    await yearField.trigger('focus');

    const calendarPopover = await wrapper.find('.ui-popover');
    expect(calendarPopover.exists()).toBe(true);
  });
});

