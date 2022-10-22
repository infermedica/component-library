<template>
  <slot
    name="controls"
    v-bind="{
      error,
      touched,
      value: modelValue,
    }"
  >
    <section
      v-if="!isLoading"
      class="ui-phone-number"
    >
      <fieldset class="ui-phone-number__fields">
        <UiText
          tag="legend"
          class="ui-form-field__label"
        >
          <UiText
            class="ui-form-field__label-text"
            tag="span"
          >
            {{ label }}
          </UiText>
        </UiText>
        <slot
          name="dropdown"
          v-bind="{
            selected,
            phoneCodes,
            error
          }"
        >
          <UiFormField
            id="ui-phone-number__dropdown"
            class="ui-phone-number__dropdown-form-field"
            :error-message="false"
            :label="countryCodeLabel"
            :text-message-attrs="{ class: 'visual-hidden' }"
            :text-hint-attrs="{ class: 'visual-hidden' }"
          >
            <template #default>
              <UiDropdown
                id="ui-phone-number__dropdown"
                class="ui-phone-number__dropdown"
                :model-value="selected"
                @update:model-value="handleOnSelected"
              >
                <template
                  #toggle="{
                    toggleHandler, isOpen
                  }"
                >
                  <UiButton
                    id="ui-phone-number__dropdown"
                    class="ui-button--outlined ui-button--has-icon ui-phone-number__dropdown-button"
                    :class="{ 'ui-button--has-error': error, }"
                    type="button"
                    @click="event => updateOffset(event, toggleHandler)"
                  >
                    <span class="ui-phone-number__dropdown-text--desktop">
                      {{ formatPrefix(selected.code) }}
                    </span>
                    <span class="ui-phone-number__dropdown-text--mobile">
                      {{ selected.country }} ({{ selected.code }})
                    </span>
                    <UiIcon
                      :icon="isOpen ? `chevron-up` : `chevron-down`"
                      class="ui-button__icon"
                    />
                  </UiButton>
                </template>
                <template
                  v-for="(option, key) in phoneCodes"
                  :key="key"
                >
                  <UiDropdownItem
                    :value="option"
                    class="ui-dropdown-item--compact"
                  >
                    {{ option.country }} ({{ option.code }})
                  </UiDropdownItem>
                </template>
              </UiDropdown>
            </template>
          </UiFormField>
        </slot>

        <slot
          name="input"
          v-bind="{
            value: phone,
            error,
            handleOnBlur,
          }"
        >
          <UiFormField
            id="ui-phone-number__input"
            class="ui-phone-number__input-form-field"
            :error-message="error"
            :label="label"
            :text-message-attrs="{ class: 'visual-hidden' }"
            :text-hint-attrs="{ class: 'visual-hidden' }"
          >
            <template #default="{ id }">
              <UiInput
                :id="id"
                v-model="phone"
                class="ui-phone-number__input"
                :class="{ 'ui-input--has-error': error, }"
                :placeholder="placeholder"
                type="number"
                @blur="handleOnBlur"
              />
            </template>
          </UiFormField>
        </slot>
      </fieldset>
    </section>
  </slot>
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import type {
  ComputedRef,
  PropType,
} from 'vue';
import {
  computed,
  onMounted,
  ref,
} from 'vue';
import { PhoneNumberUtil } from 'google-libphonenumber';
import type { DropdownValue } from '../../molecules/UiDropdown/UiDropdown.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiDropdown from '../../molecules/UiDropdown/UiDropdown.vue';
import UiDropdownItem from '../../molecules/UiDropdown/_internal/UiDropdownItem.vue';
import UiFormField from '../../molecules/UiFormField/UiFormField.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiInput from '../../atoms/UiInput/UiInput.vue';
import { getPhoneCodes } from '../../../utilities/helpers';
import type { PhoneCodeType } from '../../../utilities/helpers';
import type { UiPhoneNumberProps } from './types';

const emit = defineEmits([
  'update:modelValue',
  'update:touched',
  'update:invalid',
]);

const props: UiPhoneNumberProps = defineProps({
  /**
   * Use this prop to set the label text.
   */
  label: {
    type: String as PropType<string>,
    default: 'Phone number',
  },
  /**
   * Use this prop to set the hidden country-code label text.
   */
  countryCodeLabel: {
    type: String as PropType<string>,
    default: 'Country code',
  },
  /**
   * Use this props to set the input's placeholder
   */
  placeholder: {
    type: String as PropType<string>,
    default: 'Put your phone number',
  },
  /**
   * Use this props to set alert message
   */
  errorMessage: {
    type: String as PropType<string>,
    default: 'Error message',
  },
  /**
   * Use this props to control the phone-number value
   */
  modelValue: {
    type: String as PropType<string>,
    default: '',
  },
  /**
   * Use this props to touch the component and show validation errors
   */
  touched: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /**
   * Use this prop to set the label text.
   */
  language: {
    type: String as PropType<string>,
    default: 'en',
  },
  /**
   * Use this prop to set the default selected country code in the dropdown.
   */
  defaultCountryCode: {
    type: String as PropType<string>,
    default: 'US',
  },
  /**
   * Use this props to set label hint, ex: "Required" or "Optional"
   */
  hint: {
    type: [
      Boolean,
      String,
    ] as PropType<boolean | string>,
    default: false,
  },
});

const isLoading = ref(true);

const phone = ref('');

const phoneCodes = ref<(PhoneCodeType)[]>([]);

const selected = ref<(PhoneCodeType)>();

const popoverOffsetTop = ref<number>();

const validatePhone = (phoneNumber: string): boolean => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  try {
    return phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber));
  } catch {
    return false;
  }
};

const error: ComputedRef<string | boolean> = computed(() => {
  if (!props.touched) return false;
  let err: boolean | string = false;
  if (!phone.value) err = props.errorMessage;
  else {
    const value = `${selected.value?.code}${phone.value}`;
    emit('update:modelValue', value);
    const isValid = validatePhone(value);
    if (!isValid) {
      err = props.errorMessage;
    }
  }
  emit('update:invalid', Boolean(err));
  return err;
});

const handleOnSelected = (value: DropdownValue) => {
  selected.value = value as Record<string, unknown> as PhoneCodeType;
};

const formatPrefix = (prefix: string): string => prefix.replace('+', '+ ');

const handleOnBlur = (): void => {
  if (phone.value !== '') emit('update:touched', true);
};

const updateOffset = (event: MouseEvent, callback: () => void) => {
  const buttonHeight = 48;
  popoverOffsetTop.value = event.y + buttonHeight;
  callback();
};

onMounted(async () => {
  phoneCodes.value = await getPhoneCodes(props.language);
  isLoading.value = false;
  selected.value = phoneCodes.value.find(
    (prefix) => prefix.countryCode === props.defaultCountryCode,
  ) || phoneCodes.value[0];
});
</script>

<style lang="scss">
@use "../../../styles/mixins";
@use "../../../styles/functions";

.ui-phone-number {
  $this: &;
  $element: phone-number;

  // reset fieldset styles
  fieldset {
    border: 0;
    margin: 0;
    min-width: 0;
    padding: 0.01em 0 0 0;
  }

  &__fields {
    display: flex;
    width: 100%;
    flex-direction: column;
    //gap: functions.var($element + "-fields-mobile", gap, 0));

    @include mixins.from-tablet {
      flex-direction: row;
      gap: functions.var($element + "-fields-desktop", gap, var(--space-4));
    }

    #{$this}__dropdown {
      --button-padding: var(--space-12);
      --button-icon-margin: 0 var(--space-4) 0 var(--space-8);

      font: var(--font-body-1);
      width: 100%;

      &-button {
        --button-color: var(--color-text-body);
        --button-hover-color: var(--color-text-body);
        --button-active-color: var(--color-text-body);
        --button-border-color: var(--color-border-strong);
        --button-hover-border-color: var(--color-border-strong-hover);
        --button-padding: var(--space-12) var(--space-12) var(--space-12) var(--space-16);
        --button-background: var(--color-background-white);
        --button-hover-background: var(--color-background-white);
        --button-active-background: var(--color-background-white);
        --icon-color: var(--color-icon-secondary);
        --button-icon-color-active: var(--color-icon-secondary-active);
        --button-icon-color-hover: var(--color-icon-secondary-hover);
        --button-icon-margin: 0;
        --button-width: 100%;

        justify-content: space-between;
        font: var(--font-body-1);
      }

      .ui-dropdown-item {
        text-align: left;
        white-space: break-spaces;
      }

      .ui-popover {
        --popover-border: none;

        width: 100%;
        min-height: 200px;
        max-height: calc(100vh - (v-bind(popoverOffsetTop) * 1px)); /* stylelint-disable-line value-keyword-case */
        overflow-y: scroll;
        border: 1px solid var(--color-border-subtle);
      }

      #{$this}__dropdown-text {
        &--mobile {
          white-space: pre-wrap;
          flex-grow: 1;
          text-align: left;

          @include mixins.from-tablet {
            display: none;
          }
        }

        &--desktop {
          white-space: pre-wrap;
          flex-grow: 1;
          text-align: left;

          @include mixins.to-mobile {
            display: none;
          }
        }
      }
    }

    #{$this}__input-form-field {
      #{$this}__input {
        width: 100%;
      }
    }
  }
}
</style>
