import { mount } from '@vue/test-utils';
import UiDatepicker from './UiDatepicker.vue';
import UiDatepickerCalendar from './_internal/UiDatepickerCalendar.vue';
import UiDatepickerDayInput from './_internal/UiDatepickerDayInput.vue';
import UiDatepickerMonthInput from './_internal/UiDatepickerMonthInput.vue';
import UiDatepickerYearInput from './_internal/UiDatepickerYearInput.vue';
import UiDatepickerDayTab from './_internal/UiDatepickerDayTab.vue';
import UiDatepickerMonthTab from './_internal/UiDatepickerMonthTab.vue';
import UiDatepickerYearTab from './_internal/UiDatepickerYearTab.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiPopover from '../../molecules/UiPopover/UiPopover.vue';
import UiTabs from '../UiTabs/UiTabs.vue';

const mountDatepicker = (options) => {
  const wrapper = mount(UiDatepicker, {
    attachTo: document.body,
    ...options,
  });

  return wrapper;
};

describe('UiDatepicker.vue', () => {
  test('renders a component', () => {
    const wrapper = mountDatepicker();
    expect(wrapper.classes('ui-datepicker')).toBe(true);
  });
  test.each([
    [
      'day',
      [
        'day',
        'month',
        'year',
      ],
    ],
    [
      'month',
      [
        'month',
        'day',
        'year',
      ],
    ],
    [
      'year',
      [
        'year',
        'day',
        'month',
      ],
    ],
  ])('open calendar with %s tab when all fields are filled', async (expected, order) => {
    const wrapper = mountDatepicker({
      propsData: {
        modelValue: '2077-11-27',
        order,
      },
    });
    const calendar = wrapper.findComponent(UiDatepickerCalendar);
    await calendar
      .findComponent(UiButton)
      .trigger('click');

    expect(calendar.findComponent(UiTabs).vm.modelValue).toBe(`datepicker-calendar-${expected}`);
  });
  test.each([
    [
      'day',
      [
        'day',
        'month',
        'year',
      ],
    ],
    [
      'month',
      [
        'month',
        'day',
        'year',
      ],
    ],
    [
      'year',
      [
        'year',
        'day',
        'month',
      ],
    ],
  ])('open calendar with %s tab when non fields are filled', async (expected, order) => {
    const wrapper = mountDatepicker({ propsData: { order } });

    const calendar = wrapper.findComponent(UiDatepickerCalendar);
    await calendar
      .findComponent(UiButton)
      .trigger('click');

    expect(calendar.findComponent(UiTabs).vm.modelValue).toBe(`datepicker-calendar-${expected}`);
  });
  test('close calendar when all fields are filled', async () => {
    const wrapper = mountDatepicker();

    const calendar = wrapper.findComponent(UiDatepickerCalendar);
    await calendar
      .findComponent(UiButton)
      .trigger('click');

    const dayInput = wrapper
      .findComponent(UiDatepickerDayInput);
    const monthInput = wrapper
      .findComponent(UiDatepickerMonthInput);
    const yearInput = wrapper
      .findComponent(UiDatepickerYearInput);

    await dayInput
      .find('input')
      .trigger('focus');
    await dayInput.setValue('27');
    await monthInput
      .find('input')
      .trigger('focus');
    await monthInput.setValue('11');
    await yearInput
      .find('input')
      .trigger('focus');
    await yearInput.setValue('1991');

    expect(calendar.findComponent(UiPopover).exists()).toBe(false);
  });
  test('calendar is still open after focus on any input', async () => {
    const wrapper = mountDatepicker();

    const calendar = wrapper.findComponent(UiDatepickerCalendar);
    await calendar
      .findComponent(UiButton)
      .trigger('click');

    const dayInput = wrapper
      .findComponent(UiDatepickerDayInput);
    const monthInput = wrapper
      .findComponent(UiDatepickerMonthInput);
    const yearInput = wrapper
      .findComponent(UiDatepickerYearInput);

    await dayInput
      .find('input')
      .trigger('focus');
    await monthInput
      .find('input')
      .trigger('focus');
    await yearInput
      .find('input')
      .trigger('focus');

    expect(calendar.findComponent(UiPopover).exists()).toBe(true);
  });
  test('focuses calendar button after select date on calendar', async () => {
    const wrapper = mountDatepicker();

    const calendar = wrapper.findComponent(UiDatepickerCalendar);
    await calendar
      .findComponent(UiButton)
      .trigger('click');

    const dayTabFirstButton = calendar.findComponent(UiDatepickerDayTab).findAllComponents(UiButton).at(1);
    const monthTabFirstButton = calendar.findComponent(UiDatepickerMonthTab).findAllComponents(UiButton).at(1);
    const yearTabFirstButton = calendar.findComponent(UiDatepickerYearTab).findAllComponents(UiButton).at(1);
    await dayTabFirstButton.trigger('click');
    await monthTabFirstButton.trigger('click');
    await yearTabFirstButton.trigger('click');

    expect(calendar.findComponent(UiPopover).exists()).toBe(false);
  });
});

