import { mount } from '@vue/test-utils';
import UiButton from './UiButton.vue';

describe('UiButton', () => {
  test('render a component', () => {
    const wrapper = mount(UiButton);
    expect(wrapper.classes('ui-button')).toBe(true);
  });
  test('render a content via default slot', () => {
    const content = 'symptom checker';
    const wrapper = mount(UiButton, {
      slots: {
        default: content,
      },
    });
    expect(wrapper.element.textContent).toContain(content);
  });
});
