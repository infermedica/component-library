import { shallowMount } from '@vue/test-utils';
import UiIcon from './UiIcon.vue';

describe('UiIcon.vue', () => {
  test('renders a component', () => {
    const wrapper = shallowMount(UiIcon, {
      mocks: {
        $t: () => {},
      },
    });
    expect(wrapper.classes('ui-icon')).toBe(true);
  });
  test('handle empty icon props', () => {
    const wrapper = shallowMount(UiIcon, {
      mocks: {
        $t: () => {},
      },
    });
    expect(wrapper.vm.paths).toStrictEqual([]);
  });
  test('render a icon path from icon-pack', () => {
    const paths = [
      'M51 102.05c10.5 0 20.2-3.2 28.3-8.6l29.3 29.3c2.301 2.3 6.101 2.3 8.5 0l5.7-5.7c2.3-2.3 2.3-6.1 0-8.5l-29.4-29.2c5.399-8.1 8.6-17.8 8.6-28.3 0-28.1-22.9-51-51-51s-51 22.9-51 51c0 28.099 22.8 51 51 51zm0-82c17.1 0 31 13.9 31 31s-13.9 31-31 31-31-13.9-31-31 13.9-31 31-31z',
    ];
    const wrapper = shallowMount(UiIcon, {
      propsData: {
        icon: 'search',
      },
      mocks: {
        $t: () => {},
      },
    });
    expect(wrapper.vm.paths).toStrictEqual(paths);
  });
});
