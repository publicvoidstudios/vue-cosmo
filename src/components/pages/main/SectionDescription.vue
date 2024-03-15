<template>
  <div class="container">
    <p class="description normal" v-if="!small">
      <slot></slot>
    </p>
    <p class="description small" v-if="small">
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

<style scoped>
/*.container{
  margin-top: 10px;
}

.description {
  text-align: center;
  font-family: var(--description-font-family);

  color: var(--text-font-color);
}

.normal {
  font-size: var(--comm-font-size-large);
}

.small {
  font-size: var(--comm-font-size-medium);
}

@media screen and (max-width: 768px) {
  .normal {
    font-size: var(--comm-font-size-medium);
  }
  .small {
    font-size: var(--comm-font-size-small);
  }
}*/
</style>