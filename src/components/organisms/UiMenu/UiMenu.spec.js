import { mount } from '@vue/test-utils';
import UiMenu from '@/components/organisms/UiMenu/UiMenu.vue';
import UiMenuItem from '@/components/organisms/UiMenu/_internal/UiMenuItem.vue';

const mountComponent = (iconVisible, isSelected, options) => mount(UiMenu, {
  props: {
    items: [ {
      label: 'item1',
      iconVisible,
      class: { 'ui-button--is-selected': isSelected },
    } ],
  },
  ...options,
});
const isSlotExist = (iconVisible, isSelected, slotName) => {
  const slotClass = `${slotName}-slot`;
  const wrapper = mountComponent(iconVisible, isSelected, { slots: { [slotName]: `<div class="${slotClass}"></div>` } });
  const slot = wrapper.find(`.${slotClass}`);
  return slot.exists();
};

describe('UiMenu.vue', () => {
  it('renders a component', () => {
    const wrapper = mount(UiMenu);
    expect(wrapper.classes('ui-menu')).toBe(true);
  });
  it.each([
    'default',
    'label',
    'suffix',
  ])('renders a component via %s slot', (slotName) => {
    expect(isSlotExist('always', false, slotName)).toBe(true);
  });
  describe.each([
    [
      'is selected',
      true,
    ],
    [
      "isn't selected",
      false,
    ],
  ])('component correct render icon when item %s', (str, isSelected) => {
    it.each([
      [
        '',
        'always',
        true,
      ],
      [
        'doesn\'t',
        'never',
        false,
      ],
      [
        '',
        'default',
        true,
      ],
    ])(`
      component %s render an icon when "iconVisible" is set to %s and item ${str}`, (isRender, type, result) => {
      const wrapper = mountComponent(type, isSelected);
      const icon = wrapper.find('.ui-menu-item-suffix__icon');
      expect(icon.exists()).toBe(result);
    });
  });
  it('renders transparent icon when item is unselected and "iconVisible" is default', () => {
    const wrapper = mountComponent('default', false);
    const suffix = wrapper.find('.ui-menu-item-suffix');
    expect(suffix.classes('ui-menu-item-suffix--hide-icon')).toBe(true);
  });
  it('renders the correct number of items', () => {
    const wrapper = mount(UiMenu, {
      props: {
        items: [
          { label: 'item1' },
          { label: 'item2' },
          { label: 'item3' },
          { label: 'item4' },
        ],
      },
    });
    const numberOfItems = wrapper.findAllComponents(UiMenuItem).length;
    expect(numberOfItems).toBe(4);
  });
});
