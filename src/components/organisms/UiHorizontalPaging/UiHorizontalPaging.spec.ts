import { mount } from '@vue/test-utils';
import UiHorizontalPaging from './_.vue';

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
});
