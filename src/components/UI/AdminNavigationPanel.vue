<template>
  <div class="panel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'admin-nav-panel'
}
</script>

<style scoped>
.panel{
  position: fixed;
  top:var(--name-panel-height);
  left: 0;
  bottom: 0;

  width: var(--comm-admin-panel-width);
  background-color: #f5f5f5;
  font-size: 32px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

}

</style>