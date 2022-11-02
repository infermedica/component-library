import {
  nextTick,
  h,
} from 'vue';
import { mount } from '@vue/test-utils';
import UiMenuItem from '@/components/organisms/UiMenu/_internal/UiMenuItem.vue';
import UiContentArea from './UiContentArea.vue';
import UiContentAreaItem from './_internal/UiContentAreaItem.vue';

const item = {
  label: 'For business',
  title: 'For business',
  name: 'for-business',
};
const nestedItem = {
  label: 'Medical Certification',
  title: 'Medical certification and compliance',
  name: 'medical-certification',
};

describe('UiContentArea.vue', () => {
  it('renders a component', () => {
    const wrapper = mount(UiContentArea);
    expect(wrapper.classes('ui-content-area')).toBe(true);
  });
  it('component allow to pass items by default slot', async () => {
    const wrapper = mount(UiContentArea, {
      props: { title: 'Settings & Info' },
      slots: { default: h(UiContentAreaItem, item) },
    });
    await nextTick();
    const menuItem = wrapper.findComponent(UiMenuItem);
    expect(menuItem.html()).toContain(item.label);
  });
  it('component allot to pass items by items prop', async () => {
    const wrapper = mount(UiContentArea, {
      props: {
        title: 'Settings & Info',
        items: [ item ],
      },
    });
    await nextTick();
    const menuItem = wrapper.findComponent(UiMenuItem);
    expect(menuItem.html()).toContain(item.label);
  });
  it('back button is visible when some content is active', async () => {
    const wrapper = mount(UiContentArea, {
      props: {
        modelValue: item,
        title: 'Settings & Info',
        items: [ item ],
      },
    });
    await nextTick();
    const backButton = wrapper.find('.ui-content-area__back');
    expect(backButton.exists()).toBe(true);
  });
  it('component support nesting', async () => {
    const nestedComponent = h(UiContentArea, {
      title: 'Nested Settings & Info',
      items: [ nestedItem ],
    }, { [nestedItem.name]: () => (h('div', { 'data-testid': nestedItem.name })) });
    const wrapper = mount(UiContentArea, {
      props: {
        modelValue: [
          item,
          nestedItem,
        ],
        title: 'Settings & Info',
        items: [ item ],
      },
      slots: { [item.name]: h(nestedComponent) },
    });
    await nextTick();
    const nestedContent = wrapper.find(`[data-testid="${nestedItem.name}"]`);
    expect(nestedContent.exists()).toBe(true);
  });
  it('back button in component with nesting remove last active item', async () => {
    const nestedComponent = h(UiContentArea, {
      title: 'Nested Settings & Info',
      items: [ nestedItem ],
    }, { [nestedItem.name]: () => (h('div', { 'data-testid': nestedItem.name })) });
    const wrapper = mount(UiContentArea, {
      props: {
        modelValue: [
          item,
          nestedItem,
        ],
        title: 'Settings & Info',
        items: [ item ],
      },
      slots: { [item.name]: h(nestedComponent) },
    });
    await nextTick();
    const backButton = wrapper.find('.ui-content-area__back');
    await backButton.trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0].length).toBe(1);
  });
});
