import { mount } from '@vue/test-utils';
import { focusTrap } from './index';

// allows to skip checking if the element is hidden in getFocusableElements.js because offsetParent isn't available in test environment
Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
  get() { return 0; },
});

let wrapper;
let firstChild;
let lastChild;
const Component = {
  template: '<div v-focus-trap><input data-testid="first-input"/><input data-testid="second-input"><input data-testid="last-input"/></div><input data-testid="outside-input"/>',
};
const options = {
  attachTo: 'body',
  global: {
    directives: {
      focusTrap,
    },
  },
};
beforeEach(async () => {
  wrapper = await mount(Component, options);
  firstChild = wrapper.find('[data-testid="first-input"');
  lastChild = wrapper.find('[data-testid="last-input"');
});

describe('directive/focusTrap', () => {
  test('focus state goes from last child to first child when press Tab', async () => {
    await lastChild.trigger('keydown', { key: 'Tab' });
    expect(document.activeElement).toBe(firstChild.element);
  });
  test('focus state goes from first child to last child when press Tab + Shift', async () => {
    await firstChild.trigger('keydown', { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(lastChild.element);
  });
});
