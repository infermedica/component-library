import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { bodyScrollLock } from './index';

const Component = { template: '<dialog v-body-scroll-lock></dialog>' };
const mountOptions = (isDirective) => ({
  data() {
    return { arg: isDirective };
  },
  global: { directives: { bodyScrollLock } },
});

describe('directive/bodyScrollLock', () => {
  test('The directive add styles to body', async () => {
    mount(Component, mountOptions(undefined));
    await nextTick();
    expect(document.body.style.overflow).toBe('hidden');
  });
  test('The directive removes body styles before the component unmounts', async () => {
    const wrapper = mount(Component, mountOptions(true));
    expect(document.body.style.overflow).toBe('hidden');
    wrapper.unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
