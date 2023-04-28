import type { DecoratorFunction } from '@storybook/types';
import type { VueRenderer } from '@storybook/vue3';

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
  { parameters: { variants }, args }
) => ({
  components: { story },
  setup() {
    return {
      variants,
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
