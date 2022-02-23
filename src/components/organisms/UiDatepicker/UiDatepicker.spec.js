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
});

