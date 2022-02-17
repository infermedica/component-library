import { mount } from '@vue/test-utils';
import UiButton from './UiButton.vue';

describe('UiButton.vue', () => {
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
  test('component is router-link when you pass it a "to" prop', () => {
    const wrapper = mount(UiButton, {
      props: {
        to: '/symptom-checker',
      },
    });
    expect(wrapper.element.tagName).toBe('ROUTER-LINK');
  });
  test('component is link when you pass it a  "href" prop', () => {
    const wrapper = mount(UiButton, {
      props: {
        href: '/symptom-checker',
      },
    });
    expect(wrapper.element.tagName).toBe('A');
  });
  test('component is a button without "to" and "href" props', () => {
    const wrapper = mount(UiButton);
    expect(wrapper.element.tagName).toBe('BUTTON');
  });
});
