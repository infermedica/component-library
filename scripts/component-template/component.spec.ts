import { shallowMount } from '@vue/test-utils';
import ComponentNameCamelCase from '@/components/ComponentFolder/ComponentNameCamelCase/ComponentNameCamelCase.vue';

describe('ComponentNameCamelCase.vue', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(ComponentNameCamelCase);
    expect(wrapper.classes('ComponentNameKebabCase')).toBe(true);
  });
});
