import { mount } from '@vue/test-utils';
import UiRating from './UiRating.vue';
import UiRadio from '../../atoms/UiRadio/UiRadio.vue';

describe('UiRating.vue', () => {
  test('check if component renders', () => {
    const wrapper = mount(UiRating);
    expect(wrapper.classes('ui-rating')).toBe(true);
  });
  test('check if max rate pass to component', () => {
    const wrapper = mount(UiRating, {
      props: {
        max: '5',
      },
    });
    expect(wrapper.findAllComponents(UiRadio).length).toBe(5);
  });
  test('check if rate value pass to component', () => {
    const wrapper = mount(UiRating, {
      props: {
        max: '5',
        modelValue: '3',
      },
    });
    expect(wrapper.findAll('.ui-rating__icon--positive').length).toBe(3);
  });
});
