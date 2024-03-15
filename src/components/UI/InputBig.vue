<template>
  <label>
    <slot></slot>
  </label>
  <textarea required></textarea>
</template>

<script>
export default {
  name: "input-big"
}
</script>

<style scoped>

label{
  text-align: center;
  font-family: var(--description-font-family);
  font-size: var(--comm-font-size-medium);
  margin: 10px;
}

textarea{
  align-self: center;
  padding: 5px;
  resize: vertical;
  border-radius: var(--comm-border-radius);
  width: 100%;
  border: 1px solid var(--comm-color-primary);
  font-family: var(--description-font-family);
}

textarea:focus{
  transition: border 0s;
  border: 2px solid var(--comm-color-primary);
  outline: none;
}

</style>