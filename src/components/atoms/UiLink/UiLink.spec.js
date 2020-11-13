import { mount } from '@vue/test-utils';
import UiLink from './UiLink.vue';

describe('UiLink.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiLink);
    expect(wrapper.classes('ui-link')).toBe(true);
  });
  test('component is router-link when you put to', () => {
    const wrapper = mount(UiLink, {
      props: {
        to: '/symptom-checker',
      },
    });
    expect(wrapper.element.tagName).toBe('ROUTER-LINK');
  });
  test('component is link when you put href', () => {
    const wrapper = mount(UiLink, {
      props: {
        href: '/symptom-checker',
      },
    });
    expect(wrapper.element.tagName).toBe('A');
  });
  test('component isn\'t link when you put tag', () => {
    const wrapper = mount(UiLink, {
      props: {
        tag: 'span',
      },
    });
    expect(wrapper.element.tagName).toBe('SPAN');
  });
  test('component hasn\'t link attrs when you put tag', () => {
    const wrapper = mount(UiLink, {
      props: {
        tag: 'span',
      },
    });
    const links = ['to', 'href'];
    const attributes = Object.keys(wrapper.attributes());
    expect(attributes.some((attribute) => links.includes(attribute))).toBe(false);
  });
});
