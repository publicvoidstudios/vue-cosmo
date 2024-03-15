<template>
  <div class="main-container">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
</style>