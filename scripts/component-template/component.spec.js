import { mount } from '@vue/test-utils';
import ComponentNameCamelCase from '@/components/ComponentFolder/ComponentNameCamelCase/ComponentNameCamelCase.vue';

describe('ComponentNameCamelCase.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(ComponentNameCamelCase);
    expect(wrapper.classes('ComponentNameKebabCase')).toBe(true);
  });
});
