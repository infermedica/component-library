import { mount } from '@vue/test-utils';
import { keyboardFocus } from './index';

const Component = { template: '<button v-keyboard-focus></button>' };
const codesTriggeringFocus = [
  'Tab',
  'ArrowDown',
  'ArrowUp',
  'ArrowLeft',
  'ArrowRight',
  'Space',
  'Enter',
];
const options = {
  attachTo: 'body',
  global: { directives: { keyboardFocus } },
};

function mountComponent() {
  return mount(Component, options);
}

describe('directive/keyboardFocus', () => {
  let wrapper: ReturnType<typeof mountComponent>;

  beforeEach(() => {
    wrapper = mountComponent();
    const classList = document.body.classList;
    classList.remove(...Array.from(classList.values()));
  });

  test.each(codesTriggeringFocus)('removes class focus-hidden from the body when %s is pressed', async (key) => {
    await wrapper.trigger('keyup', { code: key });
    expect(document.body.classList.contains('focus-hidden')).toBe(false);
  });
  test.each(codesTriggeringFocus)('focuses on element when %s is pressed', async (key) => {
    await wrapper.trigger('keyup', { code: key });
    expect(document.activeElement).toBe(wrapper.element);
  });
  test('does not remove class focus-hidden from the body element when presses other key than tab', async () => {
    await wrapper.trigger('keyup', { code: 'Slash' });
    expect(document.body.classList.contains('focus-hidden')).toBe(false);
  });
  test('adds class focus-hidden to the body on mouse click', async () => {
    await wrapper.trigger('mousedown');
    expect(document.body.classList.contains('focus-hidden')).toBe(true);
  });
});
