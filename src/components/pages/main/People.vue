<template>
  <div class="grid d-flex justify-content-center w-100">
    <div class="row d-flex justify-content-center p-3 w-100 mw-100">
      <div v-for="item in items" class="col-lg-6 col-xxl-4 my-2" >
        <person-card :image-u-r-l="item.img_url" :description="item.description" :name="item.name" :html_id="item.html_id"></person-card>
      </div>
    </div>
  </div>
</template>

<script>
import ContactItem from "@/components/pages/main/ContactItem.vue";
import MainItem from "@/components/pages/main/MainItem.vue";
import PersonCard from "@/components/pages/main/PersonCard.vue";

export default {
  components: {PersonCard, MainItem, ContactItem},
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>