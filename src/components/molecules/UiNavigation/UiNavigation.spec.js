import { mount } from '@vue/test-utils';
import UiNavigation from '@/components/molecules/UiNavigation/UiNavigation.vue';
import UiNavigationItem from './_internal/UiNavigationItem.vue';

const items = [{
  to: '/',
  text: 'title',
}, {
  to: '/',
  text: 'title',
}, {
  to: '/',
  text: 'title',
}];

class ResizeObserver {
  observe() {}

  unobserve() {}
}

window.ResizeObserver = ResizeObserver;

describe('UiNavigation.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiNavigation);
    expect(wrapper.classes('ui-navigation')).toBe(true);
  });
  test('component render item with the correct text', async () => {
    const wrapper = mount(UiNavigation, {
      props: {
        items,
      },
    });
    const item = wrapper.findComponent(UiNavigationItem);
    expect(item.text()).toBe(items[0].text);
  });
  test('component render the correct number of items', async () => {
    const wrapper = mount(UiNavigation, {
      props: {
        items,
      },
    });
    const itemList = wrapper.findAllComponents(UiNavigationItem);
    expect(itemList.length).toBe(3);
  });
  test('component pass attributes to the one item', async () => {
    const wrapper = mount(UiNavigation, {
      props: {
        items: [...items, { ...items[0], style: 'color: red' }],
      },
    });
    const itemList = wrapper.findAllComponents(UiNavigationItem);
    itemList.forEach((item, i) => {
      if (i === 3) {
        expect(item.element.style.color).toBe('red');
      } else {
        expect(item.element.style.color).not.toBe('red');
      }
    });
  });
  test('component correct pass attributes to all items', async () => {
    const wrapper = mount(UiNavigation, {
      props: {
        items,
        navigationItemsAttrs: { style: 'color: red' },
      },
    });
    const itemList = wrapper.findAllComponents(UiNavigationItem);
    itemList.forEach((item) => {
      expect(item.element.style.color).toBe('red');
    });
  });
  test('attributes in items props are more important than attributes in navigationItemsAttrs props', async () => {
    const wrapper = mount(UiNavigation, {
      props: {
        items: [...items, { ...items[0], style: 'color: red' }],
        navigationItemsAttrs: { style: 'color: green' },
      },
    });
    const itemList = wrapper.findAllComponents(UiNavigationItem);
    itemList.forEach((item, i) => {
      if (i === 3) {
        expect(item.element.style.color).toBe('red');
      } else {
        expect(item.element.style.color).toBe('green');
      }
    });
  });
});
