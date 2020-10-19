<template>
  <table class="docs-table">
    <thead>
      <tr>
        <slot name="thead" />
      </tr>
    </thead>
    <tbody>
      <slot name="tbody" />
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'DocsTable',
};
</script>

<style lang="scss">
.docs-table {
  width: 100%;
  margin: 1rem 0;

  tr {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
  }

  th {
    place-self: start;
  }

  th,
  td {
    padding: 8px 4px;
  }
}
</style>
