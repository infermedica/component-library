import { mount } from '@vue/test-utils';
import UiChips from './UiChips.vue';

describe('UiChips.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiChips);
    expect(wrapper.classes('ui-chips')).toBe(true);
  });
  test('component emit click:remove event', async () => {
    const wrapper = mount(UiChips);
    const button = wrapper.find('.ui-chips__remove');
    await button.trigger('click');
    expect(wrapper.emitted('remove')).toBeTruthy();
  });
  test('a component pass attributes for remove button', () => {
    const content = 'symptom checker';
    const wrapper = mount(UiChips, {
      props: {
        buttonAttrs: {
          'aria-label': content,
        },
      },
    });
    const button = wrapper.find('.ui-chips__remove');
    expect(button.attributes('aria-label')).toBe(content);
  });
  test('render a content via remove slot', () => {
    const wrapper = mount(UiChips, {
      slots: {
        remove: '<div class="symptom-checker"></div>',
      },
    });
    const slot = wrapper.find('.symptom-checker');
    expect(slot.exists()).toBe(true);
  });
});
