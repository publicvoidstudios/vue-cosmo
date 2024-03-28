<template>
  <div
      class="container bg-light-subtle d-flex flex-column justify-content-center align-items-center shadow rounded p-3"
      style="width: 200px; cursor: pointer;"
  >
    <div
        class="rounded m-0 p-0 container"
        style="width: 170px; height: 170px;"
    >
      <img class="w-100 h-100 object-fit-cover rounded" :src="img_url" alt="">
    </div>
    <div
        class="pt-3 overflow-hidden d-flex align-items-center mt-2"
        style="height: 85px; word-break: break-word"
    >
      <p class="text-uppercase text-center text-secondary-emphasis fw-bold">{{name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    img_url: {
      type: String,
      required: true
    }
  }
}
</script>