<template>
  <div class="container" v-if="show" @click="closeDialog">
    <div class="window" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dialog-window',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped>
.container{
  z-index: 101;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #0008;
  position: fixed;
  display: flex;
}
.window{
  margin: auto;
  background: var(--comm-color-secondary);
  border-radius: 10px;
  min-height: 100px;
  min-width: 300px;
  overflow: auto;
}
</style>