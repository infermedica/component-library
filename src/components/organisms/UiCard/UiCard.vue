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
          v-if="defaultProps.iconTriageAttrs?.icon"
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
import UiContainer from '../UiContainer/UiContainer.vue';
import type { ContainerAttrsProps } from '../UiContainer/UiContainer.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import type { HeadingAttrsProps } from '../../atoms/UiHeading/UiHeading.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import type { TextAttrsProps } from '../../atoms/UiText/UiText.vue';
import type {
  DefineAttrsProps,
  IconName,
} from '../../../types';

export type CardType = 'emergency_ambulance'
  | 'emergency'
  | 'consultation_24'
  | 'consultation'
  | 'self_care';
export interface CardProps {
  /**
    * Use this props to set title for card.
    */
  title?: string;
  /**
   * Use this props to set subtitle for card.
   */
  subtitle?: string;
  /**
   * Use this props to set description for card.
   */
  description?: string;
  /**
   * Use this props to set icon type.
   */
  type?: 'emergency_ambulance' | 'emergency' | 'consultation_24' | 'consultation' | 'self_care';
  /**
   * Use this props to pass attrs for UiIcon
   */
  iconTriageAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for subtitle UiText
   */
  textSubtitleAttrs?: TextAttrsProps;
  /**
   * Use this props to pass attrs for title UiHeading.
   */
  headingTitleAttrs?: HeadingAttrsProps;
  /**
   * Use this props to pass attrs for description UiText.
   */
  textDescriptionAttrs?: TextAttrsProps;
}
export type CardAttrsProps = DefineAttrsProps<CardProps, ContainerAttrsProps>

const props = withDefaults(defineProps<CardProps>(), {
  title: '',
  subtitle: '',
  description: '',
  type: 'emergency_ambulance',
  iconTriageAttrs: () => ({}),
  textSubtitleAttrs: () => ({}),
  headingTitleAttrs: () => ({}),
  textDescriptionAttrs: () => ({}),
});
const rootClassModifier = computed(() => `ui-card--${props.type}`);
const icon = computed(() => props.type.replace(/_/g, '-') as IconName);
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

  @include mixins.override-logical(container, $element, padding, var(--space-20) var(--spce-20) var(--space-32));
  @include mixins.override-logical(container-tablet, $element + "-tablet", padding, 0);
  @include mixins.override-logical(container-desktop, $element + "-desktop", padding, 0);

  display: flex;
  flex-direction: column;
  gap: functions.var($element, gap, var(--space-20));

  @include mixins.from-tablet {
    flex-direction: row;
    gap: functions.var($element + "-tablet", gap, 0);
  }

  &__triage {
    @include mixins.use-logical($element + "-triage", padding, var(--space-20));
    @include mixins.use-logical($element + "-triage", border-radius, var(--border-radius-container));

    display: flex;
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

    @include mixins.use-logical($element + "-subtitle", margin, 0 0 var(--space-4));
  }

  &__title {
    @include mixins.use-logical($element + "-title", margin, 0 0 var(--space-16));
  }

  &__content {
    @include mixins.use-logical($element + "-content", padding, 0);

    @include mixins.from-tablet {
      @include mixins.use-logical(
        $element + "-tablet-content",
        padding,
        var(--space-40) var(--space-48) var(--space-48) var(--space-40)
      );
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
    @include mixins.override-logical(container, $element, padding, 0);

    gap: functions.var($element + "-modern", gap, 0);

    @include mixins.from-tablet {
      flex-direction: row-reverse;
      gap: functions.var($element + "-modern-tablet", gap, 0);
    }

    #{$this}__triage {
      @include mixins.use-logical($element + "-triage", border-radius, 0);
      @include mixins.use-logical($element + "-triage", padding, var(--space-16));

      @include mixins.from-tablet {
        @include mixins.use-logical($element + "-tablet-triage", border-radius, 0 var(--border-radius-container));
        @include mixins.use-logical($element + "-tablet-triage", padding, var(--space-32));
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

      @include mixins.use-logical($element + "-title", margin, 0 0 var(--space-12));
    }

    #{$this}__content {
      @include mixins.use-logical($element + "-content", padding, var(--space-24) var(--space-20) var(--space-32));

      @include mixins.from-tablet {
        @include mixins.use-logical(
          $element + "-tablet-content",
          padding,
          var(--space-32) var(--space-48) var(--space-48) var(--space-48)
        );
      }
    }
  }
}
</style>
