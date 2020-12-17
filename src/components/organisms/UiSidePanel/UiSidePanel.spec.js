import { mount } from '@vue/test-utils';
import UiSidePanel from './UiSidePanel.vue';

describe('UiSidePanel.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiSidePanel);
    expect(wrapper.classes('ui-side-panel')).toBe(true);
  });
  test('a component can be open by model value', () => {
    const wrapper = mount(UiSidePanel, {
      props: {
        modelValue: true,
      },
    });
    const container = wrapper.find('.ui-side-panel__container');
    expect(container.exists()).toBe(true);
  });
  test('render a content via default slot', () => {
    const wrapper = mount(UiSidePanel, {
      props: {
        modelValue: true,
      },
      slots: {
        default: '<div class="symptom-checker"></div>',
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
});
