<template>
  <div class="ui-multiple-choices">
    <!-- @slot Use this slot to replace hint template. -->
    <slot
      name="hint"
      v-bind="{hint, hintType, alertHintAttrs}"
    >
      <UiAlert
        v-if="hint"
        v-bind="alertHintAttrs"
        :type="hintType"
        class="ui-multiple-choices__hint"
      >
        {{ hint }}
      </UiAlert>
    </slot>
    <UiList
      class="ui-multiple-choices__list"
      v-bind="$attrs"
    >
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
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, watch } from 'vue';
import type { PropType } from 'vue';
import type { PropsAttrs } from '../../../types/attrs';
import UiMultipleChoicesItem from './_internal/UiMultipleChoicesItem.vue';
import UiList from '../UiList/UiList.vue';
import UiListItem from '../UiList/_internal/UiListItem.vue';
import UiAlert from '../../molecules/UiAlert/UiAlert.vue';

export type MultipleChoiceValue = 'present' | 'absent' | 'unknown';
export interface MultipleChoiceEvidence {
  id: number;
  question?: number;
  name?: string;
  'choice_id'?: MultipleChoiceValue;
  source?: string;
  [key: string]: unknown
}
export type MultipleChoiceModelValue = Record<number, MultipleChoiceEvidence>
export interface MultipleChoiceOption {
  name?: 'Yes' | 'No' | 'Don\'t know';
  value?: MultipleChoiceValue;
  [key: string]: unknown
}
export interface MultipleChoice extends MultipleChoiceEvidence {
  'linked_observation'?: 'p_8',
  translation?: {info: string; [key:string]: unknown};
  buttonInfoAttrs?: Record<string, unknown>;
  [key: string]: unknown;
}
const props = defineProps({
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
    type: Array as PropType<MultipleChoiceOption[]>,
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
    type: Array as PropType<MultipleChoice[]>,
    default: () => ([]),
  },
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue: {
    type: Array as PropType<MultipleChoiceEvidence[]>,
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
  /**
   * Use this props to pass attrs for hint UiAlert
   */
  alertHintAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: MultipleChoiceEvidence[]): void, (e: 'update:invalid', value: boolean): void}>();
const hintType = computed<'error'| 'default'>(() => (props.touched && props.invalid ? 'error' : 'default'));
const evidences = computed(() => (
  props.modelValue.reduce((object: MultipleChoiceModelValue, evidence: MultipleChoiceEvidence) => {
    // eslint-disable-next-line camelcase
    const { id } = evidence;
    return { ...object, [id]: { ...evidence } };
  }, {})
));
const valid = computed(() => (
  props.choices.every((choice) => (evidences.value[choice.id]))
));
watch(valid, (value) => {
  emit('update:invalid', !value);
}, { immediate: true });
function hasError(id: number): boolean {
  return props.touched && !evidences.value[id];
}
function updateHandler(value: MultipleChoiceModelValue): void {
  emit('update:modelValue', Object.values(value));
}
const choicesToUse = computed<MultipleChoiceEvidence[]>(() => (
  props.choices.map((evidence) => (props.source ? { ...evidence, source: props.source } : { ...evidence }))
));
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-multiple-choices {
  &__list {
    --list-item-padding: 0;
  }

  &__list-item {
    @include inner-border($element: multiple-choice-list-item, $color: var(--color-border-divider), $width: 1px 0 0 0);

    &:last-of-type {
      --multiple-choice-list-item-border-width: var(--multiple-choice-list-item-last-border-width, 1px 0);
    }

    @media (hover: hover) {
      &:hover {
        background: var(--multiple-choices-list-item-hover-background);

        @include from-tablet {
          background: var(--multiple-choices-list-item-hover-background, var(--color-gray-50));
        }
      }
    }
  }

  &__hint {
    margin: var(--multiple-choices-mobile-hint-margin, 0 var(--space-20) var(--space-12) var(--space-20));
    color: var(--multiple-choices-hint-color, var(--color-text-dimmed));

    @include from-tablet {
      margin: var(--multiple-choices-tablet-hint-margin, 0 0 var(--space-12) 0);
    }
  }

  &__choice {
    padding: var(--multiple-choices-choice-padding);

    @include from-tablet {
      padding: var(--multiple-choices-choice-padding, var(--space-12));
    }
  }
}
</style>
