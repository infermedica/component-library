import { mount } from '@vue/test-utils';
import {
  nextTick,
  h,
} from 'vue';
import UiHeading from '@/components/atoms/UiHeading/UiHeading.vue';
import UiMenuItem from '@/components/organisms/UiMenu/_internal/UiMenuItem.vue';
import UiHorizontalPaging from './UiHorizontalPaging.vue';
import UiHorizontalPagingItem from './_internal/UiHorizontalPagingItem.vue';

const items = [
  {
    label: 'For business',
    title: 'For business',
    name: 'for-business',
  },
  {
    label: 'Medical Certification',
    title: 'Medical certification and compliance',
    name: 'medical-certification',
  },
];

describe('HorizontalPaging.vue', () => {
  it('renders a component', () => {
    const wrapper = mount(UiHorizontalPaging);
    expect(wrapper.classes('ui-horizontal-paging')).toBe(true);
  });
  it('component with title', () => {
    const title = 'Settings & Info';
    const wrapper = mount(UiHorizontalPaging, { propsData: { title } });
    expect(wrapper.findComponent(UiHeading).text()).toBe(title);
  });
  it('component without header', () => {
    const hasHeader = false;
    const wrapper = mount(UiHorizontalPaging, { propsData: { hasHeader } });
    expect(wrapper.find('.ui-horizontal-paging__header').exists()).toBe(false);
  });
  it('component has back button when some item is active ', async () => {
    const modelValue = items[0];
    const wrapper = mount(UiHorizontalPaging, { propsData: { items } });
    expect(wrapper.find('.ui-horizontal-paging__back').exists()).toBe(false);
    wrapper.setProps({ modelValue });
    await nextTick();
    expect(wrapper.find('.ui-horizontal-paging__back').exists()).toBe(true);
  });
  it('component with items passed by default slot', async () => {
    const item = items[0];
    const wrapper = mount(UiHorizontalPaging, { slots: { default: h(UiHorizontalPagingItem, item) } });
    await nextTick();
    expect(wrapper.findComponent(UiMenuItem).exists()).toBe(true);
  });
  it('component with items passed by items props', async () => {
    const item = items[0];
    const wrapper = mount(UiHorizontalPaging, { propsData: { items: [ item ] } });
    await nextTick();
    expect(wrapper.findComponent(UiMenuItem).exists()).toBe(true);
  });
  it('component supports nesting elements', async () => {
    const modelValue = items;
    const item = items[0];
    const wrapper = mount(UiHorizontalPaging, {
      propsData: {
        items: [ item ],
        modelValue,
      },
      slots: { [item.name]: h(UiHorizontalPaging, { items: [ items[1] ] }, { [items[1].name]: () => (h('span', { 'data-testid': items[1].name })) }) },
    });
    await nextTick();
    expect(wrapper.find(`[data-testid="${items[1].name}"]`).exists()).toBe(true);
  });
  it('back button in component with nesting elements remove last active item', async () => {
    const modelValue = items;
    const item = items[0];
    const wrapper = mount(UiHorizontalPaging, {
      propsData: {
        items: [ item ],
        modelValue,
      },
      slots: { [item.name]: h(UiHorizontalPaging, { items: [ items[1] ] }, { [items[1].name]: () => (h('span', { 'data-testid': items[1].name })) }) },
    });
    await nextTick();
    const expected = [ items[0] ];
    expect(wrapper.props().modelValue).toEqual(modelValue);
    const back = wrapper.find('.ui-horizontal-paging__back');
    await back.trigger('click');
    expect((wrapper.emitted('update:modelValue')?.at(0)?.at(0))).toEqual(expected);
  });
});
