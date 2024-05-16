<template>
  <UiHeading
    :lavel="3"
    class="terms-of-service__heading"
  >
    §1. General Provisions
  </UiHeading>
  <UiBulletPoints
    :items="items"
    tag="ol"
    class="terms-of-service__bullet-points"
  />
</template>

<script setup lang="ts">
import {
  UiHeading,
  UiBulletPoints,
} from '@infermedica/component-library';

const items = [
  {
    text: 'These Terms of Service specify:',
    children: {
      tag: 'ol',
      type: 'a',
      class: 'terms-of-service__sub-points',
      items: [
        { text: 'principles of operation of the website and the mobile application "Symptomate.com",' },
        { text: 'rules on the provision of services by electronic means,' },
        { text: 'the rights and obligations of the Service Provider and the Service Recipients.' },
      ],
    },
  },
  {
    text: 'Whenever these Terms of Service refer to:',
    children: {
      tag: 'ol',
      type: 'a',
      class: 'terms-of-service__sub-points',
      items: [
        { text: 'Application, this means the software for portable devices, made available free of charge by the Service Provider referred to in sec. 2(l) below, enabling the use of the Services referred to in sec. 2(k) below,' },
        { text: 'Articles, this means articles referring to medical and pharmaceutical topics,' },
        { text: 'License, this means a non-exclusive, royalty-free license granted to Users referred to in sec. 2(m) below to use the Application or Website referred to in sec. 2(j) below,' },
      ],
    },
  },
];
</script>

<style lang="scss">
.terms-of-service {
  &__heading {
    margin-block: 0 var(--space-32);
  }

  &__bullet-points {
    --bullet-points-gap: var(--space-32);
  }

  &__sub-points {
    --bullet-points-gap: var(--space-8);

    margin-block-start: var(--space-12);
  }
}
</style>
