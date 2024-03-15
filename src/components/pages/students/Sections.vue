<template>
  <div class="items-container">
    <div v-for="section in sections" class="item-container" @click="sectionClicked(section.html_id)">
      <div class="image-content">
        <img :src="section.img_url" alt="">
      </div>
      <div class="text-content">
        <p class="name">{{section.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
      required: true
    }
  },
  methods: {
    sectionClicked (html_id) {
      this.$emit('sectionClicked', html_id)
    }
  }
}
</script>

<style scoped>

.items-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

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

    .image-content {
      --image-offset: 30px;

      width: calc(var(--item-width) - var(--image-offset));
      height: calc(var(--item-width) - var(--image-offset));
      overflow: hidden;
      border-radius: var(--comm-border-radius);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .text-content {
      margin-top: 5px;
      position: relative;
      height: 100px; /* Укажите желаемую высоту */
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .name {
        text-transform: lowercase;
        font-size: var(--comm-font-size-medium);
        font-family: var(--description-font-family);
        color: var(--headings-font-color);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
      }

      .name:first-letter {
        text-transform: capitalize;
      }
    }
  }

  .item-container:hover {
    scale: 1.05;
  }
}
</style>