import {
  shallowMount,
  mount,
} from '@vue/test-utils';
import UiStepper from './UiStepper.vue';
import UiListItem from '../../organisms/UiList/_internal/UiListItem.vue';

describe('UiStepper.vue', () => {
  const steps = [
    {
      label: 'Introduction',
      href: '#',
    },
    {
      label: 'Patient',
      href: '#',
    },
    {
      label: 'Symptoms',
      href: '#',
    },
    {
      label: 'Regions',
      href: '#',
    },
    {
      label: 'Interview',
      href: '#',
    },
    {
      label: 'Results',
      href: '#',
    },
  ];
  const currentStepIndex = 3;
  const currentStep = steps[currentStepIndex].label;

  test('renders a component', () => {
    const wrapper = shallowMount(UiStepper);
    expect(wrapper.classes('ui-stepper')).toBe(true);
  });
  test('renders a component in desktop version', () => {
    const wrapper = mount(UiStepper, {
      props: {
        steps,
        currentStep,
      },
    });

    const desktopWrapper = wrapper.find('.ui-stepper');
    expect(desktopWrapper.exists()).toBe(true);
  });
  test('renders a component with active class on the active element', () => {
    const wrapper = mount(UiStepper, {
      props: {
        steps,
        currentStep,
      },
    });

    const listItems = wrapper.findAllComponents(UiListItem);
    const activeListItem = listItems[currentStepIndex];
    expect(activeListItem.classes()).toContain('ui-stepper-step--is-current');
  });
  test('renders a component with visited class on the visited elements', () => {
    const wrapper = mount(UiStepper, {
      props: {
        steps,
        currentStep,
      },
    });

    const listItems = wrapper.findAllComponents(UiListItem);
    // + 1 to include last element, this is specific to Array.proptotype.splice
    const visitedListItems = listItems.slice(0, currentStepIndex);

    visitedListItems.forEach((element) => {
      expect(element.classes()).toContain('ui-stepper-step--is-visited');
    });
  });
});
