<template>
  <div class="container mt-4 text-secondary-emphasis" v-if="!centered">
    <h2 class="h1 text-center fw-bold text-uppercase" v-if="!small">
      <slot></slot>
    </h2>
    <h2 class="h3 text-center fw-bold text-uppercase" v-if="small">
      <slot></slot>
    </h2>
  </div>
  <div class="container position-absolute bg-light-subtle w-auto top-50 start-50 translate-middle" v-if="centered">
    <h2 class="h1 text-center fw-bold text-uppercase" v-if="!small">
      <slot name="name"></slot>
    </h2>
    <p class="text-secondary fs-5" v-if="!small">
      <slot name="slogan"></slot>
    </p>
    <h2 class="h3 text-center fw-bold text-uppercase" v-if="small">
      <slot name="name"></slot>
    </h2>
    <p class="text-secondary fs-6" v-if="small">
      <slot name="slogan"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'section-name',
  props: {
    small: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: false
    }
  }
}
</script>