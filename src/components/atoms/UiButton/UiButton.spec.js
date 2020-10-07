import { shallowMount } from '@vue/test-utils';
import UiButton from './UiButton.vue';

describe('UiButton', () => {
  test('render a component', () => {
    const wrapper = shallowMount(UiButton, {
      mocks: {
        $t: () => {},
      },
    });
    expect(wrapper.classes('ui-button')).toBe(true);
  });
  test('render a content via default slot', () => {
    const content = 'symptom checker';
    const wrapper = shallowMount(UiButton, {
      slots: {
        default: content,
      },
      mocks: {
        $t: () => {},
      },
    });
    expect(wrapper.element.textContent).toContain(content);
  });
  test('forward all event listeners to the component', () => {
    const onClick = jest.fn();
    const wrapper = shallowMount(UiButton, {
      listeners: {
        click: onClick,
      },
      mocks: {
        $t: () => {},
      },
    });
    wrapper.trigger('click');
    expect(onClick).toHaveBeenCalled();
  });
});
