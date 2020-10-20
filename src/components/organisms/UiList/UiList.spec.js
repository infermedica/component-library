import { shallowMount, mount } from '@vue/test-utils';
import UiList from './UiList.vue';

describe('UiList.vue', () => {
  test('renders a component', () => {
    const wrapper = shallowMount(UiList, {
      mocks: {
        $t: () => {},
      },
    });
    expect(wrapper.classes('ui-list')).toBe(true);
  });
  test('render internal component', () => {
    const content = '<UiListItem>Symptom Checker</UiListItem>';
    const wrapper = mount(UiList, {
      slots: {
        default: content,
      },
      mocks: {
        $t: () => {},
      },
    });
    const slot = wrapper.find('.ui-list-item');
    expect(slot.exists()).toBe(true);
  });
});
