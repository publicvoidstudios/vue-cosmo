<template>
  <slot name="name"></slot>
  <slot name="desc"></slot>
  <div class="container">
    <div v-for="item in items">
      <main-item v-if="!item.contactItem" :image-u-r-l="item.imageURL" :description="item.description" :name="item.name" :contact-item="item.contactItem" @itemClicked="itemClicked"></main-item>
      <contact-item v-if="item.contactItem" :image-u-r-l="item.imageURL" :name="item.name" :location-u-r-l="item.locationURL"></contact-item>
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
    }
  },
  data () {
    return {
      itemDescription: ''
    }
  },
  methods: {
    itemClicked (eventArg1, eventArg2) {
      this.$emit('itemClicked', eventArg1, eventArg2);
    }
  }
}
</script>

<style scoped>
/*.container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}*/

</style>