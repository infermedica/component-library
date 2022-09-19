import { h } from 'vue';
import { mount } from '@vue/test-utils';
import UiInteractiveSvg from '@/components/molecules/UiInteractiveSvg/UiInteractiveSvg.vue';
import UiInteractiveSvgElement from '@/components/molecules/UiInteractiveSvg/_internal/UiInteractiveSvgElement.vue';

const testStr = 'test';

describe('UiInteractiveSvg.vue', () => {
  test('renders a component', () => {
    const wrapper = mount(UiInteractiveSvg);
    expect(wrapper.classes('ui-interactive-svg')).toBe(true);
  });
  test('renders UiInteractiveSvgElement tag provided by tag prop', async () => {
    const wrapper = mount(UiInteractiveSvg, {
      slots: {
        default: h(UiInteractiveSvgElement, {
          tag: 'g',
        }),
      },
    });
    const interactiveSvgElement = wrapper.findComponent(UiInteractiveSvgElement);
    expect(interactiveSvgElement.element.tagName).toBe('g');
  });
  test('pass attributes to UiInteractiveSvgElement', () => {
    const wrapper = mount(UiInteractiveSvg, {
      props: {
        setElementsAttrs: () => ({
          class: testStr,
        }),
      },
      slots: {
        default: UiInteractiveSvgElement,
      },
    });
    const interactiveSvgElement = wrapper.findComponent(UiInteractiveSvgElement);
    expect(interactiveSvgElement.classes(testStr)).toBe(true);
  });
  test('pass listeners to UiInteractiveSvgElement', async () => {
    let selected;
    const wrapper = mount(UiInteractiveSvg, {
      props: {
        setElementsAttrs: (attrs) => ({
          onClick() {
            selected = attrs.id;
          },
        }),
      },
      slots: {
        default: h(UiInteractiveSvgElement, {
          id: testStr,
        }),
      },
    });
    await wrapper.findComponent(UiInteractiveSvgElement).trigger('click');
    expect(selected).toBe(testStr);
  });
  test('pass attrs to nested UiInteractiveSvg elements', async () => {
    const wrapper = mount(UiInteractiveSvg, {
      props: {
        setElementsAttrs: () => ({
          setElementsAttrs: () => ({
            class: 'secondLvlEl',
          }),
        }),
      },
      slots: {
        default: h(UiInteractiveSvgElement, null, {
          default: () => h(UiInteractiveSvgElement, {
            'data-testid': 'secondLvlEl',
          }),
        }),
      },
    });
    const secondLvlEl = await wrapper.find('[data-testid="secondLvlEl"]');
    expect(secondLvlEl.classes('secondLvlEl')).toBe(true);
  });
  test('do not pass nested attrs to higher levels of UiInteractiveSvg elements', async () => {
    const wrapper = mount(UiInteractiveSvg, {
      props: {
        setElementsAttrs: () => ({
          setElementsAttrs: () => ({
            class: 'secondLvlEl',
          }),
        }),
      },
      slots: {
        default: h(UiInteractiveSvgElement, {
          'data-testid': 'firstLvlEl',
        }, {
          default: () => h(UiInteractiveSvgElement),
        }),
      },
    });
    const firstLvlEl = await wrapper.find('[data-testid="firstLvlEl"]');
    expect(firstLvlEl.classes('secondLvlEl')).toBe(false);
  });
  test('do not pass attrs to deeper levels of UiInteractiveSvg elements', async () => {
    const wrapper = mount(UiInteractiveSvg, {
      props: {
        setElementsAttrs: () => ({
          class: testStr,
          setElementsAttrs: () => ({}),
        }),
      },
      slots: {
        default: h(UiInteractiveSvgElement, null, {
          default: () => h(UiInteractiveSvgElement, {
            'data-testid': 'secondLvlEl',
            id: testStr,
          }),
        }),
      },
    });
    const secondLvlEl = await wrapper.find('[data-testid="secondLvlEl"]');
    expect(secondLvlEl.classes(testStr)).toBe(false);
  });
  test('pass listeners to nested UiInteractiveSvg elements', async () => {
    let selected;
    const wrapper = mount(UiInteractiveSvg, {
      props: {
        setElementsAttrs: () => ({
          setElementsAttrs: ({
            id,
          }) => ({
            onClick: () => {
              selected = id;
            },
          }),
        }),
      },
      slots: {
        default: h(UiInteractiveSvgElement, null, {
          default: () => h(UiInteractiveSvgElement, {
            'data-testid': 'secondLvlEl',
            id: testStr,
          }),
        }),
      },
    });
    await wrapper.find('[data-testid="secondLvlEl"]').trigger('click');
    expect(selected).toBe(testStr);
  });
  test('do not pass listeners to deeper levels of UiInteractiveSvg elements', async () => {
    let selected;
    const wrapper = mount(UiInteractiveSvg, {
      props: {
        setElementsAttrs: ({
          id,
        }) => ({
          onClick: () => {
            selected = id;
          },
        }),
      },
      slots: {
        default: h(UiInteractiveSvgElement, null, {
          default: () => h(UiInteractiveSvgElement, {
            'data-testid': 'secondLvlEl',
            id: testStr,
          }),
        }),
      },
    });
    await wrapper.find('[data-testid="secondLvlEl"]').trigger('click');
    expect(selected).not.toBe(testStr);
  });
  test('do not pass nested listeners to higher levels of UiInteractiveSvg elements', async () => {
    let selected;
    const wrapper = mount(UiInteractiveSvg, {
      props: {
        setElementsAttrs: () => ({
          setElementsAttrs: ({
            id,
          }) => ({
            onClick: () => {
              selected = id;
            },
          }),
        }),
      },
      slots: {
        default: h(UiInteractiveSvgElement, {
          'data-testid': 'firstLvlEl',
        }, {
          default: () => h(UiInteractiveSvgElement, {
            id: testStr,
          }),
        }),
      },
    });
    await wrapper.find('[data-testid="firstLvlEl"]').trigger('click');
    expect(selected).not.toBe(testStr);
  });
});
