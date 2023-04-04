import {
  mountStories,
  getEmitTests,
  getSlotTests,
} from '@unit/helpers';
import {
  UiCheckbox,
  UiText,
  UiIcon,
} from '@index';
import type { VueWrapper } from '@vue/test-utils';
import * as checkboxStoriesImports from './UiCheckbox.stories';

describe('UiCheckbox.vue', () => {
  let wrapper: VueWrapper;
  const {
    complexItemsData,
    stringItemsData,
    ...storiesImport
  } = checkboxStoriesImports;
  const {
    Basic,
    WithStringValue,
    WithObjectValue,
    AsGroupWithObjectValue,
    AsGroupWithStringValue,
    WithCheckmarkSlot,
    WithCheckboxSlot,
    WithLabelSlot,
  } = mountStories(UiCheckbox, storiesImport, (storyWrapper) => {
    wrapper = storyWrapper;
  });
  afterEach(() => {
    wrapper.unmount();
  });

  const getInput = (story = wrapper) => story.find('[data-testid="input-element"]');
  const toggleInput = (story = wrapper, value = true) => getInput(story).setValue(value);
  const setChecked = (story?: VueWrapper) => toggleInput(story);
  const setUnchecked = (story?: VueWrapper) => toggleInput(story, false);
  const getIcon = (story = wrapper) => story.findComponent(UiIcon);
  const getText = (story = wrapper) => story.findComponent(UiText);
  const hasEmittedValue = (component: VueWrapper) => component.emitted('update:modelValue');

  test('render a component', () => {
    const { component } = Basic();
    expect(component.classes('ui-checkbox')).toBe(true);
  });
  describe('props', () => {
    describe('id', () => {
      test('render default id for input element', () => {
        Basic();
        expect(getInput().attributes('id')).toContain('checkbox-');
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
          expected: ({ modelValue }) => !modelValue,
        },
        {
          name: 'emit correct value for a object type value',
          story: WithObjectValue(),
          action: setChecked,
          expected: ({ modelValue }) => !modelValue,
        },
        {
          name: 'emit correct value for a string type value and modelValue as array',
          story: AsGroupWithStringValue(),
          action: setChecked,
          expected: ({ items }) => [ items?.at(0) ],
        },
        {
          story: AsGroupWithObjectValue(),
          name: 'emit correct value for a object type value and modelValue as array',
          action: setChecked,
          expected: ({ items }) => [ items?.at(0) ],
        },
        {
          name: 'emit correct value when unchecked for a string type value and modelValue as array',
          story: AsGroupWithStringValue({ modelValue: stringItemsData }),
          action: setUnchecked,
          expected: ({ items }) => [
            items?.at(1),
            items?.at(2),
          ],
        },
        {
          name: 'emit correct value when unchecked for a object type value and modelValue as array',
          story: AsGroupWithObjectValue({ modelValue: complexItemsData }),
          action: setUnchecked,
          expected: ({ items }) => [
            items?.at(1),
            items?.at(2),
          ],
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
        slot: 'checkmark',
        story: WithCheckmarkSlot(),
        content: getIcon,
        expectedBinding: ({ iconCheckmarkAttrs }) => iconCheckmarkAttrs,
      },
      {
        slot: 'checkbox',
        story: WithCheckboxSlot(),
        content: getIcon,
        expectedBinding: ({ iconCheckmarkAttrs }) => iconCheckmarkAttrs,
      },
      {
        slot: 'label',
        story: WithLabelSlot(),
        content: getText,
        expectedBinding: ({ textLabelAttrs }) => textLabelAttrs,
      },
    ]);
  });
});
