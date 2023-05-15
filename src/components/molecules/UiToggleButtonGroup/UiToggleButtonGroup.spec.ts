import {
  mountStories,
  getEmitTests,
  getSlotTests,
} from '@tests/unit/helpers';
import {
  UiButton,
  UiToggleButtonGroup,
} from '@index';
import UiToggleButton from '@/components/molecules/UiToggleButtonGroup/_internal/UiToggleButton.vue';
import type { ToggleButtonRenderItemComplex } from '@index';
import type { VueWrapper } from '@vue/test-utils';
import type { Component } from 'vue';
import * as toggleButtonGroupStoriesImports from './UiToggleButtonGroup.stories';

describe('UiToggleButtonGroup.vue', () => {
  let wrapper: VueWrapper;
  const {
    complexItemsData,
    stringItemsData,
    ...storiesImport
  } = toggleButtonGroupStoriesImports;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const {
    Basic,
    Deselectable,
    WithStringValue,
    WithNumberValue,
    WithObjectValue,
    WithToggleButtonSlot,
    WithDefaultSlot,
  } = mountStories(UiToggleButtonGroup, storiesImport, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  const getButton = (story = wrapper) => story.findComponent(UiButton);
  const getItem = (story = wrapper) => story.findComponent(UiToggleButton as Component);
  const getAllButtons = (story = wrapper) => story.findAllComponents(UiButton);
  const clickButton = (story = wrapper) => getButton(story).trigger('click');
  const getEmittedValue = (component: VueWrapper) => component.emitted('update:modelValue')?.at(0)?.at(0);
  test('render a component', () => {
    const { component } = Basic();
    expect(component.classes('ui-toggle-button-group')).toBe(true);
  });
  describe('props', () => {
    describe('deselectable', () => {
      test('should emit undefined value when the deselectable prop is set to true', async () => {
        const { component } = Deselectable();
        await clickButton();
        expect(getEmittedValue(component)).toBe(undefined);
      });
      test('shouldn\'t emit update:modelValue when the disabled prop is set to false', async () => {
        const { component } = Deselectable({ deselectable: false });
        await clickButton();
        expect(component.emitted('update:modelValue')).toBeFalsy();
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
          expected: stringItemsData[0],
        },
        {
          name: 'emit correct value for a number type value',
          story: WithNumberValue(),
          action: clickButton,
          expected: ({ items }) => items?.at(0),
        },
        {
          name: 'emit correct value for a object type value',
          story: WithObjectValue(),
          action: clickButton,
          expected: complexItemsData[0].value,
        },
        {
          name: 'emit correct value with deselectable prop set to true',
          story: Deselectable({ modelValue: 'specialist' }),
          action: clickButton,
          expected: complexItemsData[0].value,
        },
        {
          name: 'emit undefined value when unselect with deselectable prop set to true',
          story: Deselectable(),
          action: clickButton,
          expected: undefined,
        },
      ],
    );
  });
  describe('slots', () => {
    describe('default slot', () => {
      test('render a content via default slot', () => {
        WithDefaultSlot();
        expect(getAllButtons().length).toBe(3);
      });
    });
    getSlotTests([ {
      slot: 'toggle-button-0',
      story: WithToggleButtonSlot({
        items: complexItemsData.map((item) => ({
          ...item,
          class: 'ui-button--small',
          'aria-checked': true,
          role: 'radio',
        })),
      }),
      content: getItem,
      expectedBinding: ({ items }) => (
        items as ToggleButtonRenderItemComplex[])?.map(({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        name, text, value, ...attrs
      }) => attrs)[0],
    } ]);
  });
});
