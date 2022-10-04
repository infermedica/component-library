import { mount } from '@vue/test-utils';
import UiMenu from '@/components/organisms/UiMenu/UiMenu.vue';
import UiMenuItem from '@/components/organisms/UiMenu/_internal/UiMenuItem.vue';

const isSlotExist = (iconVisible, isSelected, slotName = 'icon') => {
  const slotClass = `${slotName}-slot`;
  const wrapper = mount(UiMenu, {
    props: {
      items: [{
        label: 'item1',
        iconVisible,
        class: {
          'ui-button--is-selected': isSelected,
        },
      }],
    },
    slots: {
      [slotName]: `<div class="${slotClass}"></div>`,
    },
  });
  const slot = wrapper.find(`.${slotClass}`);
  return slot.exists();
};

describe('UiMenu.vue', () => {
  it('renders a component', () => {
    const wrapper = mount(UiMenu);
    expect(wrapper.classes('ui-menu')).toBe(true);
  });
  it.each(['default', 'icon', 'label', 'suffix'])('renders a component via %s slot', (slotName) => {
    expect(isSlotExist('always', false, slotName)).toBe(true);
  });
  describe.each([['is selected', true], ["isn't selected", false]])('component correct render icon when item %s', (str, isSelected) => {
    it.each([['', 'always', true], ['doesn\'t', 'never', false], [isSelected ? '' : 'doesn\'t', 'default', isSelected]])(`
      component %s render an icon when "iconVisible" is set to %s and item ${str}`, (isRender, type, result) => {
      expect(isSlotExist(type, isSelected)).toBe(result);
    });
  });
  it('renders the correct number of items', () => {
    const wrapper = mount(UiMenu, {
      props: {
        items: [{
          label: 'item1',
        }, {
          label: 'item2',
        }, {
          label: 'item3',
        }, {
          label: 'item4',
        }],
      },
    });
    const numberOfItems = wrapper.findAllComponents(UiMenuItem).length;
    expect(numberOfItems).toBe(4);
  });
});
