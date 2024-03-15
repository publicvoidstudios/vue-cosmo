<template>
    <div class="item-container" @click="itemClicked">
      <img :src="imageURL" alt="">
      <div class="text-content">
        <p class="name">{{name}}</p>
        <p class="hint">Нажмите, чтобы узнать больше</p>
      </div>
    </div>
</template>

<script>

export default {
  name: 'main-item',
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      default: ""
    },
    imageURL: {
      type: String,
      required: true
    }
  },
  methods: {
    itemClicked () {
      this.$emit('itemClicked', this.name, this.description);

      document.body.style.overflow = 'hidden'; //Disabling page scrolling, when pop up is active
    }
  }
}
</script>

<style scoped>
/**{
  --item-image-size: calc(var(--item-width) - 40px);
}

.item-container {
  padding: 20px;
  width: var(--item-width);
  height: var(--item-height);
  border-radius: var(--comm-border-radius);
  background-color: var(--item-back-color);
  box-shadow: 0 0 10px 0 var(--item-box-shadow-color);
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  .hint{
    opacity: 0;
    font-family: var(--description-font-family);
    font-size: var(--comm-font-size-small);
    color: var(--text-font-color);
  }
}

.item-container:hover {
  scale: 1.05;
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

  border-radius: var(--comm-border-radius);
}

.name {
  text-transform: lowercase;
  font-size: var(--comm-font-size-medium);
  font-family: var(--heading-font-family);
  color: var(--headings-font-color);
}
.name:first-letter {
  text-transform: capitalize;
}

.text-content {
  margin-top: 5px;
  position: relative;
  height: 100px; !* Укажите желаемую высоту *!
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-content p {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}*/
</style>