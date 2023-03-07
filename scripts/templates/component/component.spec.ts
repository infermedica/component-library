import { shallowMount } from '@vue/test-utils';
import ComponentNameCamelCase from '@/components/ComponentFolder/ComponentNameCamelCase/ComponentNameCamelCase.vue';
import * as stories from '@/components/ComponentFolder/ComponentNameCamelCase/ComponentNameCamelCase.stories';

describe('ComponentNameCamelCase.vue', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(ComponentNameCamelCase, { props: stories.Basic.args });
    expect(wrapper.classes('ComponentNameKebabCase')).toBe(true);
  });
});
