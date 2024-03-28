<template>
  <div class="container mt-5 bg-primary p-3 d-flex justify-content-between rounded text-uppercase navbar-dark align-items-center">
    <h2 class="navbar-text ms-2">
      {{header_name}}
    </h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    header_name: {
      type: String,
      required: true
    }
  }
}
</script>