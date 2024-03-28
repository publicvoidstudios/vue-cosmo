<template>
  <div class="container">
    <p class="text-center fs-5 text-uppercase text-secondary" v-if="!small">
      <slot></slot>
    </p>
    <p class="text-center text-secondary" v-if="small">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'section-desc',
  props: {
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>