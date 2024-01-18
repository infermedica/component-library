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
    <template
      v-for="(_, key) in internalPrefixCodes"
      :key="key"
      #[`dropdown-item-${key}`]="{
        item: {
          code,
          country,
        },
      }"
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
  watch,
} from 'vue';
import UiDropdown from '../../../UiDropdown/UiDropdown.vue';
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
  get() { return props.modelValue; },
  set(value) { emit('update:modelValue', value); },
});

const prefixCode = computed(() => {
  const selectedPrefixCode = internalPrefixCodes.value.find(
    (prefix) => prefix.countryCode === defaultCountryCode.value.countryCode,
  );

  if (selectedPrefixCode) { return selectedPrefixCode.code.replace('+', '+ '); }

  return defaultCountryCode.value?.code.replace('+', '+ ');
});

const countryName = computed(() => {
  const selectedCountryName = internalPrefixCodes.value.find(
    (prefix) => prefix.countryCode === props.modelValue.countryCode,
  );

  if (selectedCountryName) { return selectedCountryName.country; }

  return defaultCountryCode.value.country;
});

const prefixButtonText = computed(() => {
  if (countryName.value) {
    return `${countryName.value} (${prefixCode.value})`;
  }
  return '';
});

const positionItem = ref(0);

watch(prefixCodes, (value) => {
  if (value && value.length > 0) { internalPrefixCodes.value = value; }
});

onMounted(async () => {
  if (prefixCodes.value) {
    internalPrefixCodes.value = prefixCodes.value;
    return;
  }

  internalPrefixCodes.value = await getPhoneCodes(props.languageData);
  positionItem.value = internalPrefixCodes.value.entries().next().value[0] + 1;
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

    --dropdown-popover-width: 100%;
    --dropdown-popover-max-width: none;
    --dropdown-popover-min-height: #{functions.var($element + '-popover', min-height, 12.5rem)};

    z-index: functions.var($element + '-popover', z-index, 1);
    overflow-y: scroll;
    max-height: functions.var($element + '-popover', max-height, 20.5rem);
  }
}
</style>
