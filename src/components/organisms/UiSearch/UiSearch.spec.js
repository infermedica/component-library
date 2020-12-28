import { shallowMount } from '@vue/test-utils';
import UiSearch from './UiSearch.vue';

describe('UiSearch.vue', () => {
  test('renders a component', () => {
    const wrapper = shallowMount(UiSearch, {
      mocks: {
        $t: () => {},
      },
    });
    expect(wrapper.classes('ui-search')).toBe(true);
  });
});
