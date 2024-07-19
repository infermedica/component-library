<template>
  <div class="has-button">
    <UiMenu
      v-bind="args"
      class="has-outside-elements__menu"
    />
    <div class="has-button__container">
      <UiButton
        class="ui-list-item-button__button ui-button--text"
        @click="clickHandler"
      >
        <slot name="title">
          <UiText tag="span" class="ui-list-item-button__title">
            <slot
              name="icon"
              v-bind="{
                icon,
                iconButtonAttrs,
              }"
            >
              <UiIcon
                :icon="icon"
                class="ui-button__icon"
                v-bind="iconButtonAttrs"
              />
            </slot>
            <slot
              name="label"
              v-bind="{
                label,
                labelButtonAttrs,
              }"
            >
              <UiText 
                tag="span"
                class="ui-list-item-button__label"
                v-bind="labelButtonAttrs"
              >
                {{ label }}
              </UiText>
            </slot>
          </UiText>
        </slot>
        <slot
          name="hint"
          v-bind="{
            hint,
            hintButtonAttrs,
          }"
        >
          <UiText tag="span" class="ui-list-item-button__hint">
            {{ hint }}
          </UiText>
        </slot>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  useAttrs,
  defineOptions,
} from 'vue';
import {
  UiMenu,
  UiButton,
  UiIcon,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const args = computed(() => (attrs));
</script>

<style lang="scss">
@use "../../../../styles/mixins";
.has-outside-elements {
  &__header {
    @include mixins.use-logical(null, padding, var(--space-20));
    display: flex;
    justify-content: flex-end;
    background-color: var(--color-background-subtle);
  }

  &__footer {
    @include mixins.use-logical(null, padding, var(--space-16));
  }

  &__menu {
    @include mixins.use-logical(null, margin, var(--space-12) 0 0 0);
  }
}
</style>
