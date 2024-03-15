<template>
  <div class="container" v-if="!centered">
    <h2 class="normal" v-if="!small">
      <slot></slot>
    </h2>
    <h2 class="small" v-if="small">
      <slot></slot>
    </h2>
    <h2 class="centered" v-if="centered">
      <slot></slot>
    </h2>
  </div>
  <div class="container centered" v-if="centered">
    <h2 class="normal" v-if="!small">
      <slot name="name"></slot>
    </h2>
    <p class="text-normal" v-if="!small">
      <slot name="slogan"></slot>
    </p>
    <h2 class="small" v-if="small">
      <slot name="name"></slot>
    </h2>
    <p class="text-small" v-if="small">
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

<style scoped>
/*.container {
  z-index: 1;
  margin-top: 10px;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--comm-color-secondary);
  padding: 20px;
}

h2 {
  text-align: center;
  font-family: var(--heading-font-family);
  color: var(--headings-font-color);
  text-transform: uppercase;
}

.normal {
  font-size: var(--comm-font-size-xxx-large);
}

.small{
  font-size: var(--comm-font-size-x-large);
}

.text-normal {
  text-align: center;
  font-family: var(--description-font-family);
  color: var(--text-font-color);
  font-size: var(--comm-font-size-medium);
}

.text-small {
  text-align: center;
  font-family: var(--description-font-family);
  color: var(--text-font-color);
  font-size: var(--comm-font-size-small);
}

@media screen and (max-width: 768px) {
  .centered {
    .normal {
      font-size: var(--comm-font-size-x-large);
    }
    .small {
      font-size: var(--comm-font-size-medium);
    }
  }

  .normal {
    font-size: var(--comm-font-size-xx-large);
  }

  .small {
    font-size: var(--comm-font-size-large);
  }

  .text-normal {
    font-size: var(--comm-font-size-small);
  }
  .text-small {
    font-size: var(--comm-font-size-tiny);
  }
}*/


</style>