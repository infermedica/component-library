import { mount } from '@vue/test-utils';
import { scrollTabindex } from './index.js';

// scrollHeight isn't available in test environment
Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
  value: 0,
  writable: true,
});
// clientHeight isn't available in test environment
Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
  value: 0,
  writable: true,
});

let wrapper;
let elementDiv;
const Component = {
  template: '<div v-scroll-tabindex></div>',
};
const options = {
  global: {
    directives: {
      scrollTabindex,
    },
  },
};
beforeEach(() => {
  wrapper = mount(Component, options);
  elementDiv = wrapper.findComponent(Component).element;
  elementDiv.setAttribute('tabindex', '0');
});

describe('directive/scrollTabindex', () => {
  test('remove tabindex if scrollHeight is lower than clientHeight', async () => {
    elementDiv.scrollHeight = 1;
    elementDiv.clientHeight = 2;
    global.dispatchEvent(new Event('resize'));
    expect(elementDiv.getAttribute('tabindex')).toBe(null);
  });
  test('adding tabindex if scrollHeight changed', async () => {
    elementDiv.scrollHeight = 1;
    elementDiv.clientHeight = 2;
    global.dispatchEvent(new Event('resize'));
    elementDiv.scrollHeight = 3;
    global.dispatchEvent(new Event('resize'));
    expect(elementDiv.getAttribute('tabindex')).toBe('0');
  });
  test('remove tabindex if clientHeight changed', async () => {
    elementDiv.scrollHeight = 2;
    elementDiv.clientHeight = 1;
    global.dispatchEvent(new Event('resize'));
    elementDiv.clientHeight = 3;
    global.dispatchEvent(new Event('resize'));
    expect(elementDiv.getAttribute('tabindex')).toBe(null);
  });
  test('remove tabindex if scrollHeight equals clientHeight', async () => {
    elementDiv.scrollHeight = 1;
    elementDiv.clientHeight = 1;
    global.dispatchEvent(new Event('resize'));
    expect(elementDiv.getAttribute('tabindex')).toBe(null);
  });
  test('add tabindex if scrollHeight is greater than clientHeight', async () => {
    elementDiv.removeAttribute('tabindex');
    elementDiv.scrollHeight = 2;
    elementDiv.clientHeight = 1;
    global.dispatchEvent(new Event('resize'));
    expect(elementDiv.getAttribute('tabindex')).toBe('0');
  });
});
