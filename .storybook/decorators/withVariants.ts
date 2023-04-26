import type { DecoratorFunction } from '@storybook/types';
import type { VueRenderer } from '@storybook/vue3';
import { onBeforeUnmount } from 'vue';

type CSSStyleRuleWithSubRules = CSSStyleRule | (CSSMediaRule & { cssRules?: CSSStyleRule[]})

const pseudoStates = [
  "hover",
  "active",
  "focus-visible",
  "focus-within",
  "focus",
] as const;
const decoratorSelector = "pseudo-states" as const;
const joinedPseudoStates = pseudoStates.join("|");
const matchOnePseudoSelector = new RegExp(`:(${joinedPseudoStates})`);
const matchAllPseudoSelectors = new RegExp(
  `:(${joinedPseudoStates})`,
  "g"
);
const createSelector = (selector: string) => `pseudo-style-${selector.split('--')[0]}`;
const hasPseudoClasses = () => !!document
  .getElementsByTagName("style")
  .namedItem(decoratorSelector);
const processPseudoSelector = (ct: string, st: string) => {
  return ct.replace(
    st,
    st.split(", ")
      .flatMap((selector) => {
        const modifiedSelector = selector.replaceAll(
          matchAllPseudoSelectors,
          (originalSelector, state: string) => {
            const replacement = originalSelector.replaceAll(
              `:${state}`,
              `.pseudo-${state}`
              );
              return replacement;
        }).replace('body:not(.focus-hidden)', '');
        return [st, modifiedSelector];
      })
      .join(", ")
  );
};
const insertStylesIntoDOM = (styleList: string[], contextId: string) => {
  if (hasPseudoClasses()) return;
  const markingElement = document.createElement("style");
  const selectorID = createSelector(contextId);
  const style = document.createElement("style");
  const cssText = styleList.join("");
  const previouslySetStyles = document.getElementById(selectorID);
  markingElement.setAttribute("id", decoratorSelector);
  style.setAttribute("id", selectorID);
  style.innerHTML = cssText;
  if (previouslySetStyles) {
    previouslySetStyles.innerHTML = cssText;
  } else {
    const docFragment = document.createDocumentFragment();
    docFragment.appendChild(markingElement);
    docFragment.appendChild(style);
    document.head.appendChild(docFragment);
  }
}
const removeStylesFromDOM = (contextId: string) => {
  const selectorID = createSelector(contextId);
  document.getElementById(selectorID)?.remove();
  document.getElementById(decoratorSelector)?.remove();
}
const replacePseudoSelectors = (selector: string) => {
  const styleSheetsList = [...document.styleSheets];
  return styleSheetsList.flatMap((styleSheet)  => {
    if (styleSheet.href?.includes('googleapis')) {
      return [];
    }
    return Array.from(styleSheet.cssRules).flatMap((cssRule) => {
      const ruleWithSelectorText = cssRule as CSSStyleRuleWithSubRules;
      if (
        ruleWithSelectorText &&
        matchOnePseudoSelector.test(ruleWithSelectorText.cssText) &&
        ruleWithSelectorText.cssText.includes(selector) &&
        !ruleWithSelectorText.cssText.includes('.pseudo-')
      ) {
        return 'selectorText' in ruleWithSelectorText
          ? processPseudoSelector(ruleWithSelectorText.cssText, ruleWithSelectorText.selectorText)
          : ([...ruleWithSelectorText.cssRules]).map((subRule ) => {
              return processPseudoSelector(subRule.cssText, subRule.selectorText);
            });
      }
      return [];
    });
  });
};
const getModifiers = (
  variant: Record<string, unknown> & { class?: string | string[] },
  { modifiers }: { modifiers?: string[] }
) => {
  if( typeof variant.class === 'string' ) {
    variant.class = variant.class.split(' ');
  }
  if( typeof variant.class === 'undefined' ) {
    variant.class = []
  }
  if( typeof modifiers === 'undefined' ) {
    modifiers = []
  }
  return [
    ...variant.class,
    ...modifiers,
  ]
}
export const withVariants: DecoratorFunction<VueRenderer> = (
  story,
  { componentId, id, parameters, args }
) => ({
  components: { story },
  setup() {
    if (!document.getElementById(createSelector(id))) {
      const componentClassName = `.ui-${componentId.split('-')[1]}`;
      const getModifiedStyles = replacePseudoSelectors(componentClassName);
      insertStylesIntoDOM(getModifiedStyles, id);
      onBeforeUnmount(() => {
        removeStylesFromDOM(id);
      })
    }
    return {
      variants: parameters.variants,
      args,
      getModifiers,
    }
  },
  template: `<div class="variants">
    <template v-for="({label, ...rest}, index) in variants" :key="index">
      <span
        v-if="label"
        class="variants__label"
      >
        {{ label }}:
      </span>
      <!-- *required -->
      <div>
        <story
            v-bind="{
              ...rest,
              class: '',
              modifiers: getModifiers(rest, args),
            }"
        />
      </div>
    </template>
  </div>`
})
