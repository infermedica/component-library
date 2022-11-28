import {
  ref,
  computed,
} from 'vue';
import UiButton from '../../src/components/atoms/UiButton/UiButton.vue';
import UiInput from '../../src/components/atoms/UiInput/UiInput.vue';
import UiText from '../../src/components/atoms/UiText/UiText.vue';

const withMixinCode = (story, { args }) => ({
  components: {
    story,
    UiButton,
    UiInput,
    UiText,
  },
  setup() {
    const {
      property, element, initValue,
    } = args;
    const [
      propertyHead,
      rest,
    ] = property.split('-');
    const propertyTail = rest ? `-${rest}` : '';
    const direction = ref('ltr');
    const value = ref(initValue);
    const logicalValue = computed(() => {
      const [
        blockStart,
        inlineEnd,
        blockEnd,
        inlineStart,
      ] = value.value.split(' ');
      return {
        blockStart: blockStart || '',
        blockEnd: blockEnd || blockStart,
        inlineStart: inlineStart || inlineEnd || blockStart,
        inlineEnd: inlineEnd || blockStart,
      };
    });
    const logicalStyle = computed(() => {
      const {
        blockStart, inlineEnd, blockEnd, inlineStart,
      } = logicalValue.value;
      return `${propertyHead}-block${propertyTail}: ${blockStart} ${blockEnd}; ${propertyHead}-inline${propertyTail}: ${inlineStart} ${inlineEnd};`;
    });
    const physicalStyle = computed(() => `${property}: ${value.value}`);
    const cssOutput = computed(() => {
      const {
        blockStart, inlineEnd, blockEnd, inlineStart,
      } = logicalValue.value;
      return `
${propertyHead}-block${propertyTail}: var(--button-${propertyHead}-logical${propertyTail}, var(--button-${propertyHead}-block${propertyTail}, ${blockStart} ${blockEnd}));
${propertyHead}-inline${propertyTail}: var(--button-${propertyHead}-logical${propertyTail}, var(--button-${propertyHead}-inline${propertyTail}, ${inlineStart} ${inlineEnd} ));`;
    });
    const handleClick = () => {
      const options = {
        ltr: 'rtl',
        rtl: 'ltr',
      };
      direction.value = options[direction.value];
    };
    return {
      direction,
      property,
      element,
      handleClick,
      value,
      logicalStyle,
      physicalStyle,
      cssOutput,
    };
  },
  template: `<div class="docs">
    <UiText class="ui-text--body-2-compact">Sass input:</UiText>
    <div class="docs__scss">
      <UiText class="ui-text--body-2-compact docs__text">
        @include mixins.use-logical({{element}}, {{property}},
      </UiText>
      <UiInput class="docs__text" v-model="value"/>
      <UiText class="docs__text">);</UiText>
    </div>
    <UiText class="ui-text--body-2-compact">
      Css output:
    </UiText>
    <div class="docs__css">
      <pre class="ui-text--body-2-compact docs__text">
        {{cssOutput}}
      </pre>
    </div>
    <UiButton class="ui-button--text" @click="handleClick">
      Change direction: {{direction}}
    </UiButton>
  </div>
  <div class="content" :dir="direction">
    <story v-bind="{logicalStyle, physicalStyle, property}"/>
  </div>`,
});

export default withMixinCode;