import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import useAttributes from './index';

let Component;
beforeEach(() => {
  Component = {
    inheritAttrs: false,
    setup() {
      const {
        attrs, listeners,
      } = useAttributes();
      return {
        attrs,
        listeners,
      };
    },
    template: '<div/>',
  };
});

describe('composable/useAttributes', () => {
  test('attrs do not contain listeners', () => {
    const props = {
      class: 'test-class',
      style: 'width: 0',
      onFocus: vi.fn,
      onBlur: vi.fn,
    };
    const output = {
      class: 'test-class',
      style: 'width: 0',
    };
    const wrapper = mount(Component, { props });
    expect(wrapper.vm.attrs).toStrictEqual(output);
  });
  test('attrs is reactive', async () => {
    const props = { class: '' };
    const wrapper = mount(Component, { props });
    expect(wrapper.vm.attrs.class).toEqual('');
    wrapper.setProps({ class: 'test-class' });
    await nextTick();
    expect(wrapper.vm.attrs.class).toEqual('test-class');
  });
  test('listeners contain only listeners', () => {
    const props = {
      class: 'test-class',
      style: 'width: 0',
      onFocus: vi.fn,
      onBlur: vi.fn,
    };
    const output = {
      onFocus: vi.fn,
      onBlur: vi.fn,
    };
    const wrapper = mount(Component, { props });
    expect(wrapper.vm.listeners).toStrictEqual(output);
  });
  test('listeners is reactive', async () => {
    const props = { onClick: vi.fn() };
    const wrapper = mount(Component, { props });
    console.log(wrapper.vm.listeners);
    expect(wrapper.vm.listeners).toHaveProperty('onClick');

    wrapper.setProps({ onFocus: vi.fn() });
    await nextTick();
    expect(wrapper.vm.listeners).toHaveProperty('onFocus');
  });
});
