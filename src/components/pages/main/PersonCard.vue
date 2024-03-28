<template>
    <div
        class="card shadow"
    >
      <div class="row g-0">
        <div class="col-md-6 d-flex align-items-start justify-content-center p-0 overflow-hidden bg-light-subtle rounded-start">
          <img
              class="rounded w-100 h-100 object-fit-cover"
              style="max-height: 296px"
              :src="imageURL"
              :alt="imageURL"
          >
        </div>
        <div class="col-md-6 bg-light-subtle rounded-end">
          <div class="card-body d-flex flex-column justify-content-between h-100 mt-3">
            <h5 class="card-title text-uppercase overflow-hidden" style="height: 72px;">{{name}}</h5>
            <a class="btn btn-primary m-3" :data-bs-target="'#moreModal_' + html_id" data-bs-toggle="modal" >Подробнее</a>
          </div>
        </div>
      </div>

      <!-- Модальное окно подробностей -->
      <div class="modal fade" :id="'moreModal_' + html_id" tabindex="-1" :aria-labelledby="'moreModalLabel' + html_id" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" style="max-width: 1000px;">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" :id="'moreModalLabel' + html_id">{{ name }}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body text-start">
              <div v-html="description"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'person-card',
  data () {
    return {

    }
  },
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
    },
    html_id: {
      type: String,
      required: true
    }
  }
}
</script>