<template>
  <div>
    <students-header :header_name="header_name">
      <button class="btn bg-body rounded h-100" v-if="current_level !== 'home'" @click="goBack">
        Назад
      </button>
    </students-header>
    <students-main-container>
      <sections v-if="current_level==='home'" :sections="sections" @sectionClicked="sectionSelected"></sections>
      <subsections v-if="current_level==='section'" :subsections="selectedSubsections" @subsectionClicked="subsectionSelected"></subsections>
      <content v-if="current_level==='subsection'" :content="sortedContent" @updatePageAnchors="updatePageAnchors"></content>
    </students-main-container>
  </div>
</template>

<script>
import StudentsHeader from "@/components/pages/students/StudentsHeader.vue";
import StudentsMainContainer from "@/components/pages/students/StudentsMainContainer.vue";
import Sections from "@/components/pages/students/Sections.vue";
import Subsections from "@/components/pages/students/Subsections.vue";
import Content from "@/components/pages/students/Content.vue";

export default {
  components: {Content, Subsections, Sections, StudentsMainContainer, StudentsHeader},
  props: {
    sections: {
      type: Array,
      required: true,
      default: []
    },
    subsections: {
      type: Array,
      required: true,
      default: []
    },
    content: {
      type: Array,
      required: true,
      default: []
    },
  },
  data () {
    return {
      header_name: 'Разделы',
      storedHeaderName: '',
      current_level: 'home',


      selectedSubsections: [],
      selectedContent: [],
      sortedContent: {
        images: [],
        videos: [],
        presentations: [],
        articles: []
      },
      pageAnchors: []
    }
  },
  methods: {
    sectionSelected(sectionHtmlId) {
      //Filter data to display
      this.selectedSubsections = this.subsections.filter(subsection => subsection.parent_section_name === sectionHtmlId);
      //Set level of a page
      this.current_level = 'section';
      //Set header name
      let section = this.sections.find(section => section.html_id === sectionHtmlId)
      this.header_name = section ? section.name : 'Раздел'
      this.storedHeaderName = this.header_name;
    },
    subsectionSelected(subsectionHtmlId) {
      //Filter data to display
      this.selectedContent = this.content.filter(item => item.subsection_id === subsectionHtmlId);
      //Sort data
      this.sortedContent.articles = this.selectedContent.filter(item => item.content_type === 'article');
      this.sortedContent.images = this.selectedContent.filter(item => item.content_type === 'image');
      this.sortedContent.presentations = this.selectedContent.filter(item => item.content_type === 'pptx');
      this.sortedContent.videos = this.selectedContent.filter(item => item.content_type === 'video');
      //Set header name
      let subsection = this.subsections.find(subsection => subsection.html_id === subsectionHtmlId)
      this.header_name = subsection ? subsection.subsection_name : 'Подраздел'
      //Set level of a page
      this.current_level = 'subsection';
    },
    goBack () {
      switch (this.current_level) {
        case "home":
          this.$emit('updatePageAnchors',[]);
          return;
        case "section":
          this.current_level = 'home';
          this.header_name = 'Разделы';
          this.$emit('updatePageAnchors',[]);
          return;
        case "subsection":
          this.current_level = 'section';
          this.header_name = this.storedHeaderName;
          this.$emit('updatePageAnchors',[]);
          return;
      }
    },
    updatePageAnchors (anchors) {
      this.$emit('updatePageAnchors', anchors);
    }
  },
  beforeMount() {
    this.$emit('dataUpdateRequest');
  },
  mounted() {
    document.getElementById('pageTitle').innerText = 'Студентам';
  }
}
</script>