<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="liveAlertToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header d-flex justify-content-between">
        <span
            v-if="alertBox.statusCode === 'OK'"
            class="rounded-pill bg-success text-light d-flex justify-content-center align-items-center"
            style="width: 20px; height: 20px"
        >
          &check;
        </span>
        <span
            v-if="alertBox.statusCode === 'ERR'"
            class="rounded-pill bg-danger text-light d-flex justify-content-center align-items-center"
            style="width: 20px; height: 20px"
        >
          &times;
        </span>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
      </div>
      <div class="toast-body">
        {{alertBox.message}}
      </div>
    </div>
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap'
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

      const toastAlert = document.getElementById('liveAlertToast');

      const alert = bootstrap.Toast.getOrCreateInstance(toastAlert);
      alert.show()
    },
  }
}
</script>