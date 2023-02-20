<template>
  <UiListItem
    :id="id"
    :tag="component"
    :has-suffix="hasInfo"
    :suffix-attrs="suffixAttrs"
    :list-item-attrs="listItemAttrs"
  >
    <!-- @slot Use this slot to replace choice template.-->
    <template
      #content="{
        tag,
        hasSuffix,
        suffixComponent,
      }"
    >
      <slot
        v-bind="{
          id,
          value,
          invalid,
          label,
          component,
        }"
        :name="choiceItem && 'choice-item' || 'choice'"
      >
        <component
          :is="tag"
          v-bind="$attrs"
          :text-label-attrs="defaultProps.textLabelAttrs"
          :value="value"
          :model-value="modelValue"
          class="ui-list-item__content"
          :class="[ errorClass ]"
          @update:model-value="handleValueUpdate"
          @keydown="handleInfoFocus"
        >
          <!-- @slot Use this slot to place content inside list-item. -->
          <slot name="content" />
          <!-- @slot Use this slot to replace label template.-->
          <slot
            :name="`label-${id}`"
            v-bind="{ label }"
          >
            {{ label }}
          </slot>
        </component>
      </slot>

      <!-- @slot Use this slot to replace suffix template -->
      <slot
        name="suffix"
        v-bind="{
          hasSuffix,
          suffixComponent,
          suffixAttrs
        }"
      >
        <component
          :is="suffixComponent"
          v-if="hasSuffix"
          v-bind="suffixAttrs"
          class="ui-list-item__suffix ui-multiple-answer-item__suffix"
        />
      </slot>
    </template>
  </UiListItem>
</template>

<script setup lang="ts">
import {
  computed,
  useSlots,
} from 'vue';
import { focusElement } from '../../../../utilities/helpers/index';
import type { TextAttrsProps } from '../../../atoms/UiText/UiText.vue';
import type { ButtonAttrsProps } from '../../../atoms/UiButton/UiButton.vue';
import type { IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';
import type { MultipleAnswerModelValue } from '../UiMultipleAnswer.vue';
import UiCheckbox from '../../../atoms/UiCheckbox/UiCheckbox.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';
import type { ListItemAttrsProps } from '../../UiList/_internal/UiListItem.vue';
import UiRadio from '../../../atoms/UiRadio/UiRadio.vue';
import type {
  DefineAttrsProps,
  HTMLTag,
  Icon,
} from '../../../../types';

export interface MultipleAnswerItemTranslation {
  info?: string;
}
export interface MultipleAnswerItemProps {
  /**
   * Use this props to set invalid state of item.
   */
  invalid?: boolean;
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue?: MultipleAnswerModelValue;
  /**
   * Use this props to set value of item.
   */
  value?: MultipleAnswerModelValue;
  /**
   * Use this props to set label of item.
   */
  label?: string;
  /**
   * Use this props to set id of item.
   */
  id?: string;
  /**
   * Use this props to pass attrs for label UiText.
   */
  textLabelAttrs?: TextAttrsProps;
  /**
   * Use this props to pass attrs for info UiButton.
   */
  buttonInfoAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for info label element.
   */
  labelInfoAttrs?: DefineAttrsProps<null>;
  /**
   *  Use this props to pass attrs for info UiIcon.
   */
  iconInfoAttrs?: IconAttrsProps;
  /**
   * Use this props to pass labels inside component translation.
   */
  translation?: MultipleAnswerItemTranslation;
}
export type MultipleAnswerItemAttrsProps = DefineAttrsProps<MultipleAnswerItemProps, ListItemAttrsProps>
export interface MultipleAnswerItemEmits {
  (e: 'update:modelValue', value: MultipleAnswerModelValue): void;
}

const props = withDefaults(defineProps<MultipleAnswerItemProps>(), {
  invalid: true,
  modelValue: () => ([]),
  value: '',
  label: '',
  id: '',
  textLabelAttrs: () => ({
    tag: 'span',
    class: 'ui-multiple-answer-item__label',
  }),
  buttonInfoAttrs: () => ({}),
  labelInfoAttrs: () => ({}),
  iconInfoAttrs: () => ({ icon: 'info' }),
  translation: () => ({ info: 'What does it mean?' }),
});
const defaultProps = computed(() => {
  const tag: HTMLTag = 'span';
  const icon: Icon = 'info';
  return {
    translation: {
      info: 'What does it mean?',
      ...props.translation,
    },
    textLabelAttrs: {
      tag,
      class: 'ui-multiple-answer-item__label',
      ...props.textLabelAttrs,
    },
    iconInfoAttrs: {
      icon,
      ...props.iconInfoAttrs,
    },
  };
});
const emit = defineEmits<MultipleAnswerItemEmits>();
const isCheckbox = computed(() => (Array.isArray(props.modelValue)));
const component = computed(() => (isCheckbox.value ? UiCheckbox : UiRadio));
const componentName = computed(() => (isCheckbox.value ? 'ui-checkbox' : 'ui-radio'));
const errorClass = computed(() => (props.invalid
  ? [
    `${componentName.value}--has-error`,
    'ui-list-item--has-error',
  ]
  : []));
const handleInfoFocus = ({
  key, target, preventDefault,
}: KeyboardEvent) => {
  if (key !== 'ArrowRight') return;
  const input = target as HTMLInputElement;
  const info: HTMLElement | null | undefined = input
    .closest('.ui-multiple-answer-item')
    ?.parentNode
    ?.querySelector('.ui-multiple-answer-item__info');
  if (info) {
    preventDefault();
    focusElement(info);
  }
};
const handleInfoUnfocus = ({
  key, target, preventDefault,
}: KeyboardEvent) => {
  if (key !== 'ArrowLeft') return;
  const info = target as HTMLElement;
  const input: HTMLInputElement | null | undefined = info
    ?.parentNode
    ?.querySelector('input');
  if (input) {
    preventDefault();
    focusElement(input);
  }
};
const handleValueUpdate = (newValue: MultipleAnswerModelValue) => {
  emit('update:modelValue', newValue);
};
const suffixAttrs = computed(() => ({
  label: defaultProps.value.translation.info,
  tabindex: -1,
  onKeydown: handleInfoUnfocus,
  class: [ 'ui-multiple-answer-item__info' ],
  iconSuffixAttrs: defaultProps.value.iconInfoAttrs,
  labelSuffixAttrs: {
    class: [
      'visual-hidden',
      props.labelInfoAttrs?.class,
    ],
    ...props.labelInfoAttrs,
  },
  ...props.buttonInfoAttrs,
}));
const hasInfo = computed(() => (Object.keys(props.buttonInfoAttrs).length > 0));
const listItemAttrs = computed(() => ({
  class: [
    'ui-multiple-answer-item',
    { 'ui-multiple-answer-item--has-info': hasInfo.value },
  ],
}));

// TODO: remove in 0.6.0 / BEGIN
const slots = useSlots();
const choiceItem = computed(() => (slots['choice-item']));
if (choiceItem.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiMultipleAnswer]: The `choice-item` slot will be removed in 0.6.0. Please use `choice` slot instead.');
  }
}
// END
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-multiple-answer-item {
  $this: &;
  $element: multiple-answer-item;

  &--has-info {
    #{$this}__label {
      &::after {
        @include mixins.use-logical($element + "-suffix", margin, 0 0 0 var(--space-12));

        width: var(--icon-size, var(--icon-width, 1.5rem));
        height: var(--icon-size, var(--icon-height, 1.5rem));
        flex: none;
        content: "";
      }
    }
  }

  &__label {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__suffix {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    margin-block: var(--list-item-content-padding-block, var(--list-item-content-padding-block-start, var(--space-12)) var(--list-item-content-padding-block-end, var(--space-12)));
    margin-inline: var(--list-item-content-padding-inline, var(--list-item-content-padding-inline-start, var(--space-20)) var(--list-item-content-padding-inline-end, var(--space-12)));

    @include mixins.from-tablet {
      margin-block: var(--list-item-tablet-content-padding-block, var(--list-item-tablet-content-padding-block-start, var(--space-12)) var(--list-item-tablet-content-padding-block-end, var(--space-12)));
      margin-inline: var(--list-item-tablet-content-padding-inline, var(--list-item-tablet-content-padding-inline-start, var(--space-12)) var(--list-item-tablet-content-padding-inline-end, var(--space-12)));
    }
  }
}
</style>
