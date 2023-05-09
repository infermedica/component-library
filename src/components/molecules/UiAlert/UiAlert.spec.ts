import {
  mountStories,
  getSlotTests,
} from '@tests/unit/helpers';
import {
  UiAlert,
  UiText,
  UiIcon,
} from '@index';
import type { VueWrapper } from '@vue/test-utils';
import * as alertStoriesImports from './UiAlert.stories';

describe('UiAlert.vue', () => {
  let wrapper: VueWrapper;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const {
    Basic,
    WithoutIcon,
    WithIconSlot,
    WithMessageSlot,
  } = mountStories(UiAlert, alertStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  const getIcon = (story = wrapper) => story.findComponent(UiIcon);
  const getText = (story = wrapper) => story.findComponent(UiText);
  test('render a component', () => {
    const { component } = Basic();
    expect(component.classes('ui-alert')).toBe(true);
  });
  describe('props', () => {
    describe('type', () => {
      test.each([
        'default',
        'success',
        'info',
        'warning',
        'error',
      ] as const)('type %s has correct class', (type) => {
        Basic({ type });
        expect(wrapper.classes(`ui-alert--${type}`)).toBe(true);
      });
      test.each([
        'success',
        'info',
        'warning',
        'error',
      ] as const)('type %s has correct icon', (type) => {
        Basic({ type });
        expect(getIcon().vm.icon).toBe(`${type}-filled`);
      });
    });
    describe('hasIcon', () => {
      test('shouldn\'t render icon when the hasIcon prop is set to false', () => {
        WithoutIcon();
        expect(getIcon().exists()).toBe(false);
      });
      test('should render icon when the hasIcon prop is set to true', () => {
        WithoutIcon({ hasIcon: true });
        expect(getIcon().exists()).toBe(true);
      });
    });
  });
  describe('slots', () => {
    describe('default slot', () => {
      test('render a content via default slot', () => {
        const { args: { content } } = Basic();
        expect(wrapper.html()).toContain(content);
      });
    });
    getSlotTests([
      {
        slot: 'icon',
        story: WithIconSlot({
          iconAlertAttrs: {
            id: 'test-id',
            'data-testid': 'icon-element',
            class: 'test-class',
            icon: 'no',
          },
        }),
        content: getIcon,
        expectedBinding: ({ iconAlertAttrs }) => iconAlertAttrs,
      },
      {
        slot: 'message',
        story: WithMessageSlot({
          textMessageAttrs: {
            id: 'test-id',
            'data-testid': 'label-element',
            class: 'test-label',
            tag: 'p',
          },
        }),
        content: getText,
        expectedBinding: ({ textMessageAttrs }) => textMessageAttrs,
      },
    ]);
  });
});
