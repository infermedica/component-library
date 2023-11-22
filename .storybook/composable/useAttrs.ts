import { getCurrentInstance } from "vue";

export const useAttrs = ()=> {
  const instance = getCurrentInstance();
  const decoratorAttrs = (() => {
    const { parent: { attrs } } = getCurrentInstance();
    return attrs;
  })();
  const storyAttrs = (() => {
    const { parent: { parent: { attrs } } } = getCurrentInstance();
    return attrs;
  })();
  return {
    decoratorAttrs,
    storyAttrs,
  }
}
