<template>
  <a :href="`#${link}`">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'page-nav-link',
  props: {
    link: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>