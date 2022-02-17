import { mount } from '@vue/test-utils';
import UiSimpleQuestion from './UiSimpleQuestion.vue';
import UiTile from '../../molecules/UiTile/UiTile.vue';

describe('UiSimpleQuestion.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiSimpleQuestion);
    expect(wrapper.classes('ui-simple-question')).toBe(true);
  });
  test('renders a component with correct amount of options', () => {
    const options = [
      {
        id: 'present-id',
        name: 'yes-no-dontknow',
        label: 'Yes',
        value: 'present',
        iconAttrs: { icon: 'checkmark' },
      },
      {
        id: 'absent-id',
        name: 'yes-no-dontknow',
        label: 'No',
        value: 'absent',
        iconAttrs: { icon: 'close' },
      },
      {
        id: 'unknown-id',
        name: 'yes-no-dontknow',
        label: 'Dont know sometimes is long',
        value: 'unknown',
        iconAttrs: { icon: 'arrow-right' },
      },
    ];
    const optionsLength = options.length;
    const wrapper = mount(UiSimpleQuestion, {
      props: { options },
    });

    const optionTiles = wrapper.findAllComponents(UiTile);
    expect(optionTiles.length).toBe(optionsLength);
  });
});
