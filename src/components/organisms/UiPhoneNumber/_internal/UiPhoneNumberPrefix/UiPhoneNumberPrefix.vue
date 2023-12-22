<template>
  <UiDropdown
    v-model="defaultCountryCode"
    :text="prefixCode"
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
    <template
      #popover="{
        closeHandler,
        isOpen,
        popoverAttrs,
      }"
    >
      <UiPopover
        v-if="isOpen"
        v-bind="popoverAttrs"
        class="ui-dropdown__popover"
        :title="popoverTitle"
        @close="closeHandler"
      >
        <template
          #title="{
            headingTitleAttrs,
            title,
          }"
        >
          <UiHeading
            v-bind="headingTitleAttrs"
          >
            {{ title }}
          </UiHeading>
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
      </UiPopover>
    </template>
  </UiDropdown>
</template>

<script setup lang="ts">
import {
  shallowRef,
  computed,
  onMounted,
} from 'vue';
import UiPopover from '../../../../molecules/UiPopover/UiPopover.vue';
import UiDropdown from '../../../../molecules/UiDropdown/UiDropdown.vue';
import UiDropdownItem from '../../../../molecules/UiDropdown/_internal/UiDropdownItem.vue';
import UiPhoneNumberPrefixToggle from './UiPhoneNumberPrefixToggle.vue';
import UiHeading from '../../../../atoms/UiHeading/UiHeading.vue';
import { getPhoneCodes } from '../../../../../utilities/helpers';
import type { PhoneCodeType } from '../../../../../utilities/helpers';

export interface UiPhoneNumberPrefixProps {
  modelValue?: PhoneCodeType,
}

export interface InputEmits {
  (e: 'update:modelValue', value: PhoneCodeType): void
}

const props: UiPhoneNumberPrefixProps = withDefaults(defineProps<UiPhoneNumberPrefixProps>(), {
  modelValue: () => ({
    code: '+1',
    countryCode: 'US',
    country: 'United States of America',
  }),
});

const emit = defineEmits<InputEmits>();

const prefixCodes = shallowRef<PhoneCodeType[]>([]);

const defaultCountryCode = computed({
  get() {
    const { modelValue } = props;
    return modelValue?.countryCode;
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

const popoverTitle = computed(() => `${countryName.value} (${prefixCode.value})`);

onMounted(async () => {
  prefixCodes.value = await getPhoneCodes();
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

    width: calc(100% - 108px );
  }

  &-dropdown-item {
    width: 100%;
  }

  &__popover {
    --popover-border: none;
    --dropdown-popover-width: 100%;
    --dropdown-popover-max-width: none;
    --dropdown-popover-min-height: #{functions.var($element + '-popover', min-height, 12.5rem)};

    width: var(--phone-number-dropdown-width);
    z-index: functions.var($element + '-popover', z-index, 1);
    overflow-y: scroll;
    max-height: functions.var($element + '-popover', max-height, 20.5rem);
  }
}
</style>
