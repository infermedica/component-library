<template>
  <UiDropdown
    v-model="defaultCountryCode"
    :text="prefixButtonText"
    :items="internalPrefixCodes"
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
        }, position) in internalPrefixCodes"
        :key="`${countryCode}-${country}`"
        :value="countryCode"
        :aria-setsize="internalPrefixCodes.length"
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
  ref,
  computed,
  onMounted,
  watch,
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
    code: '',
    countryCode: '',
    country: '',
  }),
  languageData: () => ({
    country: 'us',
    language: 'en',
  }),
  countryCodeItems: undefined,
});
const emit = defineEmits([ 'update:modelValue' ]);

const prefixCodes = computed(() => props.countryCodeItems);
const internalPrefixCodes = ref<PhoneCodeType[]>([]);
const defaultCountryCode = computed({
  get() {
    return props.modelValue.countryCode || '';
  },
  set(value) {
    const selectedCountry = internalPrefixCodes.value.find((prefix) => prefix.countryCode === value);

    if (value && selectedCountry) emit('update:modelValue', selectedCountry);
  },
});

const prefixCode = computed(() => {
  const selectedPrefixCode = internalPrefixCodes.value.find(
    (prefix) => prefix.countryCode === defaultCountryCode.value,
  );

  if (selectedPrefixCode) { return selectedPrefixCode.code.replace('+', '+ '); }

  return defaultCountryCode.value?.replace('+', '+ ');
});

const countryName = computed(() => {
  const selectedCountryName = internalPrefixCodes.value.find(
    (prefix) => prefix.countryCode === props.modelValue.countryCode,
  );

  if (selectedCountryName) { return selectedCountryName.country; }

  return defaultCountryCode.value;
});

const prefixButtonText = computed(() => {
  if (countryName.value) {
    return `${countryName.value} (${prefixCode.value})`;
  }
  return '';
});

watch(prefixCodes, (value) => {
  if (value && value.length > 0) { internalPrefixCodes.value = value; }
});

onMounted(async () => {
  if (prefixCodes.value) return;

  internalPrefixCodes.value = await getPhoneCodes(props.languageData);
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
    --popover-border-block-style: none;

    z-index: functions.var($element + '-popover', z-index, 1);
    overflow-y: scroll;
    max-height: functions.var($element + '-popover', max-height, 20.5rem);
  }
}
</style>
