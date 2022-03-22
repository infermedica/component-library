import { mount, shallowMount } from '@vue/test-utils';
import UiModal from '@/components/organisms/UiModal/UiModal.vue';

describe('UiModal.vue', () => {
  test('renders a component', () => {
    const wrapper = shallowMount(UiModal);
    expect(wrapper.classes('ui-modal')).toBe(true);
  });
  test('component can be open by model value', () => {
    const wrapper = mount(UiModal, {
      props: {
        modelValue: true,
      },
    });
    const dialog = wrapper.find('.ui-modal__dialog');
    expect(dialog.exists()).toBe(true);
  });
  test('component can be closed by clicking outside when is closable', async () => {
    const wrapper = mount(UiModal, {
      props: {
        modelValue: true,
        isClosable: true,
      },
    });
    const background = wrapper.find('.ui-modal__background');
    await background.trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false);
  });
  test("component can't be closed by clicking outside when is unclosable", async () => {
    const wrapper = mount(UiModal, {
      props: {
        modelValue: true,
        isClosable: false,
      },
    });
    const background = wrapper.find('.ui-modal__background');
    await background.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
  test('component emit confirm event', async () => {
    const wrapper = mount(UiModal, {
      props: {
        modelValue: true,
      },
    });
    const btn = wrapper.find('.ui-modal__confirm');
    await btn.trigger('click');
    expect(wrapper.emitted('confirm')).toBeTruthy();
  });
  test('component emit cancel event', async () => {
    const wrapper = mount(UiModal, {
      props: {
        modelValue: true,
      },
    });
    const btn = wrapper.find('.ui-modal__cancel');
    await btn.trigger('click');
    expect(wrapper.emitted('cancel')).toBeTruthy();
  });
});
