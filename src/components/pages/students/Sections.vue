<template>
  <div class="container grid">
    <div class="row">

      <div v-for="section in sections" class="p-3 col-md-4 col-lg-3 col-xl-3 col-xxl-2" >
        <section-item class="scale-on-hover" :img_url="section.img_url" :name="section.name" @click="sectionClicked(section.html_id)"></section-item>
      </div>
    </div>
  </div>
</template>

<script>
import SectionItem from "@/components/pages/students/SectionItem.vue";
export default {
  components: { SectionItem },
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