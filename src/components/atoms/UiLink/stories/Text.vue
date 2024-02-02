<template>
  <UiText>
    Using  <UiLink v-bind="args">
      {{ content }}
    </UiLink> probabilistic modeling, the Triage module presents a series of recommendations appropriate to the individual needs of the patient:
  </UiText>
  <UiText>
    Using  <UiLink v-bind="args">
      <UiIcon
        :icon="icon"
        class="ui-link__icon"
      />
      {{ content }}
    </Uilink> probabilistic modeling, the Triage module presents a series of recommendations appropriate to the individual needs of the patient:
  </UiText>
  <UiText>
    Using  <UiLink v-bind="args">
      {{ content }}<UiIcon
        :icon="icon"
        class="ui-link__icon ui-link__icon--end"
      />
    </UiLink> probabilistic modeling, the Triage module presents a series of recommendations appropriate to the individual needs of the patient:
  </UiText>
</template>

<script setup>
import {
  reactive,
  computed,
  useAttrs,
  defineOptions,
  toRefs,
} from 'vue';
import {
  UiLink,
  UiIcon,
  UiText,
} from '@infermedica/component-library';

defineOptions({ inheritAttrs: false });
const attrs = reactive(useAttrs());
const args = computed(() => (attrs));
const {
  content, icon,
} = toRefs(attrs);
</script>
