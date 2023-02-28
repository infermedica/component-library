import { mount } from '@vue/test-utils';
import { clickOutside } from './index';

let options;
let handler;
let Component;
beforeEach(() => {
  handler = vi.fn();
  Component = {
    template: `<div
      data-testid="root-element"
      v-click-outside="handler"
    >
      <button data-testid="inside-button"/>
    </div>
    <button data-testid="outside-button"/>`,
    methods: { handler },
  };
  options = {
    attachTo: 'body',
    global: { directives: { clickOutside } },
  };
});

describe('directive/clickOutside', () => {
  test('handler function is called when click outside', async () => {
    const wrapper = mount(Component, options);
    const button = wrapper.find('[data-testid="outside-button"]');
    await button.trigger('click');
    expect(handler).toHaveBeenCalled();
  });
  test('handler function is not called when click root element', async () => {
    const wrapper = mount(Component, options);
    const div = wrapper.find('[data-testid="root-element"]');
    await div.trigger('click');
    expect(handler).not.toHaveBeenCalled();
  });
  test('handler function is not called when click inside', async () => {
    const wrapper = mount(Component, options);
    const button = wrapper.find('[data-testid="inside-button"]');
    await button.trigger('click');
    expect(handler).not.toHaveBeenCalled();
  });
  test('adding false isActive parameter disables the directive', async () => {
    Component.template = '<div v-click-outside="{ handler, isActive: false }"/><button data-testid="outside-button"/>';
    const wrapper = mount(Component, options);
    const button = wrapper.find('[data-testid="outside-button"]');
    await button.trigger('click');
    expect(handler).not.toHaveBeenCalled();
  });
  test('handler function is called when isActive parameter is undefined', async () => {
    Component.template = '<div v-click-outside="{ handler, isActive: undefined }"/><button data-testid="outside-button"/>';
    const wrapper = mount(Component, options);
    const button = wrapper.find('[data-testid="outside-button"]');
    await button.trigger('click');
    expect(handler).toHaveBeenCalled();
  });
  test('reactivity of isActive parameter', async () => {
    Component.template = '<div v-click-outside="{ handler, isActive }"/><button data-testid="outside-button"/>';
    const wrapper = mount(Component, {
      ...options,
      data() {
        return { isActive: false };
      },
    });
    const button = wrapper.find('[data-testid="outside-button"]');
    await button.trigger('click');
    expect(handler).not.toHaveBeenCalled();
    await wrapper.setData({ isActive: true });
    await button.trigger('click');
    expect(handler).toHaveBeenCalled();
    await wrapper.setData({ isActive: false });
    await button.trigger('click');
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
