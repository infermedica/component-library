import { mount } from '@vue/test-utils';
import UiBulletPoints from './UiBulletPoints.vue';

describe('UiBulletPoints.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiBulletPoints);
    expect(wrapper.classes('ui-bullet-points')).toBe(true);
  });
  test('component pass tag props', () => {
    const wrapper = mount(UiBulletPoints, {
      props: {
        tag: 'ol',
      },
    });
    expect(wrapper.find('ol').exists()).toBe(true);
  });
  test('component pass type props', () => {
    const wrapper = mount(UiBulletPoints, {
      props: {
        tag: 'ol',
        type: 'a',
      },
    });
    expect(getComputedStyle(wrapper.find('ol').element).getPropertyValue('--_list-style-type')).toBe('lower-latin');
  });
});
