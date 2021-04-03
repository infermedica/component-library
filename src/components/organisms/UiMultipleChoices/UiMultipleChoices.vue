<template>
  <UiList class="ui-multiple-choices">
    <!-- @slot Use this slot to replace hint template. -->
    <slot
      name="hint"
      v-bind="{hint, hintType}"
    >
      <UiAlert
        v-if="hint"
        :type="hintType"
        class="ui-multiple-choices__hint"
      >
        {{ hint }}
      </UiAlert>
    </slot>
    <template
      v-for="choice in choicesToUse"
      :key="choice.id"
    >
      <!-- @slot Use this slot to replace list-item template.-->
      <slot
        name="list-item"
        v-bind="{choice, options, evidences, updateHandler, hasError}"
      >
        <UiListItem class="ui-multiple-choices__list-item">
          <!-- @slot Use this slot to replace choice-item template.-->
          <slot
            name="choice-item"
            v-bind="{choice, options, evidences, hasError, updateHandler}"
          >
            <UiMultipleChoicesItem
              :choice="choice"
              :options="options"
              :model-value="evidences"
              :invalid="hasError(choice.id)"
              class="ui-multiple-choices__choice"
              @update:modelValue="updateHandler($event)"
            />
          </slot>
        </UiListItem>
      </slot>
    </template>
  </UiList>
</template>

<script>
import { watchEffect, computed } from 'vue';
import UiMultipleChoicesItem from './_internal/UiMultipleChoicesItem.vue';
import UiList from '../UiList/UiList.vue';
import UiListItem from '../UiList/_internal/UiListItem.vue';
import UiAlert from '../../atoms/UiAlert/UiAlert.vue';

export default {
  name: 'UiMultipleChoices',
  components: {
    UiMultipleChoicesItem, UiList, UiListItem, UiAlert,
  },
  props: {
    /**
     *  Use this props to set source of evidences.
     */
    source: {
      type: String,
      default: '',
    },
    /**
     *  Use this props to override default options.
     */
    options: {
      type: Array,
      default: () => ([
        { name: 'Yes', value: 'present' },
        { name: 'No', value: 'absent' },
        { name: 'Don\'t know', value: 'unknown' },
      ]),
    },
    /**
     * Use this props to set hint for question.
     */
    hint: {
      type: String,
      default: '',
    },
    /**
     *  Use this props to set possible choices.
     */
    choices: {
      type: Array,
      default: () => ([]),
    },
    /**
     *  Use this props or v-model to set checked.
     */
    modelValue: {
      type: Array,
      default: () => ([]),
    },
    /**
     * Use this props to set invalid state of component.
     */
    invalid: {
      type: Boolean,
      default: true,
    },
    /**
     * Use this props to touch component and show validation errors.
     */
    touched: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'update:invalid'],
  setup(props, { emit }) {
    const hintType = computed(() => (props.touched && props.invalid ? 'error' : 'default'));
    const evidences = computed(() => (
      props.modelValue.reduce(
        (object, evidence) => {
          // eslint-disable-next-line camelcase
          const { id } = evidence;
          return { ...object, [id]: { ...evidence } };
        }, {},
      )
    ));
    const valid = computed(() => (
      props.choices.every((choice) => (evidences.value[choice.id]))
    ));
    watchEffect(() => {
      if (!valid.value !== props.invalid) {
        emit('update:invalid', !valid.value);
      }
    });
    function hasError(id) {
      return props.touched && !evidences.value[id];
    }
    function updateHandler(value) {
      emit('update:modelValue', Object.values(value));
    }
    const choicesToUse = computed(() => (
      props.choices.map((evidence) => (props.source ? { ...evidence, source: props.source } : { ...evidence }))
    ));
    return {
      hintType,
      evidences,
      valid,
      hasError,
      updateHandler,
      choicesToUse,
    };
  },
};
</script>

<style lang="scss">
@import '../../../styles/mixins/_mixins.scss';

.ui-multiple-choices {
  --list-item-padding: 0;

  &__list-item {
    border:
      var(
        --multiple-choices-list-item-border,
        solid var(--color-border-subtle)
      );
    border-width: var(--multiple-choices-list-item-border-width, 1px 0 0 0);

    &:last-of-type {
      border-width: var(--multiple-choices-list-item-border-width, 1px 0);
    }

    &:hover {
      background: var(--multiple-choices-list-item-hover-background);

      @media (min-width: 768px) {
        background: var(--multiple-choices-list-item-hover-background, var(--color-gray-50));
      }
    }
  }

  &__hint {
    @include font(--font-body-2-comfortable-thick);

    margin: var(--multiple-choices-mobile-hint-margin, var(--space-12) var(--space-20));
    color: var(--multiple-choices-hint-color, var(--color-text-dimmed));

    @media (min-width: 768px) {
      margin: var(--multiple-choices-tablet-hint-margin, var(--space-12) 0);
    }
  }

  &__choice {
    padding: var(--multiple-choices-choice-padding);

    @media (min-width: 768px) {
      padding: var(--multiple-choices-choice-padding, var(--space-12));
    }
  }
}
</style>
