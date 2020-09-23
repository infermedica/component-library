import { shallowMount } from '@vue/test-utils';
import ComponentNameCamelCase from './ComponentNameCamelCase.vue';

describe('ComponentNameCamelCase.vue', () => {
  test('renders a component', () => {
    const wrapper = shallowMount(ComponentNameCamelCase, {
      mocks: {
        $t: () => {},
      },
    });
    expect(wrapper.classes('ComponentNameKebabCase')).toBe(true);
  });
});
