import UiLink from '@/components/atoms/UiLink/UiLink.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';

// TODO: remove before release 0.3.3
export default {
  title: 'Bugfix/Link & Button',
};

export const Link = (args) => ({
  components: { UiLink, UiIcon, UiText },
  setup() {
    const { asInlineFlex } = args;
    const inlineFlex = asInlineFlex
      ? {
        '--link-display': 'inline-flex',
      }
      : {};
    return { ...args, inlineFlex };
  },
  template: `<UiLink 
      href="example.com"
      class="ui-link--has-icon"
      :style="inlineFlex "
  >
    <UiIcon
      v-if="hasIcon"
      icon="info-filled"
      class="ui-link__icon"  
    />{{ label }}
  </UiLink>`,
});
Link.args = {
  label: 'Ice cream tart cotton candy ice cream carrot cake apple pie.',
  hasIcon: true,
  asInlineFlex: true,
};

export const LinkInText = (args) => ({
  components: { UiLink, UiIcon, UiText },
  setup() {
    const { text, proportions, asInlineFlex } = args;
    const asArray = text.split(' ');
    const half = Math.ceil(asArray.length / proportions);
    const before = asArray.slice(0, half).join(' ');
    const after = asArray.slice(half).join(' ');
    const inlineFlex = asInlineFlex
      ? {
        '--link-display': 'inline-flex',
      }
      : {};

    return {
      ...args,
      before,
      after,
      inlineFlex,
    };
  },
  template: `<UiText>{{ before }}
    <UiLink
        href="example.com"
        class="ui-link--has-icon"
        :style="inlineFlex"
    >
      <UiIcon
        v-if="hasIcon"
        icon="info-filled"
        class="ui-link__icon"
      />{{ label }}
    </UiLink>
  {{ after }}
  </UiText>`,
});
LinkInText.args = {
  label: 'Ice cream tart cotton candy ice cream carrot cake apple pie.',
  text: 'Gummi bears toffee carrot cake gummi bears bonbon fruitcake chocolate. Tart croissant marshmallow caramels shortbread caramels marshmallow marshmallow brownie. Chocolate caramels jujubes jelly beans sesame snaps cake cake sweet roll.',
  proportions: 2,
  hasIcon: true,
  asInlineFlex: true,
};
LinkInText.argTypes = {
  proportions: {
    control: {
      type: 'range',
      min: 2,
      max: 8,
    },
  },
};

export const Button = (args) => ({
  components: { UiButton, UiIcon },
  setup() {
    return { ...args };
  },
  template: `<UiButton
      class="ui-button--text ui-button--has-icon"
      :style="inlineFlex "
  >
    <UiIcon
      v-if="hasIcon"
      icon="info-filled"
      class="ui-button__icon"  
    />{{ label }}
  </UiButton>`,
});
Button.args = {
  label: 'Ice cream tart cotton.',
  hasIcon: true,
};
export const Buttons = (args) => ({
  components: { UiButton, UiIcon },
  setup() {
    return { ...args };
  },
  template: `<template v-for="_ in 4" :key="_">
    <UiButton
        class="ui-button--text ui-button--has-icon"
        style="margin: 0 var(--space-8) 0 0"
    >
      <UiIcon
          v-if="hasIcon"
          icon="info-filled"
          class="ui-button__icon"
      />{{ label }}
    </UiButton>
  </template>`,
});
Buttons.args = {
  label: 'Ice cream tart cotton.',
  hasIcon: true,
};
