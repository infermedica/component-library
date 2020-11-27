import { shallowMount } from '@vue/test-utils';
import UiHeading from './UiHeading.vue';

describe('UiHeading.vue', () => {
  test('renders a component', () => {
    const wrapper = shallowMount(UiHeading);
    expect(wrapper.classes('ui-heading')).toBe(true);
  });
  test('renders an h2 element by default', () => {
    const wrapper = shallowMount(UiHeading);
    expect(wrapper.find('h2').exists()).toBe(true);
  });
  test('renders heading corresponding to selected level', () => {
    const wrapper = shallowMount(UiHeading, {
      props: {
        level: '4',
      },
    });
    expect(wrapper.find('h4').exists()).toBe(true);
  });
  test('renders heading tag provided by tag prop', () => {
    const wrapper = shallowMount(UiHeading, {
      props: {
        tag: 'span',
      },
    });
    expect(wrapper.find('span').exists()).toBe(true);
  });
  test('renders different styles for an element when special class is provided', () => {
    const wrapper = shallowMount(UiHeading, {
      props: {
        level: '4',
      },
      attrs: {
        class: 'h2',
      },
    });
    const h4 = wrapper.find('h4');
    expect(h4.exists()).toBe(true);
    expect(h4.classes().includes('h2')).toBe(true);
  });
});
