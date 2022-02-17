import { mount } from '@vue/test-utils';
import UiTile from './UiTile.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';

describe('UiTile.vue', () => {
  test('renders a component', () => {
    const icon = 'close';
    const wrapper = mount(UiTile, {
      props: {
        iconAttrs: { icon },
      },
    });
    expect(wrapper.classes('ui-tile')).toBe(true);
  });
  test('renders a content via default slot', () => {
    const icon = 'close';
    const wrapper = mount(UiTile, {
      slots: {
        default: '<div class="symptom-checker"></div>',
      },
      props: {
        iconAttrs: { icon },
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
  test('a possible to pass icon by iconAttrs property', () => {
    const icon = 'close';
    const wrapper = mount(UiTile, {
      props: {
        iconAttrs: { icon },
      },
    });
    const tileIcon = wrapper.findComponent(UiIcon).vm.icon;
    expect(tileIcon).toBe(icon);
  });
});
