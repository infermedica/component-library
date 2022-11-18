<template>
  <UiListItem
    :list-item-attrs="defaultProps.listItemAttrs"
    :class="[
      'ui-multiple-choices-item__content', {
        'ui-list-item--has-error': invalid,
        'ui-multiple-choices-item--has-error': invalid
      }
    ]"
    :tag="tag"
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
    <!-- @slot Use this slot to replace header template.-->
    <slot
      name="header"
      v-bind="{
        id: multipleChoicesItemId,
        textLabelAttrs,
        name,
        label,
        hasInfo,
        buttonInfoAttrs,
        iconInfoAttrs: defaultProps.iconInfoAttrs,
        translation,
      }"
    >
      <div class="ui-multiple-choices-item__header">
        <slot
          name="label"
          v-bind="{
            multipleChoicesItemId,
            textLabelAttrs,
            name,
            label
          }"
        >
          <UiText
            :id="multipleChoicesItemId"
            v-bind="textLabelAttrs"
            class="ui-multiple-choices-item__label"
          >
            {{ name || label }}
          </UiText>
        </slot>
        <slot
          name="info"
          v-bind="{
            hasInfo,
            buttonInfoAttrs,
            iconInfoAttrs: defaultProps.iconInfoAttrs,
            labelInfoAttrs,
            translation
          }"
        >
          <UiButton
            v-if="hasInfo"
            v-bind="buttonInfoAttrs"
            class="ui-button--text ui-button--small ui-multiple-choices-item__info"
          >
            <UiIcon
              v-bind="defaultProps.iconInfoAttrs"
              class="ui-button__icon ui-multiple-choices-item__info-icon"
            />
            <span
              v-bind="labelInfoAttrs"
              class="ui-multiple-choices-item__info-label"
            >
              {{ translation.info }}
            </span>
          </UiButton>
        </slot>
      </div>
    </slot>
    <div class="ui-multiple-choices-item__choices">
      <!-- TODO: create MultipleChoicesItemOptions component -->
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
              optionItemAttrs: defaultProps.optionItemAttrs,
              invalid,
              option,
            }"
          >
            <UiListItem
              v-model="value"
              v-bind="option"
              :tag="UiRadio"
              :name="multipleChoicesItemId"
              :class="[
                'ui-multiple-choices-item__option-content', {
                  'ui-radio--has-error': invalid,
                  'ui-list-item--has-error': invalid,
                }
              ]"
              :list-item-attrs="defaultProps.optionItemAttrs"
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
          invalid,
          alertAttrs,
          translation: defaultProps.translation,
        }"
      >
        <UiAlert
          v-if="invalid"
          v-bind="alertAttrs"
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
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for info label element.
   */
  labelInfoAttrs: {
    type: Object,
    default: () => ({}),
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
  listItemAttrs: {
    class: 'ui-multiple-choices-item',
    ...props.listItemAttrs,
  },
  textLabelAttrs: {
    tag: 'span',
    ...props.textLabelAttrs,
  },
  iconInfoAttrs: {
    icon: 'info',
    ...props.iconInfoAttrs,
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
const hasInfo = computed(() => (Object.keys(props.buttonInfoAttrs).length > 0));
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

  &:not(:first-of-type) {
    --list-item-border-width: #{functions.var($element , border-width, 0)};
  }

  @include mixins.from-tablet {
    &:not(:first-of-type) {
      --list-item-border-width: #{functions.var($element , border-width)};
    }
  }

  &__content {
    @at-root fieldset#{&} {
      border: none;
      margin: 0;
    }

    --list-item-content-padding: #{functions.var($element + "-content", padding, 0)};
    --list-item-content-hover-background: #{functions.var($element + "-content-hover", background, transparent)};

    display: block;

    @include mixins.from-tablet {
      --list-item-content-hover-background: #{functions.var($element + "-tablet-content-hover", background)};

      display: flex;
      gap: functions.var($element + "-tablet-content", gap, var(--space-24));
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    padding: functions.var($element + "-header", padding, var(--space-12) var(--space-20));
    margin: functions.var($element + "-header", margin, var(--space-20) 0 0 0);
    gap: functions.var($element + "-header", gap, var(--space-12));

    @include mixins.from-tablet {
      flex-direction: column;
      align-items: flex-start;
      padding: functions.var($element + "-tablet-header", padding, 0);
      margin: functions.var($element + "-tablet-header", margin, 0);
      gap: functions.var($element + "-tablet-header", gap, var(--space-8));
    }
  }

  &__info {
    gap: functions.var($element + "-info", gap, var(--space-4));
  }

  &__info-label {
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
    --button-icon-margin: 0;
    --button-rtl-icon-margin: 0;
  }

  &__choices {
    display: flex;
    flex-direction: column;
    gap: functions.var($element + "-choices", gap, 0);

    @include mixins.from-tablet {
      gap: functions.var($element + "-tablet-choices", gap, var(--space-8));
    }
  }

  &__options {
    --list-item-border-width: #{functions.var($element + "-options" , border-width)};

    @include mixins.from-tablet {
      --list-item-border-width: #{functions.var($element + "-tablet-options" , border-width, 0)};

      display: flex;
      gap: functions.var($element + "-options", gap, var(--space-24));
    }
  }

  &__option-content {
    --list-item-content-padding: #{functions.var($element + "-option-content", padding)};
    --list-item-tablet-content-padding: #{functions.var($element + "-tablet-option-content", padding, 0)};
    --list-item-content-hover-background: #{functions.var($element + "-content-hover", background)};
  }

  &__alert {
    padding: functions.var($element + "-alert", padding, var(--space-12) var(--space-20) 0);

    @include mixins.from-tablet {
      padding: functions.var($element + "-tablet-alert", padding, 0);
    }
  }

  &--has-error {
    --_list-item-background: #{functions.var($element, background, transparent)};
    --list-item-background: var(--_list-item-background);
    --list-item-hover-background: var(--_list-item-background);

    @include mixins.from-tablet {
      --_list-item-background: #{functions.var($element + "-tablet", background)};
    }

    #{$this}__option {
      --_list-item-option-background: #{functions.var($element + "-option", background)};
      --list-item-background: var(--_list-item-option-background);
      --list-item-hover-background: var(--_list-item-option-background);
    }
  }
}
</style>
