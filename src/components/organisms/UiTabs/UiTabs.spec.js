import { h } from 'vue';
import { mount } from '@vue/test-utils';
import UiTabs from './UiTabs.vue';
import UiTabsItem from './_internal/UiTabsItem.vue';

describe('UiTabs.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiTabs);
    expect(wrapper.classes('ui-tabs')).toBe(true);
  });
  test('component emit single item for String v-model', async () => {
    const wrapper = mount(UiTabs, {
      slots: {
        default: h(UiTabsItem, {
          name: 'sc',
          title: 'sc',
        }),
      },
    });
    const item = wrapper.findComponent(UiTabsItem);
    const toggler = item.find('button');
    await toggler.trigger('click');
    expect(typeof wrapper.emitted('update:modelValue')[0][0] === 'string').toBeTruthy();
  });
  test('component emit update for UiTabsItem with id instead name', async () => {
    const wrapper = mount(UiTabs, {
      slots: {
        default: h(UiTabsItem, {
          id: 'sc',
          title: 'sc',
        }),
      },
    });
    const item = wrapper.findComponent(UiTabsItem);
    const toggler = item.find('button');
    await toggler.trigger('click');
    expect(typeof wrapper.emitted('update:modelValue')[0][0] === 'string').toBeTruthy();
  });
});
