import {
  nextTick,
  h,
} from 'vue';
import { mount } from '@vue/test-utils';
import UiMenuItem from '@/components/organisms/UiMenu/_internal/UiMenuItem.vue';
import HorizontalPaging from './HorizontalPaging.vue';
import HorizontalPagingItem from './_internal/HorizontalPagingItem.vue';

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

describe('HorizontalPaging.vue', () => {
  it('renders a component', () => {
    const wrapper = mount(HorizontalPaging);
    expect(wrapper.classes('ui-content-area')).toBe(true);
  });
  it('component allow to pass items by default slot', async () => {
    const wrapper = mount(HorizontalPaging, {
      props: { title: 'Settings & Info' },
      slots: { default: h(HorizontalPagingItem, item) },
    });
    await nextTick();
    const menuItem = wrapper.findComponent(UiMenuItem);
    expect(menuItem.html()).toContain(item.label);
  });
  it('component allot to pass items by items prop', async () => {
    const wrapper = mount(HorizontalPaging, {
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
    const wrapper = mount(HorizontalPaging, {
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
    const nestedComponent = h(HorizontalPaging, {
      title: 'Nested Settings & Info',
      items: [ nestedItem ],
    }, { [nestedItem.name]: () => (h('div', { 'data-testid': nestedItem.name })) });
    const wrapper = mount(HorizontalPaging, {
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
    const nestedComponent = h(HorizontalPaging, {
      title: 'Nested Settings & Info',
      items: [ nestedItem ],
    }, { [nestedItem.name]: () => (h('div', { 'data-testid': nestedItem.name })) });
    const wrapper = mount(HorizontalPaging, {
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
