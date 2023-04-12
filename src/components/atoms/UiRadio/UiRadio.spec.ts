import {
  mountStories,
  getEmitTests,
  getSlotTests,
} from '@tests/unit/helpers';
import {
  UiRadio,
  UiText,
} from '@index';
import type { VueWrapper } from '@vue/test-utils';
import * as checkboxStoriesImports from './UiRadio.stories';

describe('UiRadio.vue', () => {
  let wrapper: VueWrapper;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const {
    Basic,
    WithStringValue,
    WithObjectValue,
    WithRadioSlot,
    WithLabelSlot,
  } = mountStories(UiRadio, checkboxStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  const getInput = (story = wrapper) => story.find('[data-testid="input-element"]');
  const getRadio = (story = wrapper) => story.find('.ui-radio__radio');
  const toggleInput = (story = wrapper, value = true) => getInput(story).setValue(value);
  const setChecked = (story?: VueWrapper) => toggleInput(story);
  const getText = (story = wrapper) => story.findComponent(UiText);
  const hasEmittedValue = (component: VueWrapper) => component.emitted('update:modelValue');
  test('render a component', () => {
    const { component } = Basic();
    expect(component.classes('ui-radio')).toBe(true);
  });
  describe('props', () => {
    describe('id', () => {
      test('render default id for input element', () => {
        Basic();
        expect(getInput().attributes('id')).toContain('radio-');
      });
      test('render passed id for input element', () => {
        Basic({ id: 'data-testid' });
        expect(getInput().attributes('id')).toBe('data-testid');
      });
    });
    describe('disabled', () => {
      test('should emit update:modelValue when the disabled prop is set to false', async () => {
        const { component } = Basic();
        await toggleInput();
        expect(hasEmittedValue(component)).toBeTruthy();
      });
      test('shouldn\'t emit update:modelValue when the disabled prop is set to true', async () => {
        const { component } = Basic({ disabled: true });
        await toggleInput();
        expect(hasEmittedValue(component)).toBeFalsy();
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
          action: setChecked,
          expected: ({ value }) => value,
        },
        {
          name: 'emit correct value for a object type value',
          story: WithObjectValue(),
          action: setChecked,
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
        slot: 'radio',
        story: WithRadioSlot({
          radioElementAttrs: {
            id: 'test-id',
            'data-testid': 'icon-element',
            class: 'test-class',
            icon: 'no',
          },
        }),
        content: getRadio,
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
