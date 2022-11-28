<template>
  <UiContainer
    class="ui-card"
    :class="rootClassModifier"
  >
    <!-- @slot Use this slot to replace triage template. -->
    <slot
      name="triage"
      v-bind="{ iconTriageAttrs: defaultProps.iconTriageAttrs }"
    >
      <div class="ui-card__triage">
        <UiIcon
          v-if="defaultProps.iconTriageAttrs.icon"
          v-bind="defaultProps.iconTriageAttrs"
          class="ui-card__icon"
        />
      </div>
    </slot>
    <!-- @slot Use this slot to replace content template. -->
    <slot
      name="content"
      v-bind="{
        subtitle,
        textSubtitleAttrs,
        title,
        headingTitleAttrs,
        description,
        textDescriptionAttrs
      }"
    >
      <div class="ui-card__content">
        <!-- @slot Use this slot to replace subtitle template. -->
        <slot
          name="subtitle"
          v-bind="{
            subtitle,
            textSubtitleAttrs
          }"
        >
          <UiText
            v-if="subtitle"
            v-bind="textSubtitleAttrs"
            class="ui-card__subtitle"
          >
            {{ subtitle }}
          </UiText>
        </slot>
        <!-- @slot Use this slot to replace title template. -->
        <slot
          name="title"
          v-bind="{
            title,
            headingTitleAttrs
          }"
        >
          <UiHeading
            v-if="title"
            v-bind="headingTitleAttrs"
            class="ui-card__title"
          >
            {{ title }}
          </UiHeading>
        </slot>
        <!-- @slot Use this slot to replace description template. -->
        <slot
          name="description"
          v-bind="{
            description,
            textDescriptionAttrs
          }"
        >
          <UiText
            v-if="description"
            v-bind="textDescriptionAttrs"
            class="ui-card__description"
          >
            {{ description }}
          </UiText>
        </slot>
        <!-- @slot Use this slot to place content bottom of card. -->
        <slot name="details" />
      </div>
    </slot>
  </UiContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import UiContainer from '../UiContainer/UiContainer.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type { IconAsString } from '../../../types/icon';

export type CardType = 'emergency_ambulance'
  | 'emergency'
  | 'consultation_24'
  | 'consultation'
  | 'self_care';
const props = defineProps({
  /**
    * Use this props to set title for card.
    */
  title: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set subtitle for card.
   */
  subtitle: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set description for card.
   */
  description: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set icon type.
   */
  type: {
    type: String as PropType<CardType>,
    default: 'emergency_ambulance',
  },
  /**
   * Use this props to pass attrs for UiIcon
   */
  iconTriageAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for subtitle UiText
   */
  textSubtitleAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for title UiHeading.
   */
  headingTitleAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for description UiText.
   */
  textDescriptionAttrs: {
    type: Object,
    default: () => ({}),
  },
});
const rootClassModifier = computed<`ui-card--${CardType}`>(() => `ui-card--${props.type}`);
const icon = computed(() => props.type.replace(/_/g, '-') as IconAsString);
const defaultProps = computed(() => ({
  iconTriageAttrs: {
    icon: icon.value,
    ...props.iconTriageAttrs,
  },
}));
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-card {
  $this: &;
  $element: card;
  $types: "emergency_ambulance", "emergency", "consultation_24", "consultation", "self_care";

  --container-padding-block: #{functions.var($element, padding-block, var(--space-20) var(--space-32))};
  --container-padding-inline: #{functions.var($element, padding-inline, var(--space-20))};
  --container-tablet-padding-logical: #{functions.var($element + "-tablet", padding-logical, 0)};
  --container-desktop-padding-logical: #{functions.var($element + "-desktop", padding-logical, 0)};

  display: flex;
  flex-direction: column;
  gap: functions.var($element, gap, var(--space-20));

  @include mixins.from-tablet {
    gap: functions.var($element + "-tablet", gap, 0);
    flex-direction: row;
  }

  &__triage {
    @include mixins.use-logical($element + '-triage', padding, var(--space-20));
    @include mixins.use-logical($element + "-triage", border-radius, var(--border-radius-container));

    display: flex;
    align-items: center;
    justify-content: center;
    background: functions.var($element + "-triage", background, var(--color-triage-emergency-ambulance));

    @include mixins.from-tablet {
      @include mixins.use-logical(
        $element + "-tablet-triage",
        padding,
        var(--space-40) var(--space-32)
      );
      @include mixins.use-logical(
        $element + "-tablet-triage",
        border-radius,
        var(--border-radius-container) 0
      );
    }
  }

  &__icon {
    --icon-size: #{functions.var($element + "-icon", size, 4rem)};
    --icon-color: #{functions.var($element + "-icon", color, var(--color-icon-negative))};
  }

  &__subtitle {
    --text-color: #{functions.var($element + "-subtitle", color, var(--color-text-dimmed))};

    @include mixins.use-logical($element + '-subtitle', margin, 0 0 var(--space-4));
  }

  &__title {
    @include mixins.use-logical($element + '-title', margin, 0 0 var(--space-16));
  }

  &__content {
    @include mixins.use-logical($element + '-content', padding, 0);

    flex-grow: 1;

    @include mixins.from-tablet {
      @include mixins.use-logical($element + '-tablet-content', padding, var(--space-40) var(--space-48) var(--space-48) var(--space-40));
    }
  }

  @each $type in $types {
    &--#{$type} {
      #{$this}__triage {
        background:
          functions.var(
            $element + "-triage",
            background,
            var(--color-triage-#{functions.str-replace($type, "_", "-")})
          );
      }
    }
  }

  &--modern {
    --container-padding-logical: #{functions.var($element, padding-logical, 0)};

    @include mixins.from-tablet {
      flex-direction: row-reverse;
    }

    #{$this}__triage {
      @include mixins.use-logical($element + "-triage", border-radius, 0);

      @include mixins.from-tablet {
        @include mixins.use-logical($element + "-tablet-triage", border-radius, 0 var(--border-radius-container));
      }
    }

    #{$this}__icon {
      @include mixins.to-mobile {
        --icon-size: #{functions.var($element + "-mobile-icon", size, 3rem)};
      }
    }

    #{$this}__title {
      --heading-font: #{functions.var($element + "-title", font, var(--font-h1))};
      --heading-letter-spacing: #{functions.var($element + "-title", letter-spacing, var(--letter-spacing-h1))};

      @include mixins.use-logical($element + '-title', margin, 0 0 var(--space-12));
    }

    #{$this}__content {
      @include mixins.use-logical($element + '-content', padding, var(--space-24) var(--space-20) var(--space-32));

      @include mixins.from-tablet {
        @include mixins.use-logical($element + '-tablet-content', padding, var(--space-40) var(--space-40) var(--space-48) var(--space-48));
      }
    }
  }
}
</style>
