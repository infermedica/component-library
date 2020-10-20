import { shallowMount } from '@vue/test-utils';
import UiHeading from './UiHeading.vue';

describe('UiHeading.vue', () => {
  test('renders a component', () => {
    const wrapper = shallowMount(UiHeading, {
      mocks: {
        $t: () => {},
      },
    });
    expect(wrapper.classes('ui-heading')).toBe(true);
  });
});
