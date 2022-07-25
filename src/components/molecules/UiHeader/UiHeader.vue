<template>
  <div class="ui-header">
    <header class="ui-header__header">
      <!-- @slot Use this slot to replace brand template.-->
      <slot
        name="brand"
        v-bind="{attrs: buttonBrandAttrs, logoAttrs}"
      >
        <UiButton
          class="ui-button--text ui-header__brand"
          v-bind="buttonBrandAttrs"
        >
          <!-- @slot Use this slot to replace logo template.-->
          <slot
            name="logo"
            v-bind="{attrs: logoAttrs}"
          >
            <UiIcon
              class="ui-header__logo"
              v-bind="logoAttrs"
            />
          </slot>
        </UiButton>
      </slot>
      <template v-if="isMobile">
        <!-- @slot Use this slot to replace hamburger template.-->
        <slot
          name="hamburger"
          v-bind="{attrs: buttonHamburgerAttrs, handleHamburger}"
        >
          <UiButton
            class="ui-button--text ui-button--has-icon ui-header__hamburger"
            v-bind="buttonHamburgerAttrs"
            @click="handleHamburger"
          >
            <UiIcon icon="menu" />
          </UiButton>
        </slot>
      </template>
      <template v-else>
        <!-- @slot Use this slot to replace navigation template.-->
        <slot
          name="navigation"
          v-bind="{attrs: navigationAttrs, navigation}"
        >
          <UiNavigation
            :items="navigation"
            v-bind="navigationAttrs"
          />
        </slot>
      </template>
    </header>
  </div>
</template>

<script setup lang="ts">
import {
  computed, ref, onMounted, onUnmounted, watch,
} from 'vue';
import type { PropType } from 'vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiNavigation from '../UiNavigation/UiNavigation.vue';
import type { NavigationItem } from '../UiNavigation/UiNavigation.vue';
import type { PropsAttrs } from '../../../types/attrs';
import type { Icon } from '../../../types/icon';
import { toMobile } from '../../../styles/exports/breakpoints.module.scss';

export interface LogoAttrs {
  icon: Icon;
  title: string;
  [key: string]: unknown;
}
const props = defineProps({
  /**
   * Use this props to pass attrs for logo button
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * Use this prop to set the logo.
   */
  logo: {
    type: [Object, String] as PropType<Icon>,
    default: '',
  },
  /**
   * Use this props to pass attrs for brand button
   */
  buttonBrandAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for logo icon
   */
  iconLogoAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for hamburger button
   */
  buttonHamburgerAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass media query for hamburger display
   */
  hamburgerMatchMedia: {
    type: String,
    default: toMobile as string,
  },
  /**
   * Use this props to pass list of navigation items.
   */
  navigation: {
    type: Array as PropType<NavigationItem[]>,
    default: () => ([]),
  },
  /**
   * Use this props to pass attrs for navigation
   */
  navigationAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
});

const emit = defineEmits<{(e: 'hamburger:open' | 'hamburger:close'): void}>();
const matchMediaObject: MediaQueryList = matchMedia(props.hamburgerMatchMedia);
const isMobile = ref(matchMediaObject.matches);
const isOpen = ref(false);
const logoAttrs = computed<LogoAttrs>(() => ({ icon: props.logo, title: props.title, ...props.iconLogoAttrs }));
watch(isOpen, (value: boolean) => {
  emit(value ? 'hamburger:open' : 'hamburger:close');
});
const handleHamburger = (): void => {
  isOpen.value = !isOpen.value;
};
function handleMedia({ matches }: {matches: boolean}) {
  isMobile.value = matches;
  if (isOpen.value && !matches) {
    isOpen.value = false;
  }
}
onMounted(() => {
  matchMediaObject.addEventListener('change', handleMedia);
});
onUnmounted(() => {
  matchMediaObject.removeEventListener('change', handleMedia);
});
</script>

<style lang="scss">
.ui-header {
  background: var(--header-background, var(--color-background-brand));

  &__header {
    display: flex;
    width: 100%;
    max-width: var(--header-max-width, 61.25rem);
    align-items: center;
    justify-content: var(--header-justify-content, space-between);
    padding: var(--header-padding, 0 var(--space-20));
    margin: var(--header-margin, auto);
  }

  &__brand {
    margin: var(--header-brand-margin, var(--space-20) 0);
  }

  &__logo {
    --icon-width: var(--header-logo-width, fit-content);
    --icon-height: var(--header-logo-height, 1.5rem);
  }

  &__hamburger {
    --button-icon-color: var(--color-icon-negative);
    --button-icon-color-hover: var(--color-icon-negative);
    --button-icon-color-active: var(--color-icon-negative);
  }

  &--full-width {
    --header-max-width: 100%;
  }
}
</style>
