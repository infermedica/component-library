import { mount } from '@vue/test-utils';
import UiTile from './UiTile.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';

describe('UiTile.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiTile);
    expect(wrapper.classes('ui-tile')).toBe(true);
  });
  test('renders a content via default slot', () => {
    const wrapper = mount(UiTile, {
      slots: {
        default: '<div class="symptom-checker"></div>',
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('a possible to pass icon by iconAttrs property', () => {
    const icon = 'cross';
    const wrapper = mount(UiTile, {
      props: {
        iconAttrs: { icon },
      },
    });
    const tileIcon = wrapper.findComponent(UiIcon).vm.icon;
    expect(tileIcon).toBe(icon);
  });
});
