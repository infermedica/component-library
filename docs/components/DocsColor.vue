<template>
  <div class="docs-color">
    <template v-for="(color, key) in colors">
      <div
        :key="key"
        class="color"
        :style="{
          background: `var(--c-${name}-${color.props})`,
          '--initial': `'${color.initial}'`,
          '--color': key > 4 && '#fff'
        }"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'DocsColor',
  props: {
    name: {
      type: String,
      default: '',
    },
    colors: {
      type: Array,
      default: () => ([]),
    },
  },
};
</script>

<style lang="scss">
.docs-color {
  display: grid;
  grid-auto-flow: column;

  .color {
    position: relative;
    height: 0;
    padding: 100% 0 0 0;

    &::after {
      position: absolute;
      right: 4px;
      bottom: 4px;
      color: var(--color);
      content: var(--initial, "");
    }
  }
}
</style>
