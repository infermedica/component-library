<template>
  <UiContainer
    class="ui-card"
    :class="rootClassModifier"
  >
    <!-- @slot Use this slot to replace triage template. -->
    <slot
      name="triage"
      v-bind="{icon}"
    >
      <div class="ui-card__triage">
        <UiIcon
          v-if="icon"
          :icon="icon"
          class="ui-card__icon"
        />
      </div>
    </slot>
    <slot
      name="content"
      v-bind="{subtitle, title, description}"
    >
      <div class="ui-card__content">
        <!-- @slot Use this slot to replace subtitle template. -->
        <slot
          name="subtitle"
          v-bind="{subtitle}"
        >
          <UiText
            v-if="subtitle"
            class="ui-card__subtitle"
          >
            {{ subtitle }}
          </UiText>
        </slot>
        <!-- @slot Use this slot to replace title template. -->
        <slot
          name="title"
          v-bind="{title}"
        >
          <UiHeading
            v-if="title"
            class="ui-card__title"
          >
            {{ title }}
          </UiHeading>
        </slot>
        <!-- @slot Use this slot to replace description template. -->
        <slot
          name="description"
          v-bind="{description}"
        >
          <UiText
            v-if="description"
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
});
const rootClassModifier = computed<`ui-card--${CardType}`>(() => `ui-card--${props.type}`);
const icon = computed(() => props.type.replace(/_/g, '-'));
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-card {
  --container-padding: var(--card-padding, var(--space-20) var(--space-20) var(--space-32));

  overflow: hidden;

  @include from-tablet {
    --container-padding: var(--card-tablet-padding, 0);

    display: flex;
  }

  &__triage {
    display: flex;
    justify-content: center;
    padding: var(--card-triage-padding, var(--space-20));
    margin: var(--card-triage-margin, 0 0 var(--space-20));
    background: var(--card-triage-background);
    border-radius: var(--card-triage-border-radius, var(--border-radius-container));

    @include from-tablet {
      padding: var(--card-triage-tablet-padding, var(--space-40) var(--space-32));
      margin: var(--card-triage-tablet-margin, 0);
      border-radius: var(--card-triage-tablet-border-radius, 0);
    }
  }

  &__icon {
    --icon-size: var(--card-triage-icon-size, 4rem);
    --icon-color: var(--cart-triage-icon-color, var(--color-icon-negative));
  }

  &__subtitle {
    margin: var(--card-subtitle-margin, 0 0 var(--space-4));
    color: var(--card-subtitle-color, var(--color-text-dimmed));
  }

  &__title {
    @include font(card-title, h2, heading);

    margin: var(--card-title-margin, 0 0 var(--space-16));
  }

  &__content {
    padding: var(--card-content-padding);

    @include from-tablet {
      padding: var(--card-content-tablet-padding, var(--space-40) var(--space-48) var(--space-48) var(--space-40));

      [dir="rtl"] & {
        padding: var(--card-content-tablet-padding, var(--space-40) var(--space-40) var(--space-48) var(--space-48));
      }
    }
  }

  &--emergency_ambulance {
    --card-triage-background: var(--color-triage-emergency-ambulance);
  }

  &--emergency {
    --card-triage-background: var(--color-triage-emergency);
  }

  &--consultation_24 {
    --card-triage-background: var(--color-triage-consultation-24);
  }

  &--consultation {
    --card-triage-background: var(--color-triage-consultation);
  }

  &--self_care {
    --card-triage-background: var(--color-triage-self-care);
  }
}

.ui-card.ui-card--modern {
  $this: ".ui-card";

  --container-padding: var(--card-padding, 0);

  flex-direction: row-reverse;

  #{$this}__triage {
    padding: var(--card-triage-padding, var(--space-16) var(--space-20));

    @include to-mobile {
      margin: var(--card-triage-margin, 0);
      border-radius: var(--card-triage-border-radius, 0);
    }

    @include from-tablet {
      padding: var(--card-triage-tablet-padding, var(--space-32) var(--space-32) var(--space-40));
    }
  }

  #{$this}__icon {
    @include to-mobile {
      --icon-size: var(--card-triage-icon-size, 3rem);
    }
  }

  #{$this}__subtitle {
    display: none;
  }

  #{$this}__title {
    --card-title-font: var(--font-h1);
    --card-letter-spacing: var(--letter-spacing-h1);

    @include from-tablet {
      margin: var(--card-title-margin, 0 0 var(--space-12));
    }
  }

  #{$this}__content {
    flex: 1;
    padding: var(--card-content-padding, var(--space-24) var(--space-20) var(--space-32));

    @include from-tablet {
      padding: var(--card-content-tablet-padding, var(--space-32) var(--space-48) var(--space-48));
    }
  }
}
</style>
