import { mount } from '@vue/test-utils';
import { keyboardFocus } from './index';

let wrapper;
let button;
const Component = {
  template: '<button v-keyboard-focus></button>',
};
const options = {
  attachTo: 'body',
  global: {
    directives: {
      keyboardFocus,
    },
  },
};
beforeEach(() => {
  wrapper = mount(Component, options);
  button = wrapper.findComponent(Component);
  document.body.classList = [];
});

describe('directive/keyboardFocus', () => {
  test('remove class focus-hidden from body when press tab', async () => {
    await button.trigger('keyup', { code: 'Tab' });
    expect(document.body.classList.contains('focus-hidden')).toBe(false);
  });
  test('does not remove class focus-hidden from body when press other key than tab', async () => {
    await button.trigger('keyup', { code: 'Slash' });
    expect(document.body.classList.contains('focus-hidden')).toBe(false);
  });
  test('focus element when press tab', async () => {
    await button.trigger('keyup', { code: 'Tab' });
    expect(document.activeElement).toBe(button.element);
  });
  test('add class focus-hidden to body on mouse click', async () => {
    await button.trigger('mousedown');
    expect(document.body.classList.contains('focus-hidden')).toBe(true);
  });
});
