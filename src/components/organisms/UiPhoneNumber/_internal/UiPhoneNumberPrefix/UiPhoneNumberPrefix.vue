<template>
  <UiDropdown
    v-model="value"
    :text="prefixCode"
    :items="items"
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
      v-for="(_, key) in items"
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
  shallowRef,
  computed,
  onMounted,
} from 'vue';
import UiDropdown from '../../../../molecules/UiDropdown/UiDropdown.vue';
import UiPhoneNumberPrefixToggle from './UiPhoneNumberPrefixToggle.vue';
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

const value = computed({
  get() {
    const { modelValue } = props;
    return modelValue;
  },
  set(val) {
    if (val) emit('update:modelValue', val);
  },
});

const prefixCode = computed(() => {
  const { code } = value.value as PhoneCodeType;
  return code.replace('+', '+ ');
});

const items = shallowRef<PhoneCodeType[]>([]);

onMounted(async () => {
  items.value = await getPhoneCodes();
});
</script>

<style lang="scss">
@use "../../../../../styles/mixins";
@use "../../../../../styles/functions";

.ui-phone-number-prefix {
  $this: &;
  $element: phone-number-prefix;

  width: functions.var($element + "-dropdown", width, 100%);

  &__popover {
    --popover-border: none;
    --dropdown-popover-width: 100%;
    --dropdown-popover-max-width: none;
    --dropdown-popover-min-height: #{functions.var($element + '-popover', min-height, 12.5rem)};;

    z-index: functions.var($element + '-popover', z-index, 1);
    overflow-y: scroll;
    max-height: functions.var($element + '-popover', max-height, 20.5rem);
  }
}
</style>
