import { mount } from '@vue/test-utils';
import UiControls from './UiControls.vue';

describe('UiControls.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiControls);
    expect(wrapper.classes('ui-controls')).toBe(true);
  });
  test('component has above text when "isAnswerAbove" is true', () => {
    const wrapper = mount(UiControls, {
      props: {
        isAnswerAbove: true,
      },
    });
    const answerAbove = wrapper.find('.ui-controls__answer-above');
    expect(answerAbove.exists()).toBe(true);
  });
  test('component has disabled next button when "invalid" is true', () => {
    const wrapper = mount(UiControls, {
      props: {
        isInvalid: true,
      },
    });
    const button = wrapper.find('.ui-button--is-disabled');
    expect(button.exists()).toBe(true);
  });
  test('component emit has-error when "invalid" is true', async () => {
    const wrapper = mount(UiControls, {
      props: {
        isInvalid: true,
      },
    });
    const button = wrapper.find('.ui-button--is-disabled');
    await button.trigger('click');
    expect(wrapper.emitted('has-error')).toBeTruthy();
  });
});
