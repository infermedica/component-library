<template>
  <UiContainer
    class="ui-card"
    :class="rootClassModifier"
  >
    <slot name="triage">
      <div class="ui-card__triage">
        <UiIcon
          v-if="icon"
          :icon="icon"
          class="ui-card__icon"
        />
      </div>
    </slot>
    <slot name="content" v-bind="{description}">
     <div class="ui-card__content">
       <slot name="subtitle">
         <UiText
           v-if="subtitle"
           class="ui-card__subtitle"
         >
          {{ subtitle }}
         </UiText>
       </slot>
       <slot name="title">
        <UiHeading
          v-if="title"
          class="ui-card__title"
        >
          {{ title }}
        </UiHeading>
       </slot>
       <slot name="description">
         <UiText
           v-if="description"
           class="ui-card__description"
         >
           {{ description }}
         </UiText>
       </slot>
       <slot name="symptoms">
         <template v-if="symptoms">
          <UiText
            class="ui-card__symptoms-header">
            {{ symptomsHeader }}
          </UiText>
          <UiBulletPoints>
            <template v-for="(symptom, key) in symptoms" :key="key">
              <UiBulletPointsItem >
                <UiText tag="span">{{ symptom }}</UiText>
              </UiBulletPointsItem>
            </template>
          </UiBulletPoints>
         </template>
       </slot>
      </div>
    </slot>
  </UiContainer>
</template>

<script>
import { computed } from 'vue';
import UiBulletPoints from '../../molecules/UiBulletPoints/UiBulletPoints'
import UiBulletPointsItem from '../../molecules/UiBulletPoints/_internal/UiBulletPointsItem'
import UiContainer from '../UiContainer/UiContainer.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiText from '../../atoms/UiText/UiText.vue';

export default {
  name: 'UiCard',
  components: {
    UiBulletPoints,
    UiBulletPointsItem,
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
     * Use this props to set symptoms header for card.
     */
    symptomsHeader: {
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
     * Use this props to set symptoms in card.
     */
    symptoms: {
      type: Array,
      default: () => ([]),
    },
    /**
     * Use this props to set icon type.
     */
    type: {
      type: String,
      default: 'emergency-ambulance',
      validator: (value) => [
        'emergency-ambulance', 'emergency-department', 'consultation-24', 'consultation', 'self-care',
      ].includes(value),
    },
  },
  setup(props) {
    const rootClassModifier = computed(() => `ui-card--${props.type}`);
    const icon = computed(() => {
      const icons = {
        'emergency-ambulance': 'emergencyAmbulance',
        'emergency-department': 'emergencyDepartment',
        'consultation-24': 'consultation24',
        'consultation': 'consultation',
        'self-care': 'selfCare'
      }
      return icons[props.type]
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
  --container-padding: var(--space-20) var(--space-20) var(--space-32) var(--space-20);
  --bullet-points-item-marker-icon-color: var(--card-symptoms-marker-icon-color, var(--color-triage-background-emergency-ambulance));
  --bullet-points-item-marker-icon-size: var(--space-36);
  --bullet-points-item-align-items: center;
  --bullet-points-item-margin: var(--space-2);

  display: flex;
  flex-direction: column;

  @media (min-width: 480px) {
    flex-direction: row;
  }

  @media (min-width: 768px) {
    --container-padding: 0 0 0 0;
    --card-triage-border-top-right-radius: 0;
    --card-triage-border-bottom-right-radius: 0;
    --card-subtitle-padding: var(--space-40) 0 0 var(--space-40);
    --card-title-padding: var(--space-4) 0 0 var(--space-40);
    --card-description-padding: var(--space-16) var(--space-48) 0 var(--space-40);
    --card-symptoms-header-padding: var(--space-8) var(--space-48) var(--space-4) var(--space-40);
    --card-triage-bullet-points-padding: var(--space-4) var(--space-48) 0 var(--space-40);
  }

  &__content {
    padding-bottom: var(--card-content-bottom-padding, var(--space-48));
  }

  &__title {
    padding: var(--card-title-padding, var(--space-4) 0 0 0);
  }

  &__triage {
    display: flex;
    justify-content: center;
    padding: var(--card-triage-padding, var(--space-40)) var(--space-32) var(--space-32) var(--space-32);
    background: var(--card-triage-background, var(--color-red-500));
    border-top-left-radius: var(--card-triage-border-top-left-radius, var(--border-radius-card));
    border-top-right-radius: var(--card-triage-border-top-right-radius, var(--border-radius-card));
    border-bottom-left-radius: var(--card-triage-border-bottom-left-radius, var(--border-radius-card));
    border-bottom-right-radius: var(--card-triage-border-bottom-right-radius, var(--border-radius-card));
  }

  &__icon {
    --icon-size: var(--card-triage-icon-size, var(--space-64));
    --icon-color: var(--card-triage-icon-color, var(--color-icon-negative));
  }

  &__subtitle {
    padding: var(--card-subtitle-padding, var(--space-20) 0 0 0);
    color: var(--card-subtitle-color, var(--color-text-dimmed));
  }

  &__description {
    padding: var(--card-description-padding, var(--space-20) var(--space-20) 0 0);
  }

  &__symptoms-header {
    padding: var(--card-symptoms-header-padding, var(--space-8) var(--space-48) var(--space-4) 0);
  }

  &--emergency-ambulance {
    --card-triage-background: var(--color-triage-background-emergency-ambulance);
  }

  &--emergency-department {
    --card-triage-background: var(--color-triage-background-emergency-department);
  }

  &--consultation-24 {
    --card-triage-background: var(--color-triage-background-consultation-24);
  }

  &--consultation {
    --card-triage-background: var(--color-triage-background-consultation);
  }

  &--self-care {
    --card-triage-background: var(--color-triage-background-self-care);
  }
}

.ui-bullet-points {
  padding: var(--card-triage-bullet-points-padding, var(--space-4) var(--space-48) 0 0);
}

</style>
