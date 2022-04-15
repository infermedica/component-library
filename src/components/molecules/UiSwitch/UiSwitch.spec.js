import { mount } from '@vue/test-utils';
import UiSwitch from '@/components/molecules/UiSwitch/UiSwitch.vue';

describe('UiSwitch.vue', () => {
  it('renders a component', () => {
    const wrapper = mount(UiSwitch);
    expect(wrapper.classes()).toContain('ui-switch');
  });
  test('render a content via switchcontrol slot', () => {
    const wrapper = mount(UiSwitch, {
      slots: {
        switchcontrol: '<div data-testid="switchcontrol" />',
      },
    });
    const slot = wrapper.find('[data-testid="switchcontrol"]');
    expect(slot.exists()).toBe(true);
  });
  test('render a content via default slot', () => {
    const wrapper = mount(UiSwitch, {
      slots: {
        default: '<div data-testid="default" />',
      },
    });
    const slot = wrapper.find('[data-testid="default"]');
    expect(slot.exists()).toBe(true);
  });
  test('a component emits update event', async () => {
    const wrapper = mount(UiSwitch);
    await wrapper.find('input[type="checkbox"]').setChecked();
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });
  test('a component is disabled', async () => {
    const wrapper = mount(UiSwitch, {
      attrs: {
        disabled: true,
      },
    });
    await wrapper.find('input[type="checkbox"]').setChecked();
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
});

