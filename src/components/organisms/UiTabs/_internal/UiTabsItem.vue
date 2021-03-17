<template>
  <slot
    name="toggler"
    v-bind="{ toggle, name, title, isOpen }"
  >
    <UiButton
      :id="`toggler${name}`"
      ref="toggler"
      :aria-expanded="`${isOpen}`"
      :aria-controls="name"
      class="ui-tabs-item__toggler ui-button--text"
      :class="{'ui-tabs-item__toggler--active': isOpen}"
      @click="toggle(name)"
    >
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
      class="ui-tabs-item__content"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </slot>
</template>

<script>
import {
  computed, ref, inject, watchEffect, nextTick, onMounted,
} from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';

export default {
  components: {
    UiButton,
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
  },
  setup(props) {
    const toggler = ref(null);

    const opened = inject('opened');
    const toggle = inject('toggle');
    const isOpen = computed(() => {
      if (opened.value === 'string') {
        return props.name === opened.value;
      }
      return opened.value.includes(props.name);
    });

    const underline = inject('underline');
    watchEffect(async () => {
      if (isOpen.value) {
        await nextTick();
        underline(toggler.value.$el);
      }
    });
    const gap = inject('gap');
    onMounted(async () => {
      await nextTick();
      gap(toggler.value.$el);
    });

    return {
      toggler,
      toggle,
      isOpen,
    };
  },
};
</script>

<style lang="scss">
@import '../../../../styles/mixins/_mixins.scss';

.ui-tabs-item {
  $this: &;

  &__toggler {
    --button-padding: var(--space-16) 0;

    position: relative;
    margin: var(--tabs-item-toggler-margin, 0 var(--space-24) 0 0);

    [dir=rtl] & {
      margin: var(--tabs-item-toggler-margin, 0 0 0 var(--space-24));
    }

    &:last-of-type {
      margin: 0;
    }

    &--active {
      @include font(--font-body-1-thick);

      --button-color: var(--color-text-body);
      --button-hover-color: var(--color-text-body);
      --button-active-color: var(--color-text-body);
    }
  }

  &__content {
    position: relative;
    flex: 0 0 100%;
    order: 1;
    padding: var(--tabs-item-content-padding, var(--space-16) 0);
  }
}
</style>
