import { mount } from '@vue/test-utils';
import UiSimpleQuestion from './UiSimpleQuestion.vue';
import UiTile from '../../molecules/UiTile/UiTile.vue';

describe('UiSimpleQuestion.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiSimpleQuestion);
    expect(wrapper.classes('ui-simple-question')).toBe(true);
  });
  test('renders a component with correct amount of items', () => {
    const items = [
      {
        id: 'present-id',
        name: 'yes-no-dontknow',
        label: 'Yes',
        value: 'present',
        icon: 'checkmark',
      },
      {
        id: 'absent-id',
        name: 'yes-no-dontknow',
        label: 'No',
        value: 'absent',
        icon: 'close',
      },
      {
        id: 'unknown-id',
        name: 'yes-no-dontknow',
        label: 'Dont know sometimes is long',
        value: 'unknown',
        icon: 'arrow-right',
      },
    ];
    const optionsLength = items.length;
    const wrapper = mount(UiSimpleQuestion, { props: { items } });

    const optionTiles = wrapper.findAllComponents(UiTile);
    expect(optionTiles.length).toBe(optionsLength);
  });
});
