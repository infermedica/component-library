import { mount } from '@vue/test-utils';
import { bodyScrollLock } from './index.js';

const Component = {
  template: '<dialog v-body-scroll-lock></dialog>',
};
const options = {
  global: {
    directives: {
      bodyScrollLock,
    },
  },
};

describe('directive/bodyScrollLock', () => {
  test('add style overflow hidden to body', async () => {
    await mount(Component, options);
    expect(document.body.style.overflow).toBe('hidden');
  });
});
