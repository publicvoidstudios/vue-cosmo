<template>
  <div class="pop-up-container" @click="showPopup" v-if="popupVisible">
    <div class="pop-up" @click.stop>
      <h2 class="pop-up-name">{{name}}</h2>
      <div class="pop-up-text" v-html="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pop-up',
  props: {
    name: {
      type: String
    },
    content: {
      type: String
    },
    popupVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showPopup () {
      this.$emit('showPopup', false);

      document.body.style.overflow = ''; //Enabling scrolling when inactive
    }
  }
}
</script>

<style scoped>

.pop-up-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #0008;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
}

.pop-up {
  width: 90%;
  height: 90%;
  background-color: var(--comm-color-secondary);
  border-radius: var(--comm-border-radius);
  padding: 20px;
}

.pop-up-name {
  text-align: center;
  font-size: 40px;
  padding: 5px;
  margin: 0;
  font-family: var(--heading-font-family);
}

.pop-up-text {
  margin: 0;
  max-height: 93%;
  font-family: var(--description-font-family);
  font-size: 24px;
  overflow: auto;
  padding: 25px;

  scrollbar-width: none;

}

</style>