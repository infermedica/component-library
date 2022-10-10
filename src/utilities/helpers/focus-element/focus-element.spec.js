import { mount } from '@vue/test-utils';
import { focusElement } from './index';

let wrapper;
let button;
const Component = { template: '<button></button>' };
const options = { attachTo: 'body' };
beforeEach(() => {
  wrapper = mount(Component, options);
  button = wrapper.findComponent(Component);
  document.body.classList = [];
});

describe('helpers/focusElement', () => {
  test('focus element', async () => {
    await focusElement(button.element);
    expect(document.activeElement).toBe(button.element);
  });
  test('focus element with visible focus', async () => {
    await focusElement(button.element, true);
    expect(document.body.classList.contains('focus-hidden')).toBe(false);
  });
});
