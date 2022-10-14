import { mount } from '@vue/test-utils';
import UiMenu from '@/components/organisms/UiMenu/UiMenu.vue';
import UiMenuItem from '@/components/organisms/UiMenu/_internal/UiMenuItem.vue';

const mountComponent = (suffixVisible, isSelected, options) => mount(UiMenu, {
  props: {
    items: [ {
      label: 'item1',
      suffixVisible,
      class: { 'ui-menu-item--is-selected': isSelected },
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
        [
          true,
          true,
        ],
      ],
      [
        'doesn\'t',
        'never',
        [
          false,
          false,
        ],
      ],
      [
        '',
        'default',
        [
          true,
          false,
        ],
      ],
    ])(`
      component %s render an icon when "suffixVisible" is set to %s and item ${str}`, (isRender, type, result) => {
      const wrapper = mountComponent(type, isSelected);
      const icon = wrapper.find('.ui-menu-item-suffix__icon');
      const expected = isSelected
        ? result[0]
        : result[1];
      expect(icon.exists()).toBe(expected);
    });
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
