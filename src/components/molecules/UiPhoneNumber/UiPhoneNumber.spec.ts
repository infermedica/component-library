import { mount } from '@vue/test-utils';
import UiPhoneNumber from './UiPhoneNumber.vue';
import UiPhoneNumberInput from './_internal/UiPhoneNumberInput/UiPhoneNumberInput.vue';
import UiPhoneNumberPrefix from './_internal/UiPhoneNumberPrefix/UiPhoneNumberPrefix.vue';

describe('UiPhoneNumber.vue', () => {
  const wrapper = mount(UiPhoneNumber);

  const findUiPhoneNumberInputComponent = () => wrapper.findComponent(UiPhoneNumberInput);
  const findUiPhoneNumberPrefixComponent = () => wrapper.findComponent(UiPhoneNumberPrefix);

  it('renders a component', () => {
    expect(wrapper.exists()).toBe(true);
    expect(findUiPhoneNumberInputComponent().exists()).toBe(true);
    expect(findUiPhoneNumberPrefixComponent().exists()).toBe(true);
  });

  it('pass proper props to UiPhoneNumberPrefix', () => {
    const uiPhoneNumberPrefix = findUiPhoneNumberPrefixComponent();

    expect(uiPhoneNumberPrefix.props('modelValue')).toMatchObject({
      code: '+1',
      countryCode: 'US',
      country: 'United States of America',
    });
    expect(uiPhoneNumberPrefix.props('languageData')).toMatchObject({
      country: 'us',
      language: 'en',
    });
  });

  it('pass proper props to UiPhoneNumberInput', () => {
    const uiPhoneNumberInput = findUiPhoneNumberInputComponent();
    const property = 'input-';

    expect(uiPhoneNumberInput.props('id')).toMatch(new RegExp(`^${property}?`));
    expect(uiPhoneNumberInput.props('modelValue')).toStrictEqual('');
    expect(uiPhoneNumberInput.props('placeholder')).toStrictEqual('Enter phone number');
    expect(uiPhoneNumberInput.props('errorMessage')).toStrictEqual(false);
  });
});
