import UiPhoneNumber from '@/components/organisms/UiPhoneNumber/UiPhoneNumber.vue';
import { mount } from '@vue/test-utils';

describe('UiPhoneNumber.vue', () => {
  const mountUiPhoneNumber = () => mount(UiPhoneNumber)
  let wrapper:
  test('renders a component', () => {
    expect(wrapper.classes('ui-modal')).toBe(true);
  });
})
