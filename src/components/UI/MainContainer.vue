<template>
  <div class="main">
    <slot></slot>
  </div>
</template>

<script>
export default {
name: 'main-flex-container'
}
</script>

<style scoped>
.main{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
</style>