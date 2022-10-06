<template>
  <component
    :is="tag"
    role="radiogroup"
    :aria-labelledby="ariaLabelledby"
    :class="['ui-multiple-choices-item', {
      'ui-multiple-choices-item--has-error': invalid
    }]"
  >
    <!-- @slot Use this slot to replace legend template. -->
    <slot name="legend">
      <legend class="visual-hidden">
        {{ item.name }}
      </legend>
    </slot>
    <!-- @slot Use this slot to replace name template.-->
    <slot
      name="name"
      v-bind="{
        id: ariaLabelledby,
        item,
      }"
    >
      <div class="ui-multiple-choices-item__header">
        <UiText
          :id="ariaLabelledby"
          tag="span"
          class="ui-multiple-choices-item__name"
        >
          {{ item.name }}
        </UiText>
        <UiButton
          v-if="item.buttonInfoAttrs"
          v-bind="item.buttonInfoAttrs"
          class="ui-button--text ui-button--small ui-multiple-choices-item__info"
        >
          <UiIcon
            icon="info"
            class="ui-button__icon ui-multiple-choices-item__info-icon"
          />
          <span class="ui-multiple-choices-item__info-message">
            {{ item.translation.info }}
          </span>
        </UiButton>
      </div>
    </slot>
    <div class="ui-multiple-choices-item__options">
      <template
        v-for="(option, key) in options"
        :key="key"
      >
        <!-- @slot Use this slot to replace option template.-->
        <slot
          name="option"
          v-bind="{
            value,
            option,
            item,
            invalid,
          }"
        >
          <UiRadio
            v-model="value"
            v-bind="option"
            :class="['ui-multiple-choices-item__option', {
              'ui-radio--has-error': invalid
            }]"
          >
            {{ option.name }}
          </UiRadio>
        </slot>
      </template>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { uid } from 'uid/single';
import type { PropType } from 'vue';
import type { HTMLTag } from '../../../../types/tag';
import UiText from '../../../atoms/UiText/UiText.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiRadio from '../../../atoms/UiRadio/UiRadio.vue';
import type { MultipleChoiceOption } from '../UiMultipleChoices.vue';

const props = defineProps({
  /**
   * Use this props to set multiple choices item tag.
   */
  tag: {
    type: String as PropType<HTMLTag>,
    default: 'fieldset',
  },
  /**
   * Use this props to set invalid state of choice item.
   */
  invalid: {
    type: Boolean,
    default: true,
  },
  /**
   *  Use this props or v-model to set checked.
   */
  modelValue: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set value of item.
   */
  item: {
    type: Object,
    default: () => ({
    }),
  },
  /**
   *  Use this props to override default options.
   */
  options: {
    type: Array as PropType<MultipleChoiceOption[]>,
    default: () => ([]),
  },
});
const emit = defineEmits<{(e: 'update:modelValue', value: string): void}>();
const ariaLabelledby = computed(() => (props.item.id || `multiple-choices-item-${uid()}`));
const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emit('update:modelValue', newValue);
  },
});
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-multiple-choices-item {
  $this: &;
  $element: multiple-choices-item;

  @at-root fieldset#{&} {
    border: none;
    margin: 0;
  }

  display: flex;
  flex-direction: column;
  padding: functions.var($element, padding, var(--space-20) 0 0 0);
  background: functions.var($element, background, transparent);

  @include mixins.from-tablet {
    flex-direction: row;
    justify-content: space-between;
    padding: functions.var($element + "-tablet-choice", padding, var(--space-12));

    @include mixins.hover {
      background: functions.var($element + "-tablet-hover", background, var(--color-background-white-hover));
    }
  }

  &__header {
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: functions.var($element + "-header", padding, var(--space-12) var(--space-20));

    @include mixins.from-tablet {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: functions.var($element + "-tablet-header", padding, 0);
    }
  }

  &__options {
    display: flex;
    flex-direction: column;

    @include mixins.from-tablet {
      flex-direction: row;
    }
  }

  &__option {
    @include mixins.inner-border($element: multiple-answer-list-item, $color: var(--color-border-divider), $width: 1px 0 0 0);

    padding: functions.var($element + "-option", padding, var(--space-12) var(--space-20));
    margin: functions.var($element + "-option", margin, 0);

    @include mixins.from-tablet {
      padding: functions.var($element + "-tablet-option", padding, 0);
      margin: functions.var($element + "-tablet-option", margin, 0 0 0 var(--space-24));

      [dir="rtl"] & {
        margin: functions.var($element + "-rtl-tablet-option", margin, 0 var(--space-24) 0 0);
      }

      &::after {
        border-width: 0;
      }
    }
  }

  &__info {
    margin: functions.var($element + "-info", margin, 0);

    @include mixins.from-tablet {
      margin: functions.var($element + "-tablet-info", margin, var(--space-8) 0 0 0);
    }
  }

  &__info-message {
    @include mixins.to-mobile {
      position: absolute;
      overflow: hidden;
      width: 1px;
      height: 1px;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }
  }

  &__info-icon {
    --button-icon-margin: #{functions.var($element + "-info-icon", margin, 0)};
    --button-rtl-icon-margin: #{functions.var($element + "-rtl-info-icon", margin, 0)};

    @include mixins.from-tablet {
      --button-icon-margin: #{functions.var($element + "-tablet-info-icon", margin, 0 var(--space-4) 0 0)};
      --button-rtl-icon-margin: #{functions.var($element + "-rtl-tablet-info-icon", margin, 0 0 0 var(--space-4))};
    }
  }

  &--has-error {
    @include mixins.from-tablet {
      background: functions.var($element + "-tablet", background, var(--color-background-error));

      @include mixins.hover {
        background: functions.var($element + "-tablet-hover", background, var(--color-background-error));
      }
    }

    #{$this}__option {
      @include mixins.to-mobile {
        background: functions.var($element + "-option", background, var(--color-background-error));
      }
    }
  }
}
</style>
