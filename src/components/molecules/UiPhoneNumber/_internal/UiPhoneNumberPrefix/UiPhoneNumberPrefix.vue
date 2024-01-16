<template>
  <UiDropdown
    v-model="defaultCountryCode"
    :text="prefixButtonText"
    :items="prefixCodes"
    class="ui-phone-number-prefix"
    :popover-attrs="{ class: 'ui-phone-number-prefix__popover' }"
  >
    <template
      #toggle="{
        text,
        isOpen,
        toggleHandler,
      }"
    >
      <UiPhoneNumberPrefixToggle
        :is-open="isOpen"
        @click="toggleHandler"
      >
        {{ text }}
      </UiPhoneNumberPrefixToggle>
    </template>
    <div
      role="radiogroup"
      class="ui-dropdown__items"
    >
      <UiDropdownItem
        v-for="({
          code, countryCode, country,
        }, position) in prefixCodes"
        :key="`${countryCode}-${country}`"
        :value="countryCode"
        :aria-setsize="prefixCodes.length"
        :aria-posinset="position + 1"
        tabindex="-1"
        class="ui-phone-number-prefix-dropdown-item"
      >
        <span>
          {{ country }} ({{ code }})
        </span>
      </UiDropdownItem>
    </div>
  </UiDropdown>
</template>

<script setup lang="ts">
import {
  shallowRef,
  computed,
  onMounted,
} from 'vue';
import UiDropdown from '../../../UiDropdown/UiDropdown.vue';
import UiDropdownItem from '../../../UiDropdown/_internal/UiDropdownItem.vue';
import UiPhoneNumberPrefixToggle from './UiPhoneNumberPrefixToggle.vue';
import {
  getPhoneCodes,
  type PhoneCodeType,
  type SupportedCountryCodeType,
} from '../../helpers';
import { type CountryCodeItems } from '../../UiPhoneNumber.vue';

export interface UiPhoneNumberPrefixProps {
  /**
   * Use this props to set default prefix phone code.
   */
  modelValue?: PhoneCodeType,
   /**
   * Use this props to set phone number prefix default country code.
   */
   languageData?: {
    country: SupportedCountryCodeType,
    language: string,
   },
   /**
   * Use this props to set country code items.
   */
  countryCodeItems?: CountryCodeItems,
}

const props = withDefaults(defineProps<UiPhoneNumberPrefixProps>(), {
  modelValue: () => ({
    code: '+1',
    countryCode: 'US',
    country: 'United States of America',
  }),
  languageData: () => ({
    country: 'us',
    language: 'en',
  }),
  countryCodeItems: () => [],
});
const emit = defineEmits([ 'update:modelValue' ]);

const prefixCodes = shallowRef<PhoneCodeType[]>(props.countryCodeItems || []);
const defaultCountryCode = computed({
  get() {
    return props.modelValue?.countryCode;
  },
  set(value) {
    const selectedCountry = prefixCodes.value.find((prefix) => prefix.countryCode === value);

    if (value && selectedCountry) emit('update:modelValue', selectedCountry);
  },
});

const prefixCode = computed(() => {
  const selectedPrefixCode = prefixCodes.value.find((prefix) => prefix.countryCode === defaultCountryCode.value);

  if (selectedPrefixCode) { return selectedPrefixCode.code.replace('+', '+ '); }

  return defaultCountryCode.value?.replace('+', '+ ');
});

const countryName = computed(() => {
  const selectedCountryName = prefixCodes.value.find((prefix) => prefix.countryCode === props.modelValue?.countryCode);

  if (selectedCountryName) { return selectedCountryName.country; }

  return defaultCountryCode.value;
});

const prefixButtonText = computed(() => `${countryName.value} (${prefixCode.value})`);

onMounted(async () => {
  if (prefixCodes.value.length > 0) return;
  prefixCodes.value = await getPhoneCodes(props.languageData);
});

</script>

<style lang="scss">
@use "../../../../../styles/mixins";
@use "../../../../../styles/functions";

.ui-phone-number-prefix {
  $this: &;
  $element: phone-number-prefix;

  &-form-field {
    --form-field-gap: 0#{functions.var($element + '-form-field-gap', gap, 0)};
  }

  &-dropdown-item {
    width: 100%;
  }

  &__popover {
    --popover-border: none;
    --dropdown-popover-width: 100%;
    --dropdown-popover-max-width: none;
    --dropdown-popover-min-height: #{functions.var($element + '-popover', min-height, 12.5rem)};

    z-index: functions.var($element + '-popover', z-index, 1);
    overflow-y: scroll;
    max-height: functions.var($element + '-popover', max-height, 20.5rem);
  }
}
</style>
