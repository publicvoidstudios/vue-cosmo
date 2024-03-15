<template>
  <div class="header-name-container">
    <h2 class="header-name">
      {{header_name}}
    </h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    header_name: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

.header-name-container {
  --scp-header-margin: 20px;

  margin: calc(var(--comm-nav-panel-height) + var(--scp-header-margin)) var(--scp-header-margin) var(--scp-header-margin);
  background: linear-gradient(to right, var(--comm-color-primary), var(--comm-color-tretiary));
  height: var(--comm-nav-panel-height);
  border-radius: var(--comm-border-radius);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;

  .header-name {
    color: var(--comm-color-secondary);
    font-size: var(--comm-font-size-x-large);
    font-family: var(--heading-font-family);
  }
}
</style>