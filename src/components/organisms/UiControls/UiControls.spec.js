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
  test('component does not show next button when "toNext" is absent', () => {
    const wrapper = mount(UiControls);
    const button = wrapper.find('.ui-controls__next');
    expect(button.exists()).toBe(false);
  });
  test('component does not show back button when "toBack" is absent', () => {
    const wrapper = mount(UiControls);
    const button = wrapper.find('.ui-controls__back');
    expect(button.exists()).toBe(false);
  });
  test('component has disabled next button when "invalid" is true and "toNext" is present', () => {
    const wrapper = mount(UiControls, {
      props: {
        isInvalid: true,
        toNext: '/3-3',
      },
    });
    const button = wrapper.find('.ui-button--is-disabled');
    expect(button.exists()).toBe(true);
  });
  test('component emit has-error when "invalid" is true and "toNext" is present', async () => {
    const wrapper = mount(UiControls, {
      props: {
        isInvalid: true,
        toNext: '/5-4',
      },
    });
    const button = wrapper.find('.ui-button--is-disabled');
    await button.trigger('click');
    expect(wrapper.emitted('has-error')).toBeTruthy();
  });
});
