import { h } from 'vue';
import { mount } from '@vue/test-utils';
import UiAccordion from './UiAccordion.vue';
import UiAccordionItem from './_internal/UiAccordionItem.vue';

describe('UiAccordion.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiAccordion);
    expect(wrapper.classes('ui-accordion')).toBe(true);
  });
  test('component emit single item for String v-model', async () => {
    const wrapper = mount(UiAccordion, {
      slots: {
        default: h(UiAccordionItem, { name: 'sc', title: 'sc' }),
      },
    });
    const item = wrapper.findComponent(UiAccordionItem);
    const toggler = item.find('button');
    await toggler.trigger('click');
    expect(typeof wrapper.emitted('update:modelValue')[0][0] === 'string').toBeTruthy();
  });
  test('component emit multiple items for Array v-model', async () => {
    const wrapper = mount(UiAccordion, {
      slots: {
        default: h(UiAccordionItem, { name: 'sc', title: 'sc' }),
      },
      props: {
        modelValue: [],
      },
    });
    const item = wrapper.findComponent(UiAccordionItem);
    const toggler = item.find('button');
    await toggler.trigger('click');
    expect(typeof wrapper.emitted('update:modelValue')[0][0] === 'object').toBeTruthy();
  });
});
