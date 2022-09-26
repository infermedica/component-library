import { mount } from '@vue/test-utils';
import UiMultipleAnswer from './UiMultipleAnswer.vue';
import UiCheckbox from '../../atoms/UiCheckbox/UiCheckbox.vue';
import UiRadio from '../../atoms/UiRadio/UiRadio.vue';

describe('UiMultipleAnswer.vue', () => {
  const choiceErrorClass = '.ui-multiple-answer__choice--has-error';
  const items = [
    {
      name: 'Fatigue',
    },
    {
      name: 'Fever',
    },
    {
      name: 'Nausea',
    },
  ];
  describe('Component with Radioses', () => {
    test('renders a component with radio buttons when modelValue is a string', () => {
      const selected = {
      };
      const wrapper = mount(UiMultipleAnswer, {
        props: {
          modelValue: selected,
          items,
        },
      });
      expect(wrapper.findComponent(UiRadio).exists()).toBe(true);
    });
    test('renders a component with radio buttons when modelValue is an object', () => {
      const selected = {
      };
      const wrapper = mount(UiMultipleAnswer, {
        props: {
          modelValue: selected,
          items,
        },
      });
      expect(wrapper.findComponent(UiRadio).exists()).toBe(true);
    });
    test('renders a component with correct number of radioses', () => {
      const selected = {
      };
      const wrapper = mount(UiMultipleAnswer, {
        props: {
          modelValue: selected,
          items,
        },
      });
      expect(wrapper.findAllComponents(UiRadio).length).toBe(items.length);
    });
    test('renders a component and radioses with error styles when invalid and touched prop is true', () => {
      const radioErrorClass = '.ui-radio--has-error';
      const selected = {
      };
      const wrapper = mount(UiMultipleAnswer, {
        props: {
          modelValue: selected,
          invalid: true,
          touched: true,
          items,
        },
      });
      expect(wrapper.find(choiceErrorClass).exists()).toBe(true);
      expect(wrapper.find(radioErrorClass).exists()).toBe(true);
      expect(wrapper.findAll(choiceErrorClass).length).toBe(items.length);
      expect(wrapper.findAll(radioErrorClass).length).toBe(items.length);
    });
    test('renders a component and radioses with error styles when invalid prop is false and touched prop is true', () => {
      const radioErrorClass = '.ui-radio--has-error';
      const selected = {
      };
      const wrapper = mount(UiMultipleAnswer, {
        props: {
          modelValue: selected,
          invalid: false,
          touched: true,
          items,
        },
      });
      expect(wrapper.find(choiceErrorClass).exists()).toBe(true);
      expect(wrapper.find(radioErrorClass).exists()).toBe(true);
      expect(wrapper.findAll(choiceErrorClass).length).toBe(items.length);
      expect(wrapper.findAll(radioErrorClass).length).toBe(items.length);
    });
  });
  describe('Component with Checkboxes', () => {
    test('renders a component with checkboxes when modelValue is an array', () => {
      const selected = [];
      const wrapper = mount(UiMultipleAnswer, {
        props: {
          modelValue: selected,
          items,
        },
      });
      expect(wrapper.findComponent(UiCheckbox).exists()).toBe(true);
    });
    test('renders a component correct number of checkboxes', () => {
      const selected = [];
      const wrapper = mount(UiMultipleAnswer, {
        props: {
          modelValue: selected,
          items,
        },
      });
      expect(wrapper.findAllComponents(UiCheckbox).length).toBe(items.length);
    });
    test('renders a component and checkboxes with error styles when invalid and touched prop is true', () => {
      const radioErrorClass = '.ui-radio--has-error';
      const selected = {
      };
      const wrapper = mount(UiMultipleAnswer, {
        props: {
          modelValue: selected,
          invalid: true,
          touched: true,
          items,
        },
      });
      expect(wrapper.find(choiceErrorClass).exists()).toBe(true);
      expect(wrapper.find(radioErrorClass).exists()).toBe(true);
      expect(wrapper.findAll(choiceErrorClass).length).toBe(items.length);
      expect(wrapper.findAll(radioErrorClass).length).toBe(items.length);
    });
    test('renders a component and checkboxes with error styles when invalid prop is false and touched prop is true', () => {
      const checkboxErrorClass = '.ui-checkbox--has-error';
      const selected = [];
      const wrapper = mount(UiMultipleAnswer, {
        props: {
          modelValue: selected,
          invalid: false,
          touched: true,
          items,
        },
      });
      expect(wrapper.find(choiceErrorClass).exists()).toBe(true);
      expect(wrapper.find(checkboxErrorClass).exists()).toBe(true);
      expect(wrapper.findAll(choiceErrorClass).length).toBe(items.length);
      expect(wrapper.findAll(checkboxErrorClass).length).toBe(items.length);
    });
  });
});
