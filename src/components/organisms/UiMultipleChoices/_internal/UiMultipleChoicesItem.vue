<template>
  <UiListItem
    :list-item-attrs="defaultProps.listItemAttrs"
    :class="[
      'ui-multiple-choices-item__choices', { 'ui-multiple-choices-item--has-error': invalid }
    ]"
    :content-tag="tag"
    :aria-labelledby="multipleChoicesItemId"
    role="radiogroup"
  >
    <!-- @slot Use this slot to replace legend template. -->
    <slot
      name="legend"
      v-bind="{
        label,
        name,
      }"
    >
      <legend class="visual-hidden">
        {{ name || label }}
      </legend>
    </slot>
    <!-- @slot Use this slot to replace label template.-->
    <slot
      name="label"
      v-bind="{
        id: multipleChoicesItemId,
        textLabelAttrs,
        name,
        label,
        buttonInfoAttrs,
        iconInfoAttrs: defaultProps.iconInfoAttrs,
        translation,
      }"
    >
      <div class="ui-multiple-choices-item__header">
        <UiText
          :id="multipleChoicesItemId"
          v-bind="textLabelAttrs"
          class="ui-multiple-choices-item__label"
        >
          {{ name || label }}
        </UiText>
        <UiButton
          v-if="buttonInfoAttrs"
          v-bind="buttonInfoAttrs"
          class="ui-button--text ui-button--small ui-multiple-choices-item__info"
        >
          <UiIcon
            v-bind="defaultProps.iconInfoAttrs"
            class="ui-button__icon ui-multiple-choices-item__info-icon"
          />
          <span class="ui-multiple-choices-item__info-message">
            {{ translation.info }}
          </span>
        </UiButton>
      </div>
    </slot>
    <div class="ui-multiple-choices-item__content">
      <UiList
        class="ui-multiple-choices-item__options"
      >
        <template
          v-for="(option, key) in optionsToRender"
          :key="key"
        >
          <!-- @slot Use this slot to replace option template.-->
          <slot
            name="option"
            v-bind="{
              value,
              option,
              invalid,
            }"
          >
            <UiListItem
              v-model="value"
              :list-item-attrs="defaultProps.optionItemAttrs"
              :content-tag="UiRadio"
              :class="{ 'ui-radio--has-error': invalid }"
              :name="multipleChoicesItemId"
              v-bind="option"
            >
              {{ option.label }}
            </UiListItem>
          </slot>
        </template>
      </UiList>
      <!-- @slot Use this slot to replace alert template. -->
      <slot
        name="alert"
        v-bind="{
          alertAttrs,
          translation: defaultProps.translation,
        }"
      >
        <UiAlert
          v-if="invalid"
          v-bind="alertAttrs"
          type="error"
          class="ui-multiple-choices-item__alert"
        >
          {{ defaultProps.translation.invalid }}
        </UiAlert>
      </slot>
    </div>
  </UiListItem>
</template>

<script setup lang="ts">
import {
  computed,
  useAttrs,
} from 'vue';
import { uid } from 'uid/single';
import type { PropType } from 'vue';
import type { HTMLTag } from '../../../../types/tag';
import type { Icon } from '../../../../types/icon';
import type { MultipleChoiceOption } from '../UiMultipleChoices.vue';
import type { PropsAttrs } from '../../../../types/attrs';
import UiAlert from '../../../molecules/UiAlert/UiAlert.vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiList from '../../UiList/UiList.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';
import UiRadio from '../../../atoms/UiRadio/UiRadio.vue';
import UiText from '../../../atoms/UiText/UiText.vue';

const props = defineProps({
  /**
   * Use this props to set multiple choices item tag.
   */
  tag: {
    type: String as PropType<HTMLTag>,
    default: 'fieldset',
  },
  /**
   * Use this props to set multiple choices item label.
   */
  label: {
    type: String,
    default: '',
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
    type: [
      String,
      Object,
    ] as PropType<string | Record<string, unknown>>,
    default: '',
  },
  /**
   * Use this props to set item of item.
   */
  id: {
    type: String,
    default: '',
  },
  /**
   * Use this props to pass labels inside component translation.
   */
  translation: {
    type: Object,
    default: () => ({
      info: 'What does it mean?',
      invalid: 'Please select one answer',
    }),
  },
  /**
   *  Use this props to pass options.
   */
  options: {
    type: Array as PropType<MultipleChoiceOption[]>,
    default: () => ([]),
  },
  /**
   * Use this props to pass attrs for hint UiAlert
   */
  alertAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for info UiButton.
   */
  buttonInfoAttrs: {
    type: Object,
    default: null,
  },
  /**
   * Use this props to pass attrs for info UiIcon.
   */
  iconInfoAttrs: {
    type: Object,
    default: () => ({ icon: 'info' }),
  },
  /**
   * Use this props to pass attrs for label UiText.
   */
  textLabelAttrs: {
    type: Object,
    default: () => ({ tag: 'span' }),
  },
  /**
   * Use this props to pass attrs for list item.
   */
  listItemAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for option item.
   */
  optionItemAttrs: {
    type: Object,
    default: () => ({}),
  },
});
interface DefaultProps {
  translation: {
    info: string;
    invalid: string;
    [key: string]: unknown;
  };
  textLabelAttrs: {
    tag: HTMLTag;
    [key: string]: unknown;
  };
  iconInfoAttrs: {
    icon: Icon;
    [key: string]: unknown;
  };
  listItemAttrs: {
    class: string;
    [key: string]: unknown
  };
  optionItemAttrs: {
    class: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}
const defaultProps = computed<DefaultProps>(() => ({
  translation: {
    info: 'What does it mean?',
    invalid: 'Please select one answer',
    ...props.translation,
  },
  textLabelAttrs: {
    tag: 'span',
    ...props.textLabelAttrs,
  },
  iconInfoAttrs: {
    icon: 'info',
    ...props.iconInfoAttrs,
  },
  listItemAttrs: {
    class: 'ui-multiple-choices-item',
    ...props.listItemAttrs,
  },
  optionItemAttrs: {
    class: 'ui-multiple-choices-item__option',
    ...props.optionItemAttrs,
  },
}));
const emit = defineEmits<{(e: 'update:modelValue', value: string | Record<string, unknown>): void}>();
const multipleChoicesItemId = computed(() => (props.id || `multiple-choices-item-${uid()}`));
const value = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emit('update:modelValue', newValue);
  },
});
// TODO: remove in 0.6.0 / BEGIN
const attrs = useAttrs();
const name = computed(() => (attrs.name));
if (name.value) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiMultipleChoicesItem]: The `name` props will be removed in 0.6.0. Please use `label` props instead.');
  }
}
if (props.options.some((option) => option.name)) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[@infermedica/component-library warn][UiMultipleChoicesItem]: The option `name` props will be removed in 0.6.0. Please use option `label` props instead.');
  }
}
const optionsToRender = computed(() => props.options.map((option) => ({
  label: option.name || option.label,
  ...option,
})));
// END
</script>

<style lang="scss">
@use "../../../../styles/functions";
@use "../../../../styles/mixins";

.ui-multiple-choices-item {
  $this: &;
  $element: multiple-choices-item;

  --list-item-border-width: #{functions.var($element, border-width, 0)};

  &:first-of-type {
    --list-item-border-width: #{functions.var($element, border-width, 1px 0 0)};
  }

  @include mixins.from-tablet {
    --list-item-border-width: #{functions.var($element + '-tablet', border-width, 1px 0 0)};

    &:last-of-type {
      --list-item-border-width: #{functions.var($element + '-tablet', border-width, 1px 0)};
    }
  }

  &__choices {
    @at-root fieldset#{&} {
      border: none;
      margin: 0;
    }

    @include mixins.to-mobile {
      --list-item-content-padding: #{functions.var($element + "-choices-mobile", padding, var(--space-20) 0 0)};
      --list-item-content-hover-background: #{functions.var($element + "-choices-mobile-hover", background, transparent)};

      display: block;
    }

    @include mixins.from-tablet {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    padding: functions.var($element + "-header", padding, var(--space-12) var(--space-20));

    @include mixins.from-tablet {
      flex: 1;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: functions.var($element + "-tablet-header", padding, 0);
    }
  }

  &__options {
    @include mixins.from-tablet {
      display: flex;
      flex-direction: row;
    }
  }

  &__option {
    --list-item-content-padding: #{functions.var($element + "-option", padding, var(--space-12) var(--space-20))};
    --list-item-tablet-content-padding: #{functions.var($element + "-tablet-option", padding, 0)};
    --list-item-border-width: #{functions.var($element + "-option", border-width, 1px 0 0)};
    --list-item-content-hover-background: #{functions.var($element + "-option-hover", background, var(--color-background-white-hover))};

    &:last-of-type {
      --list-item-border-width: #{functions.var($element + "-option", border-width, 1px 0)};
    }

    @include mixins.from-tablet {
      --list-item-border-width: #{functions.var($element + "-tablet-option", border-width, 0)};
      --list-item-content-hover-background: #{functions.var($element + "-tablet-option-hover", background, transparent)};
      --radio-label-margin: 0 0 0 var(--space-8);

      display: flex;
      flex-direction: row;
      margin: functions.var($element + "-tablet-option", margin, 0 0 0 var(--space-24));

      &:first-of-type {
        margin: functions.var($element + "-tablet-option", margin, 0);
      }

      &:last-of-type {
        --list-item-border-width: #{functions.var($element + "-tablet-option", border-width, 0)};
      }

      [dir="rtl"] & {
        margin: functions.var($element + "-rtl-tablet-option", margin, 0 var(--space-24) 0 0);

        &:first-of-type {
          margin: functions.var($element + "-rtl-tablet-option", margin, 0);
        }
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

  &__alert {
    margin: functions.var($element + "-alert", margin, var(--space-12) var(--space-20) 0);

    @include mixins.from-tablet {
      margin: functions.var($element + "-tablet-alert", margin, var(--space-8) 0 0);
    }
  }

  &--has-error {
    @include mixins.from-tablet {
      --list-item-content-hover-background: #{functions.var($element + "-tablet-hover", background, var(--color-background-error))};
      background: functions.var($element + "-tablet", background, var(--color-background-error));
    }

    #{$this}__option {
      @include mixins.to-mobile {
          background: functions.var($element + "-mobile-option", background, var(--color-background-error));
          --list-item-content-hover-background: #{functions.var($element + "-choices-mobile-hover", background, var(--color-background-error))};
      }
    }
  }
}
</style>
