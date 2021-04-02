<template>
  <UiList class="ui-multiple-answer">
    <!-- @slot Use this slot to replace hint template. -->
    <slot
      name="hint"
      v-bind="{hint, hintType}"
    >
      <UiAlert
        v-if="hint"
        :type="hintType"
        class="ui-multiple-answer__hint"
      >
        {{ hint }}
      </UiAlert>
    </slot>
    <template
      v-for="choice in choices"
      :key="choice.id"
    >
      <!-- @slot Use this slot to replace list-item template.-->
      <slot
        name="list-item"
        v-bind="{choice, modelValue, updateHandler, errorClass, name, component}"
      >
        <UiListItem
          class="ui-multiple-answer__list-item"
          :class="{'ui-multiple-answer__list-item--has-error': hasError}"
        >
          <!-- @slot Use this slot to replace choice-item template.-->
          <slot
            name="choice-item"
            v-bind="{choice, modelValue, updateHandler, errorClass, name, component}"
          >
            <component
              :is="component"
              :id="choice.id"
              :value="choice"
              :model-value="modelValue"
              :name="name"
              class="ui-multiple-answer__choice"
              :class="errorClass"
              @update:modelValue="updateHandler(choice)"
            >
              <template #label>
                <!-- @slot Use this slot to replace choice-label template for specific item.-->
                <slot
                  :name="`label-${choice.id}`"
                  v-bind="{choice, component}"
                >
                  <div
                    class="ui-multiple-answer__label"
                    :class="`${component}__label`"
                  >
                    <UiText
                      tag="span"
                    >
                      {{ choice.name }}
                    </UiText>
                    <UiButton
                      v-if="choice.explication"
                      :aria-label="`${translation.explication} ${choice.name}`"
                      class="ui-multiple-answer__explication ui-button--text ui-button--has-icon"
                    >
                      <UiIcon icon="info" />
                    </UiButton>
                  </div>
                </slot>
              </template>
            </component>
          </slot>
        </UiListItem>
      </slot>
    </template>
  </UiList>
</template>

<script>
import { computed, watchEffect } from 'vue';
import UiList from '../UiList/UiList.vue';
import UiListItem from '../UiList/_internal/UiListItem.vue';
import UiRadio from '../../atoms/UiRadio/UiRadio.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiCheckbox from '../../atoms/UiCheckbox/UiCheckbox.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiAlert from '../../atoms/UiAlert/UiAlert.vue';

export default {
  name: 'UiMultipleAnswer',
  components: {
    UiRadio,
    UiCheckbox,
    UiListItem,
    UiList,
    UiText,
    UiButton,
    UiIcon,
    UiAlert,
  },
  props: {
    /**
     *  Use this props or v-model to set checked.
     */
    modelValue: {
      type: [Object, Array],
      default: () => ([]),
    },
    /**
     *  Use this props to set possible choices.
     */
    choices: {
      type: Array,
      default: () => ([]),
    },
    /**
     *  Use this props to group inputs with name attribute
     */
    name: {
      type: String,
      default: '',
    },
    /**
     * Use this props to set invalid state of component.
     */
    invalid: {
      type: Boolean,
      default: true,
    },
    /**
     * Use this props to set hint for question.
     */
    hint: {
      type: String,
      default: '',
    },
    /**
     * Use this props to touch component and show validation errors.
     */
    touched: {
      type: Boolean,
      default: false,
    },
    /**
     * Use this props to override labels inside component translation.
     */
    translation: {
      type: Object,
      default: () => ({
        explication: 'explication for',
      }),
    },
  },
  emits: ['update:modelValue', 'update:invalid'],
  setup(props, { emit }) {
    const component = computed(() => (Array.isArray(props.modelValue) ? 'ui-checkbox' : 'ui-radio'));
    const isCheckbox = computed(() => (component.value === 'ui-checkbox'));
    const valid = computed(() => {
      if (!props.invalid) {
        return true;
      }
      return isCheckbox.value
        ? props.modelValue.length > 0
        : props.modelValue.id;
    });
    const hasError = computed(() => (props.touched && !valid.value));
    const hintType = computed(() => (props.touched && props.invalid ? 'error' : 'default'));
    const errorClass = computed(() => (hasError.value ? `${component.value}--has-error` : ''));

    watchEffect(() => {
      if (!valid.value !== props.invalid) {
        emit('update:invalid', !valid.value);
      }
    });

    function updateHandler(value) {
      if (!isCheckbox.value) {
        emit('update:modelValue', value);
        return;
      }
      if (props.modelValue.some((evidence) => evidence.id === value.id)) {
        emit('update:modelValue', props.modelValue.filter((evidence) => evidence.id !== value.id));
      } else {
        emit('update:modelValue', [...props.modelValue, value]);
      }
    }

    return {
      hintType,
      component,
      hasError,
      errorClass,
      updateHandler,
    };
  },
};
</script>

<style lang="scss">
@import '../../../styles/mixins/_mixins.scss';

.ui-multiple-answer {
  &__list-item {
    --list-item-padding: 0;

    background: var(--multiple-answer-list-item-background);
    border: var(--multiple-answer-list-item-border, solid var(--color-border-subtle));
    border-width: var(--multiple-answer-list-item-border-width, 1px 0 0 0);

    &:last-of-type {
      border-width: var(--multiple-answer-list-item-border-width, 1px 0);
    }

    &:hover {
      background: var(--multiple-answer-list-item-hover-background);

      @media (min-width: 768px) {
        background: var(--multiple-answer-list-item-tablet-hover-background, var(--color-gray-50));
      }
    }

    &--has-error {
      --multiple-answer-list-item-background: var(--color-background-alert-error);
    }
  }

  &__hint {
    @include font(--font-body-2-comfortable-thick);

    margin: var(--multiple-answer-mobile-hint-margin, var(--space-12) var(--space-20));
    color: var(--multiple-answer-hint-color, var(--color-text-dimmed));

    @media (min-width: 768px) {
      margin: var(--multiple-answer-tablet-hint-margin, var(--space-12) 0);
    }
  }

  &__choice {
    width: 100%;
    padding: var(--multiple-answer-choice-padding, var(--space-12) var(--space-20));
  }

  &__label {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
  }

  &__explication {
    margin: var(--multiple-answer-margin, 0 0 0 var(--space-12));

    [dir=rtl] & {
      margin: var(--multiple-answer-margin, 0 var(--space-12) 0 0);
    }
  }
}
</style>
