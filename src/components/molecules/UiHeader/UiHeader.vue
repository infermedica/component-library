<template>
  <div class="ui-header">
    <header class="ui-header__header">
      <!-- @slot Use this slot to replace brand template.-->
      <slot
        name="brand"
        v-bind="{
          buttonBrandAttrs,
          iconLogoAttrs: defaultProps.iconLogoAttrs
        }"
      >
        <UiButton
          v-if="logo"
          v-bind="buttonBrandAttrs"
          class="ui-button--icon ui-header__brand"
        >
          <!-- @slot Use this slot to replace logo template.-->
          <slot
            name="logo"
            v-bind="{ iconLogoAttrs: defaultProps.iconLogoAttrs }"
          >
            <UiIcon
              v-bind="defaultProps.iconLogoAttrs"
              class="ui-header__logo"
            />
          </slot>
        </UiButton>
        <span v-else />
      </slot>
      <template v-if="isMobile">
        <!-- @slot Use this slot to replace hamburger template.-->
        <slot
          name="hamburger"
          v-bind="{
            buttonHamburgerAttrs,
            iconHamburgerAttrs: defaultProps.iconHamburgerAttrs,
            handleHamburger
          }"
        >
          <UiButton
            v-bind="buttonHamburgerAttrs"
            class="ui-button--icon ui-header__hamburger"
            @click="handleHamburger"
          >
            <UiIcon
              v-bind="defaultProps.iconHamburgerAttrs"
              class="ui-button__icon"
            />
          </UiButton>
        </slot>
      </template>
      <template v-else>
        <!-- @slot Use this slot to replace navigation template.-->
        <slot
          name="navigation"
          v-bind="{
            navigationAttrs,
            navigation
          }"
        >
          <UiNavigation
            v-bind="navigationAttrs"
            :items="navigation"
            class="ui-header__navigation"
          />
        </slot>
      </template>
    </header>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  onMounted,
  onUnmounted,
  watch,
} from 'vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import type { ButtonAttrsProps } from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import type { IconAttrsProps } from '../../atoms/UiIcon/UiIcon.vue';
import UiNavigation from '../UiNavigation/UiNavigation.vue';
import type {
  NavigationProps,
  NavigationAttrsProps,
} from '../UiNavigation/UiNavigation.vue';
import breakpoints from '../../../styles/exports/breakpoints.module.scss';
import type {
  Icon,
  DefineAttrsProps,
} from '../../../types';

export interface HeaderProps {
  /**
   * Use this props to pass attrs for logo button
   */
  title?: string;
  /**
   * Use this prop to set the logo.
   */
  logo?: Icon | boolean;
  /**
   * Use this props to pass media query for hamburger display
   */
  hamburgerMatchMedia?: string;
  /**
   * Use this props to pass list of navigation items.
   */
  navigation?: NavigationProps['items'];
  /**
   * Use this props to pass attrs for brand button
   */
  buttonBrandAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for hamburger UiButton
   */
  buttonHamburgerAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for hamburger UiIcon
   */
  iconHamburgerAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for logo UiIcon
   */
  iconLogoAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for UiNavigation.
   */
  navigationAttrs?: NavigationAttrsProps;
}
export type HeaderAttrsProps = DefineAttrsProps<HeaderProps>;
export interface HeaderEmits {
  (e: 'hamburger:open' | 'hamburger:close'): void;
}
const props = withDefaults(defineProps<HeaderProps>(), {
  title: '',
  logo: false,
  hamburgerMatchMedia: breakpoints.toMobile,
  navigation: () => ([]),
  buttonBrandAttrs: () => ({}),
  buttonHamburgerAttrs: () => ({}),
  iconHamburgerAttrs: () => ({ icon: 'menu' }),
  iconLogoAttrs: () => ({}),
  navigationAttrs: () => ({}),
});
const defaultProps = computed(() => {
  const icon: IconAttrsProps['icon'] = 'menu';
  return {
    iconHamburgerAttrs: {
      icon,
      ...props.iconHamburgerAttrs,
    },
    iconLogoAttrs: {
      icon: props.logo,
      title: props.title,
      ...props.iconLogoAttrs,
    },
  };
});
const emit = defineEmits<HeaderEmits>();
const matchMediaObject: MediaQueryList = matchMedia(props.hamburgerMatchMedia);
const isMobile = ref(matchMediaObject.matches);
const isOpen = ref(false);
watch(isOpen, (value) => {
  emit(value ? 'hamburger:open' : 'hamburger:close');
});
const handleHamburger = (): void => {
  isOpen.value = !isOpen.value;
};
const handleMedia = ({ matches }: { matches: boolean }) => {
  isMobile.value = matches;
  if (isOpen.value && !matches) {
    isOpen.value = false;
  }
};
onMounted(() => {
  matchMediaObject.addEventListener('change', handleMedia);
});
onUnmounted(() => {
  matchMediaObject.removeEventListener('change', handleMedia);
});
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-header {
  $this: &;
  $element: header;

  --navigation-justify-content: flex-end;

  background: functions.var($element, background, var(--color-background-brand));

  &__header {
    @include mixins.use-logical($element, padding, var(--space-20));
    @include mixins.use-logical($element, margin, auto);

    display: flex;
    width: 100%;
    max-width: functions.var($element, max-width, 61.25rem);
    align-items: center;
    justify-content: space-between;
    gap: functions.var($element, gap, var(--space-16));
  }

  &__logo {
    --icon-width: #{functions.var($element + "-logo", width, fit-content)};
    --icon-height: #{functions.var($element + "-logo", height, 1.5rem)};
  }

  &__navigation {
    --button-color: #{functions.var($element + "-navigation", color, var(--color-text-on-brand))};
    --button-hover-color: #{functions.var($element + "-navigation-hover", color, var(--color-text-on-brand-hover))};
    --button-active-color: #{functions.var($element + "-navigation-active", color, var(--color-text-on-brand-active))};
    --button-icon-color: #{functions.var($element + "-navigation-icon", color, var(--color-icon-on-brand))};
    --button-hover-icon-color: #{functions.var($element + "-navigation-hover-icon", color, var(--color-icon-on-brand-hover))};
    --button-active-icon-color: #{functions.var($element + "-navigation-active-icon", color, var(--color-icon-on-brand-active))};
  }

  &--full-width {
    --header-max-width: 100%;
  }

  &--simple {
    background: functions.var($element, background, transparent);

    #{$this}__header {
      @include mixins.use-logical($element, padding, var(--space-12));
    }

    #{$this}__navigation {
      --button-color: #{functions.var($element + "-navigation", color, var(--color-text-action-secondary))};
      --button-hover-color: #{functions.var($element + "-navigation-hover", color, var(--color-text-action-secondary-hover))};
      --button-active-color: #{functions.var($element + "-navigation-active", color, var(--color-text-action-secondary-active))};
      --button-icon-color: #{functions.var($element + "-navigation-icon", color, var(--color-icon-secondary))};
      --button-hover-icon-color: #{functions.var($element + "-navigation-hover-icon", color, var(--color-icon-secondary-hover))};
      --button-active-icon-color: #{functions.var($element + "-navigation-active-icon", color, var(--color-icon-secondary-active))};
    }
  }
}
</style>
