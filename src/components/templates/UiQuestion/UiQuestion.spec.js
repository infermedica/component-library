import { mount } from '@vue/test-utils';
import UiQuestion from './UiQuestion.vue';

describe('UiQuestion.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiQuestion);
    expect(wrapper.classes('ui-question')).toBe(true);
  });
  test('component has above text when "isAnswerAbove" is true', () => {
    const wrapper = mount(UiQuestion, {
      props: {
        isAnswerAbove: true,
      },
    });
    const answerAbove = wrapper.find('.ui-question__answer-above');
    expect(answerAbove.exists()).toBe(true);
  });
  test('component has disabled next link when "isInvalid" is true', () => {
    const wrapper = mount(UiQuestion, {
      props: {
        isInvalid: true,
      },
    });
    const button = wrapper.find('.ui-button--is-disabled');
    expect(button.exists()).toBe(true);
  });
  test('component emit has-error when "isInvalid" is true', async () => {
    const wrapper = mount(UiQuestion, {
      props: {
        isInvalid: true,
      },
    });
    const button = wrapper.find('.ui-button--is-disabled');
    await button.trigger('click');
    expect(wrapper.emitted('has-error')).toBeTruthy();
  });
});
