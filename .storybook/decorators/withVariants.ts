import {
  computed,
  onBeforeUnmount
} from 'vue';

const pseudoStates = [
  "hover",
  "active",
  "focus-visible",
  "focus-within",
  "focus",
];
const decoratorSelector = "pseudo-states";
const joinedPseudoStates = pseudoStates.join("|");
const matchOnePseudoSelector = new RegExp(`:(${joinedPseudoStates})`);
const matchAllPseudoSelectors = new RegExp(
  `:(${joinedPseudoStates})`,
  "g"
);
const createSelector = (selector) => `pseudo-style-${selector}`;
const hasPseudoClasses = () => {
  return !!document
    .getElementsByTagName("style")
    .namedItem(decoratorSelector);
};
const processPseudoSelector = (ct, st) => {
  return ct.replace(
    st,
    st.split(", ")
      .flatMap((selector) => {
        const modifiedSelector = selector.replaceAll(
          matchAllPseudoSelectors,
          (originalSelector, state) => {
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
const insertStylesIntoDOM = (styleList, contextId) => {
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
const removeStylesFromDOM = (contextId) => {
  const selectorID = createSelector(contextId);
  document.getElementById(selectorID)?.remove();
  document.getElementById(decoratorSelector)?.remove();
}
const replacePseudoSelectors = (selector) => {
  const styleSheetsList = document.styleSheets;
  if (!styleSheetsList) return [];
  let rulesProcessed = [];
  for (let i = 0; i < styleSheetsList.length; i++) {
    const currentStyleSheet = styleSheetsList.item(i);
    if (currentStyleSheet && !currentStyleSheet.href?.includes('googleapis')) {
      for (let j = 0; j < currentStyleSheet.cssRules.length; j++) {
        const currentCSSRule = currentStyleSheet.cssRules.item(j);
        if (currentCSSRule) {
          const { cssText, selectorText } = currentCSSRule;
          if ( matchOnePseudoSelector.test(cssText)
            && cssText.includes(selector) &&
            !cssText.includes(`.pseudo-`)
          ) {
            if (!selectorText) {
              for(let k = 0; k < currentCSSRule.cssRules.length; k++) {
                rulesProcessed.push(processPseudoSelector(
                  currentCSSRule.cssRules[k].cssText, currentCSSRule.cssRules[k].selectorText)
                )
              }
            } else {
              const newRule = processPseudoSelector(cssText, currentCSSRule.selectorText)
              rulesProcessed.push(newRule);
            }
          }
        }
      }
    }
  }
  return rulesProcessed;
}
const getModifiers = (variant, args) => {
  if( typeof variant.class === 'string' ) {
    variant.class = variant.class.split(' ');
  }
  if( typeof variant.class === 'undefined' ) {
    variant.class = []
  }
  if( typeof args.modifiers === 'undefined' ) {
    args.modifiers = []
  }
  return [
    ...variant.class,
    ...args.modifiers,
  ]
}
export const withVariants = (story, { componentId, id, parameters }) => ({
  inheritAttrs: false,
  components: { story },
  setup(props, { attrs} ) {
    const { variants } = parameters;
    const componentClassName = `.ui-${componentId.split('-')[1]}`;
    const getModifiedStyles = replacePseudoSelectors(componentClassName);
    insertStylesIntoDOM(getModifiedStyles, id);
    onBeforeUnmount(() => {
      removeStylesFromDOM(id);
    })
    const args = computed(()=>(attrs));
    return {
      variants,
      args,
      id,
    }
  },
  template: `<div class="sb-variants">
    <template 
      v-for="({label, ...rest}, key) in variants" 
      :key="key"
    >
      <span
        v-if="label"
        class="sb-variants__label"
      >
        {{ label }}:
      </span>
      <!-- please don't remove this div -->
      <div>
        <story
          v-bind="args"
          v-bind="rest"
          :key="id"
        />
      </div>
    </template>
  </div>`
})
