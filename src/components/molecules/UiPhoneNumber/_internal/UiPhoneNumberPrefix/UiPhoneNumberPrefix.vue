<template>
  <UiDropdown
    v-model="prefix"
    :text="toggleButtonText"
    :items="countriesInfo"
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
    <template
      v-for="({
        country, code,
      }, key) in countriesInfo"
      :key="key"
      #[`dropdown-item-${key}`]
    >
      {{ country }} ({{ code }})
    </template>
  </UiDropdown>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
} from 'vue';
import type { Alpha2Code } from 'i18n-iso-countries';
import UiDropdown from '../../../UiDropdown/UiDropdown.vue';
import UiPhoneNumberPrefixToggle from './UiPhoneNumberPrefixToggle.vue';
import {
  type CountryInfoType,
  type PhoneCodeType,
  getCountriesInfo,
} from '../../helpers';

export interface PhoneNumberPrefixProps {
  /**
   * Use this props to set default prefix phone code.
   */
  modelValue?: PhoneCodeType,
  /**
   * Use this props to set phone number prefix default country code.
   */
  language?: string,
  /**
   * Use this props to set country code items.
   */
  countryCodes?: Alpha2Code[],
}

const props = withDefaults(defineProps<PhoneNumberPrefixProps>(), {
  modelValue: () => ({
    // TODO: generic "code" and "countryCode" are hard to distinguish
    code: '',
    countryCode: '',
  }),
  language: 'en',
  countryCodes: () => ([]),
});
const emit = defineEmits([ 'update:modelValue' ]);

const prefix = computed({
  get() { return props.modelValue; },
  set(value) { emit('update:modelValue', value); },
});

const countriesInfo = ref<CountryInfoType[]>([]);
const toggleButtonText = computed(() => {
  if (!prefix.value) return '';

  const selectedCountryInfo = countriesInfo.value.find((item) => (
    item.countryCode === prefix.value.countryCode || item.code === prefix.value.code
  ));
  return selectedCountryInfo ? `${selectedCountryInfo.country} (${selectedCountryInfo.code})` : '';
});

onMounted(async () => {
  countriesInfo.value = getCountriesInfo(props.countryCodes, props.language);
});

</script>

<style lang="scss">
@use "../../../../../styles/mixins";
@use "../../../../../styles/functions";

.ui-phone-number-prefix {
  $this: &;
  $element: phone-number-prefix;

  &__popover {
    @include mixins.override-logical('popover', null, border-width, 0);

    --dropdown-popover-width: #{functions.var($element + "-popover", width, 100% )};
    --dropdown-popover-max-width: #{functions.var($element + "-popover", max-width, 100% )};
    --dropdown-popover-min-height: #{functions.var($element + '-popover', min-height, 12.5rem)};

    z-index: functions.var($element + '-popover', z-index, 1);
    overflow-y: scroll;
    max-height: functions.var($element + '-popover', max-height, 20.5rem);
  }
}
</style>
