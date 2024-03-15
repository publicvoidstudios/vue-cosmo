<template>
  <label>
    <slot></slot>
  </label>
  <input
      type="text"
      v-model="value"
      required
  >
</template>

<script>
export default {
  name: "input-small",
  data(){
    return{
      value: ''
    }
  },
  props: {
    valueName: {
      type: String,
      required: true
    }
  },
  methods: {
    onInputChange(){

      this.$emit('updateInputData', this.value)
      //Clear value
      this.value = '';
    }
  }
}
</script>

<style scoped>
label{
  text-align: center;
  font-family: var(--description-font-family);
  font-size: var(--comm-font-size-medium);
  margin: 10px;
}

input{
  align-self: center;
  padding: 5px;
  border-radius: var(--comm-border-radius);
  width: 100%;
  border: 1px solid var(--comm-color-primary);
  font-family: var(--description-font-family);
}

input:focus{
  transition: border 0s;
  border: 2px solid var(--comm-color-primary);
  outline: none;
}
</style>