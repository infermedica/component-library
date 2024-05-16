import { mount } from '@vue/test-utils';
import UiHorizontalPaging from './UiHorizontalPaging.vue';

describe('HorizontalPaging.vue', () => {
  it('renders a component', () => {
    const wrapper = mount(UiHorizontalPaging);
    expect(wrapper.classes('ui-horizontal-paging')).toBe(true);
  });
});
