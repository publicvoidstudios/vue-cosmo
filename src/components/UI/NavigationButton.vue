<template>
  <button class="nav-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'nav-button'
}
</script>

<style scoped>
.nav-button{
  padding: 10px 10px;
  height: 100%;
  width: 100%;
  border: none;
  background-color: transparent;
  font-family: var(--heading-font-family);
  font-size: 0.75em;
  word-break: break-word;
  color: var(--comm-color-secondary);

  justify-self: flex-end;
  align-self: center;
}

.nav-button:hover{
  color: var(--comm-color-tretiary);
  background-color: #0001;
  cursor: pointer;
}
</style>