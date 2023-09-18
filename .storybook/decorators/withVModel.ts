import {
  computed,
  defineComponent,
  provide,
} from "vue";

import { useArgs } from "@storybook/preview-api";

export const withVModel = (story, { id }) => {
  const [{ modelValue }, updateArgs] = useArgs();

  return defineComponent({
    inheritAttrs: false,
    setup(props, { attrs }) {
      const modelValue = computed({
        get: ()=>(attrs.modelValue),
        set: (newValue) => {
          updateArgs({ modelValue: newValue });
        }
      })
      provide('value', modelValue)
      const args = computed(()=>(Object.keys(attrs)
        .reduce(
          (object, key)=> {
            if(key !== 'modelValue') {
              object[key] = attrs[key];
            }
            return object;
          },
          {}
        )))

      return {
        args,
        id,
      }
    },
    template: `<story 
      v-bind="args"
      :key="id"
    />`
  })
}
