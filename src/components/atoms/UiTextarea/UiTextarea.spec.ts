import {
  getEmitTests,
  mountStories,
} from '@tests/unit/helpers';
import {
  UiTextarea,
  type TextareaProps,
} from '@index';
import type {
  DOMWrapper,
  VueWrapper,
} from '@vue/test-utils';
import * as textareaStoriesImports from './UiTextarea.stories';

describe('UiTextarea.vue', () => {
  let wrapper: VueWrapper;
  const setWrapper = (storyWrapper: VueWrapper) => {
    wrapper = storyWrapper;
  };
  const {
    Basic, Empty,
  } = mountStories(UiTextarea, textareaStoriesImports, setWrapper);
  afterEach(() => {
    wrapper.unmount();
  });
  const getTextarea = (story = wrapper): DOMWrapper<HTMLTextAreaElement> => story.find('[data-testid="textarea-element"]');
  const setTextareaValue = (story = wrapper, value = 'test-value') => getTextarea(story).setValue(value);
  const getEmittedValue = (component: VueWrapper) => component.emitted('update:modelValue')?.at(0)?.at(0);
  const getResizeValue = (story = wrapper) => getTextarea(story).element.style.resize;
  test('renders a component', () => {
    Basic();
    expect(wrapper.classes('ui-textarea')).toBe(true);
  });
  describe('props', () => {
    describe('placeholder', () => {
      test('textarea element has correct placeholder', () => {
        const { args: { placeholder } } = Empty();
        expect(getTextarea().element.placeholder).toBe(placeholder);
      });
    });
    describe('disabled', () => {
      test('should emit update:modelValue when the "disabled" prop is set to false', async () => {
        const { component } = Basic();
        await setTextareaValue();
        expect(getEmittedValue(component)).toBeTruthy();
      });
      test('shouldn\'t emit update:modelValue when the "disabled" prop is set to true', async () => {
        const { component } = Basic({ disabled: true });
        await setTextareaValue();
        expect(getEmittedValue(component)).toBeFalsy();
      });
    });
    describe('resize', () => {
      test.each([
        [
          false,
          'none',
        ],
        [
          true,
          'both',
        ],
        [
          'vertical' as const,
          'vertical',
        ],
        [
          'horizontal' as const,
          'horizontal',
        ],
      ])('with %s "resize" prop  sets textarea element resize value to %s', (value: TextareaProps['resize'], expected) => {
        Basic({ resize: value });
        expect(getResizeValue()).toEqual(expected);
      });
    });
  });
  describe('emits', () => {
    getEmitTests(
      'update:modelValue',
      [ {
        name: 'emit correct value',
        story: Basic(),
        action: setTextareaValue,
        expected: 'test-value',
      } ],
    );
  });
});
