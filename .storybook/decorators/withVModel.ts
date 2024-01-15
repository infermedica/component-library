import {
  computed,
  defineComponent,
  provide,
} from "vue";

import { useArgs } from "@storybook/preview-api";

export const withVModel = (story, { id, args }) => {
  const [{ modelValue }, updateArgs] = useArgs();

  return defineComponent({
    name: 'DWithVModel',
    inheritAttrs: false,
    setup() {
      const modelValue = computed({
        get: ()=>(args.modelValue),
        set: (newValue) => {
          updateArgs({ modelValue: newValue });
        }
      })
      provide('value', modelValue)
      const attrs = computed(()=>(Object.keys(args)
        .reduce(
          (object, key)=> {
            if(key !== 'modelValue') {
              object[key] = args[key];
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
    template: `<story v-bind="attrs"/>`
  })
}
