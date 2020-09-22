import { shallowMount } from '@vue/test-utils';
import ComponentNameCamelCase from './ComponentNameCamelCase.vue';

describe('ComponentNameCamelCase.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(ComponentNameCamelCase, {
      mocks: {
        $t: () => {},
      },
    });
    expect(component.get('.ComponentNameKebabCase'));
  });
});
