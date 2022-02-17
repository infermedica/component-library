import { mount } from '@vue/test-utils';
import UiCard from './UiCard.vue';

describe('UiCard.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiCard);
    expect(wrapper.classes('ui-card')).toBe(true);
  });

  test('render differences between modern and classic theme', () => {
    const classicWrapper = mount(UiCard);
    const modernWrapper = mount(UiCard, {
      props: { modernTheme: true },
    });
    expect(classicWrapper.classes('ui-card__subtitle')).toBe(true);
    expect(modernWrapper.classes('ui-card__subtitle')).toBe(false);
  });
});
