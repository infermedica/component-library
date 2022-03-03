<template>
  <slot
    name="toggler"
    v-bind="{ toggle, name, title, isOpen }"
  >
    <div
      ref="tab"
      class="ui-tabs-item__tab"
    >
      <UiButton
        :id="`toggler${name}`"
        :aria-expanded="`${isOpen}`"
        :aria-controls="name"
        class="ui-tabs-item__tab-button ui-button--text"
        :class="{'ui-tabs-item__tab-button--active': isOpen}"
        @click="toggle(name)"
      >
        {{ title }}
      </UiButton>
    </div>
  </slot>
  <slot
    name="content"
    v-bind="{ isOpen, name, attrs: $attrs }"
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

<script setup>
import {
  computed, ref, inject, watchEffect, nextTick, onMounted,
} from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';

const props = defineProps({
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
});
const tab = ref(null);

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
    underline(tab.value);
  }
});
const gap = inject('gap');
onMounted(async () => {
  await nextTick();
  gap(tab.value);
});
</script>

<style lang="scss">
@import "../../../../styles/mixins/mixins";

.ui-tabs-item {
  $this: &;

  &__tab {
    position: relative;
    flex: var(--tabs-item-tab-flex, unset);
    padding: var(--tabs-item-tab-padding, var(--space-16) 0);
    margin: var(--tabs-item-tab-margin, 0 var(--space-24) 0 0);

    &:nth-last-child(2) {
      margin: var(--tabs-item-tab-last-margin, 0);
    }

    [dir="rtl"] & {
      margin: var(--tabs-item-tab-margin, 0 0 0 var(--space-24));
    }
  }

  &__tab-button {
    --button-color: var(--tabs-item-tab-button-color, var(--color-text-action-primary));
    --button-hover-color: var(--tabs-item-tab-button-hover-color, var(--color-text-action-secondary-hover));
    --button-active-color: var(--tabs-item-tab-button-active-color, var(--color-text-action-secondary-active));

    width: 100%;

    &--active {
      @include font(body-1-thick);

      --button-color: var(--tabs-item-tab-button-active-color, var(--color-text-body));
      --button-hover-color: var(--tabs-item-tab-button-active-hover-color, var(--color-text-body));
      --button-active-color: var(--tabs-item-tab-button-active-active-color, var(--color-text-body));
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
