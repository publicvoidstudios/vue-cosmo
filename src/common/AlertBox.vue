<template>
  <div class="alert-box" id="alert-box">
    <div class="icon circle" v-if="alertBox.statusCode === 'OK'">
      <span>&check;</span>
    </div>
    <div class="icon square" v-if="alertBox.statusCode === 'ERR'">
      <span>&times;</span>
    </div>
    <p class="message">
      {{alertBox.message}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'alert-box',
  data () {
    return {
      alertBox: {
        message: '',
        statusCode: ''
      },
    }
  },
  methods: {
    alertMessage (message, statusOk) {
      this.alertBox.message = message;
      this.alertBox.statusCode = statusOk ? 'OK' : 'ERR';

      const alertBox = document.getElementById('alert-box');
      if(alertBox) {
        setTimeout(() => {
          alertBox.style.top = '10px';
          alertBox.style.opacity = '1';
          setTimeout(() => {
            alertBox.style.top = '-100px';
            alertBox.style.opacity = '0';
          }, 3000); // Adjust the 2000ms here to control how long the box stays at the top
        }, 100); // You can adjust the 100ms delay here for better visual effect
      }
    },
  }
}
</script>

<style scoped>
.alert-box {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  z-index: 100;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);

  opacity: 0;

  background-color: white;
  border: 1px solid var(--comm-color-primary);
  color: #333;
  padding: 10px 20px;
  border-radius: var(--comm-border-radius-thin);
  transition: all 0.3s ease-in-out;

  .icon {
    margin: 10px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: var(--comm-font-size-medium);
  }

  .circle {
    background-color: #3cb371;
    border-radius: 50%;
  }

  .square {
    background-color: tomato;
    border-radius: var(--comm-border-radius-thin);
  }

  .message {
    margin: 10px;
  }
}
</style>