<template>
  <div
    class="ui-form-field"
  >
    <slot
      name="label"
      v-bind="{labelAttrs, label, hint, id: inputId}"
    >
      <UiText
        v-if="label"
        tag="label"
        :for="inputId"
        class="ui-form-field__label"
        v-bind="labelAttrs"
      >
        <UiText
          class="ui-form-field__label-text"
          tag="span"
        >
          {{ label }}
        </UiText>
        <UiText
          v-if="hint"
          class="ui-form-field__label-tag"
          tag="span"
        >
          {{ hint }}
        </UiText>
      </UiText>
    </slot>
    <slot v-bind="{id: inputId}" />
    <slot
      name="alert"
      v-bind="{alert: alertAttrs, errorMessage}"
    >
      <UiAlert
        v-if="errorMessage"
        v-bind="alertAttrs"
        class="ui-form-field__alert"
      >
        {{ errorMessage }}
      </UiAlert>
    </slot>
  </div>
</template>

<script setup>
import { uid } from 'uid/single';
import { computed } from 'vue';
import UiAlert from '../../atoms/UiAlert/UiAlert.vue';
import UiText from '../../atoms/UiText/UiText.vue';

const props = defineProps({
  /**
     * Use this props to set label $attrs
     */
  labelAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
     * Use this props to set label text
     */
  label: {
    type: [Boolean, String],
    default: false,
  },
  /**
     * Use this props to set input id and label for
     */
  id: {
    type: String,
    default: '',
  },
  /**
     * Use this props to set label hint like "Required" or "Optional"
     */
  hint: {
    type: String,
    default: '',
  },
  /**
     * Use this props to set alert $attrs
     */
  alertAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
     * Use this props to set alert message
     */
  errorMessage: {
    type: [Boolean, String],
    default: '',
  },
});
const inputId = computed(() => (
  props.id || `input-${uid()}`
));
</script>

<style lang="scss">
.ui-form-field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__label {
    display: flex;
  }

  &__label-text {
    margin: var(--form-field-label-text-margin, 0 0 var(--space-8) 0);
    color: var(--form-field-label-text-color, var(--color-text-body));
  }

  &__label-tag {
    margin: var(--form-field-label-tag-margin, 0 0 0 var(--space-8));
    color: var(--form-field-label-tag-color, var(--color-text-dimmed));

    [dir=rtl] & {
      margin: var(--form-field-label-tag-margin, 0 var(--space-8) 0 0);
    }
  }

  &__alert {
    margin: var(--form-field-alert-margin, var(--space-8) 0 0 0);
  }
}
</style>
