import {
  computed,
  getCurrentInstance
} from "vue";
import deepmerge from "deepmerge";

export const getAttrs = (args={}, argTypes={}, name='') => {
  const storyAttrs = (instance)=> {
    const attrs = instance.attrs;
    const hasAttrs = Object.keys(attrs).length > 0;
    if(hasAttrs) {
      return attrs
    }
    if(instance.parent) {
      return storyAttrs(instance.parent);
    }
    return {};
  }
  const attrs = computed(()=>{
    const sArgs = Object.keys(args).reduce((object, key) => {
      if (argTypes[key]?.table?.category?.match(/CSS/i)) {
        if(name.match(/^Basic/i)) {
          object.style[`--${key}`] = args[key];
        }
      } else {
        object[key] = args[key];
      }
      return object;
    }, {
      style: {},
    })
    const sAttrs = storyAttrs(getCurrentInstance())
    return deepmerge(sArgs, sAttrs)
  })
  return {
    attrs
  }
}
