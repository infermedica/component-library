<template>
  <UiContainer
    class="ui-card"
    :class="rootClassModifier"
  >
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
        <slot name="symptoms" />
      </div>
    </slot>
  </UiContainer>
</template>

<script>
import { computed } from 'vue';
import UiContainer from '../UiContainer/UiContainer.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiText from '../../atoms/UiText/UiText.vue';

export default {
  name: 'UiCard',
  components: {
    UiContainer,
    UiIcon,
    UiHeading,
    UiText,
  },
  props: {
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
      type: String,
      default: 'emergency_ambulance',
      validator: (value) => [
        'emergency_ambulance', 'emergency', 'consultation_24', 'consultation', 'self_care',
      ].includes(value),
    },
  },
  setup(props) {
    const rootClassModifier = computed(() => `ui-card--${props.type}`);
    const icon = computed(() => {
      const icons = {
        emergency_ambulance: 'emergencyAmbulance',
        emergency: 'emergencyDepartment',
        consultation_24: 'consultation24',
        consultation: 'consultation',
        self_care: 'selfCare',
      };
      return icons[props.type];
    });

    return {
      rootClassModifier,
      icon,
    };
  },
};
</script>

<style lang="scss">
.ui-card {
  --container-padding: var(--card-padding, var(--space-20) var(--space-20) var(--space-32));

  overflow: hidden;

  @media (min-width: 768px) {
    --container-padding: var(--card-tablet-padding, 0);

    display: flex;
  }

  &__triage {
    display: flex;
    justify-content: center;
    padding: var(--card-triage-padding, var(--space-20));
    margin: var(--card-triage-margin, 0 0 var(--space-20));
    background: var(--card-triage-background);
    border-radius: var(--card-triage-border-radius, var(--border-radius-card));

    @media (min-width: 768px) {
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
    margin: var(--card-title-margin, 0 0 var(--space-16));
  }

  &__content {
    padding: var(--card-content-padding);

    @media (min-width: 768px) {
      padding: var(--card-content-tablet-padding, var(--space-40) var(--space-48) var(--space-48) var(--space-40));

      [dir=rtl] & {
        padding: var(--card-content-tablet-padding, var(--space-40) var(--space-40) var(--space-48) var(--space-48));
      }
    }
  }

  &--emergency_ambulance {
    --card-triage-background: var(--color-triage-background-emergency-ambulance);
    --bullet-points-item-marker-icon-color: var(--color-triage-background-emergency-ambulance);
  }

  &--emergency {
    --card-triage-background: var(--color-triage-background-emergency-department);
    --bullet-points-item-marker-icon-color: var(--color-triage-background-emergency-department);
  }

  &--consultation_24 {
    --card-triage-background: var(--color-triage-background-consultation-24);
    --bullet-points-item-marker-icon-color: var(--color-triage-background-consultation-24);
  }

  &--consultation {
    --card-triage-background: var(--color-triage-background-consultation);
    --bullet-points-item-marker-icon-color: var(--color-triage-background-consultation);
  }

  &--self_care {
    --card-triage-background: var(--color-triage-background-self-care);
    --bullet-points-item-marker-icon-color: var(--color-triage-background-self-care);
  }
}

</style>
