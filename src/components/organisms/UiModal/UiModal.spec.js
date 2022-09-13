import { mount } from '@vue/test-utils';
import UiModal from '@/components/organisms/UiModal/UiModal.vue';
import UiBackdrop from '@/components/atoms/UiBackdrop/UiBackdrop.vue';

const description = 'description text';
const descriptionSlot = {
  slots: {
    description: `<template #description="{description}">
      <p data-testid="description">{{description}}</p>
    </template>`,
  },
};
const title = 'title text';
const titleSlot = {
  slots: {
    title: `<template #title="{titleText}">
    <h1 data-testid="title">{{titleText}}</h1>
  </template>`,
  },
};
let wrapper;
beforeEach(() => {
  wrapper = mount(UiModal, {
    props: {
      modelValue: true,
    },
  });
});

describe('UiModal.vue', () => {
  test('renders a component', () => {
    expect(wrapper.classes('ui-modal')).toBe(true);
  });
  test('component can be open by model value', () => {
    const dialog = wrapper.find('.ui-modal__dialog');
    expect(dialog.exists()).toBe(true);
  });
  test('component can be closed by clicking outside when is closable', async () => {
    await wrapper.setProps({
      isClosable: true,
    });
    const background = wrapper.findComponent(UiBackdrop);
    await background.trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false);
  });
  test("component can't be closed by clicking outside when is unclosable", async () => {
    await wrapper.setProps({
      isClosable: false,
    });
    const background = wrapper.findComponent(UiBackdrop);
    await background.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
  test('component emit confirm event', async () => {
    const btn = wrapper.find('.ui-modal__confirm');
    await btn.trigger('click');
    expect(wrapper.emitted('confirm')).toBeTruthy();
  });
  test('component emit cancel event', async () => {
    const btn = wrapper.find('.ui-modal__cancel');
    await btn.trigger('click');
    expect(wrapper.emitted('cancel')).toBeTruthy();
  });
  test('title scope slot renders content for title when component has title and description props', () => {
    wrapper = mount(UiModal, {
      props: {
        modelValue: true,
        title,
        description,
      },
      ...titleSlot,
    });
    const titleContent = wrapper.find('[data-testid="title"]').element.innerHTML;
    expect(titleContent).toBe(title);
  });
  test('title slot is not rendered if component does not have title prop', () => {
    wrapper = mount(UiModal, {
      props: {
        modelValue: true,
        description,
      },
      ...titleSlot,
    });
    const titleContent = wrapper.find('[data-testid="title"]');
    expect(titleContent.exists()).toBe(false);
  });
  test('description scope slot render content for description when component has title and description props', () => {
    wrapper = mount(UiModal, {
      props: {
        modelValue: true,
        title,
        description,
      },
      ...descriptionSlot,
    });
    const descriptionContent = wrapper.find('[data-testid="description"]').element.innerHTML;
    expect(descriptionContent).toBe(description);
  });
  test('description scope slot render content for description if component does not have title prop', () => {
    wrapper = mount(UiModal, {
      props: {
        modelValue: true,
        description,
      },
      ...descriptionSlot,
    });
    const descriptionContent = wrapper.find('[data-testid="description"]').element.innerHTML;
    expect(descriptionContent).toBe(description);
  });
  test('description scope slot is rendered once if component does not have title prop', () => {
    wrapper = mount(UiModal, {
      props: {
        modelValue: true,
        description,
      },
      ...descriptionSlot,
    });
    const descriptionContents = wrapper.findAll('[data-testid="description"]');
    expect(descriptionContents.length).toBe(1);
  });
});
