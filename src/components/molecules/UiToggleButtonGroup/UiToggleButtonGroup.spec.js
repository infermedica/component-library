import { mount } from '@vue/test-utils';
import { h, ref } from 'vue';
import UiToggleButtonGroup from '@/components/molecules/UiToggleButtonGroup/UiToggleButtonGroup.vue';
import UiToggleButton from '@/components/molecules/UiToggleButtonGroup/_internal/UiToggleButton.vue';

const mountToggleButtonGroupWithButtons = ({
  modelValue,
  deselectable = false,
  items = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
  ],
}) => {
  const wrapper = mount(h(
    UiToggleButtonGroup,
    {
      modelValue: modelValue.value,
      'onUpdate:modelValue': (val) => {
      // eslint-disable-next-line no-param-reassign
        modelValue.value = val;
        wrapper.setProps({ modelValue: val });
      },
      deselectable,
    },
    {
      default: () => items.map(({ value, label }) => h(UiToggleButton, { value }, { default: () => label })),
    },
  ));

  return wrapper;
};

describe('UiToggleButtonGroup.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiToggleButtonGroup);
    expect(wrapper.classes('ui-toggle-button-group')).toBe(true);
  });

  test('updates modelValue after click a first toggle button', async () => {
    const modelValue = ref(null);
    const wrapper = mountToggleButtonGroupWithButtons({ modelValue });

    const firstToggleButton = wrapper.find('.ui-toggle-button:first-child');
    await firstToggleButton.trigger('click');

    expect(modelValue.value).toBe(1);
  });

  test('unpressed a first item after third item clicked', async () => {
    const modelValue = ref(1);
    const wrapper = mountToggleButtonGroupWithButtons({ modelValue });

    const firstToggleButton = wrapper.find('.ui-toggle-button:first-child');
    const thirdToggleButton = wrapper.find('.ui-toggle-button:nth-child(3)');
    await thirdToggleButton.trigger('click');

    expect(firstToggleButton.classes()).not.toContain('ui-button--is-selected');
    expect(thirdToggleButton.classes()).toContain('ui-button--is-selected');

    expect(modelValue.value).toBe(3);
  });

  test('deselects item when deselectable props is set', async () => {
    const modelValue = ref(1);
    const wrapper = mountToggleButtonGroupWithButtons({ modelValue, deselectable: true });

    const firstToggleButton = wrapper.find('.ui-toggle-button:first-child');
    await firstToggleButton.trigger('click');

    expect(firstToggleButton.classes()).not.toContain('ui-toggle-button--is-checked');
    expect(modelValue.value).toBe(null);
  });

  test('not deselects item when deselectable props is not set', async () => {
    const modelValue = ref(1);
    const wrapper = mountToggleButtonGroupWithButtons({ modelValue });

    const firstToggleButton = wrapper.find('.ui-toggle-button:first-child');
    await firstToggleButton.trigger('click');

    expect(firstToggleButton.classes()).toContain('ui-button--is-selected');
    expect(modelValue.value).toBe(1);
  });

  test('updates value with object values', async () => {
    const modelValue = ref(null);
    const wrapper = mountToggleButtonGroupWithButtons({
      modelValue,
      items: [
        { value: { id: 1 }, label: '1' },
        { value: { id: 2 }, label: '2' },
        { value: { id: 2 }, label: '3' },
      ],
    });

    const firstToggleButton = wrapper.find('.ui-toggle-button:first-child');
    await firstToggleButton.trigger('click');

    expect(firstToggleButton.classes()).toContain('ui-button--is-selected');
    expect(modelValue.value).toEqual({ id: 1 });
  });
});
