<template>
  <component
    :is="tag"
    class="ui-multiple-answer"
  >
    <!-- @slot Use this slot to replace hint template. -->
    <slot
      name="hint"
      v-bind="{
        hint,
        hintType,
        alertHintAttrs
      }"
    >
      <UiAlert
        v-if="hint"
        v-bind="alertHintAttrs"
        :type="hintType"
        class="ui-multiple-answer__hint"
      >
        {{ hint }}
      </UiAlert>
    </slot>
    <!-- @slot Use this slot to replace legend template. -->
    <slot
      name="legend"
      v-bind="{
        legend
      }"
    >
      <legend
        v-if="legend"
        class="visual-hidden"
      >
        {{ legend }}
      </legend>
    </slot>
    <UiList
      :items="itemsToRender"
      v-bind="$attrs"
      class="ui-multiple-answer__list"
    >
      <template #default>
        <template
          v-for="(item, index) in choices || items"
          :key="index"
        >
          <!-- @slot Use this slot to replace list-item template. -->
          <slot
            name="list-item"
            v-bind="{
              component,
              item,
              value,
              name,
              errorClass,
              focusExplication,
              componentName,
              unfocusExplication
            }"
          >
            <UiListItem class="ui-multiple-answer__list-item">
              <component
                :is="component"
                :id="item.id"
                v-model="value"
                :value="item"
                :name="name"
                class="ui-multiple-answer__choice"
                :class="errorClass"
                @keydown="focusExplication"
              >
                <template #label>
                  <!-- @slot Use this slot to replace choice-label template for specific item.-->
                  <slot
                    :name="`label-${item.id}`"
                    v-bind="{
                      item,
                      componentName
                    }"
                  >
                    <div
                      class="ui-multiple-answer__label"
                      :class="`${componentName}__label`"
                    >
                      <UiText
                        tag="span"
                      >
                        {{ item.name }}
                      </UiText>
                      <UiButton
                        v-if="item.buttonInfoAttrs"
                        v-bind="item.buttonInfoAttrs"
                        tabindex="-1"
                        class="ui-button--icon ui-multiple-answer__explication"
                        @keydown="unfocusExplication"
                      >
                        <UiIcon
                          icon="info"
                          class="ui-button__icon"
                        />
                      </UiButton>
                    </div>
                  </slot>
                </template>
              </component>
            </UiListItem>
          </slot>
        </template>
      </template>
      <template
        v-for="(item, index) in itemsToRender"
        :key="index"
        #[item.name]
      >
        <component
          :is="component"
          :id="item.id"
          v-model="value"
          :value="item"
          :name="name"
          class="ui-multiple-answer__choice"
          :class="errorClass"
          @keydown="focusExplication"
        >
          <template #label>
            <!-- @slot Use this slot to replace choice-label template for specific item.-->
            <slot
              :name="`label-${item.id}`"
              v-bind="{
                item,
                componentName
              }"
            >
              <div
                class="ui-multiple-answer__label"
                :class="`${componentName}__label`"
              >
                <UiText
                  tag="span"
                >
                  {{ item.name }}
                </UiText>
                <UiButton
                  v-if="item.buttonInfoAttrs"
                  v-bind="item.buttonInfoAttrs"
                  tabindex="-1"
                  class="ui-button--icon ui-multiple-answer__explication"
                  @keydown="unfocusExplication"
                >
                  <UiIcon
                    icon="info"
                    class="ui-button__icon"
                  />
                </UiButton>
              </div>
            </slot>
          </template>
        </component>
      </template>
    </UiList>
  </component>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import {
  computed,
  useAttrs,
  watch,
} from 'vue';
import type { PropType } from 'vue';
import UiList from '../UiList/UiList.vue';
import UiListItem from '../UiList/_internal/UiListItem.vue';
import UiRadio from '../../atoms/UiRadio/UiRadio.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiCheckbox from '../../atoms/UiCheckbox/UiCheckbox.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { PropsAttrs } from '../../../types/attrs';
import UiAlert from '../../molecules/UiAlert/UiAlert.vue';
import { focusElement } from '../../../utilities/helpers/index';
import type { HTMLTag } from '../../../types/tag';

export interface MultipleAnswerItem {
  name: string;
  id?: string
  buttonInfoAttrs?: Record<string, unknown>
}
export type MultipleAnswerValue = string | MultipleAnswerItem | MultipleAnswerItem[]
export type ComponentName = 'ui-checkbox' | 'ui-radio';
const props = defineProps({
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue: {
    type: [String, Object, Array] as PropType<MultipleAnswerValue>,
    default: () => ([]),
  },
  /**
   *  Use this props to set possible choices.
   */
  items: {
    type: Array as PropType<MultipleAnswerItem[]>,
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
   * Use this props to pass attrs for hint UiAlert
   */
  alertHintAttrs: {
    type: Object as PropsAttrs,
    default: () => ({
    }),
  },
  /**
   * Use this props to set multiple answer tag.
   */
  tag: {
    type: String as PropType<HTMLTag>,
    default: 'fieldset',
  },
  /**
   * Use this props to set legend.
   */
  legend: {
    type: String,
    default: '',
  },
});
const emit = defineEmits<{(e:'update:modelValue', value: MultipleAnswerValue): void,
  (e: 'update:invalid', value: boolean): void
}>();
const isCheckbox = computed(() => (Array.isArray(props.modelValue)));
const component = computed(() => (isCheckbox.value ? UiCheckbox : UiRadio));
const componentName = computed<ComponentName>(() => (isCheckbox.value ? 'ui-checkbox' : 'ui-radio'));
const valid = computed(() => (isCheckbox.value
  ? (props.modelValue as string).length > 0
  : !!(props.modelValue as MultipleAnswerItem).id));
const hasError = computed(() => (props.touched && !valid.value));
const hintType = computed(() => (props.touched && props.invalid ? 'error' : 'default'));
const errorClass = computed(() => ([hasError.value ? `${componentName.value}--has-error` : '', {
  'ui-multiple-answer__choice--has-error': hasError.value,
}]));
watch(valid, (value) => {
  emit('update:invalid', !value);
}, {
  immediate: true,
});
const value = computed({
  get: () => (props.modelValue),
  set: (value: MultipleAnswerValue) => {
    emit('update:modelValue', value);
  },
});
function focusExplication(event: KeyboardEvent) {
  if (event.key !== 'ArrowRight') return;
  const el = event.target as HTMLInputElement;
  const explicationButton: HTMLInputElement | null | undefined = el.closest(`.${componentName.value}`)?.querySelector('.ui-multiple-answer__explication');
  if (explicationButton) {
    event.preventDefault();
    focusElement(explicationButton);
  }
}
function unfocusExplication(event: KeyboardEvent) {
  if (event.key !== 'ArrowLeft') return;
  const el = event.target as HTMLInputElement;
  const answerInput: HTMLInputElement | null | undefined = el.closest(`.${componentName.value}`)?.querySelector('input');
  answerInput?.focus();
}
// TODO: remove in 0.6.0 / BEGIN
const attrs = useAttrs();
const choices = computed(() => (attrs.choices as MultipleAnswerItem[]));
if (choices.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiMultipleAnswer]: choices will be removed in 0.6.0. Please use items instead.');
  }
}
// END
const itemsToRender = computed(() => {
  const items = choices.value || props.items;
  return items.map((item: MultipleAnswerItem) => ({
    ...item,
    listItemAttrs: {
      class: 'ui-multiple-answer__list-item',
    },
  }));
});
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-multiple-answer {
  $this: &;
  $element: multiple-answer;

  @at-root fieldset#{&} {
    padding: 0;
    border: none;
    margin: 0;
  }

  &__hint {
    padding: functions.var($element + "-hint", padding, 0 var(--space-20) var(--space-12));

    @include mixins.from-tablet {
      padding: functions.var($element + "-tablet-hint", padding, 0 0 var(--space-12) 0);
    }
  }

  &__list-item {
    @include mixins.inner-border($element: multiple-answer-list-item, $color: var(--color-border-divider), $width: 1px 0 0 0);

    --list-item-padding: 0;

    &:last-of-type {
      &::after {
        border-width: functions.var($element, border-width, 1px 0);
      }
    }
  }

  &__label {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__choice {
    padding: functions.var($element + "-choice", padding, var(--space-12) var(--space-20));
    background: functions.var($element + "-choice", background, transparent);

    @include mixins.from-tablet {
      padding: functions.var($element + "-tablet-choice", padding, var(--space-12));

      @include mixins.hover {
        background: functions.var($element + "-tablet-choice-hover", background, var(--color-background-white-hover));
      }
    }

    &--has-error {
      @include mixins.from-tablet {
        background: functions.var($element + "-tablet-option", background, var(--color-background-error));

        @include mixins.hover {
          background: functions.var($element + "-tablet-option-hover", background, var(--color-background-error));
        }
      }
    }
  }

  &__explication {
    margin: functions.var($element + "-explication", margin, 0 0 0 var(--space-12));
  }
}
</style>
