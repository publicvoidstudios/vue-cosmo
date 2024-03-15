<template>
  <label for="namesDropdown">
    <slot></slot>
  </label>
  <select
      id="namesDropdown"
      v-model="value"
  >
    <option v-for="name in names" :value="name">{{name}}</option>
  </select>
</template>

<script>
export default {
  name: 'input-dropdown',
  data(){
    return{
      value: ''
    }
  },
  props: {
    names: {
      type: [Array, String],
      required: true
    }
  },
  methods: {
    change() {
      this.$emit('change', this.value);
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
select{
  align-self: center;
  padding: 5px;
  border-radius: var(--comm-border-radius);
  width: 100%;
  border: 1px solid var(--comm-color-primary);
  font-family: var(--description-font-family);
}

select:focus{
  transition: border 0s;
  border: 2px solid var(--comm-color-primary);
  outline: none;
}
</style>