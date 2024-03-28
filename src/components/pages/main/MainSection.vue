<template>
  <div class="container-fluid text-center m-0 p-0">
    <a class="anchor" :id="anchorName.link"></a>
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

.anchor {
  position: relative;
  top: -80px;
}

</style>