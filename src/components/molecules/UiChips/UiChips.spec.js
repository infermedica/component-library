import { shallowMount, mount } from '@vue/test-utils';
import UiChips from './UiChips.vue';

describe('UiChips.vue', () => {
  test('renders a component', () => {
    const wrapper = shallowMount(UiChips, {
      mocks: {
        $t: () => {},
      },
    });
    expect(wrapper.classes('ui-chips')).toBe(true);
  });
  test('component emit click:remove event', async () => {
    const wrapper = mount(UiChips, {
      mocks: {
        $t: () => {},
      },
    });
    const button = wrapper.find('.ui-chips__remove');
    await button.trigger('click');
    expect(wrapper.emitted('click:remove')).toBeTruthy();
  });
  test('a component pass attributes for remove button', () => {
    const content = 'symptom checker';
    const wrapper = mount(UiChips, {
      propsData: {
        buttonAttrs: {
          'aria-label': content,
        },
      },
      mocks: {
        $t: () => {},
      },
    });
    const button = wrapper.find('.ui-chips__remove');
    expect(button.attributes('aria-label')).toBe(content);
  });
  test('render a content via remove slot', () => {
    const wrapper = shallowMount(UiChips, {
      slots: {
        remove: '<div class="symptom-checker"></div>',
      },
      mocks: {
        $t: () => {},
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
});
