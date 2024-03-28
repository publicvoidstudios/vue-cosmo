<template>
  <div class="ratio ratio-4x3 shadow" data-bs-toggle="modal" :data-bs-target="`#modalImageViewer_${imageItem.id}`">
    <img class="img-fluid rounded object-fit-cover" style="cursor: pointer" :src="imageItem.param2" :alt="imageItem.param1">
  </div>
  <p class="text-dark-emphasis overflow-hidden fs-5 mt-3 fw-bold capitalize-first-letter" style="height: 85px"> {{ imageItem.param1 }} </p>

  <!-- Image viewer modal window -->
  <div class="modal fade" :id="`modalImageViewer_${imageItem.id}`" tabindex="-1" aria-labelledby="modalRemovingLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable" style="max-width: 96%; width: 1000px">
      <div class="modal-content">
        <div class="modal-header">
          <!--     Header of modal window     -->
          <h1 class="modal-title fs-5" id="modalCreationLabel">Просмотр изображения</h1>
          <!--     Close button     -->
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <div class="container d-flex justify-content-center">
            <img class="img-fluid rounded object-fit-cover" :src="imageItem.param2" :alt="imageItem.param1">
          </div>

          <p class="text-dark-emphasis overflow-hidden fs-5 mt-3 fw-bold capitalize-first-letter"> {{ imageItem.param1 }} </p>
        </div>
        <div class="modal-footer">
          <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageItem: {
      required: true
    }
  }
}
</script>