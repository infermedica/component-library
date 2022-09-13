import { h } from 'vue';
import { mount } from '@vue/test-utils';
import UiMegaMenu from './UiMegaMenu.vue';
import UiMegaMenuItem from './_internal/UiMegaMenuItem.vue';

describe('UiMegaMenu.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiMegaMenu);
    expect(wrapper.classes('ui-mega-menu')).toBe(true);
  });
  test('component emit item to open', async () => {
    const name = 'test';
    const wrapper = mount(UiMegaMenu, {
      slots: {
        default: h(UiMegaMenuItem, {
          name,
        }),
      },
    });
    const item = wrapper.findComponent(UiMegaMenuItem);
    item.vm.to();
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(name);
  });
});
