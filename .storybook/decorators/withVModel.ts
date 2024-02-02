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

      return {
        args,
        id,
      }
    },
    template: `<story />`
  })
}
