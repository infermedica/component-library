<template>
  <table class="docs-table">
    <thead>
      <slot name="thead" />
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
  font-size: 13px;
  color: #333;
  border-spacing: 0;
  border-collapse: collapse;

  th,
  td {
    padding: 10px 15px;
    text-align: left;
    vertical-align: middle;
    border: none;
  }
}
</style>
