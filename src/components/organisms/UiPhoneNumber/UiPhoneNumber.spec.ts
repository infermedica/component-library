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
  modelValue: '',
  touched: false,
  language: 'en',
  defaultCountryCode: 'US',
};

const mockedGetPhoneCodes = vi.fn().mockReturnValue([
  {
    code: '+1',
    countryCode: 'US',
    country: 'United States of America',
  },
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
    countryCode: 'PR',
    country: 'Puerto Rico',
  },
]);

describe('UiPhoneNumber.vue', () => {
  const mountUiPhoneNumber = () => mount(UiPhoneNumber, { props: mockedProps });
  let wrapper: ReturnType<typeof mountUiPhoneNumber>;

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
    const fieldLabel = wrapper.find('.ui-phone-number__label');
    const dropdown = wrapper.find('.ui-phone-number__dropdown-form-field');
    const input = wrapper.find('.ui-phone-number__input input');
    const error = wrapper.find('.ui-alert--error');
    expect(fieldLabel.text()).toBe(mockedProps.translation.phoneNumberLabel);
    expect(dropdown.attributes('label')).toBe(mockedProps.translation.countryCodeLabel);
    expect(input.attributes('placeholder')).toBe(mockedProps.translation.phoneNumberPlaceholder);
    expect(error.text()).toBe(mockedProps.translation.errorMessage);
  });

  test.todo('renders error message if field is touched and no phone number is provided');

  test.todo('renders error message if user provides incorrect phone number');

  test.todo('selects ');
});
