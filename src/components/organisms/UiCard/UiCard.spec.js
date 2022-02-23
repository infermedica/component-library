import { mount } from '@vue/test-utils';
import UiCard from './UiCard.vue';

describe('UiCard.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiCard);
    expect(wrapper.classes('ui-card')).toBe(true);
  });
});
