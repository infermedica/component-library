import {
  shallowMount,
  mount,
} from '@vue/test-utils';
import UiStepper from './UiStepper.vue';
import UiListItem from '../../organisms/UiList/_internal/UiListItem.vue';
import UiText from '../../atoms/UiText/UiText.vue';

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

  describe('shared', () => {
    test('renders a component', () => {
      const wrapper = shallowMount(UiStepper);
      expect(wrapper.classes('ui-stepper')).toBe(true);
    });
  });

  describe('mobile', () => {
    test('renders a component in mobile version', () => {
      const wrapper = mount(UiStepper, {
        props: {
          steps,
          currentStep,
        },
      });

      const mobileWrapper = wrapper.find('.ui-stepper__mobile');
      expect(mobileWrapper.exists()).toBe(true);
    });
    test('renders a component displaying correct step number', () => {
      const wrapper = mount(UiStepper, {
        props: {
          steps,
          currentStep,
        },
      });
      const displayedCurrentStepNumber = currentStepIndex + 1;
      const totalNumberOfSteps = steps.length;
      const mobileText = wrapper.findComponent(UiText);

      expect(mobileText.classes()).toContain('ui-stepper__current-step');
      expect(mobileText.text()).toContain(`${displayedCurrentStepNumber}/${totalNumberOfSteps} ${currentStep}`);
    });
  });

  describe('desktop', () => {
    test('renders a component in desktop version', () => {
      const wrapper = mount(UiStepper, {
        props: {
          steps,
          currentStep,
        },
      });

      const desktopWrapper = wrapper.find('.ui-stepper__desktop');
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
      expect(activeListItem.classes()).toContain('ui-stepper__step--current');
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
      const visitedListItems = listItems.slice(0, currentStepIndex + 1);

      visitedListItems.forEach((element) => {
        expect(element.classes()).toContain('ui-stepper__step--visited');
      });
    });
  });
});
