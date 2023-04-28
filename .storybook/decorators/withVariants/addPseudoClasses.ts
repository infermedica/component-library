declare global {
  interface Window {
    __pseudoStyles: Record<string, string[]>;
  }
}
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
const matchComponentName = new RegExp(/ui-(.+?)(?=(--|__|:))/);
const matchAllPseudoSelectors = new RegExp(
  `:(${joinedPseudoStates})`,
  "g"
);
const processPseudoSelector = (ct: string, st: string) => ct.replace(
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
const getModifiedStyle = (cssRule: CSSStyleRuleWithSubRules) => processPseudoSelector(cssRule.cssText, cssRule.selectorText);

const insertStylesIntoDOM = (styleList: string[]) => {
  const markingElement = document.createElement("style");
  const style = document.createElement("style");
  const cssText = styleList.join("");
  markingElement.setAttribute("id", decoratorSelector);
  style.setAttribute("id", 'pseudo-class');
  style.innerHTML = cssText;
  const docFragment = document.createDocumentFragment();
  docFragment.appendChild(markingElement);
  docFragment.appendChild(style);
  document.head.appendChild(docFragment);
}
const getModifiedStyles = (styleSheetsList: CSSStyleSheet[], selector: string) => (
  styleSheetsList.flatMap((styleSheet)  => {
    return styleSheet.href?.includes('googleapis') ? [] : Array.from(styleSheet.cssRules).flatMap((cssRule) => {
      const ruleWithSelectorText = cssRule as CSSStyleRuleWithSubRules;
      if (
        ruleWithSelectorText &&
        matchOnePseudoSelector.test(ruleWithSelectorText.cssText) &&
        ruleWithSelectorText.cssText.includes(selector) &&
        !ruleWithSelectorText.cssText.includes('.pseudo-')
      ) {
        if ('selectorText' in ruleWithSelectorText) {
          const componentName = ruleWithSelectorText.selectorText.match(matchComponentName)?.at(0);
          const modifiedStyles = getModifiedStyle(ruleWithSelectorText);
          if (componentName) window.__pseudoStyles[componentName] = [
            ...(window.__pseudoStyles[componentName] || []),
            modifiedStyles,
          ]
          return modifiedStyles;
        }
        return ([...ruleWithSelectorText.cssRules]).map((subRule ) => {
          const componentName = subRule.selectorText.match(matchComponentName)?.at(0);
          const modifiedStyles = getModifiedStyle(subRule);
          if (componentName) window.__pseudoStyles[componentName] = [
            ...(window.__pseudoStyles[componentName] || []),
            modifiedStyles
          ]
          return modifiedStyles
        });
      }
      return [];
    });
  })
)
const addPseudoClasses = (selector: string = '.ui-') => {
  window.__pseudoStyles = {};
  const modifiedStyles = getModifiedStyles([...document.styleSheets], selector);
  insertStylesIntoDOM(modifiedStyles);
};
export default addPseudoClasses;