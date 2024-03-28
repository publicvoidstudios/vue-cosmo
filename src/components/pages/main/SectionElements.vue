<template>
  <slot name="name"></slot>
  <slot name="desc"></slot>
  <div class="grid d-flex justify-content-center w-100">
    <div class="row d-flex justify-content-center p-3 w-100 mw-100">
      <div v-if="!contactsSection" v-for="item in items" class="col-lg-6 col-xxl-4 my-2" >
        <main-item v-if="!item.contactItem" :image-u-r-l="item.img_url" :description="item.description" :name="item.name" :contact-item="item.contactItem" :html_id="item.html_id" :reviews="item.reviews"></main-item>
      </div>
      <div v-if="contactsSection" v-for="item in items" class="col-lg-4 col-xxl-3" >
        <contact-item v-if="item.contactItem" :image-u-r-l="item.imageURL" :name="item.name" :location-u-r-l="item.locationURL"></contact-item>
      </div>
    </div>
  </div>
</template>

<script>
import MainItem from "@/components/pages/main/MainItem.vue";
import ContactItem from "@/components/pages/main/ContactItem.vue";

export default {
  name: 'section-elements',
  components: {ContactItem, MainItem},
  props: {
    items: {
      type: Array,
      required: true
    },
    medical: {
      type: Boolean
    },
    contactsSection: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      itemDescription: ''
    }
  }
}
</script>