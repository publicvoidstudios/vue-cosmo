<template>
  <div class="container">
    <div class="anchor" :id="anchorName.link"></div>
    <slot name="name"></slot>
    <slot name="description"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'main-section',
  props: {
    anchorName: {
      type: JSON,
      required: true
    }
  }
}
</script>

<style scoped>
/*.container{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.anchor {
  position: relative;
  top: 0;
}*/
</style>