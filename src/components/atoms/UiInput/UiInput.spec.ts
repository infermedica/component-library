import {
  mountStories,
  getEmitTests,
  getSlotTests,
} from '@tests/unit/helpers';
import {
  UiInput,
  UiText,
} from '@index';
import type {
  DOMWrapper,
  VueWrapper,
} from '@vue/test-utils';
import * as inputStoriesImports from './UiInput.stories';

describe('UiInput.vue', () => {
  let wrapper: VueWrapper;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const {
    Basic,
    WithSuffix,
    WithInputSlot,
    WithAsideSlot,
  } = mountStories(UiInput, inputStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  const getInput = (story = wrapper): DOMWrapper<HTMLInputElement> => story.find('[data-testid="input-element"]');
  const getText = (story = wrapper) => story.findComponent(UiText);
  const setInputValue = async (story = wrapper, value = 'test-value') => {
    await getInput(story).setValue(value);
  };
  const getEmittedValue = (component: VueWrapper) => component.emitted('update:modelValue')?.at(0)?.at(0);
  test('render a component', () => {
    Basic();
    expect(wrapper.classes('ui-input')).toBe(true);
  });
  describe('props', () => {
    describe('placeholder', () => {
      test('render component with placeholder', () => {
        const { args: { placeholder } } = Basic();
        expect(getInput().element.placeholder).toBe(placeholder);
      });
    });
    describe('disabled', () => {
      test('should emit update:modelValue when the disabled prop is set to false', async () => {
        const { component } = Basic();
        await setInputValue();
        expect(getEmittedValue(component)).toBeTruthy();
      });
      test('shouldn\'t emit update:modelValue when the disabled prop is set to true', async () => {
        const { component } = Basic({ disabled: true });
        await setInputValue();
        expect(getEmittedValue(component)).toBeFalsy();
      });
    });
    describe('type', () => {
      test('a number input cant accept non-numerical value', async () => {
        const { component } = WithSuffix();
        await setInputValue();
        await getInput().trigger('keydown');
        expect(getEmittedValue(component)).toBeFalsy();
      });
    });
    describe('suffix', () => {
      test('render the suffix when the "suffix" prop is passed', async () => {
        const { args: { suffix } } = WithSuffix();
        expect(getText().html()).toContain(suffix);
      });
      test('doesn\'t render the suffix when the "suffix" prop isn\'t passed', async () => {
        WithSuffix({ suffix: '' });
        expect(getText().exists()).toBeFalsy();
      });
    });
  });
  describe('emits', () => {
    getEmitTests(
      'update:modelValue',
      [
        {
          name: 'emit correct value',
          story: Basic(),
          action: setInputValue,
          expected: 'test-value',
        },
        {
          name: 'emit correct value with passed "type" prop as number',
          story: WithSuffix(),
          action: (story) => setInputValue(story, '180'),
          expected: '180',
        },
      ],
    );
  });
  describe('slots', () => {
    getSlotTests([
      {
        slot: 'input',
        story: WithInputSlot({
          inputAttrs: {
            id: 'test-id',
            'data-testid': 'input-element',
            class: 'ui-input__input',
          },
        }),
        content: getInput,
        expectedBinding: ({ inputAttrs }) => inputAttrs,
      },
      {
        slot: 'aside',
        story: WithAsideSlot({
          textSuffixAttrs: {
            id: 'test-id',
            'data-testid': 'aside-element',
            class: 'ui-checkbox__aside',
            tag: 'p',
          },
        }),
        content: getText,
        expectedBinding: ({ textSuffixAttrs }) => textSuffixAttrs,
      },
    ]);
  });
});
