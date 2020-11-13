import { mount } from '@vue/test-utils';
import UiIcon from './UiIcon.vue';

describe('UiIcon.vue', () => {
  const chevronLeftIconPaths = [
    { d: 'M28 12l2.828 2.828L21.656 24l9.172 9.172L28 36 16 24zm0 0' },
  ];

  test('renders a component', () => {
    const wrapper = mount(UiIcon);
    expect(wrapper.classes('ui-icon')).toBe(true);
  });
  test('handle empty icon props', () => {
    const wrapper = mount(UiIcon);
    expect(wrapper.vm.paths).toStrictEqual([]);
  });
  test('renders a component by icon prop', () => {
    const wrapper = mount(UiIcon, {
      props: {
        icon: 'search',
      },
    });

    expect(wrapper.classes('ui-icon')).toBe(true);
  });
  test('component rendered by icon matches its paths', () => {
    const wrapper = mount(UiIcon, {
      props: {
        icon: 'chevronLeft',
      },
    });

    expect(wrapper.classes('ui-icon')).toBe(true);
    expect(wrapper.vm.paths).toStrictEqual(chevronLeftIconPaths);
  });
  test('component rendered by paths matches its paths', () => {
    const wrapper = mount(UiIcon, {
      props: {
        icon: chevronLeftIconPaths,
      },
    });

    expect(wrapper.classes('ui-icon')).toBe(true);
    expect(wrapper.vm.paths).toStrictEqual(chevronLeftIconPaths);
  });
});
