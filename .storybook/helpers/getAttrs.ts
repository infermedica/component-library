import {
  computed,
  getCurrentInstance
} from "vue";

export const getAttrs = (args={}, argTypes={}) => {
  const storyAttrs = (instance)=> {
    const attrs = instance.attrs
      ? {...instance.attrs}
      : {};
    const hasAttrs = Object.keys(attrs).length > 0;
    if(hasAttrs) {
      return attrs;
    }
    if(instance.parent) {
      storyAttrs(instance.parent);
    }
  }
  // TODO:
  const attrs = computed(()=>(Object.keys(args).reduce((object, key) => {
    // .style meh, meh
    // if (argTypes[key].table.category?.match(/CSS/i)) {
    //   object.style[`--${key}`] = args[key];
    // } else {
      object[key] = args[key];
    // }
    return object;
  }, {
    ...storyAttrs(getCurrentInstance()),
    style: {},
  })))
  return {
    attrs
  }
}
