<template>
  <div class="card mb-3" style="max-width: 400px">
    <div class="row g-0">
      <div class="col-md-6">
        <img :src="imageURL" class="img-fluid rounded-start h-100 object-fit-cover" :alt="imageURL" @click="moveToURL(locationURL)">
      </div>
      <div class="col-md-6">
        <div class="card-body d-flex flex-column justify-content-between h-100">
          <h5 class="card-title">{{ name }}</h5>
          <p class="card-text">Напишите мне в {{name}}.</p>
          <button class="btn btn-primary" @click="moveToURL(locationURL)">Связаться через {{name}}</button>
        </div>
      </div>
    </div>
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