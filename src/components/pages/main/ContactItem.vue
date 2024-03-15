<template>
    <div class="container" @click="moveToURL(locationURL)">
      <img :src="imageURL" alt="">
      <p class="name">{{name}}</p>
      <p class="hint">Связаться через {{name}}</p>
    </div>
</template>

<script>

export default {
  name: 'contact-item',
  props: {
    name: {
      type: String,
      required: true
    },
    imageURL: {
      type: String,
      required: true
    },
    locationURL: {
      type: String,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    moveToURL(url) {
      window.open(url, '_blank').focus();
    }
  }
}
</script>

<style scoped>
/**{
  --item-image-size: calc(var(--item-width) - 40px);
}

.container {
  padding: 20px;
  width: var(--item-width);
  height: var(--item-contact-height);
  border-radius: var(--comm-border-radius);
  background-color: var(--item-back-color);
  box-shadow: 0 0 10px 0 var(--item-box-shadow-color);
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .name {
    text-align: center;
    width: 100%;
    position: relative;
    top: 15px;
    opacity: 1;
  }
  .hint{
    text-align: center;
    position: relative;
    top: -10px;
    opacity: 0;
    font-family: var(--description-font-family);
    font-size: var(--comm-font-size-small);
    color: var(--text-font-color);
  }
}

.container:hover {
  scale: 1.1;
  .name {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  .hint {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }
}

img {
  width: var(--item-image-size);
  height: var(--item-image-size);

  border-radius: var(--comm-border-radius);
}

.name {
  font-size: var(--comm-font-size-medium);
  font-family: var(--heading-font-family);
  color: var(--headings-font-color);
}*/
</style>