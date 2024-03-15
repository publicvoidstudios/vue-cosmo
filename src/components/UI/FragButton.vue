<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'frag-button'
}
</script>

<style scoped>
button{
  padding: 10px 15px;
  background: transparent;
  border: 1px solid var(--comm-color-primary);
  border-radius: 10px;
  color: var(--comm-color-primary);
  width: fit-content;
}

button:hover{
  color: var(--comm-color-secondary);
  background-color: var(--comm-color-primary);
}
</style>