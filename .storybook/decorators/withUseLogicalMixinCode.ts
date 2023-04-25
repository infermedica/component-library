import {
  ref,
  computed,
  provide,
type ComputedRef,
} from 'vue';
import {
  UiButton,
  UiInput,
  UiText,
  UiSwitch
} from '@index';
import type { DecoratorFunction } from '@storybook/types';
import type { VueRenderer } from '@storybook/vue3';

const withUseLogicalMixinCode: DecoratorFunction<VueRenderer> = (
  story,
) => ({
  components: {
    story,
    UiButton,
    UiInput,
    UiSwitch,
    UiText,
  },
  props: ['property', 'element', 'initValue'],
  setup(props) {
    const [
      propertyHead,
      rest,
    ]: string[] = props.property.split('-');
    const propertyTail = rest ? `-${rest}` : '';
    const isRtl = ref<boolean>(false)
    const direction = computed(() => isRtl.value ? 'rtl' : 'ltr');
    const value = ref<string>(props.initValue);
    const isBorderRadius = computed(() => props.property === 'border-radius');
    const getPropertyName = (str: string) => `${propertyHead}-${str}${propertyTail}`;
    const getVarName = (str: string) => `--${props.element}-${getPropertyName(str)}`;
    const logicalValue = computed(() => {
      const [
        blockStart,
        inlineEnd,
        blockEnd,
        inlineStart
      ] = value.value.split(
        props.property === 'border' ? '" ' : ' '
      );
      return {
        blockStart: blockStart || '',
        blockEnd: blockEnd || blockStart,
        inlineStart: inlineStart || inlineEnd || blockStart,
        inlineEnd: inlineEnd || blockStart,
      };
    });
    provide<ComputedRef<string>>('physicalStyle', computed(() => `${props.property}: ${value.value}`));
    const logicalStyle = computed(() => {
      const { blockStart, inlineEnd, blockEnd, inlineStart } = logicalValue.value;
      return isBorderRadius.value
        ? [
          ['start-start', blockStart],
          ['start-end', inlineEnd],
          ['end-start', blockEnd],
          ['end-end', inlineStart],
        ].map(
          ([name, value], index) => `${getPropertyName(name)}: var( ${getVarName(name)}, ${value} );`)
        : [
          `${getPropertyName('block')}: var(${getVarName('block')}, var(${getVarName('block-start')}, ${blockStart}) var(${getVarName('block-end')}, ${blockEnd}))`,
          `${getPropertyName('inline')}: var(${getVarName('inline')}, var(${getVarName('inline-start')}, ${inlineStart}) var(${getVarName('inline-end')}, ${inlineEnd}))`
        ];
    });
    provide<ComputedRef<string[]>>('logicalStyle', logicalStyle);
    return {
      cssOutput: logicalStyle.value.join('\n'),
      direction,
      isRtl,
      value,
    };
  },
  template: `<div class="docs">
    <UiText class="ui-text--body-2-compact">Sass input:</UiText>
    <div class="docs__scss">
      <UiText class="ui-text--body-2-compact docs__text">
        @include mixins.use-logical({{ element }}, {{ property }},
      </UiText>
      <UiInput
        v-model="value"
        class="docs__text"
      />
      <UiText class="docs__text">);</UiText>
    </div>
    <UiText class="ui-text--body-2-compact">
      Css output:
    </UiText>
    <div class="docs__css">
      <UiText
        tag="pre"
        class="ui-text--body-2-compact docs__text"
      >
        {{ cssOutput }}
      </UiText>
    </div>
    <UiText class="ui-text--body-2-compact">Toggle Text Direction:</UiText>
    <div class="docs__switch">
      <UiText class="ui-text--body-2-compact">ltr</UiText>
      <UiSwitch v-model="isRtl"/>
      <UiText class="ui-text--body-2-compact">rtl</UiText>
    </div>
  </div>
  <div
    class="content"
    :dir="direction"
  >
    <story/>
  </div>`,
});

export default withUseLogicalMixinCode;
