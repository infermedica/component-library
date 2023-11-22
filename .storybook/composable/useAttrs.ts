import { getCurrentInstance } from "vue";

export const useAttrs = ()=> {
  const instance = getCurrentInstance();
  const decoratorAttrs = (() => {
    const { parent: { attrs } } = instance;
    return attrs;
  })();
  const storyAttrs = (() => {
    const { parent: { parent } } = instance;
    if (!parent?.attrs) {
      return {}
    }
    const { attrs } = parent;
    return attrs;
  })();
  return {
    decoratorAttrs,
    storyAttrs,
  }
}
