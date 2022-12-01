import {
  ref,
  computed,
} from 'vue';
import UiButton from '../../src/components/atoms/UiButton/UiButton.vue';
import UiInput from '../../src/components/atoms/UiInput/UiInput.vue';
import UiText from '../../src/components/atoms/UiText/UiText.vue';

const withUseLogicalMixinCode = (story, { args }) => ({
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
    const isBorderRadius = computed(() => property === 'border-radius');
    const getPropertyName = (str) => `${propertyHead}-${str}${propertyTail}`;
    const getVarName = (str) => `--${element}-${getPropertyName(str)}`;
    const logicalValue = computed(() => {
      const [ blockStart, inlineEnd, blockEnd, inlineStart ] = value.value.split(property === 'border' ? '" ' : ' ');
      return {
        blockStart: blockStart || '',
        blockEnd: blockEnd || blockStart,
        inlineStart: inlineStart || inlineEnd || blockStart,
        inlineEnd: inlineEnd || blockStart,
      };
    });
    const logicalStyle = computed(() => {
      const { blockStart, blockEnd, inlineStart, inlineEnd } = logicalValue.value
      if (!isBorderRadius.value) {
        return `
        ${getPropertyName('block')}: ${blockStart} ${blockEnd};
        ${getPropertyName('inline')}: ${inlineStart} ${inlineEnd};`
      } else {
        return `
        ${getPropertyName('start-start')}: ${blockStart};
        ${getPropertyName('start-end')}: ${inlineEnd};
        ${getPropertyName('end-start')}: ${blockEnd};
        ${getPropertyName('end-end')}: ${inlineStart};`
      }
    });
    const physicalStyle = computed(() => `${property}: ${value.value}`);
    const cssOutput = computed(() => {
      const { blockStart, inlineEnd, blockEnd, inlineStart } = logicalValue.value;
      if (!isBorderRadius.value) {
        return [
          `${getPropertyName('block')}: var( ${getVarName('block')}, var( ${getVarName('block-start')}, ${blockStart} ) var( ${getVarName('block-end')}, ${blockEnd} ));`,
          `${getPropertyName('inline')}: var( ${getVarName('inline')}, var(${getVarName('inline-start')}, ${inlineStart} ) var${getVarName('inline-end')}, ${inlineEnd} ));`
        ];
      } else {
        return [
          `${getPropertyName('start-start')}: var( ${getVarName('start-start')}, ${blockStart} );`,
          `${getPropertyName('start-end')}: var( ${getVarName('start-end')}, ${inlineEnd} );`,
          `${getPropertyName('end-start')}: var( ${getVarName('end-start')}, ${blockEnd} );`,
          `${getPropertyName('end-end')}: var( ${getVarName('end')}, ${inlineStart} );`,
        ]
      }
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
      <UiText v-for="(output, index) in cssOutput" :key="index" class="ui-text--body-2-compact docs__text">
        {{output}}
      </UiText>
    </div>
    <UiButton class="ui-button--text" @click="handleClick">
      Change direction: {{direction}}
    </UiButton>
  </div>
  <div class="content" :dir="direction">
    <story v-bind="{logicalStyle, physicalStyle, property}"/>
  </div>`,
});

export default withUseLogicalMixinCode;