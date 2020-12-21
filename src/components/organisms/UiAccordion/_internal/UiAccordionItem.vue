<template>
  <UiListItem class="ui-accordion-item">
    <!-- @slot Use this slot to replace toggler template. -->
    <slot
      name="toggler"
      v-bind="{ toggle, name, icon, title, isOpen }"
    >
      <UiButton
        :id="`toggler${name}`"
        :aria-expanded="`${isOpen}`"
        :aria-controls="name"
        class="ui-accordion-item__toggler ui-button--outlined ui-button--has-icon"
        @click="toggle(name)"
      >
        <!-- @slot Use this slot to replace chevron template. -->
        <slot
          name="chevron"
          v-bind="{ icon }"
        >
          <UiIcon
            :icon="icon"
            class="ui-accordion-item__chevron"
          />
        </slot>
        {{ title }}
      </UiButton>
    </slot>
    <slot
      name="content"
      v-bind="{ isOpen }"
    >
      <!-- @slot Use this slot to replace content template. -->
      <div
        v-show="isOpen"
        :id="name"
        role="region"
        :aria-labelledby="`toggler${name}`"
        class="ui-accordion-item__content"
      >
        <slot />
      </div>
    </slot>
  </UiListItem>
</template>

<script>
import { computed, inject } from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../../atoms/UiIcon/UiIcon.vue';
import UiListItem from '../../UiList/_internal/UiListItem.vue';

export default {
  components: {
    UiButton,
    UiIcon,
    UiListItem,
  },
  props: {
    /**
     * Use this props to set item title.
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Use this props to set item name, it used to toggle.
     */
    name: {
      type: String,
      default: '',
    },
    /**
     * Use this props to setup item component.
     */
    settings: {
      type: Object,
      default: () => ({
        iconOpen: 'chevronUp',
        iconClose: 'chevronDown',
      }),
    },
  },
  setup(props) {
    const opened = inject('opened');
    const toggle = inject('toggle');
    const isOpen = computed(() => {
      if (opened.value === 'string') {
        return props.name === opened.value;
      }
      return opened.value.includes(props.name);
    });
    const icon = computed(() => (isOpen.value ? props.settings.iconOpen : props.settings.iconClose));

    return {
      toggle,
      isOpen,
      icon,
    };
  },
};
</script>

<style lang="scss">
.ui-accordion-item {
  $this: &;

  --list-item-padding: 0;

  display: flex;
  flex-direction: column;
  border: var(--accordion-item-border, solid var(--color-border-divider));
  border-width: var(--accordion-item-border-width, 1px 0 0 0);

  &:last-of-type {
    border-width: var(--accordion-item-border-width, 1px 0);
  }

  &__toggler {
    --button-padding: var(--accordion-item-toggler-padding, var(--space-20));
    --button-border-width: 0;

    @media (min-width: 480px) {
      --button-padding: var(--accordion-item-toggler-tablet-padding, var(--space-12));
    }
  }

  &__chevron {
    --icon-size: var(--accordion-item-chevron-icon-size, 1.5rem);

    margin: var(--accordion-item-chevron-margin, 0 var(--space-12) 0 0);
  }

  &__content {
    padding: var(--accordion-item-content-padding, var(--space-12) var(--space-24));

    @media (min-width: 480px) {
      padding: var(--accordion-item-content-tablet-padding, var(--space-12) var(--space-48));
    }
  }
}
</style>
