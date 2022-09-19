import { mount } from '@vue/test-utils';
import { focusFirst } from './index';

// allows to skip checking if the element is hidden in getFocusableElements.js because offsetParent isn't available in test environment
Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
  get() { return 0; },
});

const options = {
  attachTo: 'body',
  global: {
    directives: {
      focusFirst,
    },
  },
};

describe('directive/focusFirst', () => {
  test('do nothing when element does not have focusable element', async () => {
    const Component = {
      template: '<div v-focus-first><p></p></div>',
    };
    await mount(Component, options);
    expect(document.activeElement).toBe(document.body);
  });
  test('focus first focusable child element', async () => {
    const Component = {
      template: '<div v-focus-first><p></p><textarea data-testid="focused-textarea"/><input/></div>',
    };
    const wrapper = await mount(Component, options);
    const textarea = wrapper.find('[data-testid="focused-textarea"]');
    expect(document.activeElement).toBe(textarea.element);
  });
  test('focus first focusable and not disabled child element', async () => {
    const Component = {
      template: '<div v-focus-first><p></p><textarea disabled/><input data-testid="focused-input"/></div>',
    };
    const wrapper = await mount(Component, options);
    const input = wrapper.find('[data-testid="focused-input"]');
    expect(document.activeElement).toBe(input.element);
  });
  test('focus first child with tabindex', async () => {
    const Component = {
      template: '<div v-focus-first><p data-testid="focused-p" tabindex="0"></p><input/></div>',
    };
    const wrapper = await mount(Component, options);
    const elementP = wrapper.find('[data-testid="focused-p"]');
    expect(document.activeElement).toBe(elementP.element);
  });
});
