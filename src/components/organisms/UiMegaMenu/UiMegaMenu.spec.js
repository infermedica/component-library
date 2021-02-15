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
    const wrapper = mount(UiMegaMenu, {
      slots: {
        default: h(UiMegaMenuItem, { name: 'sc', title: 'sc' }),
      },
    });
    const item = wrapper.findComponent(UiMegaMenuItem);
    const toggler = item.find('button');
    await toggler.trigger('click');
    expect(typeof wrapper.emitted('update:modelValue')[0][0] === 'object').toBeTruthy();
  });
});
