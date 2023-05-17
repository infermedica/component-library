import {
  mountStories,
  getEmitTests,
  getSlotTests,
} from '@tests/unit/helpers';
import {
  UiTile,
  UiText,
  UiIcon,
} from '@index';
import type { VueWrapper } from '@vue/test-utils';
import * as tileStoriesImports from './UiTile.stories';

describe('UiTile.vue', () => {
  let wrapper: VueWrapper;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const {
    Basic,
    WithStringValue,
    WithObjectValue,
    WithIconSlot,
    WithLabelSlot,
  } = mountStories(UiTile, tileStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  const getButton = (story = wrapper) => story.find('.ui-tile');
  const clickButton = (story = wrapper) => getButton(story).trigger('click');
  const getIcon = (story = wrapper) => story.findComponent(UiIcon);
  const getText = (story = wrapper) => story.findComponent(UiText);
  test('render a component', () => {
    const { component } = Basic();
    expect(component.classes('ui-tile')).toBe(true);
  });
  describe('props', () => {
    describe('id', () => {
      test('render default id for input element', () => {
        Basic();
        expect(getButton().attributes('id')).toContain('tile-');
      });
      test('render passed id for input element', () => {
        Basic({ id: 'data-testid' });
        expect(getButton().attributes('id')).toBe('data-testid');
      });
    });
    describe('icon', () => {
      test('render correct icon', () => {
        Basic({ icon: 'boy' });
        expect(getIcon().vm.$props.icon).toBe('boy');
      });
    });
    describe('value', () => {
      const data = {
        label: 'Yes',
        value: 'present',
        icon: 'yes',
        id: 's_1922',
        name: 'Heel drop test',
      } as const;
      const dataWithDiff = {
        label: 'Yes',
        value: 'present',
        icon: 'yes',
        id: 's_1980',
        name: 'Heel drop test',
      } as const;
      test('is checked when value and modelValue is equal', () => {
        Basic({
          modelValue: data,
          value: data,
        });
        expect(getButton().classes('ui-tile--is-checked')).toBe(true);
      });
      test('isn\'t checked when value and modelValue isn\'t equal', () => {
        Basic({
          modelValue: dataWithDiff,
          value: data,
        });
        expect(getButton().classes('ui-tile--is-checked')).toBe(false);
      });
    });
  });
  describe('emits', () => {
    getEmitTests(
      'update:modelValue',
      [
        {
          name: 'emit correct value for a string type value',
          story: WithStringValue(),
          action: clickButton,
          expected: ({ value }) => value,
        },
        {
          name: 'emit correct value for a object type value',
          story: WithObjectValue(),
          action: clickButton,
          expected: ({ value }) => value,
        },
      ],
    );
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
          iconAttrs: {
            id: 'test-id',
            'data-testid': 'icon-element',
            class: 'test-class',
            icon: 'no',
          },
        }),
        content: getIcon,
        expectedBinding: ({ iconAttrs }) => iconAttrs,
      },
      {
        slot: 'label',
        story: WithLabelSlot({
          textLabelAttrs: {
            id: 'test-id',
            'data-testid': 'label-element',
            class: 'ui-checkbox__label',
            tag: 'p',
          },
        }),
        content: getText,
        expectedBinding: ({ textLabelAttrs }) => textLabelAttrs,
      },
    ]);
  });
});
