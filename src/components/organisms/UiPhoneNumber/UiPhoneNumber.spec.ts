import UiPhoneNumber from '@/components/organisms/UiPhoneNumber/UiPhoneNumber.vue';
import { mount } from '@vue/test-utils';
import * as helpers from '../../../utilities/helpers';

const mockedProps = {
  translation: {
    phoneNumberLabel: 'Phone number',
    phoneNumberPlaceholder: 'Put your phone number',
    countryCodeLabel: 'Country code',
    errorMessage: 'Error message',
  },
  touched: false,
  language: 'en',
  defaultCountryCode: 'US',
};

const mockedGetPhoneCodes = vi.fn().mockReturnValue([
  {
    code: '+598',
    countryCode: 'UY',
    country: 'Uruguay',
  },
  {
    code: '+998',
    countryCode: 'UZ',
    country: 'Uzbekistan',
  },
  {
    code: '+48',
    countryCode: 'PL',
    country: 'Poland',
  },
  {
    code: '+351',
    countryCode: 'PT',
    country: 'Portugal',
  },
  {
    code: '+1',
    countryCode: 'US',
    country: 'United States of America',
  },
  {
    code: '+1',
    countryCode: 'PR',
    country: 'Puerto Rico',
  },
]);

describe('UiPhoneNumber.vue', () => {
  const mountUiPhoneNumber = () => mount(UiPhoneNumber, { props: mockedProps });
  let wrapper: ReturnType<typeof mountUiPhoneNumber>;

  const findErrorMessage = () => wrapper.find('.ui-alert--error');
  const findFieldLabel = () => wrapper.find('.ui-phone-number__label');
  const findDropdown = () => wrapper.find('.ui-phone-number__dropdown-form-field');
  const findInput = () => wrapper.find('.ui-phone-number__input input');

  beforeEach(() => {
    vi.spyOn(helpers, 'getPhoneCodes').mockImplementation(mockedGetPhoneCodes);
    wrapper = mountUiPhoneNumber();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders a component', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.ui-phone-number').exists()).toBe(true);
  });

  test('runs getPhoneCodes on mounted', () => {
    expect(mockedGetPhoneCodes).toHaveBeenCalledOnce();
    expect(mockedGetPhoneCodes).toHaveBeenCalledWith('en');
  });

  test('has correct translations rendered in the DOM', async () => {
    await wrapper.setProps({ touched: true });
    const fieldLabel = findFieldLabel();
    const dropdown = findDropdown();
    const input = findInput();
    const error = findErrorMessage();
    expect(fieldLabel.text()).toBe(mockedProps.translation.phoneNumberLabel);
    expect(dropdown.attributes('label')).toBe(mockedProps.translation.countryCodeLabel);
    expect(input.attributes('placeholder')).toBe(mockedProps.translation.phoneNumberPlaceholder);
    expect(error.text()).toBe(mockedProps.translation.errorMessage);
  });

  test('renders error message if field is touched and no phone number is provided', async () => {
    expect(findErrorMessage().exists()).toBe(false);
    await wrapper.setProps({ touched: true });

    const error = findErrorMessage();
    expect(error.exists()).toBe(true);
    expect(error.text()).toBe(mockedProps.translation.errorMessage);
  });

  test('renders error message if user provides incorrect phone number', async () => {
    expect(findErrorMessage().exists()).toBe(false);
    await wrapper.setProps({
      touched: true,
      phoneCode: '+1',
      phoneNumber: '21',
    });

    const error = findErrorMessage();
    expect(error.exists()).toBe(true);
    expect(error.text()).toBe(mockedProps.translation.errorMessage);
  });

  test('doesn\'t render error message if user provides correct phone number and control is touched', async () => {
    expect(findErrorMessage().exists()).toBe(false);
    await wrapper.setProps({
      touched: true,
      phoneCode: '+48',
      phoneNumber: '123123123',
    });

    expect(findErrorMessage().exists()).toBe(false);
  });

  test('initially selects value in the dropdown', async () => {
    expect(findDropdown().text()).toContain('United States of America');
  });

  test('changes value in the dropdown based on passed phoneCode value', async () => {
    await wrapper.setProps({ phoneCode: '+48' });
    expect(findDropdown().text()).toContain('Poland');
  });
});
