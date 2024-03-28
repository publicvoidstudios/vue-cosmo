<template>
  <div class="container grid">
    <div class="row">
      <div v-for="subsection in subsections" class="p-3 col-md-4 col-lg-3 col-xl-3 col-xxl-2" >
        <section-item class="scale-on-hover" :img_url="subsection.img_url" :name="subsection.subsection_name" @click="subsectionClicked(subsection.html_id)"></section-item>
      </div>
    </div>
  </div>
  <div v-if="!subsections.length" class="text-center fs-3 text-secondary-emphasis">
  В этом разделе пока ничего нет...
  </div>
</template>

<script>
import SectionItem from "@/components/pages/students/SectionItem.vue";

export default {
  components: {SectionItem},
  props: {
    subsections: {
      type: Array,
      required: true
    }
  },
  methods: {
    subsectionClicked (html_id) {
      this.$emit('subsectionClicked', html_id)
    }
  }
}
</script>