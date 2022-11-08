import { mount } from '@vue/test-utils';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiQuestion from './UiQuestion.vue';

describe('UiQuestion.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiQuestion);
    expect(wrapper.classes('ui-question')).toBe(true);
  });
  test('component does not render skip button when buttonActionAttrs is empty', () => {
    const settings = {
      issue: {
        action: true,
        feedback: true,
        skip: false,
      },
    };
    const wrapper = mount(UiQuestion, { propsData: { settings } });
    const notification = wrapper.find('.ui-question__feedback');
    expect(notification.findComponent(UiButton).exists()).toBe(false);
  });
  test('component render skip button', () => {
    const settings = {
      issue: {
        action: true,
        feedback: true,
        skip: true,
      },
    };
    const notificationFeedbackAttrs = {
      buttonActionAttrs: {
        onClick: vi.fn(),
        'data-testid': 'skip-button',
      },
    };
    const wrapper = mount(UiQuestion, {
      propsData: {
        settings,
        notificationFeedbackAttrs,
      },
    });
    expect(wrapper.find('[data-testid="skip-button"]').exists()).toBe(true);
  });
  test('skip button is hidden even onClick is pass to buttonActionAttrs', () => {
    const settings = {
      issue: {
        action: true,
        feedback: true,
        skip: false,
      },
    };
    const notificationFeedbackAttrs = {
      buttonActionAttrs: {
        onClick: vi.fn(),
        'data-testid': 'skip-button',
      },
    };
    const wrapper = mount(UiQuestion, {
      propsData: {
        settings,
        notificationFeedbackAttrs,
      },
    });
    expect(wrapper.find('[data-testid="skip-button"]').exists()).toBe(false);
  });
});
