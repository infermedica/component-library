<template>
  <UiDropdown
    v-model="prefix"
    :text="toggleButtonText"
    :items="countryCodesToRender"
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
      }, key) in countryCodesToRender"
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
import UiDropdown from '../../../UiDropdown/UiDropdown.vue';
import UiPhoneNumberPrefixToggle from './UiPhoneNumberPrefixToggle.vue';
import {
  type PhoneCodeType,
  type SupportedCountryCodeType,
} from '../../helpers';
import { type CountryCodes } from '../../UiPhoneNumber.vue';
import type { DefineAttrsProps } from '../../../../../types';

export interface PhoneNumberPrefixProps {
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
  countryCodes?: CountryCodes,
}
export type PhoneNumberPrefixAttrsProps = DefineAttrsProps<PhoneNumberPrefixProps>

const props = withDefaults(defineProps<PhoneNumberPrefixProps>(), {
  modelValue: () => ({
    code: '',
    countryCode: '',
    country: '',
  }),
  languageData: () => ({
    country: 'us',
    language: 'en',
  }),
  countryCodes: () => ([]),
});
const emit = defineEmits([ 'update:modelValue' ]);
const prefix = computed({
  get() { return props.modelValue; },
  set(value) { emit('update:modelValue', value); },
});
const countryCode = computed(() => prefix.value?.code);
const countryName = computed(() => prefix.value?.country);
const toggleButtonText = computed(() => (countryName.value ? `${countryName.value} (${countryCode.value})` : ''));
const countryCodesToRender = ref<PhoneCodeType[]>([]);
onMounted(async () => {
  if (props.countryCodes.length < 1) {
    const helpers = await import('../../helpers/index');
    countryCodesToRender.value = await helpers.getPhoneCodes(props.languageData);
    return;
  }
  countryCodesToRender.value = props.countryCodes;
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
