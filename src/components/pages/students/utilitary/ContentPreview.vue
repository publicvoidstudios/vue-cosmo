<template>
  <div class="container" style="height: 260px" v-if="item.content_type === 'article'">
    <p class="mt-1 h5 m-0 p-0" style="height: 70px">{{item.param1}}</p>
    <p class="mt-1 small overflow-hidden  m-0 p-0" style="height: 130px">{{item.param2}}</p>
    <p class="mt-1 text-start text-light-emphasis" style="height: 60px;"><strong>Подраздел:</strong><br> {{parentSectionName}}</p>
  </div>

  <div class="container text-center" style="height: 260px" v-if="item.content_type === 'image'">
    <img class="img-fluid rounded" style="height: 130px; object-fit: cover" :src="item.param2" :alt="item.param1">
    <p class="mt-1 overflow-hidden" style="height: 70px;">{{item.param1}}</p>
    <p class="mt-1 text-start text-light-emphasis" style="height: 60px;"><strong>Подраздел:</strong><br> {{parentSectionName}}</p>
  </div>

  <div class="container text-center" style="height: 260px" v-if="item.content_type === 'video'">
    <div class="d-flex justify-content-center m-0" style="height: 150px" v-html="replaceWidthAndHeight(item.param2)"></div>
    <p class="mt-1 overflow-hidden" style="height: 50px;">{{item.param1}}</p>
    <p class="mt-1 text-start text-light-emphasis" style="height: 60px;"><strong>Подраздел:</strong><br> {{parentSectionName}}</p>
  </div>

  <div class="container text-center" style="height: 260px" v-if="item.content_type === 'pptx'">
    <div class="d-flex justify-content-center" style="height: 200px">
      <div class="ratio ratio-4x3" v-html="replaceWidthAndHeight(item.param2)"></div>
    </div>
    <p class="mt-1 text-start text-light-emphasis" style="height: 60px;"><strong>Подраздел:</strong><br> {{parentSectionName}}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true
    }
  },
  methods: {
    replaceWidthAndHeight(str) {
      const regex = /width="(\d+px?)" height="(\d+px?)"/;
      return str.replace(regex, `style="width: 100%; height: 100%;"`);
    }
  },
  computed: {
    parentSectionName() {
      const subsections = JSON.parse(localStorage.getItem('subsections'));

      const subsection = subsections.find(ss => ss.html_id === this.item.subsection_id);
      if(subsection) {
        return subsection.subsection_name;
      } else {
        return 'Ошибка: подраздел не найден';
      }

    }
  }
}
</script>